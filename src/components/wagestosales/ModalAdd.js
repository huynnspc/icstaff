import React, { Component } from "react";
import axios from 'axios';
import moment from "moment";
import validator from 'validator';
import NumberFormat from 'react-number-format';
import Select from "../common/Select";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: null,
      modalAdd: {},
      rate_day: '',
      cuahang_id: '',
      eating_fee: '',
      rate_weekend: '',
      rate_holiday: '',
      percent: '',
      active_date: '',
    };
    this.myRef = React.createRef();
  }

  componentDidUpdate() {
    // console.log('this Refs: ',this.myRef.current.state.value);
    // console.log('cuahang_id_Ref: ',this.cuahang_id_Ref);
    console.log('this.state: ', this.state);
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  renderOption = (data) => {
    console.log(data);
    return data.map((item, key) => {
      return (
        <option key={key} value={item.storeCode} data-tokens={item.storeCode}>
          {item.storeName}
        </option>
      );
    });
  };

  onSelectChange = (e) => {
    console.log(e.val());
    const { modalAdd } = this.state;
    const payload = {
      ...modalAdd,
      [e[0].name]: e.val(),
    };
    this.setState({
      modalAdd: payload,
      [e[0].name]: e.val()
    });
  };

  currency = (x) => {
    return x.toLocaleString('en-US');
  }

  onInputChange = (e) => {
    e.preventDefault();
    
    const { modalAdd } = this.state;
    const payload = {
      ...modalAdd,
      [e.target.name]: e.target.value,
    };
    this.setState({
      modalAdd: payload,
      [e.target.name]: e.target.value
    });
    
    // if(!validator.isFloat(e.target.value, {min: 0.01, max: 99.99} )){
    //   console.log('in Valid');
    // }else{
    //   console.log('Valid');
    // }
  };

  onEatingFeeChange = (val) => {
    const { modalAdd } = this.state;
    const payload = {
      ...modalAdd,
      [this.myRef.current.props.name]: val.value,
    };
    this.setState({
      modalAdd: payload,
      [this.myRef.current.props.name]: val.value,
    });
  }

  resetForm = () => {
    // this.myFormRef.reset();
    const {modalAdd} = this.state
    console.log(modalAdd);
    this.setState({
      modalAdd: "",
      rate_day: '',
      cuahang_id: '',
      eating_fee: '',
      rate_weekend: '',
      rate_holiday: '',
      percent: '',
      active_date: ''
    });
    window.select2reload("#"+this.cuahang_id_Ref.props.id, '');
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      rate_day,
      cuahang_id,
      eating_fee,
      rate_weekend,
      rate_holiday,
      percent,
      active_date
    } = this.state

    const payload = {
      rate_day,
      cuahang_id,
      eating_fee,
      rate_weekend,
      rate_holiday,
      percent,
      active_date
    }
    console.log('payload: ',payload);
    this.resetForm();
    
    try {
      const res = await axios.post(global.uri + `/admin/expense_rates`, payload);
      console.log(res.data)
      // window.start_preloader();
      this.props.handleModalAdd()
      this.resetForm();
      await window.$("#modal-add").modal("hide");
    }
    catch (err){
      console.log(err.response.data)
    }
    
  };


  render() {
    const { stores } = this.props;
    const { 
      modalAdd, 
      cuahang_id, 
      rate_day, 
      eating_fee,
      rate_weekend,
      rate_holiday,
      percent,
      active_date
    } = this.state;

    console.log(modalAdd);
    return (
      <div className="modal fade" id="modal-add" role="dialog">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <form onSubmit={this.onSubmit} ref={(el) => this.myFormRef = el}>
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">Thông tin chỉ số lương</h4>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Tên chi nhánh</label>
                    <Select
                      id="cuahang_id"
                      ref={(el) => this.cuahang_id_Ref = el}
                      className="form-control"
                      name="cuahang_id"
                      placeholder="Tên chi nhánh"
                      data={stores}
                      value={cuahang_id}
                      onChange={this.onSelectChange}
                      setSelect={this.setSelect}
                      renderOption={this.renderOption}
                      parent="wrapper"
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">Tỷ lệ ngày thường</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Tỷ lệ ngày thường"
                      name="rate_day"
                      value={rate_day}
                      onChange={this.onInputChange}
                      min="0"
                      max="100"
                      step="any"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">
                      Tỷ lệ ngày cuối tuần
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Tỷ lệ cuối tuần"
                      name="rate_weekend"
                      value={rate_weekend}
                      onChange={this.onInputChange}
                      min="0"
                      max="100"
                      step="any"
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">Tỷ lệ lễ</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Tỷ lệ lễ"
                      name="rate_holiday"
                      value={rate_holiday}
                      onChange={this.onInputChange}
                      min="0"
                      max="100"
                      step="any"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Phần trăm</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phần trăm"
                      name="percent"
                      value={percent}
                      onChange={this.onInputChange}
                      min="0"
                      max="100"
                      step="any"
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">Tiền cơm</label>
                    <NumberFormat 
                      className="form-control" 
                      ref={this.myRef}
                      name="eating_fee"
                      value={eating_fee}
                      thousandSeparator={true} 
                      prefix={''}
                      placeholder="Tiền cơm" 
                      onValueChange={this.onEatingFeeChange}
                      isAllowed={(values) => {
                        const { formattedValue, floatValue } = values
                        
                        if (floatValue == null) {
                            return formattedValue === ''
                        } else {
                            return (floatValue <= 50000)
                        }
                      }}
                      required 
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Ngày áp dụng</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Ngày áp dụng"
                      name="active_date"
                      value={active_date}
                      onChange={this.onInputChange}
                      min={moment(new Date()).format("YYYY-MM-DD")}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Cập nhật
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
    );
  }
}
