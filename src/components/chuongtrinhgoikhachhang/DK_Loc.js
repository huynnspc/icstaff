import React, { Component } from "react"
import axios from "axios"
import {Redirect} from "react-router-dom";
// import Select from "../common/Select";
import Select from "react-select"
import DK_Ket_Hop from "./DK_Ket_Hop"
import {
  Gia_Tri_Loc,
  Dieu_Kien_Loc,
  Loai_Ket_Hop,
  Gioi_Tinh,
  Loai_The,
  Nghe_Nghiep,
  Thanh_pho,
  Quan,
} from "./Common"
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

export default class DK_Loc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: null,
      dk_loc: {},
      dk_ket_hop: [],
      jobs: [],
      cards: [],
      provinces: "",
      district: "",
      currentDistrict: "",
    }
    this.myRef = React.createRef()
  }

  componentDidMount() {
    this.getProvince()
    this.getJobs()
    this.getCards()
  }

  componentWillReceiveProps(prevProps, nextProps) {
    // console.log("prevProps", prevProps.data)
    // console.log("this.props", this.props.data)
    if (this.props.data != this.state.dk_loc) {
      this.setState({
        dk_loc: this.props.data,
      })
    }

    // if(prevProps.data.gia_tri_loc.value == "bill"){
    //   const payload = {
    //     ...this.state.dk_loc,
    //     dieu_kien_loc: { value: '3', label: '= Bằng' }
    //   }
    //   console.log(payload);
    //   // this.props.onChange(payload)
    //   this.setState({
    //     dk_loc: payload
    //   })
    // }
  }

  componentDidUpdate() {
    // console.log('this.state.dk_loc',this.state.dk_loc);
    // console.log('this.state.dk_ket_hop',this.state.dk_ket_hop);
    // console.log('this.props', this.props.data)
    // console.log('this.state.jobs: ',this.state.jobs)
    // console.log('this.state.cards: ',this.state.cards)
  }

  getProvince = async () => {
    await axios
      .get(global.uri + `/admin/calls/provinces`)
      .then((res) => {
        console.log(this.props);
        const newArrayOfObj = res.data.payload.map(
          ({ id: value, name: label }) => ({
            value,
            label,
          })
        )
        this.setState({
          provinces: newArrayOfObj,
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setState({redirect: true})
        }
        // console.log(err.response.status)
      })
  }

  getDistrict = (id) => {
    axios
      .get(global.uri + `/admin/calls/district/${id}`)
      .then((res) => {
        const newArrayOfObj = res.data.payload.map(
          ({ id: value, name: label }) => ({
            value,
            label,
          })
        )
        this.setState({
          district: newArrayOfObj,
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setState({redirect: true})
        }
        // console.log(err.response.status)
      })
  }

  getJobs = () => {
    axios
      .get(global.uri + `/admin/calls/job`)
      .then((res) => {
        const newArrayOfObj = res.data.payload.map(
          ({ id: value, name: label }) => ({
            value,
            label,
          })
        )
        this.setState({
          jobs: newArrayOfObj,
        })
      })
      .catch((err) => {
        // console.log(err.response.data)
      })
  }

  getCards = () => {
    axios
      .get(global.uri + `/admin/calls/card`)
      .then((res) => {
        const newArrayOfObj = res.data.payload.map(
          ({ id: value, name: label }) => ({
            value,
            label,
          })
        )
        this.setState({
          cards: newArrayOfObj,
        })
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setState({redirect: true})
        }
        // console.log(err.response.data)
      })
  }

  setSelect = (select) => {
    this.setState({
      select: select,
    })
  }

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.id} data-tokens={item.id}>
          {item.name}
        </option>
      )
    })
  }

  onSelectChange = (e) => {
    const { dk_loc } = this.state
    const payload = {
      ...dk_loc,
      [e[0].name]: e.val(),
    }
    this.setState({
      dk_loc: payload,
      [e[0].name]: e.val(),
    })
  }

  onInputChange = (e) => {
    const { dk_loc } = this.state
    const { data } = this.props
    const payload = {
      ...data,
      [e.target.name]: e.target.value,
    }
    this.setState({
      dk_loc: payload,
      // [e.target.name]: e.target.value,
    })
    this.props.onChange(payload, this.props.position)
  }

  renderInput = () => {
    const { dk_loc } = this.state
    const { data } = this.props

    // console.log('renderInput dk_loc: ',dk_loc.ward);
    // console.log(this.state.provinces);

    // const {provinces} = this.state
    // const ward = dk_loc.ward
    // // console.log(ward && ward.value);
    // provinces && provinces.map((item, index) => {
    //   // console.log(item.label);
    //   ward && console.log(ward.value);
    //   if(ward){
    //     if(ward.value === item.label){
    //     // console.log(item);
    //     this.setState({
    //       ...dk_loc, 
    //       ward: item
    //     })
    //   }}
    // })
    

    if (data.gia_tri_loc) {
      switch (data.gia_tri_loc.value) {
        case "bill":
          return (
            <input
              type="number"
              className="form-control"
              placeholder="Giá trị bill"
              name="bill"
              onChange={this.onInputChange}
              required
              value={data.bill || ""}
            />
          )
          break
        case "age":
          return (
            <input
              type="number"
              className="form-control"
              placeholder="Độ tuổi"
              name="age"
              onChange={this.onInputChange}
              required
              value={data.age || ""}
              min="5"
            />
          )
          break
        case "gender":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Giới tính"
              styles={colourStyles}
              onChange={this.handleChange}
              name="gioi_tinh"
              options={Gioi_Tinh}
              value={data.gioi_tinh || ""}
            />
          )
          break
        case "card":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Loại thẻ"
              styles={colourStyles}
              onChange={this.handleChange}
              name="card"
              options={this.state.cards}
              value={data.card || ""}
            />
          )
          break
        case "career":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Nghề nghiệp"
              styles={colourStyles}
              onChange={this.handleChange}
              name="job"
              options={this.state.jobs}
              value={data.job || ""}
            />
          )
          break
        case "location":
          return (
            <>
              <Select
                className="basic-single form-group"
                classNamePrefix="select"
                placeholder="Thành phố"
                styles={colourStyles}
                onChange={this.handleChange}
                name="ward"
                options={this.state.provinces}
                value={data.ward || ""}
              />
              <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder="Quận"
                styles={colourStyles}
                onChange={this.handleChange}
                name="district"
                options={this.state.district}
                value={data.district || ""}
              />
            </>
          )

        default:
          break
      }
    }
  }

  renderDieuKienLoc = () => {
    const { dk_loc } = this.state
    const { data } = this.props

    if (data.gia_tri_loc) {
      switch (data.gia_tri_loc.value) {
        case "bill":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Điều kiện lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="dieu_kien_loc"
              options={Dieu_Kien_Loc}
              value={data.dieu_kien_loc || ""}
            />
          )
          break
        case "age":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Điều kiện lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="dieu_kien_loc"
              options={Dieu_Kien_Loc}
              value={data.dieu_kien_loc || ""}
            />
          )
          break
        case "gender":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Điều kiện lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="dieu_kien_loc"
              options={[{ value: "3", label: "= Bằng" }]}
              value={{ value: "3", label: "= Bằng" } || ""}
            />
          )
          break
        case "card":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Điều kiện lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="dieu_kien_loc"
              options={[{ value: "3", label: "= Bằng" }]}
              value={{ value: "3", label: "= Bằng" } || ""}
            />
          )
        case "career":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Điều kiện lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="dieu_kien_loc"
              options={[{ value: "3", label: "= Bằng" }]}
              value={{ value: "3", label: "= Bằng" } || ""}
            />
          )
        case "location":
          return (
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Điều kiện lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="dieu_kien_loc"
              options={[{ value: "3", label: "= Bằng" }]}
              value={{ value: "3", label: "= Bằng" } || ""}
            />
          )
        default:
          break
      }
    }
  }

  xoa_dieu_kien_loc = () => {
    this.props.onDelete(this.props.position)
  }

  handleChange = (selectedOption, options) => {
    const { dk_loc } = this.state
    const { data } = this.props
    // console.log('dk_loc handleChange',dk_loc);
    // console.log('data handleChange',data);
    // console.log("selectedOption", selectedOption.value)
    // console.log("options", options.name)

    const payload = {
      ...data,
      [options.name]: selectedOption,
      // selectedOption,
      // options
    }

    if (options.name === "ward") {
      this.getDistrict(selectedOption.value)
    }

    if (
      selectedOption.value === "gender" ||
      selectedOption.value === "card" ||
      selectedOption.value === "career"
    ) {
      payload.dieu_kien_loc = { value: "3", label: "= Bằng" }
    }
    // console.log("payload", payload)
    this.setState({
      dk_loc: payload,
    })
    this.props.onChange(payload, this.props.position)
  }

  render() {
    const { data } = this.props
    if(this.state.redirect){
      return <Redirect to='/login' />
    }else{
      return (
        <div className="row">
          <div className="form-group col-sm-3">
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Giá trị lọc"
              styles={colourStyles}
              onChange={this.handleChange}
              name="gia_tri_loc"
              options={Gia_Tri_Loc}
              value={data.gia_tri_loc}
            />
          </div>
          <div className="form-group col-sm-3">{this.renderDieuKienLoc()}</div>
          <div className="form-group col-sm-3">{this.renderInput()}</div>
          <div className="form-group col-sm-3">
            <button
              type="button"
              className="btn btn-danger btn-circle m-b-5 f-r"
              style={{ paddingTop: "3px", float: "left" }}
              onClick={this.xoa_dieu_kien_loc}
            >
              <i
                className="glyphicon glyphicon-remove"
                style={{ paddingTop: "3px" }}
              ></i>
            </button>
          </div>
        </div>
  
        // {this.render_dk_ket_hop()}
        // <button
        //   type="button"
        //   className="btn btn-success btn-circle m-b-5 f-l"
        //   style={{ paddingTop: "3px" }}
        //   onClick={this.them_dieu_kien_ket_hop}
        // >
        //   <i className="hvr-buzz-out pe-7s-plus" style={{ fontSize: "24px" }}></i>
        // </button>
      )
    }
    
  }
}
