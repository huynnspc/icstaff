import React, { Component } from 'react'
import Select from "../../../common/Select"

import Family_Item from './Family_Item'

export default class Family_Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "",
            family: []
        }
    }

    componentDidUpdate() {
    }

    ItemFamilyChange = (payload) => {
        const { family } = this.state
        family.map((item, index) => {
            if(index === payload.idx){
            item.relationship = payload.relationship
            item.fullname = payload.fullname
            item.birthday = payload.birthday
            item.career = payload.career
            item.address = payload.address
            item.mobile = payload.mobile
            item.is_depend = payload.is_depend
            if(payload.id){
                item.checkEdit = 1
            }else{
                item.checkEdit = 2
            }
            }
        })

        this.setState({family: family});
        this.props.onChange(family);
    }

    renderData = () => {
        const { family } = this.state;
        return family.map((item, index) => {
            return (
                <Family_Item 
                    key={index}
                    position={index}
                    data={item}
                    onChange={this.ItemFamilyChange}
                    onDelete={this.DeleteItemFamily}
                />
            );
            });
    }

    DeleteItemFamily = (position) => {
        const {family} = this.state
        family.splice(position, 1)
        this.setState({
            family
        })
        this.props.onChange(family);
    }

    addFamilyButton = () => {
        const {family} = this.state
        family.push({
          relationship: '',
          fullname: '',
          birthday: '',
          career: '',
          address: '',
          mobile: '',
          is_depend: ''
        })
        this.setState({
          family
        })
        this.props.onChange(family);
      }

    render() {
        return (
            <div className="panel-body family">
                <div className="row">
                    <div className="form-group col-md-12">
                        <div className="header-title">Th??ng tin gia ????nh (*)</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="data" className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>M???i quan h???</th>
                                        <th>H??? v?? t??n</th>
                                        <th>N??m sinh</th>
                                        <th>Ngh??? nghi???p</th>
                                        <th>?????a ch???</th>
                                        <th>??i???n tho???i</th>
                                        <th>Ng?????i ph??? thu???c</th>
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
                    <div className="col-md-12"><i className="pe-7s-plus add-family-info" onClick={this.addFamilyButton}></i></div>
                </div>  
            </div>
        )
    }
}
