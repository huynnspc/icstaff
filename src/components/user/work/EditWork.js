import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import Select from "react-select"
import { connect } from "react-redux"
import validator from "validator"
import "../custom.css"

import Navbar from "../../layout/Navbar"
import Left from "../../layout/LeftMenu"

import UserHeaderMenu from "../UserHeaderMenu"
import UserContentMenu from "../UserContentMenu"

const colourStyles = {
  control: (styles) => ({
    ...styles,
    border: "none",
    backgroundColor: "#1C1F22",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "none",
  }),
  option: (base) => ({
    ...base,
    color: "#000",
    height: "100%",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#999",
  }),
}

const LoaiHopDong = [
  { value: "1", label: "Có thời hạn" },
  { value: "2", label: "Không thời hạn" },
]
const TrucThuoc = [
  { value: "1", label: "Văn phòng" },
  { value: "2", label: "Chi nhánh" },
]

class EditWork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: this.props.match.params.id,
    }
  }

  handleUpdate = (e) => {
    e.preventDefault()
    console.log("Update Work")
  }

  render() {
    const { pathname } = this.props.location
    const { userid } = this.state
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>

        <div id="page-wrapper">
          <div className="content userinfo">
            <UserHeaderMenu pathname={pathname} userid={userid} />
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-bd lobidrag">
                  <UserContentMenu pathname={pathname} userid={userid} />

                  {/* Lương */}
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="header-title">CÔNG VIỆC</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table table-striped b-t">
                            <tbody>
                              <tr>
                                <td>Trực thuộc</td>
                                <td>Chi nhánh</td>
                                <td>Chi nhánh</td>
                                <td>Ung Văn Khiêm</td>
                              </tr>
                              <tr>
                                <td>Vị trí công việc</td>
                                <td>Phục vụ</td>
                                <td>Chức vụ</td>
                                <td>Nhân viên</td>
                              </tr>
                              <tr>
                                <td>Trạng thái</td>
                                <td>Đang làm việc</td>
                                <td>Ngày chính thức</td>
                                <td>01/01/2020</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* Lich su cong viec */}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="header-title">LỊCH SỬ CÔNG VIỆC</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table table-striped b-t">
                            <thead>
                              <tr>
                                <th>Từ ngày</th>
                                <th>Trạng thái</th>
                                <th>Chi nhánh</th>
                                <th>Vị trí công việc</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>20/05/2020</td>
                                <td>Đang làm việc</td>
                                <td>ICOOL Ung Văn Khiêm</td>
                                <td>Quản lý</td>
                              </tr>
                              <tr>
                                <td>20/05/2020</td>
                                <td>Đang làm việc</td>
                                <td>ICOOL Ung Văn Khiêm</td>
                                <td>Quản lý</td>
                              </tr>
                              <tr>
                                <td>20/05/2020</td>
                                <td>Đang làm việc</td>
                                <td>ICOOL Ung Văn Khiêm</td>
                                <td>Quản lý</td>
                              </tr>
                              <tr>
                                <td>20/05/2020</td>
                                <td>Đang làm việc</td>
                                <td>ICOOL Ung Văn Khiêm</td>
                                <td>Quản lý</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* Kiêm nhiệm */}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="header-title">KIÊM NHIỆM</div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table table-striped b-t">
                            <thead>
                              <tr>
                                <th>Vị trí công việc</th>
                                <th>Phòng Ban</th>
                                <th>Chi nhánh</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Kho</td>
                                <td></td>
                                <td>ICOOL Ung Văn Khiêm</td>
                                <td>01/01/2020</td>
                                <td>01/10/2020</td>
                                <td>Đang làm việc</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditWork
