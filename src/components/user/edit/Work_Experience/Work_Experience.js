import React, { Component } from "react";
import Select from "../../../common/Select";

import Experience_Item from "./Experience_Item";

export default class Work_Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      experience: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const experience = nextProps.experience
    if(experience){
      if(experience != this.state.experience){
        experience.map(item => {
          if(item.delete_flag){
            if(item.delete_flag === false){
                item.delete_flag = 0
            }
          } 
        })
        this.setState({
          experience: experience
        })
      }
    }
    
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.id} data-tokens={item.id}>
          {item.name}
        </option>
      );
    });
  };

  ItemExperienceChange = (payload) => {
    var { experience } = this.state;
    experience = experience.map((item, index) => {
      if (index === payload.idx) {
        item.from_date = payload.from_date;
        item.to_date = payload.to_date;
        item.company = payload.company;
        item.position = payload.position;
        item.manager = payload.manager;
        item.mobile = payload.mobile;
        item.description = payload.description;
        item.delete_flag = 0;
        if (payload.id) {
          item.checkEdit = 1;
        } else {
          item.checkEdit = 2;
        }
      }
      return item
    });

    this.setState({ experience: experience });
    this.props.onChange(experience);
  };

  renderData = () => {
    const { experience } = this.state;
    if (experience) {
      return experience.map((item, index) => {
        if(item.checkEdit !== 3){
          return (
            <Experience_Item
              key={index}
              position={index}
              item={item}
              onChange={this.ItemExperienceChange}
              onDelete={this.DeleteItem}
            />
          );
        }
        
      });
    }
  };

  DeleteItem = (index) => {
    const { experience } = this.state;
    experience.push({
      checkEdit: 3,
      id: experience[index].id
  })
    experience.splice(index, 1);
    this.setState({
        experience: experience,
    });
    this.props.onChange(experience);
  };

  addExperienceButton = () => {
    const { experience } = this.state;
    experience.push({
      from_date: "",
      to_date: "",
      company: "",
      position: "",
      manager: "",
      mobile: "",
      description: "",
    });
    this.setState({
        experience: experience,
    });
    this.props.onChange(experience);
  };

  render() {
    return (
      <div className="panel-body work_experience">
        <div className="row">
          <div className="form-group col-md-12">
            <div className="header-title">Kinh nghiệm làm việc</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
              <div className="table-responsive">
                  <table id="data" className="table table-bordered table-striped table-hover">
                      <thead>
                          <tr>
                              <th>Từ tháng</th>
                              <th>Đến tháng</th>
                              <th>Công ty</th>
                              <th>Vị trí</th>
                              <th>Người tham chiếu</th>
                              <th>Điện thoại</th>
                              <th>Mô tả công việc</th>
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
          <div className="col-md-12">
            <i className="pe-7s-plus add-family-info" onClick={this.addExperienceButton}></i>
          </div>
        </div>
        
      </div>
    );
  }
}
