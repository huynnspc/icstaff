import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"
import moment from "moment"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import "../custom.css"
import styled from "styled-components"
import Navbar from "../../layout/Navbar"
import Left from "../../layout/LeftMenu"
import UserContentMenu from "../UserContentMenu"
import UserHeaderMenu from "../UserHeaderMenu"
import { contract as contracts, representative_list } from "../add/Common"

import { getUser, addUser, getContract, updateContracts } from "../../../actions/userActions"

const tempObj = (data) => ({
  id: data?.id || "",
  name: data?.name || "",
  status: data?.status || 2,
  signDay: data?.signDay || "",
  startDay: data?.startDay || "",
  endDay: data?.endDay || "",
})

const EditUserContract = ({ location, history, match, contract, getContract, updateContracts }) => {
  const [tableDataArr, setTableDataArr] = useState([])

  const { pathname } = location
  const userid = match.params.id

  useEffect(() => {
    if(!getContract(userid)) history.goBack()
  }, [])

  useEffect(() => {
    setTableDataArr(contract.map(e => tempObj(e)))
  }, [contract])

  const handleBackOnClick = () => history.goBack()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if(await updateContracts(userid, tableDataArr)) history.push(`/user/${userid}/contract`)
  }

  const addContractButton = (e) => setTableDataArr((prevState) => [...prevState, tempObj()])

  const handleOnChangeInput = (target) => {
    let value = target.value
    let name = target.name
    let index = target.getAttribute("index")
    const newTableDataArr = [...tableDataArr]
    newTableDataArr[index][name] = value
    setTableDataArr(newTableDataArr)
  }

  const handleOnChangeSelect = (e) => {
    let value = e.target.value
    let index = +e.target.name
    const newTableDataArr = [...tableDataArr]
    newTableDataArr[index].status = value
    setTableDataArr(newTableDataArr)
  }

  const handleDeleteItem = (index) => {
    const newTableDataArr = [...tableDataArr]
    newTableDataArr.splice(index, 1)
    setTableDataArr(newTableDataArr)
  }

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
                  <form
                    id="contract"
                    onSubmit={(e) => handleFormSubmit(e)}
                    data-toggle="validator"
                    role="form"
                  >
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
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableDataArr.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <input
                                      index={index}
                                      type="text"
                                      className="form-control"
                                      placeholder="Mã HĐ"
                                      name="id"
                                      value={item.id}
                                      onChange={(e) =>
                                        handleOnChangeInput(e.target)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      index={index}
                                      type="text"
                                      className="form-control"
                                      placeholder="Hợp đồng"
                                      name="name"
                                      value={item.name}
                                      onChange={(e) =>
                                        handleOnChangeInput(e.target)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <SelectCustom
                                      value={item.status}
                                      onChange={handleOnChangeSelect}
                                      name={index + ""}
                                      renderValue={() => contracts[item.status - 1].name}
                                    >
                                      {contracts.map((item, index) => (
                                        <MenuItemCustom
                                          key={index}
                                          value={item.id}
                                        >
                                          {item.name}
                                        </MenuItemCustom>
                                      ))}
                                    </SelectCustom>
                                  </td>
                                  <td>
                                    <input
                                      index={index}
                                      type="date"
                                      className="form-control"
                                      placeholder="Người tham chiếu"
                                      name="signDay"
                                      value={moment(item.signDay).format(
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={(e) =>
                                        handleOnChangeInput(e.target)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      index={index}
                                      type="date"
                                      className="form-control"
                                      placeholder="Người tham chiếu"
                                      name="startDay"
                                      value={moment(item.startDay).format(
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={(e) =>
                                        handleOnChangeInput(e.target)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      index={index}
                                      type="date"
                                      className="form-control"
                                      placeholder="Người tham chiếu"
                                      name="endDay"
                                      min={moment(item.startDay).format(
                                        "YYYY-MM-DD"
                                      )}
                                      value={moment(item.endDay).format(
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={(e) =>
                                        handleOnChangeInput(e.target)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <span
                                      value={
                                        typeof item.id !== "object"
                                          ? item.id
                                          : "TEMP" + index
                                      }
                                      index={index}
                                      title="Xóa"
                                      className="ti-trash"
                                      onClick={() => handleDeleteItem(index)}
                                    ></span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <i
                          className="pe-7s-plus add-family-info"
                          onClick={(e) => addContractButton(e)}
                        ></i>
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col-md-12 flex-container"
                        style={{ justifyContent: "center" }}
                      >
                        <button
                          className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                          type="submit"
                        >
                          Cập nhật
                        </button>
                        <button
                          className="btn btn-danger btn-rounded w-md m-t-5 m-r-5"
                          type="button"
                          onClick={() => handleBackOnClick()}
                        >
                          Hủy bỏ
                        </button>
                      </div>
                    </div>
                  </form>
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
  user: state.user,
  errors: state.errors,
  contract: state.user.contract
})

const MenuItemCustom = styled(MenuItem)`
  color: #999;
  font-size: 14px !important;
`

const SelectCustom = styled(Select)`
  color: #999 !important;
  background: #1d1f22;
  font-size: 14px !important;
  padding: 6px 12px;
  line-height: 24px !important;
  border-radius: 3px;
  display: flex !important;
  > .MuiInputBase-input {
    padding: 0;
  }
  > .MuiSelect-icon {
    color: #999;
    top: calc(50% - 7px);
  }
`

export default connect(mapStateToProps, { getUser, addUser, getContract, updateContracts })(
  withRouter(EditUserContract)
)
