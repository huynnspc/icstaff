import React, { Component } from "react";
import moment from "moment";
import {trinhdohocvan, hinhthucdaotao} from "../add/Common"

export default class Education_Background extends Component {

  constructor(props) {
    super(props);
    this.state = {
      education_background: []
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.data.education_background !== this.state.education_background){
      this.setState({
        education_background: nextProps.data.education_background
      })
    }
  }

  renderData = () => {
    const {education_background} = this.state
      if(education_background){
        return education_background.map((item, index) => {
          return (
            <tr key={index}>
              <td>{moment(item.from_date).format('DD/MM/YYYY')}</td>
              <td>{moment(item.to_date).format('DD/MM/YYYY')}</td>
              <td>
                {/* Kiểm tra mode_of_study ID */}
                {hinhthucdaotao.map((mode_of_study) => {
                  if(mode_of_study.id == item.mode_of_study){
                    return mode_of_study.name
                  }
                })
                }
              </td>
              <td>{item.major}</td>
              <td>
                {/* Kiểm tra mode_of_study ID */}
                {trinhdohocvan.map((level) => {
                  if(level.id == item.level){
                    return level.name
                  }
                })
                }
              </td>
              <td>{item.place}</td>
            </tr>
          )
        })
      }
  }

  render() {
    return (
      <div className="panel-body">
        <div className="col-md-12">
          <div className="header-title">TRÌNH ĐỘ HỌC VẤN</div>
        </div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover education">
              <thead>
                <tr>
                  <th>Từ tháng</th>
                  <th>Đến tháng</th>
                  <th>Hình thức đào tạo</th>
                  <th>Chuyên ngành</th>
                  <th>Trình độ học vấn</th>
                  <th>Nơi đào tạo</th>
                </tr>
              </thead>
              <tbody>
                {this.renderData()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
