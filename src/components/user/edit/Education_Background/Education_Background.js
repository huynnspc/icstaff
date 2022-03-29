import React, { Component } from 'react'
import Select from "../../../common/Select"

import Education_Item from './Education_Item'

export default class Education_Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "",
            education: []
        }
    }

    componentWillReceiveProps(nextProps) {
      const education = nextProps.education
      if(education){
        if(education != this.state.education){
          education.map(item => {
            if(item.delete_flag){
              if(item.delete_flag == false){
                item.delete_flag = 0
              }
            }
          })
          this.setState({
            education: education
          })
        }
      }
      
    }

    setSelect = (select) => {
        this.setState({ select: select });
    };

    ItemEducationChange = (payload) => {
        var { education } = this.state
        education = education.map((item, index) => {
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
            return item
        })

        this.setState({education: education});
        this.props.onChange(education);
    }

    renderData = () => {
        const { education } = this.state;
        if(education){
            return education.map((item, index) => {
              if(item.checkEdit !== 3){
                return (
                  <Education_Item 
                    key={index}
                    position={index}
                    item={item}
                    onChange={this.ItemEducationChange}
                    onDelete={this.DeleteItem}
                  />
                );
              }
            });
        }
      }
    DeleteItem = (index) => {
        const {education} = this.state
        education.push({
          checkEdit: 3,
          id: education[index].id
        })
        education.splice(index, 1)
        
        this.setState({
            education: education
        })
        this.props.onDelete(education);
    }

    addEducationButton = () => {
        const {education} = this.state
        education.push({
          from_date: '',
          to_date: '',
          mode_of_study: '',
          major: '',
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
            <div className="panel-body education">
            {/* <form onSubmit={this.onSubmit}> */}
              <div className="row">
                <div className="form-group col-md-12">
                    <div className="header-title">Trình độ học vấn</div>
                </div>
              </div>
              <div className="table-responsive">
                  <table id="data" className="table table-bordered table-striped table-hover">
                      <thead>
                          <tr>
                              <th>Từ tháng</th>
                              <th>Đến tháng</th>
                              <th>Hình thức đào tạo</th>
                              <th>Chuyên ngành</th>
                              <th>Trình độ học vấn</th>
                              <th>Nơi đào tạo</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                        {this.renderData()}
                      </tbody>
                  </table>
              </div>
              <div className="row">
                <div className="col-md-12"><i className="pe-7s-plus add-family-info" onClick={this.addEducationButton}></i></div>
              </div>
            {/* </form> */}
            </div>
        )
    }
}
