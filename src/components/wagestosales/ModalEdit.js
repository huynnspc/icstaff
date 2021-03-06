import React, { Component } from "react";
import Select from "../common/Select";
import moment from "moment";
import axios from 'axios';
import NumberFormat from 'react-number-format';

export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: null,
      stores:[],
      dataModalEdit: {},
      active_date: '',
      cuahang_id: '',
      allowance_for_meals: '',
      id: '',
      percent: '',
      day_rate: '',
      holiday_rate: '',
      weekend_rate: ''
    }
    this.myRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      if (nextProps.data.item != this.state.dataModalEdit) {
        this.setState({ 
          dataModalEdit: nextProps.data.item,
          active_date: nextProps.data.item.active_date,
          cuahang_id: nextProps.data.item.cuahang_id,
          allowance_for_meals: nextProps.data.item.allowance_for_meals,
          id: nextProps.data.item.id,
          percent: nextProps.data.item.percent,
          day_rate: nextProps.data.item.day_rate,
          holiday_rate: nextProps.data.item.holiday_rate,
          weekend_rate: nextProps.data.item.weekend_rate
        });
      }
      if (nextProps.data.stores != this.state.stores) {
        this.setState({ 
          stores: nextProps.data.stores,
        });
      }
      if (nextProps.data.item.cuahang_id != this.state.cuahang_id) {
        window.select2reload("#modal", nextProps.data.item.cuahang_id);
        this.setState({ 
          cuahang_id: nextProps.data.item.cuahang_id,
        });
      }
    }
    
  }

  componentDidUpdate(){
    console.log('dataModalEdit: ',this.state);
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  renderOption = (data) => {
    if(data && data.length>0){
      return data.map((item, key) => {
        return (
          <option key={key} value={item.storeCode} data-tokens={item.storeCode}>
            {item.storeName}
          </option>
        );
      })
    }
  }

  onSelectChange = (e) => {
    // this.setState({
    //   [e[0].name]: e.val(),
    //   dataModalEdit: {
    //     ...this.state.dataModalEdit,
    //     [e[0].name]: e.val()
    //   }
    // });
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onEatingFeeChange = (val) => {
    this.setState({
      [this.myRef.current.props.name]: val.value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { active_date, cuahang_id, allowance_for_meals, id, percent, day_rate, holiday_rate, weekend_rate } = this.state
    const payload = { 
      active_date, 
      cuahang_id, 
      eating_fee:  allowance_for_meals, 
      id, 
      percent, 
      rate_day: day_rate, 
      rate_holiday:  holiday_rate, 
      rate_weekend:  weekend_rate 
    }
    console.log(payload);
    try {
      const res = await axios.put(global.uri + `/admin/expense_rates`, payload);
      this.props.handleModalEdit()
    }
    catch (err){
      console.log(err.response.data)
    }
    window.$("#modal_edit").modal("hide");
  };

  render() {
    const {data} = this.props
    console.log('this.props',data);
    const {
      stores,
      dataModalEdit,
      active_date,
      cuahang_id,
      allowance_for_meals,
      id,
      percent,
      day_rate,
      holiday_rate,
      weekend_rate} = this.state

    return (
      <div className="modal fade" id="modal_edit" role="dialog">
        <div className="modal-dialog modal-md" role="document">
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
                <h4 className="modal-title">Th??ng tin ch??? s??? l????ng</h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">T??n chi nh??nh</label>
                    <Select
                      id="modal"
                      className="form-control"
                      name="cuahang_id"
                      placeholder="T??n chi nh??nh"
                      data={stores}
                      value={cuahang_id}
                      onChange={this.onSelectChange}
                      setSelect={this.setSelect}
                      renderOption={this.renderOption}
                      parent="wrapper"
                      // disabled
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">T??? l??? ng??y th?????ng</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="T??? l??? ng??y th?????ng"
                      name="day_rate"
                      value={day_rate}
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
                    <label className="control-label">T??? l??? ng??y cu???i tu???n</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="T??? l??? cu???i tu???n"
                      name="weekend_rate"
                      value={weekend_rate}
                      onChange={this.onInputChange}
                      min="0"
                      max="100"
                      step="any"
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label className="control-label">T??? l??? l???</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="T??? l??? l???"
                      name="holiday_rate"
                      value={holiday_rate}
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
                    <label className="control-label">Ph???n tr??m</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ph???n tr??m"
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
                    <label className="control-label">Ti???n c??m</label>
                    <NumberFormat 
                      className="form-control" 
                      ref={this.myRef}
                      name="allowance_for_meals"
                      value={allowance_for_meals}
                      thousandSeparator={true} 
                      prefix={''}
                      placeholder="Ti???n c??m" 
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
                    {/* <input
                      type="number"
                      className="form-control"
                      placeholder="Ti???n c??m"
                      name="eating_fee"
                      value={eating_fee}
                      onChange={this.onInputChange}
                      min="0"
                      max="50000"
                      step="any"
                      required
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label className="control-label">Ng??y ??p d???ng</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Ng??y ??p d???ng"
                        name="active_date"
                        value={moment(active_date).format('YYYY-MM-DD')}
                        onChange={this.onInputChange}
                        // min={moment(new Date()).format('YYYY-MM-DD')}
                      />
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ textAlign: "center" }}>
                <button 
                  type="submit" 
                  className="btn btn-success"
                >
                  C???p nh???t
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  H???y b???
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    
  }
}
