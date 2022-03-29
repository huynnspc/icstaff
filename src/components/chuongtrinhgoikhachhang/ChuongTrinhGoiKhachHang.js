import React, { Component, Fragment } from "react"
import { Link, withRouter, Redirect } from "react-router-dom"
import Can from '../common/Can'
import axios from "axios"
import { connect } from "react-redux"
import classnames from "classnames"
import Swal from "sweetalert2"
import moment from "moment"
import Select from "../common/Select"
import $ from "jquery"
import ModalAdd from "./ModalAdd"
import ModalEdit from "./ModalEdit"
import Navbar from "../layout/Navbar"
import Left from "../layout/LeftMenu"
import _ from "lodash"

class ChuongTrinhGoiKhachHang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadding: false,
      data: [],
      campaigns: "",
      select: null,
      stores: [],
      cards: [],
      modalAdd: {},
      modalEdit: {},
      provinces: "",
    }
  }

  componentDidMount() {
    this.getStores()
    this.getCampaignsData()
    this.getCards()
  }

  componentDidUpdate() {
    console.log(this.state.modalEdit);
    if (!this.state.loadding) {
      window.stop_preloader()
    } else {
      window.start_preloader()
    }
  }

  getCampaignsData = async () => {
    this.setState({
      loadding: true,
    })
    await axios
      .get(global.uri + `/admin/calls`)
      .then((res) => {
        this.setState({
          campaigns: res.data.payload,
          loadding: false
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.props.history.push('/login')
        }
        console.log(err.response.data)
      })
  }

  getStores = () => {
    axios
      .get(global.uri + `/admin/stores/getAll`)
      .then((res) => {
        this.setState({
          stores: res.data.payload,
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.props.history.push('/login')
        }
        console.log(err.response.data)
      })
  }

  getCards = () => {
    axios
      .get(global.uri + `/admin/calls/card`)
      .then((res) => {
        // const newArrayOfObj = res.data.payload.map(
        //   ({ id: value, name: label }) => ({
        //     value,
        //     label,
        //   })
        // )
        this.setState({
          cards: res.data.payload,
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.props.history.push('/login')
        }
        console.log(err.response.data)
      })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

  setSelect = (select) => {
    this.setState({ select: select })
  }

  cardName = (itemCondition) => {
    const {cards} = this.state
    cards.map((card, index) => {
      if(itemCondition === card.id) {
        return card.name
      }
    })
  }

  renderCondition = (itemCondition) => {
    switch (itemCondition.key) {
      case "age":
        return (
          <p>
            Tuổi {itemCondition.type} {itemCondition.value}
          </p>
        )
      case "sex":
        return (
          <p>
            Giới tính: {itemCondition.value === "nam" ? "nam" : "nữ"}
          </p>
        )
      case "bill":
        return (
          <p>
            Giá trị Bill {itemCondition.type} {this.numberWithCommas(itemCondition.value)}đ
          </p>
        )
      case "job":
        switch (itemCondition.value) {
          case "1": 
            return <p>Nghề nghiệp: Học sinh / Sinh viên</p>
          case "2":
            return <p>Nghề nghiệp: Nhân viên văn phòng</p>
          case "3": 
            return <p>Nghề nghiệp: Kinh doanh</p>
          case "4":
            return <p>Nghề nghiệp: Giáo viên</p>
          case "5": 
            return <p>Nghề nghiệp: Khác</p>
          default:
            return null
        }
      case "card":
        switch (itemCondition.value.toString()) {
          case "1": 
            return <p>Loại thẻ: Thẻ thành viên 10%</p>
          case "2":
            return <p>Loại thẻ: Khách hàng tích điểm CRM</p>
          case "3": 
            return <p>Loại thẻ: Thẻ VIP 20%</p>
          case "4":
            return <p>Loại thẻ: Thẻ nhân viên Space 10%</p>
          case "5": 
            return <p>Loại thẻ: Chính quyền 100%</p>
          case "6":
            return <p>Loại thẻ: Thẻ thành viên 5%</p>
          case "7": 
            return <p>Loại thẻ: Sai số</p>
          case "8":
            return <p>Loại thẻ: Thẻ VIP 10%</p>
          case "9":
            return <p>Loại thẻ: Thẻ VIP 50%</p>
          default:
            return null
        }
        // return <p>Loại thẻ: {itemConditionValue}</p>
      case "ward":
        return <p>Thành phố: {itemCondition.value}</p>
      case "district":
        return <p>Quận: {itemCondition.value}</p>
      default:
        return null
    }
  }

  renderData = () => {
    const { campaigns } = this.state
    console.log(campaigns);
    return (
      campaigns && campaigns.map((item, key) => (
        <tr key={key}>
          <td>{key + 1}</td>
          <td>{item.promotions}</td>
          <td>
            {item.condition && item.condition.map((itemCondition, index) => (
                <span key={index}>{this.renderCondition(itemCondition)}</span>
              ))}
          </td>
          <td>{item.storeName}</td>
          <td>{(moment(item.date).format('DD/MM/YYYY'))}</td>
          <td>{item.nDay}</td>
          <td>{item.nCustomer}</td>
          <td>
            <Can I="update" this="chuong-trinh-goi-khach-hang">
            <button
              className="btn btn-success btn-xs"
              title="Edit"
              data-toggle="modal"
              data-target="#modal-edit"            
              onClick={() => this.renderModalEdit(key)}
            >
              <i className="hvr-buzz-out fa fa-pencil"></i>
            </button>
            </Can>
            <Can I="delete" this="chuong-trinh-goi-khach-hang">
            <button
              className="btn btn-danger btn-xs m-l-5"
              data-toggle="tooltip"
              data-placement="right"
              title="Delete"
              onClick={() => this.onDeleteItem(item.id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
            </Can>
          </td>
        </tr>
      ))
    )
  }

  renderModalEdit = (key) => {
    const {stores} = this.state
    const modalEdit = this.state.campaigns[key]
    console.log(stores);
    stores.map((store, id) => {
      if(store.storeName == modalEdit.storeName){
        const storeCode = store.storeCode
        this.setState({
          storeCode: storeCode
        })
      }
    })
    if(modalEdit.storeName == "Tất cả chi nhánh"){
      this.setState({
        all_chi_nhanh: true
      })
    }

    this.setState({
      modalEdit: modalEdit,
    })
    
  }

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.storeCode} data-tokens={item.storeCode}>
          {item.storeName}
        </option>
      )
    })
  }

  onSelectChange = (e) => {
    const { modalAdd } = this.state
    const payload = {
      ...modalAdd,
      [e[0].name]: e.val(),
    }
    this.setState({
      modalAdd: payload,
    })
  }

  onInputChange = (e) => {
    e.preventDefault()
    const { modalAdd } = this.state
    const payload = {
      ...modalAdd,
      [e.target.name]: e.target.value,
    }
    this.setState({
      modalAdd: payload,
    })
  }

  onDeleteItem = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa?",
      text: "Bạn có chắc muốn xóa dữ liệu này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Delete isConfirmed', id);
        try {
          let data = {
            idList: id
          }
          const config = {
            method: "post",
            url: global.uri + "/admin/calls/delete",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          }
      
          axios(config)
            .then((response) => {
              console.log(response);
              Swal.fire("Đã xóa!", "", "success")
              this.getCampaignsData()
            })
            .catch(function (error) {
              if(error.response.status === 401) {
                this.props.history.push('/login')
              }
              // console.log(error)
            })
          // const res = await axios.delete(
          //   global.uri + `/admin/calls/delete/${id}`
          // )
          // Swal.fire("Đã xóa!", "", "success")
          // this.getCampaignsData()
        } catch (err) {
          console.log(err.response)
          if(err.response.status === 401) {
            this.props.history.push('/login')
          }
        }
      }
    })
  }

  handleModalAdd = () => {
    this.setState({
      loadding: true
    })
    this.getCampaignsData()
  }

  render() {
    const { pathname } = this.props.location
    const { data, stores } = this.state
    const { campaigns } = this.state

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />
        <div id="page-wrapper">
          <div className="content">
            <div className="content-header">
              <div className="header-icon">
                <i className="pe-7s-box1"></i>
              </div>
              <div className="header-title">
                <h1>Chương Trình Gọi Khách Hàng</h1>
                <small>Hiển thị thông tin liên quan đến chương trình. </small>

                <ol className="breadcrumb">
                  <li className="active">
                    <i className="pe-7s-home"></i> Thông tin chương trình
                  </li>
                </ol>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-bd lobidrag">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="panel-title">
                          {/* <h4>Chi nhánh (17)</h4> */}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <Can I="create" this="chuong-trinh-goi-khach-hang">
                          <button
                            type="button"
                            className="btn btn-success btn-rounded w-md m-b-5 f-r"
                            data-toggle="modal"
                            data-target="#modal-add"
                          >
                            Thêm{" "}
                            <i
                              className="hvr-buzz-out pe-7s-plus"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </button>
                          </Can>
                        {/* ModalAdd Popup */}
                        <ModalAdd
                          stores={stores}
                          handleModalAdd={this.handleModalAdd}
                        />
                        {/* End ModalAdd Popup */}

                        <ModalEdit
                          dataEdit={this.state.modalEdit}
                          stores={stores}
                          storeCode={this.state.storeCode}
                          all_chi_nhanh={this.state.all_chi_nhanh}
                          handleModalAdd={this.handleModalAdd}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="panel-body">
                    <div className="table-responsive">
                      <table
                        id="data"
                        className="table table-bordered table-striped table-hover"
                      >
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Tên chương trình</th>
                            <th>Điều kiện</th>
                            <th>Chi nhánh áp dụng</th>
                            <th>Ngày áp dụng</th>
                            <th>Số ngày áp dụng</th>
                            <th>Tổng lượng khách hàng cần gọi</th>
                            <th>Thao tác</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>STT</th>
                            <th>Tên chương trình</th>
                            <th>Điều kiện</th>
                            <th>Chi nhánh áp dụng</th>
                            <th>Ngày áp dụng</th>
                            <th>Số ngày áp dụng</th>
                            <th>Tổng lượng khách hàng cần gọi</th>
                            <th>Thao tác</th>
                          </tr>
                        </tfoot>
                        <tbody>{this.renderData()}</tbody>
                      </table>
                    </div>
                    {/* ModalEdit Popup */}
                    
                    {/* <ModalEdit
                      data={this.state.modalEdit}
                      stores={stores}
                      // handleModalEdit={this.getData}
                      // provinces={this.state.provinces}
                    /> */}
                    
                    {/* End ModalEdit Popup */}
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

// const mapStateToProps = (state) => ({
//   user: state.user
// });

export default ChuongTrinhGoiKhachHang
