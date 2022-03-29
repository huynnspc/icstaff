import React, { Component } from "react";
import moment from "moment";
import {relationship_list, is_depend} from "../add/Common"

export default class Family_Information extends Component {

  constructor(props) {
    super(props);
    this.state = {
      family_information: []
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.data.family_information != this.state.family_information){
      this.setState({
        family_information: nextProps.data.family_information
      })
    }
  }

  renderData = () => {
    const {family_information} = this.state
      if(family_information){
        return family_information.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                {/* Kiểm tra relationship ID */}
                {relationship_list.map((relationship) => {
                  if(relationship.id == item.relationship){
                    return relationship.name
                  }
                })
                }
              </td>
              <td>{item.fullname}</td>
              <td>{moment(item.birthday).format('DD/MM/YYYY')}</td>
              <td>{item.career}</td>
              <td>{item.address}</td>
              <td>{item.mobile}</td>
              <td>{item.is_depend == 1 ? "Có" : "Không"}</td>
            </tr>
          )
        })
      }
  }

  render() {
    return (
      <div className="panel-body">
        <div className="col-md-12">
          <div className="header-title">THÔNG TIN GIA ĐÌNH</div>
        </div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover family">
              <thead>
                <tr>
                  <th>Mối quan hệ</th>
                  <th>Họ và tên</th>
                  <th>Năm sinh</th>
                  <th>Nghề nghiệp</th>
                  <th>Địa chỉ</th>
                  <th>Điện thoại</th>
                  <th>Người phụ thuộc</th>
                </tr>
              </thead>
              <tbody>{this.renderData()}</tbody>
              
            </table>
          </div>
        </div>
      </div>
    );
  }
}
