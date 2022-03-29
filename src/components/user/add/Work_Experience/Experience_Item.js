import React, { Component } from "react";
import classnames from 'classnames';
import validator from 'validator';
import Select from "../../../common/Select";

const place_of_born = [
  {
    id: "1",
    name: "TPHCM",
  },
  {
    id: "2",
    name: "Hà Nội",
  },
];

export default class Experience_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      position: '',
      experience: {},
      errors: {}
    };
  }

  componentDidMount(){
    // window.select2reload(`#${this.props.position}_relationship`, this.props.data.relationship);
    // window.select2reload(`#${this.props.position}_is_depend`, this.props.data.is_depend);
  }

  componentWillReceiveProps(nextProps){
    const experience = nextProps.data
    if(experience !== this.state.experience) {
      this.setState({
        experience: experience,
      });
    }
    
    if(nextProps.position !== this.state.position) {
      this.setState({position: nextProps.position});
    }
  }

  componentDidUpdate(prevProps, prevState){
    // if(this.props.data.relationship !== prevState.family.relationship){
    //   window.select2reload(`#${this.props.position}_relationship`, this.props.data.relationship);
    // }
    // if(this.props.data.is_depend !== prevState.family.is_depend){
    //   window.select2reload(`#${this.props.position}_is_depend`, this.props.data.is_depend);
    // }
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  onInputChange = (e) => {

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
                mobileError: "Số điện thoại không hợp lệ!"
            },
            isValid: false
          })
        }
      }else{
        this.setState({
          isValid: true
        })
      }
    }

    const { experience } = this.state;
    const payload = {
      ...experience,
      idx: this.props.position,
      [e.target.name]: e.target.value,
    };
    this.setState({
      experience: payload,
    });
    this.props.onChange(payload);
  };

  onValidation = (value) => {
    if(validator.isMobilePhone(value, "vi-VN")){
      return true
    }
    return false
  }

  deleteItem = () => {
    const { position } = this.props;
    this.props.onDelete(position);
  };

  render() {
    const { errors, isValid } = this.state
    const {position, data} = this.props
    return (
      <>
      <tr >
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <input
            type="date"
            className="form-control px-0"
            placeholder="Từ tháng"
            name="from_date"
            style={{ width: '165px'}}
            onChange={this.onInputChange}
            value={data.from_date || ''}
          />
          <div className="errorMessage text-danger m-t-5">
            <span></span>
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <input
            type="date"
            className="form-control px-0"
            placeholder="Đến tháng"
            name="to_date"
            style={{ width: '165px'}}
            onChange={this.onInputChange}
            value={data.to_date || ''}
          />
          <div className="errorMessage text-danger m-t-5">
            <span></span>
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Công ty"
            name="company"
            onChange={this.onInputChange}
            value={data.company || ''}
          />
          <div className="errorMessage text-danger m-t-5">
            <span></span>
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Vị trí"
            name="position"
            onChange={this.onInputChange}
            value={data.position || ''}
          />
          <div className="errorMessage text-danger m-t-5">
            <span></span>
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Người tham chiếu"
            name="manager"
            onChange={this.onInputChange}
            value={data.manager || ''}
          />
          <div className="errorMessage text-danger m-t-5">
            <span></span>
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }} className={classnames({"has-danger": isValid===false})}>
          <input
            type="number"
            className="form-control"
            placeholder="Điện thoại"
            name="mobile"
            onChange={this.onInputChange}
            value={data.mobile || ''}
          />
          <div className="errorMessage text-danger m-t-5" style={{fontSize: "small"}}>
            {!isValid && (<span>{errors.mobileError}</span>)}
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Mô tả công việc"
            name="description"
            onChange={this.onInputChange}
            value={data.description || ''}
          />
          <div className="errorMessage text-danger m-t-5">
            <span></span>
          </div>
        </td>
        <td style={{ padding: '5px 1px 0px 1px' }}>
          <button className="form-control" style={{marginTop: '-5px'}}>
            <span title="Xóa" className="ti-trash" onClick={this.deleteItem}></span>
          </button>
        </td>
      </tr>
      </>
    );
  }
}
