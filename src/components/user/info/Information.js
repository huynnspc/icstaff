import React, { Component } from "react";
import moment from "moment";

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // information: this.props.data
    };
  }

  render() {
    const {information, contact_information} = this.props.data
    return (
      <div className="panel-body">
        <div className="col-md-12">
          <div className="header-title">THÔNG TIN CHUNG</div>
        </div>
        <div className="col-md-3">
          <div className="avatar">
            {information && <img src={global.uri + `/api/profile/avatars/` + information.avatar} className="img-rounded" alt=""/>}
          </div>
            
        </div>
        <div className="col-md-9">
          <div className="table-responsive">
            <table className="table table-striped userinfo">
              <tbody>
                <tr>
                  <td>Họ và tên</td>
                  <td>{information && information.name}</td>
                  <td>Mã nhân viên</td>
                  <td>{information && information.code}</td>
                </tr>
                <tr>
                  <td>Ngày sinh</td>
                  <td>{information && information.birthday && (moment(information.birthday).format('DD/MM/YYYY'))}</td>
                  <td>Giới tính</td>
                  <td>
                    {information && information.gender ? (
                      information.gender == 1 ? "Nam" : "Nữ"
                    ) : (
                      "*Đang cập nhật*"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Tình trạng hôn nhân</td>
                  <td>
                    {information && (
                      information.is_married == 1 && ("Độc thân") ||
                      information.is_married == 2 && ("Đã kết hôn") ||
                      information.is_married == 3 && ("Đã ly hôn")
                    )}
                  </td>
                  <td>Quốc tịch</td>
                  <td>{information && information.nationality}</td>
                </tr>
                <tr>
                  <td>Điện thoại</td>
                  <td>{contact_information && contact_information.mobile}</td>
                  <td>Email</td>
                  <td>{contact_information && contact_information.email}</td>
                </tr>
                <tr>
                  <td>Số nội bộ</td>
                  <td>{contact_information && contact_information.company_phone}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
