import React, { Component } from "react";
import moment from "moment";
import classnames from 'classnames';
import validator from 'validator';
import Select from "../../../common/Select";
// import Select from 'react-select';
import Swal from "sweetalert2";
import {relationship_list, is_depend_list} from './Common';

export default class Family_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadding: false,
      position: '', 
      select: "",
      family: {},
      address: "",
      birthday: "",
      career: "",
      fullname: "",
      is_depend: "",
      mobile: "",
      relationship: "",
      errors: {}
    };
  }

  componentDidMount(){
    window.select2reload(`#${this.props.position}_relationship`, this.props.item.relationship);
    window.select2reload(`#${this.props.position}_is_depend`, this.props.item.is_depend);
  }

  componentWillReceiveProps(nextProps){
    const family = nextProps.item
    if(family !== this.state.family) {
      this.setState({
        family: family,
        address: family.address,
        birthday: family.birthday,
        career: family.career,
        fullname: family.fullname,
        is_depend: family.is_depend,
        mobile: family.mobile,
        relationship: family.relationship,
      });
      window.select2reload("#relationship", family.relationship);
      // window.select2reload("#gender", information.gender);
    }
    
    
    if(nextProps.position !== this.state.position) {
      this.setState({position: nextProps.position});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.item.relationship !== prevState.relationship){
      window.select2reload(`#${this.props.position}_relationship`, this.props.item.relationship);
    }
    if(this.props.item.is_depend !== prevState.is_depend){
      window.select2reload(`#${this.props.position}_is_depend`, this.props.item.is_depend);
    }
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.id} data-tokens={item.id}>
          {item.name}
        </option>
      );
    });
  };

  onSelectChange = (e) => {
    const { item, position } = this.props;
    const payload = {
      ...item,
      idx: position, 
      [e[0].name]: e.val(),
    };
    this.setState({
      family: payload,
    });
    this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const {item, position} = this.props
    const name = e.target.name
    const value = e.target.value

    if(name === 'mobile'){
      if(value){
        const isValid = this.onValidation(value)
        if(isValid){
          this.setState({
            errors:{
                mobileCheck: true,
                mobileError: ""
            },
            isValid: true
          })
        }else{
          this.setState({
            errors:{
                mobileCheck: false,
                mobileError: "Số điện thoại không hợp lệ!"
            },
            isValid: false
          })
        }
        console.log('mobile',isValid);
      }else{
        this.setState({
          isValid: true
        })
      }
      
    }

    const payload = {
        ...item,
        idx: position, 
        [e.target.name]: e.target.value 
    }
    this.setState({
        family: payload
    })
    this.props.onChange(payload);
    
  }

  onValidation = (value) => {
    if(validator.isMobilePhone(value, "vi-VN")){
      return true
    }
    return false
  }

  deleteItem = () => {
    const { item, position } = this.props;
    if(item.id){
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
          await this.props.onDelete(position);
          Swal.fire("Đã xóa!", "", "success");
        }
      });
    }else{
      this.props.onDelete(position);
    }
  }

  render() {
    const { item, position } = this.props
    const {
      // family,
      // address,
      // birthday,
      // career,
      // fullname,
      // is_depend,
      // mobile,
      relationship,
      errors, 
      isValid
    } = this.state

    return (
      <tr>
        <td>
          <Select
            id={position+'_relationship'}
            className="form-control"
            name="relationship"
            placeholder="Mối quan hệ"
            data={relationship_list}
            value={relationship | ''}
            onChange={this.onSelectChange}
            renderOption={this.renderOption}
            setSelect={this.setSelect}
            parent="wrapper"
            required
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Họ và tên"
            name="fullname"
            value={item.fullname}
            onChange={this.onInputChange}
            required
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="Năm sinh"
            name="birthday"
            value={moment(item.birthday).format('YYYY-MM-DD')}
            onChange={this.onInputChange}
            max={moment(new Date()).format('YYYY-MM-DD')}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Nghề nghiệp"
            name="career"
            value={item.career}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
            name="address"
            value={item.address}
            onChange={this.onInputChange}
          />
        </td>
        <td className={classnames({"has-danger": isValid==false})}>
          <input
            type="number"
            className={classnames("form-control",{"form-control-danger": isValid==false})}
            placeholder="Điện thoại"
            name="mobile"
            value={item.mobile}
            onChange={this.onInputChange}
          />
          <div className="errorMessage text-danger m-t-5" style={{fontSize: "small"}}>
            {!isValid && (<span>{errors.mobileError}</span>)}
          </div>
        </td>
        <td>
          <Select
            id={position + '_is_depend'}
            className="form-control"
            name="is_depend"
            placeholder="Người phụ thuộc"
            data={is_depend_list}
            value={item.is_depend}
            onChange={this.onSelectChange}
            renderOption={this.renderOption}
            setSelect={this.setSelect}
            parent="wrapper"
          /></td>
        <td><span title="Xóa" className="ti-trash" onClick={() => {this.deleteItem()}}></span></td>
      </tr>
    );
  }
}