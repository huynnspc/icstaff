import React, { Component } from "react";
import moment from "moment";

export default class Information_Extra extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: this.props.data
    };
  }

  render() {
    const {information, contact_information} = this.props.data
    return (
      <div className="panel-body">
        <div className="col-md-12">
          <div className="header-title">THÔNG TIN KHÁC</div>
        </div>
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Dân tộc</td>
                  <td>{information && information.region}</td>
                  <td>Tôn giáo</td>
                  <td>Không</td>
                </tr>
                <tr>
                  <td>CMND / Căn cước / Hộ chiếu</td>
                  <td>{information && information.id_number}</td>
                  <td>Ngày cấp</td>
                  <td>{information && (moment(information.id_issue_date).format('DD/MM/YYYY'))}</td>
                </tr>
                <tr>
                  <td>Nơi sinh</td>
                  <td>{information && information.place_of_born}</td>
                  <td>Nguyên quán</td>
                  <td>{information && information.native_place}</td>
                </tr>
                <tr>
                  <td>Thường trú</td>
                  <td>{contact_information && contact_information.address}</td>
                  <td>Chỗ ở hiện tại</td>
                  <td>{contact_information && contact_information.contact_address}</td>
                </tr>
                <tr>
                  <td>Mã số thuế</td>
                  <td>{information && information.tax}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Tên tài khoản</td>
                  <td>{information && information.account_name}</td>
                  <td>Số tài khoản</td>
                  <td>{information && information.account_number}</td>
                </tr>
                <tr>
                  <td>Ngân hàng</td>
                  <td>{information && information.bank_name}</td>
                  <td>Chi Nhánh</td>
                  <td>{information && information.bank_address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
