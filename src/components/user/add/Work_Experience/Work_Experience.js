import React, { Component } from "react";
import Select from "../../../common/Select";

import Experience_Item from "./Experience_Item";

const gender = [
  {
    id: "1",
    name: "Nam",
  },
  {
    id: "2",
    name: "Nữ",
  },
];
const place_of_born = [
  {
    id: "1",
    name: "TPHCM",
  },
  {
    id: "2",
    name: "Hà Nội",
  },
];

export default class Work_Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      experience: [],
    };
  }
  setSelect = (select) => {
    this.setState({ select: select });
  };

  ItemExperienceChange = (payload) => {
    const { experience } = this.state;
    experience.map((item, index) => {
      if (index === payload.idx) {
        item.from_date = payload.from_date;
        item.to_date = payload.to_date;
        item.company = payload.company;
        item.position = payload.position;
        item.manager = payload.manager;
        item.mobile = payload.mobile;
        item.description = payload.description;
        if (payload.id) {
          item.checkEdit = 1;
        } else {
          item.checkEdit = 2;
        }
      }
    });

    this.setState({ experience: experience });
    this.props.onChange(experience);
  };

  renderData = () => {
    const { experience } = this.state;
      return experience.map((item, index) => {
          return (
              <Experience_Item 
                  key={index}
                  position={index}
                  data={item}
                  onChange={this.ItemExperienceChange}
                  onDelete={this.DeleteItem}
              />
          );
      });
    // const { experience } = this.state;
    // console.log(experience);
    // if (experience.length != 0) {
    //   return experience.map((experience, index) => {
    //     return (
    //       <Experience_Item
    //         key={index}
    //         position={index}
    //         data={experience}
    //         onChange={(data) => {
    //           this.ItemExperienceChange(data);
    //         }}
    //         onDelete={(index) => {
    //           this.DeleteItem(index);
    //         }}
    //       />
    //     );
    //   });
    // } else {
    //   this.addExperienceButton();
    // }
  };
  DeleteItem = (index) => {
    const { experience } = this.state;
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
        <div className="form-group">
          <div className="header-title">Kinh nghiệm làm việc (*)</div>
        </div>
        <div className="table-responsive">
          <table className="form-group table table-bordered">
            <thead>
              <tr>
                <th style={{width: "10%"}}>
                  <label className="control-label">Từ tháng</label>
                </th>
                <th style={{width: "10%"}}>
                  <label className="control-label">Đến tháng</label>
                </th>
                <th style={{width: "10%"}}>
                  <label className="control-label">Công ty</label>
                </th>
                <th style={{width: "10%"}}>
                  <label className="control-label">Vị trí</label>
                </th>
                <th style={{width: "15%"}}>
                  <label className="control-label">Người tham chiếu</label>
                </th>
                <th style={{width: "15%"}}>
                  <label className="control-label">Điện thoại</label>
                </th>
                <th style={{width: "15%"}}>
                  <label className="control-label">Mô tả công việc</label>
                </th>
                <th></th>
              </tr>
            </thead>
            {this.renderData()}
          </table>
        </div>
        <div className="col-md-12">
          <i className="pe-7s-plus add-family-info" onClick={this.addExperienceButton}></i>
        </div>
      </div>
    );
  }
}
