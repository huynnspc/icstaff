import React, { Component } from "react";
import classnames from 'classnames';
import moment from "moment";
import validator from 'validator';
import Select from "../../../common/Select";

import {relationship_list, is_depend_list} from "../Common"

export default class Family_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      position: '',
      family: {},
      errors: {}
    };
  }

  componentDidMount(){
    window.select2reload(`#${this.props.position}_relationship`, this.props.data.relationship);
    window.select2reload(`#${this.props.position}_is_depend`, this.props.data.is_depend);
  }

  componentWillReceiveProps(nextProps){
    const family = nextProps.data
    if(family !== this.state.family) {
      this.setState({
        family: family,
      });
    }
    
    if(nextProps.position !== this.state.position) {
      this.setState({position: nextProps.position});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.data.relationship !== prevState.family.relationship){
      window.select2reload(`#${this.props.position}_relationship`, this.props.data.relationship);
    }
    if(this.props.data.is_depend !== prevState.family.is_depend){
      window.select2reload(`#${this.props.position}_is_depend`, this.props.data.is_depend);
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
    const { family } = this.state;
    const payload = {
      ...family,
      idx: this.props.position, 
      [e[0].name]: e.val(),
    };
    this.setState({
      family: payload,
    });
    this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const {family} = this.state
    if(e.target.name === 'mobile'){
      if(e.target.value){
        const isValid = this.onValidation(e.target.value)
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
                mobileError: "S??? ??i???n tho???i kh??ng h???p l???!"
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
        ...family,
        idx: this.props.position, 
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
    const {position} = this.props
    this.props.onDelete(position);
  }

  render() {
    const { errors, isValid } = this.state
    const {position, data} = this.props
    return (
      <tr>
        <td>
          <Select
            id={position+'_relationship'}
            className="form-control"
            name="relationship"
            placeholder="M???i quan h???"
            data={relationship_list}
            value={data.relationship | ''}
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
            placeholder="H??? v?? t??n"
            name="fullname"
            value={data.fullname || ''}
            onChange={this.onInputChange}
            required
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="N??m sinh"
            name="birthday"
            value={data.birthday || ''}
            onChange={this.onInputChange}
            max={moment(new Date()).format('YYYY-MM-DD')}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Ngh??? nghi???p"
            name="career"
            value={data.career || ''}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="?????a ch???"
            name="address"
            value={data.address || ''}
            onChange={this.onInputChange}
          />
        </td>
        <td className={classnames({"has-danger": isValid===false})}>
          <input
            type="number"
            className={classnames("form-control",{"form-control-danger": isValid===false})}
            placeholder="??i???n tho???i"
            name="mobile"
            value={data.mobile || ''}
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
            placeholder="Ng?????i ph??? thu???c"
            data={is_depend_list}
            onChange={this.onSelectChange}
            renderOption={this.renderOption}
            setSelect={this.setSelect}
            parent="wrapper"
          /></td>
        <td><span title="X??a" className="ti-trash" onClick={this.deleteItem}></span></td>
      </tr>
      // <div className="form-group col-md-12 flex-container">
      //   <div className="col-sm-1">
      //       <Select
      //         id={index ? index+'relationship' : "relationship"}
      //         className="form-control"
      //         name="relationship"
      //         placeholder="M???i quan h???"
      //         data={relationship_list}
      //         renderOption={this.renderOption}
      //         onChange={this.onSelectChange}
      //         setSelect={this.setSelect}
      //         parent="wrapper"
      //       />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="col-sm-2">
      //     <input
      //       type="text"
      //       className="form-control"
      //       placeholder="H??? v?? t??n"
      //       name="fullname"
      //       onChange={this.onInputChange}
      //     />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="col-sm-2">
      //     <input
      //       type="date"
      //       className="form-control"
      //       placeholder="N??m sinh"
      //       name="birthday"
      //       onChange={this.onInputChange}
      //     />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="col-sm-2">
      //     <input
      //       type="text"
      //       className="form-control"
      //       placeholder="Ngh??? nghi???p"
      //       name="career"
      //       onChange={this.onInputChange}
      //     />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="col-sm-2">
      //     <input
      //       type="text"
      //       className="form-control"
      //       placeholder="?????a ch???"
      //       name="address"
      //       onChange={this.onInputChange}
      //     />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="col-sm-2">
      //     <input
      //       type="number"
      //       className="form-control"
      //       placeholder="??i???n tho???i"
      //       name="mobile"
      //       onChange={this.onInputChange}
      //     />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="col-sm-1">
      //     {/* C?? / Kh??ng */}
      //     <Select
      //       id={index ? index+'is_depend' : "is_depend"}
      //       className="form-control"
      //       name="is_depend"
      //       placeholder="Ng?????i ph??? thu???c"
      //       data={is_depend_list}
      //       renderOption={this.renderOption}
      //       onChange={this.onSelectChange}
      //       setSelect={this.setSelect}
      //       parent="wrapper"
      //     />
      //     <div className="errorMessage text-danger m-t-5">
      //       <span></span>
      //     </div>
      //   </div>
      //   <div className="flex-container" style={{ alignItems: "center" }}>
      //     <span title="X??a" className="ti-trash" onClick={() => {this.deleteItem()}}></span>
      //   </div>
      // </div>
    );
  }
}
