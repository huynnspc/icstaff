import React, { Component } from 'react'

import Education_Item from './Education_Item'

export default class Education_Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "",
            education: []
        }
    }
    setSelect = (select) => {
        this.setState({ select: select });
    };

    ItemEducationChange = (payload) => {
        const { education } = this.state
        education.map((item, index) => {
            if(index === payload.idx){
            item.from_date = payload.from_date
            item.to_date = payload.to_date
            item.mode_of_study = payload.mode_of_study
            item.major = payload.major
            item.level = payload.level
            item.place = payload.place
            if(payload.id){
                item.checkEdit = 1
            }else{
                item.checkEdit = 2
            }
            }
        })

        this.setState({education: education});
        this.props.onChange(education);
    }

    renderData = () => {
        const { education } = this.state;
        return education.map((item, index) => {
            return (
                <Education_Item 
                    key={index}
                    position={index}
                    data={item}
                    onChange={this.ItemEducationChange}
                    onDelete={this.DeleteItem}
                />
            );
            });
        // if(education.length != 0){
        //     return education.map((education, index) => {
        //         return (
        //           <Education_Item 
        //             key={index}
        //             index={index}
        //             data={education}
        //             onChange={this.ItemEducationChange}
        //             onDelete={this.DeleteItem}
        //           />
        //         );
        //       });
        // }else{
        //     this.addEducationButton()
        // }
      }
    DeleteItem = (index) => {
        const {education} = this.state
        education.splice(index, 1)
        this.setState({
            education: education
        })
        this.props.onChange(education);
    }

    addEducationButton = () => {
        const {education} = this.state
        education.push({
          from_date: '',
          to_date: '',
          mode_of_study: '',
          major: '',
          address: '',
          level: '',
          place: ''
        })
        this.setState({
          education: education
        })
        this.props.onChange(education);
      }

    render() {
        return (
            <div className="panel-body family">
                <div className="row">
                    <div className="form-group col-md-12">
                        <div className="header-title">Tr??nh ????? h???c v???n (*)</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="data" className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>T??? th??ng</th>
                                        <th>?????n th??ng</th>
                                        <th>H??nh th???c ????o t???o</th>
                                        <th>Chuy??n ng??nh</th>
                                        <th>Tr??nh ????? h???c v???n</th>
                                        <th>N??i ????o t???o</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12"><i className="pe-7s-plus add-family-info" onClick={this.addEducationButton}></i></div>
                </div>  
            </div>

            
        )
    }
}
