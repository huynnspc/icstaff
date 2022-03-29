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
export default class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: null,
      all_chi_nhanh: false,
      selectDisabled: false,
      modalAdd: {},
      modalEdit: {},
      storeCode: "",
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

  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.dataEdit!==prevState.modalEdit){
      return { 
        modalEdit: nextProps.dataEdit,
        // all_chi_nhanh: nextProps.all_chi_nhanh
      };
    }
    
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const dataEdit = this.props.dataEdit
    const storeCode = this.props.storeCode
    const all_chi_nhanh = this.props.all_chi_nhanh

    console.log('modalEdit Props: ',this.props);

    if(prevProps.dataEdit!==this.props.dataEdit){
      window.select2reload("#chi_nhanh_edit", storeCode);
      
      this.conditionsData(this.props.dataEdit.condition)
      //Perform some operation here
      this.setState({
        modalEdit: dataEdit,
        storeCode: storeCode,
        all_chi_nhanh: all_chi_nhanh,
      })
    }
    console.log('modalEdit State: ', this.state);
  }

  conditionsData = (condition) => {
      let conditions = {}
      let dk = []
      condition && condition.map( async (item, index) => {
        switch (item.key) {
          case "age":
            conditions = Object.assign({
              gia_tri_loc: {value: 'age', label: 'Độ tuổi'},
              key: "age",
              age: item.value,
              type: item.type
            })
            switch (item.type){
              case "<=":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "1", label: "<= Nhỏ hơn, bằng" },
                })
              break
              case ">=":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "2", label: ">= Lớn hơn, bằng" },
                })
              break
              case "=":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "3", label: "= Bằng" },
                })
              break
              case ">":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: {value: '4', label: '> Lớn hơn'},
                })
              break
              case "<":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "5", label: "< Nhỏ hơn" },
                })
              break
            }

            dk.push(conditions)
            this.setState({
              conditions,
              dk,
              dk_loc: dk
            })
          break

          case "sex":
            conditions = Object.assign({
              gia_tri_loc: {value: 'gender', label: 'Giới tính'},
              dieu_kien_loc: {value: '3', label: '= Bằng'},
              key: "gender",
              type: item.type
            })
            switch (item.value){
              case "nam":
                conditions = Object.assign({
                  ...conditions,
                  gioi_tinh: {value: '2', label: 'Nam'},
                })
              break
              case "nữ":
                conditions = Object.assign({
                  ...conditions,
                  gioi_tinh: {value: '1', label: 'Nữ'},
                })
              break
            }
              
            dk.push(conditions)
            this.setState({
              conditions,
              dk,
              dk_loc: dk
            })
          break
          case "bill":
            conditions = Object.assign({
              gia_tri_loc: {value: 'bill', label: 'Giá trị bill'},
              key: "bill",
              bill: item.value,
              type: item.type
            })
            switch (item.type){
              case "<=":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "1", label: "<= Nhỏ hơn, bằng" },
                })
              break
              case ">=":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "2", label: ">= Lớn hơn, bằng" },
                })
              break
              case "=":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "3", label: "= Bằng" },
                })
              break
              case ">":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: {value: '4', label: '> Lớn hơn'},
                })
              break
              case "<":
                conditions = Object.assign({
                  ...conditions,
                  dieu_kien_loc: { value: "5", label: "< Nhỏ hơn" },
                })
              break
            }
              
            dk.push(conditions)
            this.setState({
              conditions,
              dk,
              dk_loc: dk
            })
          break
          case "card":
            conditions = Object.assign({
              gia_tri_loc: {value: 'card', label: 'Loại thẻ'},
              dieu_kien_loc: { value: "3", label: "= Bằng" },
              key: "card",
              type: "3"
            })
            switch (item.value.toString()){
              case '1':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '1', label: 'Thẻ thành viên 10%'},
                })
              break
              case '2':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '2', label: 'Khách hàng tích điểm CRM'},
                })
              break
              case '3':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '3', label: 'Thẻ VIP 20%'},
                })
              break
              case '4':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '4', label: 'Thẻ nhân viên Space 10%'}
                })
              break
              case '5':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '5', label: 'Chính quyền 100%'},
                })
              break
              case '6':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '6', label: 'Thẻ thành viên 5%'},
                })
              break
              case '7':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '7', label: 'Sai số'},
                })
              break
              case '8':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '8', label: 'Thẻ VIP 10%'},
                })
              break
              case '9':
                conditions = Object.assign({
                  ...conditions,
                  card: {value: '9', label: 'Thẻ VIP 50%'},
                })
              break
            }
              
            dk.push(conditions)
            this.setState({
              conditions,
              dk,
              dk_loc: dk
            })
          break
          case "job":
            conditions = Object.assign({
              gia_tri_loc: {value: 'career', label: 'Nghề nghiệp'},
              dieu_kien_loc: { value: "3", label: "= Bằng" },
              key: "career",
              type: "3"
            })
            switch (item.value.toString()) {
              case '1': 
                conditions = Object.assign({
                  ...conditions,
                  job: {value: '1', label: 'Học sinh / Sinh viên'},
                })
                break
              case '2':
                conditions = Object.assign({
                  ...conditions,
                  job: {value: '2', label: 'Nhân viên văn phòng'},
                })
                break
              case '3': 
                conditions = Object.assign({
                  ...conditions,
                  job: {value: '3', label: 'Kinh doanh'},
                })
                break
              case '4':
                conditions = Object.assign({
                  ...conditions,
                  job: {value: '4', label: 'Giáo viên'},
                })
                break
              case '5': 
                conditions = Object.assign({
                  ...conditions,
                  job: {value: '5', label: 'Khác'},
                })
                break
            }

          dk.push(conditions)
          this.setState({
            conditions,
            dk,
            dk_loc: dk
          })
          break
          case "ward":
            await this.getProvince(item.value)
            await this.getDistrict(this.state.ward, this.state.district)

            console.log(this.state);
            conditions = Object.assign({
              gia_tri_loc: {value: 'location', label: 'Địa điểm'},
              dieu_kien_loc: { value: "3", label: "= Bằng" },
              key: "location",
              type: "3",
              ward: this.state.ward,
              district: this.state.district
            })

          dk.push(conditions)
          this.setState({
            conditions,
            dk,
            dk_loc: dk
          })
          break
          case "district":
            console.log(item);
            console.log(this.state);
            // this.state.ward && this.getDistrict(this.state.ward, item)
            conditions = Object.assign({
              gia_tri_loc: {value: 'location', label: 'Địa điểm'},
              dieu_kien_loc: { value: "3", label: "= Bằng" },
              key: "location",
              type: "3",
              district: item
            })

            console.log(conditions);

          // dk.push(conditions)
          this.setState({
            district: item
            // dk,
            // dk_loc: dk
          })
          break
        }
      })
  }

  getProvince = async (itemvalue) => {
    console.log(itemvalue);
    await axios
      .get(global.uri + `/admin/calls/provinces`)
      .then((res) => {
        const newArrayOfObj = res.data.payload.map(
          ({ id: value, name: label }) => ({ value, label })
        )
        newArrayOfObj.map((item, index) => {
          if(item.label == itemvalue){
            this.setState({
              ward: item
            })
            // this.getDistrict(item.value)
          }
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setState({redirect: true})
        }
        // console.log(err.response.status)
      })
  }

  getDistrict = async (ward, district) => {
    if(ward) {
      await axios
      .get(global.uri + `/admin/calls/district/${ward.value}`)
      .then((res) => {
        const newArrayOfObj = res.data.payload.map(
          ({ id: value, name: label }) => ({
            value,
            label,
          })
        )
        console.log(newArrayOfObj);
        newArrayOfObj && newArrayOfObj.map((item, index) => {
          if(item.label == district.value){
            console.log(item);
            this.setState({
              district: item
            })
          }
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setState({redirect: true})
        }
        // console.log(err.response.status)
      })
    }
    
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
    const { modalEdit } = this.state
    const payload = {
      ...modalEdit,
      [e.target.name]: e.target.value,
    }
    this.setState({
      modalEdit: payload,
      [e.target.name]: e.target.value
    })
  }

  onCheckboxChange = (e) => {
    const { modalEdit } = this.state
    console.log(e.target.checked);
    const payload = {
      ...modalEdit,
      [e.target.name]: e.target.checked,
    }
    this.setState({
      modalEdit: payload,
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
      call_name: ''
    })

    window.select2reload(this.state.select, '');
  }

  // loadingStatus = () => {
    
  // }

  hideModal = () => {
    // alert("Cập nhật thành công")
    $("#modal-edit .btn-danger").click()
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
      promotions: this.state.modalEdit.promotions,
      mobileList: JSON.stringify(this.state.filterData),
      startAt: this.state.modalEdit.date,
      nDay: this.state.modalEdit.nDay,
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

    console.log('render_DK_Loc: ',dk_loc);
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

  them_dieu_kien_loc = (value) => {
    const { dk_loc, dk_loc_submit } = this.state
    dk_loc.push({
      gia_tri_loc: { value: value, label: "Giá trị lọc" },
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

  setStoreId = () => {
    const stores = this.props.stores
    console.log(stores);
    console.log(this.props.storeCode);

    // stores.map((store, index) => {
    //   if(store.storeName == this.props.dataEdit.storeName){
    //     console.log(store.storeCode);
    //     const storeCode = store.storeCode
    //     // this.setState({
    //     //   storeCode: storeCode
    //     // })
    //     return store.storeCode
    //   }
    // })
  }

  render() {
    const { stores, dataEdit } = this.props
    const {
      modalAdd,
      modalEdit,
      storeCode,
      all_chi_nhanh,
      cuahang_id,
      call_name,
      date_count,
      date_start
    } = this.state

    return  (
      <div className="modal fade" id="modal-edit" role="dialog">
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
                      value={modalEdit.promotions || ''}
                      onChange={this.onInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="row skin-flat">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Chi nhánh</label>
                    <Select
                      id="chi_nhanh_edit"
                      className="form-control"
                      name="cuahang_id"
                      placeholder="Chọn chi nhánh"
                      data={stores}
                      value={this.state.storeCode || ''}
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
                        checked={all_chi_nhanh && all_chi_nhanh}
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
                      value={modalEdit && modalEdit.nDay}
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
                      value={moment(modalEdit.date).format('YYYY-MM-DD')}
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
