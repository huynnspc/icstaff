import React, { Component } from "react";
import moment from "moment";

export default class Work_Experience extends Component {

  constructor(props) {
    super(props);
    this.state = {
      work_experience: []
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(nextProps.data.work_experience !== this.state.work_experience){
      this.setState({
        work_experience: nextProps.data.work_experience
      })
    }
  }

  renderData = () => {
    const {work_experience} = this.state
      if(work_experience){
        return work_experience.map((item, index) => {
          return (
            <tr key={index}>
              <td>{moment(item.from_date).format('DD/MM/YYYY')}</td>
              <td>{moment(item.to_date).format('DD/MM/YYYY')}</td>
              <td>{item.company}</td>
              <td>{item.position}</td>
              <td>{item.manager}</td>
              <td>{item.mobile}</td>
              <td>{item.description}</td>
            </tr>
          )
        })
      }
  }

  render() {
    return (
      <div className="panel-body userinfo">
        <div className="col-md-12">
          <div className="header-title">KINH NGHIỆM LÀM VIỆC</div>
        </div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover work_experience">
              <thead>
                <tr>
                  <th>Từ tháng</th>
                  <th>Đến tháng</th>
                  <th>Công ty</th>
                  <th>Vị trí</th>
                  <th>Người tham chiếu</th>
                  <th>Điện thoại</th>
                  <th>Mô tả công việc</th>
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
