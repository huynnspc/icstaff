import React, { useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"
import Select from "../../common/Select"
import "../custom.css"
import styled from "styled-components"
import Navbar from "../../layout/Navbar"
import Left from "../../layout/LeftMenu"
import UserContentMenu from "../UserContentMenu"
import UserHeaderMenu from "../UserHeaderMenu"
import { contract as contracts, representative_list } from "../add/Common"

import { getUser, addUser, getContract } from "../../../actions/userActions"
import moment from 'moment'

const UserContract = ({ history, location, match, user, contract, getContract }) => {
  const { pathname } = location
  const userid = match.params.id

  useEffect(() => {
    if (!getContract(userid)) history.goBack()
  }, [])

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
                <div className="panel-body information">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="header-title">DANH SÁCH HỢP ĐỒNG</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="table table-striped b-t">
                          <thead>
                            <tr>
                              <th>Mã HĐ</th>
                              <th>Hợp đồng</th>
                              <th>Trạng thái</th>
                              <th>Ngày ký</th>
                              <th>Ngày bắt đầu</th>
                              <th>Ngày kết thúc</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contract && contract.map((item, index) => (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{contracts[item.status - 1].name}</td>
                                <td>{moment(item.signDay).format("DD/MM/yyyy")}</td>
                                <td>{moment(item.startDay).format("DD/MM/yyyy")}</td>
                                <td>{moment(item.endDay).format("DD/MM/yyyy")}</td>
                              </tr>
                            ))}
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

const mapStateToProps = (state) => ({
  user: state.user.user,
  contract: state.user.contract,
  errors: state.errors,
})

export default connect(mapStateToProps, { getUser, addUser, getContract })(
  withRouter(UserContract)
)
