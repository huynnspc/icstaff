import React, { Component } from "react"
import axios from "axios"
import moment from "moment"
import {Redirect} from "react-router-dom";
import validator from "validator"
import NumberFormat from "react-number-format"
import Select from "../common/Select"
import DK_Loc from "./DK_Loc"
import qs from "qs"
import $ from "jquery"
export default class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: null,
      all_chi_nhanh: false,
      selectDisabled: false,
      modalAdd: {},
      call_name: "",
      cuahang_id: "",
      dk_loc: [],
      dk_loc_submit: [],
      filterNum: "",
      filterData: "",
      date_count: "",
      date_start: "",
      filterParams: "",
      waitPostCampaigns: false,
      date_filter_start: moment().subtract(2, "years").format("YYYY-MM-DD"),
      date_filter_end: moment().format("YYYY-MM-DD"),
    }
    this.call_name = React.createRef()
  }

  componentDidMount() {}

  componentDidUpdate() {
    // console.log('this state i_agree: ',this.state.all_chi_nhanh);
    // console.log('modalAdd this.state.modalAdd: ',this.state.modalAdd);
    // console.log("ModalAdd this.state.dk_loc: ", this.state.dk_loc)
    // console.log('ModalAdd this.state.dk_loc_submit: ', this.state.dk_loc_submit);
    // console.log(this.state);
  }

  setSelect = (select) => {
    this.setState({ select: select })
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
      [e[0].name]: e.val(),
    })

    // window.select2reload(this.state.select, e.val());
  }

  onDateTimeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onInputChange = (e) => {
    const { modalAdd } = this.state
    const payload = {
      ...modalAdd,
      [e.target.name]: e.target.value,
    }
    this.setState({
      modalAdd: payload,
      [e.target.name]: e.target.value
    })
  }

  onCheckboxChange = (e) => {
    const { modalAdd } = this.state
    const payload = {
      ...modalAdd,
      [e.target.name]: e.target.checked,
    }
    this.setState({
      modalAdd: payload,
      [e.target.name]: e.target.checked,
    })
  }

  resetForm = () => {
    this.setState({
      modalAdd: {},
      cuahang_id: "",
      all_chi_nhanh: false,
      date_count: '',
      date_start: '',
      call_name: '',
      filterNum: ''
    })

    window.select2reload(this.state.select, '');
  }

  // loadingStatus = () => {
    
  // }

  hideModal = () => {
    // alert("Cập nhật thành công")
    $("#modal-add .btn-danger").click()
    // window.location.reload()
    // this.props.loadingStatus('Loading')
    this.props.handleModalAdd()
  }

  customersCount  = () => {
    const date_count = this.state.modalAdd.date_count
    const total_customers = this.state.filterNum
    let customers_count = null
    if(date_count) {
      customers_count = Math.floor(total_customers / date_count)
      return (
        <span style={{ fontSize: "10px", float: "right" }}>
          {customers_count} khách / 1 ngày
        </span>
      )
    }else{
      return ('')
    }
    
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ waitPostCampaigns: true })
    let storeCode = this.state.modalAdd.cuahang_id

    let mobileList = this.state.filterData
    let condition = JSON.stringify(this.state.filterParams)

    // console.log('mobileList: ', mobileList);
    // console.log('condition: ', condition);

    let data = {
      promotions: this.state.modalAdd.call_name,
      mobileList: JSON.stringify(this.state.filterData),
      startAt: this.state.modalAdd.date_start,
      nDay: this.state.modalAdd.date_count,
      condition: JSON.stringify(this.state.filterParams),
    }

    if (this.state.all_chi_nhanh !== true ) {
      data = {
        ...data,
        storeCode: storeCode
      }
    }else{
      data = {...data}
    }


    console.log(' Submit: ',data);

    // let data = {
    //   promotions: this.state.modalAdd.call_name,
    //   storeCode: storeCode,
    //   mobileList: mobileList,
    //   startAt: this.state.modalAdd.date_start,
    //   nDay: this.state.modalAdd.date_count,
    //   condition: condition,
    // }

    const config = {
      method: "post",
      url: global.uri + "/admin/calls/add",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    }
    this.resetForm()
    this.hideModal()

    axios(config)
      .then((response) => {
        // console.log(response)
        this.resetForm()
        this.hideModal()
      })
      .catch(function (error) {
        if(error.response.status === 401) {
          this.props.history.push('/login')
        }
        // console.log(error)
      })
  }

  render_DK_Loc = () => {
    const { dk_loc } = this.state
    if (dk_loc) {
      return dk_loc.map((item, index) => {
        return (
          <DK_Loc
            key={index}
            position={index}
            data={item}
            onChange={this.OnChange_DK_Loc}
            onDelete={this.OnDelete_DK_Loc}
          />
        )
      })
    }
  }

  OnChange_DK_Loc = (payload, position) => {
    const { dk_loc, dk_loc_submit } = this.state
    // if(payload.gia_tri_loc.value == "bill"){
    //   payload.dieu_kien_loc = {
    //     { value: '3', label: '= Bằng' }
    //   }
    // }

    dk_loc.map((item, index) => {
      if (index == position) {
        item = Object.assign(item, payload)
        // if(item.gia_tri_loc.value == "bill"){
        //   item.dieu_kien_loc = { value: '3', label: '= Bằng' }
        // }
        item.key = payload.gia_tri_loc.value
        if (payload.gia_tri_loc.value == "gender") {
          item.type = "2"
        } else {
          item.type = payload.dieu_kien_loc.value
        }

        if (payload.value) {
          item.value = payload.value
        }

        return item
      }
    })

    // dk_loc_submit.map((item2, index) => {
    //   if(index == position){
    //     item2.key = payload.gia_tri_loc.value
    //     item2.type = payload.dieu_kien_loc.value
    //     item2.value = payload.value
    //     return item2
    //   }
    // })

    this.setState({
      dk_loc: dk_loc,
      // dk_loc_submit
    })
  }

  OnDelete_DK_Loc = (position) => {
    var { dk_loc, dk_loc_submit } = this.state
    dk_loc.splice(position, 1)
    dk_loc_submit.splice(position, 1)
    console.log(dk_loc)
    this.setState({
      dk_loc: dk_loc,
      dk_loc_submit: dk_loc_submit,
    })
  }

  them_dieu_kien_loc = () => {
    const { dk_loc, dk_loc_submit } = this.state
    dk_loc.push({
      gia_tri_loc: { value: "0", label: "Giá trị lọc" },
      dieu_kien_loc: { value: "0", label: "Điều kiện lọc" },
    })
    dk_loc_submit.push({})
    this.setState({
      dk_loc,
      dk_loc_submit,
    })
  }

  onSubmit_DK_Loc = () => {
    const params = new URLSearchParams()
    const condition = { 1: "<=", 2: ">=", 3: "=", 4: ">", 5: "<" }
    let filterParams = []

    this.state.dk_loc.forEach((item, index) => {
      switch (item.gia_tri_loc.value) {
        case "gender":
          let gender = {
            key: "sex",
            type: condition[item.dieu_kien_loc.value],
            value: item.gioi_tinh.label.toLowerCase() === "nữ" ? "nữ" : "nam",
          }
          filterParams.push(gender)
          break
        case "age":
          let age = {
            key: item.gia_tri_loc.value,
            type: condition[item.dieu_kien_loc.value],
            value: item.age,
          }
          filterParams.push(age)
          break
        case "bill":
          let bill = {
            key: "bill",
            type: condition[item.dieu_kien_loc.value],
            value: item.bill,
            // startAt: this.state.date_filter_start,
            // endAt: this.state.date_filter_end
          }
          filterParams.push(bill)
          break
        case "card":
          let card = {
            key: item.gia_tri_loc.value,
            type: condition[item.dieu_kien_loc.value],
            value: item.card.value,
          }
          filterParams.push(card)
          break
        case "career":
          let career = {
            key: "job",
            type: condition[item.dieu_kien_loc.value],
            value: item.job.value,
          }
          filterParams.push(career)
          break
        case "location":
          let ward = {
            key: "ward",
            type: condition[item.dieu_kien_loc.value],
            value: item.ward.label,
          }
          filterParams.push(ward)
          if (item?.district) {
            let district = {
              key: "district",
              type: condition[item.dieu_kien_loc.value],
              value: item.district.label,
            }
            filterParams.push(district)
          }

          break
        default:
          break
      }
    })

    //params.append("q")
    this.setState({ filterParams: filterParams })
    // let data = qs.stringify({
    //   q: JSON.stringify(filterParams),
    //   startAt: this.state.date_filter_start,
    //   endAt: this.state.date_filter_end,
    // })

    // let data = {}

    // filterParams.map((item, index) => {
    //   if(item.key === 'bill'){
    //     // console.log('co bill');
    //     data = {
    //       q: JSON.stringify(filterParams)
    //     }
    //     // console.log('data co bill: ',data);
    //   }else{
    //     data = {
    //       q: JSON.stringify(filterParams),
    //       startAt: this.state.date_filter_start,
    //       endAt: this.state.date_filter_end,
    //     }
    //     // console.log('data khong bill: ', data);
    //   }
    // })

    let data = {
      q: JSON.stringify(filterParams),
      startAt: this.state.date_filter_start,
      endAt: this.state.date_filter_end,
    }

    console.log('DK Loc: ',data);

    const config = {
      method: "post",
      url: global.uri + "/admin/calls/getPhoneNumber",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    axios(config)
      .then((response) => {
        // console.log('response: ',response);
        this.setState({ filterNum: response.data.payload.nMobile })
        this.setState({ filterData: response.data.payload.mobiles })
      })
      .catch(function (error) {
        if(error.response.status === 401) {
          this.props.history.push('/login')
        }
        // console.log(error)
      })
  }

  render() {
    const { stores } = this.props
    const {
      modalAdd,
      all_chi_nhanh,
      cuahang_id,
      call_name,
      date_count,
      date_start
    } = this.state

    return  (
      <div className="modal fade" id="modal-add" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <form onSubmit={this.onSubmit}>
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Chương trình gọi khách hàng</h4>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label className="control-label">Tên chương trình</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên chương trình"
                      name="call_name"
                      value={call_name}
                      onChange={this.onInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row skin-flat">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Chi nhánh</label>
                    <Select
                      id="chi_nhanh"
                      className="form-control"
                      name="cuahang_id"
                      placeholder="Chọn chi nhánh"
                      data={stores}
                      value={modalAdd && modalAdd.cuahang_id}
                      onChange={this.onSelectChange}
                      setSelect={this.setSelect}
                      renderOption={this.renderOption}
                      disabled={all_chi_nhanh && all_chi_nhanh}
                      parent="wrapper"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label"></label>
                    <div className="i-check">
                      <input
                        type="checkbox"
                        id="flat-checkbox-1"
                        ref="all_chi_nhanh"
                        name="all_chi_nhanh"
                        onChange={this.onCheckboxChange}
                        checked={all_chi_nhanh}
                      />
                      <label className="control-label m-l-5">
                        Tất cả chi nhánh
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row skin-flat">
                  <div className="form-group col-sm-12"><label className="control-label">Thời gian khách đến ICOOL</label></div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">Từ ngày</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Lọc từ ngày"
                      name="date_filter_start"
                      value={this.state.date_filter_start}
                      onChange={this.onDateTimeChange}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">Đến ngày</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Lọc đến ngày"
                      name="date_filter_end"
                      value={this.state.date_filter_end}
                      onChange={this.onDateTimeChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Điều kiện lọc khách</label>
                  </div>

                  <div className="form-group col-sm-6">
                    <button
                      type="button"
                      className="btn btn-success btn-circle m-b-5 f-r"
                      style={{ paddingTop: "3px" }}
                      onClick={this.them_dieu_kien_loc}
                    >
                      <i
                        className="hvr-buzz-out pe-7s-plus"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-12">
                    {/* <form onSubmit={this.onSubmit_DK_Loc}> */}
                    {this.render_DK_Loc()}
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-success btn-rounded m-b-5 m-l-5"
                        style={{ paddingTop: "3px" }}
                        onClick={this.onSubmit_DK_Loc}
                      >
                        Cập nhật
                        {/* <i className="hvr-buzz-out pe-7s-plus" style={{ fontSize: "24px" }}></i> */}
                      </button>
                    </div>
                    {/* </form> */}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-6">
                    <span>
                      Số khách lọc ra được: {this.state.filterNum} khách hàng
                    </span>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <div>
                      <span>Số ngày chạy chương trình</span>
                      {this.customersCount()}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Số ngày chạy chương trình"
                      name="date_count"
                      value={date_count}
                      onChange={this.onInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <span>Ngày bắt đầu chạy</span>
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Ngày bắt đầu chạy"
                      name="date_start"
                      value={date_start}
                      onChange={this.onInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-success">
                  Áp dụng
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
