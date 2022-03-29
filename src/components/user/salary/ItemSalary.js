import React, { Component, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "../../common/Select";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import "../custom.css";

import "react-datepicker/dist/react-datepicker.css";
import validator from "validator";
import classnames from 'classnames';

const MoneyInput = ({ value, onChange }) => {
  const ref = useRef(null)
  const _onChange = (e) => onChange(e)

  useEffect(() => {
    ref.current.addEventListener("focus", e =>
      ref.current.value = ref.current.dataset['money'])
    ref.current.addEventListener("blur", e =>
      ref.current.value = Intl.NumberFormat().format(ref.current.dataset['money']))
    ref.current.addEventListener("keydown", e => 
      (e.key !== "Backspace" && !/[1-9]/.test(e.key)) && e.preventDefault()
    )
    ref.current.value = Intl.NumberFormat().format(value)
  }, [])

  return (
    <input
      ref={ref}
      name="amount"
      type="text"
      className="form-control"
      placeholder="Mức lương"
      data-money={value}
      onChange={_onChange}
      required
    />
  )
}

export default class ItemSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "",
      select: "",
      data: {},
      salary_type: [],
    };
  }

  componentDidMount() {
    axios.get(global.uri + `/admin/salarys/getFormOfSalary`)
      .then((res) => {
        // console.log(res.data.payload);
        this.setState({
          salary_type: res.data.payload,
        });
      })
      .catch((err) => {
        console.log(err);
      });
      
    //
    
  }

  componentWillReceiveProps(nextProps) {
    // window.select2reload("#"+ nextProps.position + "_form_id", nextProps.data.form_id);
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
      console.log('nextProps.data',nextProps.data);
      
    }
    if (nextProps.position !== this.state.position) {
      this.setState({ position: nextProps.position });
      console.log('nextProps.position',nextProps.position);
      
    }
  }

  componentDidUpdate() {
  }

  setSelect = (select) => {
    this.setState({ select: select });
    console.log(this.state.data.form_id);
  };

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.id} data-tokens={item.id}>
          {item.name}
        </option>
      );
    });
  }

  onInputChange = (e) => {
    e.preventDefault();
    console.log("dm input change", e.target)
    const { data, position } = this.props;

    this.SalaryValidator(e.target.value)

    const payload = {
      ...data,
      idx: position,
      [e.target.name]: e.target.value && Number.parseFloat(e.target.value),
    };

    this.setState({
      data: payload,
    });
    this.props.onChange(payload);
  };
  
  SalaryValidator = (value) => {
    console.log(value);
    console.log(validator.isInt(value, { min: 0, max: 50000000 }));
    if(!validator.isInt(value, { min: 0, max: 50000000 })){
      this.setState({
        error: "Số tiền không được lớn hơn 50,000,000!"
      })
    }else{
      this.setState({
        error: ""
      })
    }
  }

  onSelectChange = (e) => {
    const { data, position } = this.props;
    const payload = {
      ...data,
      idx: position,
      [e[0].name]: e.val(),
    };
    console.log(payload);
    this.setState({
      data: payload,
    });
    this.props.onChange(payload);
  };

  dateChange = (date) => {
    const { data, position } = this.props;
    const payload = {
      ...data,
      idx: position,
      active_date: moment(new Date(date)).format("YYYY-MM-DD"),
    };
    this.setState({
      data: payload,
    });
    this.props.onChange(payload);
  };

  noteChange = (e) => {
    e.preventDefault();
    const { data, position } = this.props;
    const payload = {
      ...data,
      idx: position,
      [e.target.name]: e.target.value,
    };
    this.setState({
      data: payload,
    });
    this.props.onChange(payload);
  };

  deleteItemSalary = () => {
    const { data, position } = this.props;
    // if(data.id){
    //   Swal.fire({
    //     title: "Bạn có muốn xóa?",
    //     text: "Bạn có chắc muốn xóa dữ liệu này không?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Đồng ý",
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       await this.props.onDelete(position);
    //       Swal.fire("Đã xóa!", "", "success");
    //     }
    //   });
    // }else{
      this.props.onDelete(position);
    // }
  };

  render() {
    const { salary_type, error } = this.state;
    const { data, position } = this.props;
    return (
      <div className="row flex-container">
        <div className="col-2dot4">
          <DatePicker
            className="form-control"
            selected={new Date(data.active_date)}
            onChange={this.dateChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="col-2dot4">
          <Select
            id={position + "_form_id"}
            className="form-control"
            name="form_id"
            placeholder="----- Hình thức lương ----"
            data={salary_type}
            value={data.form_id}
            onChange={this.onSelectChange}
            setSelect={this.setSelect}
            renderOption={this.renderOption}
            parent="wrapper"
            required
          />
        </div>
        <div className={
              classnames(
                "col-2dot4",
                {"has-danger": error}
              )}
        >
          <MoneyInput value={data && data.amount} onChange={this.onInputChange} />
          {error && (
            <div className="errorMessage text-danger m-t-5" style={{fontSize: "smaller"}}>
              <span>{error}</span>
            </div>
          )}
        </div>
        <div className="col-2dot4">
          <textarea
            className="form-control"
            // id="note"
            name="note"
            rows="1"
            placeholder="Ghi chú"
            value={data.note}
            onChange={this.noteChange}
            required
          />
        </div>
        <div className="col-2dot4">
          <span
            title="Xóa"
            className="ti-trash"
            onClick={() => {
              this.deleteItemSalary();
            }}
          ></span>
        </div>
      </div>
    );
  }
}
