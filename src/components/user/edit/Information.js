import React, { Component } from "react";
import moment from "moment";
import axios from 'axios';
import classnames from 'classnames';
import validator from 'validator';
import Select from "../../common/Select";
import { gioitinh, honnhan } from "../add/Common";
import { Hon_Nhan } from "./Common"

import '../custom.css';

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: null,
      info: {},
      code:'',
      sale:'',
      name:'',
      birthday:'',
      gender:'',
      place_of_born:'',
      native_place:'',
      id_number:'',
      id_issue_date:'',
      id_place:'',
      is_married:'',
      region:'',
      nationality:'',
      account_number:'',
      account_name:'',
      bank_name:'',
      bank_address:'',
      tax:'',
      errors: {}
    };
  }

  async componentWillReceiveProps(nextProps) {
    const information = nextProps.information
    console.log('componentWillReceiveProps',information)
    if(information){
      if(information !== this.state.info){
        if(information.is_married){
          if(information.is_married === false){
            information.is_married = "0"
          }
          if(information.is_married === true){
            information.is_married = "1"
          }
        }
        await this.setState({
          info: information,
          code: information.code,
          sale: information.sale,
          name: information.name,
          birthday: information.birthday,
          gender: information.gender,
          place_of_born: information.place_of_born,
          native_place: information.native_place,
          id_number: information.id_number,
          id_issue_date: information.id_issue_date,
          id_place: information.id_place,
          is_married: information.is_married,
          region: information.region,
          nationality: information.nationality,
          account_number: information.account_number,
          account_name: information.account_name,
          bank_name: information.bank_name,
          bank_address: information.bank_address,
          tax:information.tax
        })
        window.select2reload("#gender", information.gender);
        window.select2reload("#is_married", information.is_married);
        // information.gender && window.select2reload("#gender", information.gender);
        // information.is_married && window.select2reload("#is_married", information.is_married);
      }
      // window.select2reload("#gender", information.gender);
    }
    if (nextProps.errors != this.state.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidUpdate(){
    // console.log(this.state.isValid);
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

  avatarChange = (e) => {
    var avatar = new FormData();
    avatar.append("file", e.target.files[0], e.target.files[0].name);

    axios.post(global.uri + '/admin/uploads/avatar', avatar)
      .then(res => {
          const avatarId = res.data.avatarId
          const { info } = this.state;
          const payload = {
            ...info,
            avatar: avatarId
          };
          this.setState({
            info: payload,
            avatarId
          });
          this.props.onChange(payload);
      })
      .catch(err => {
          console.log(err);
    })
    
  }

  onSelectChange = (e) => {
    const { info } = this.state;
    const payload = {
      ...info,
      [e[0].name]: e.val(),
    };
    this.setState({
      info: payload,
    });
    this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const { info } = this.state;
    const payload = {
      ...info,
      [e.target.name]: e.target.value,
    };
    this.setState({
      info: payload,
    });
    this.props.onChange(payload);
  };

  render() {
    const {
      info,
      code,
      sale,
      name,
      birthday,
      gender,
      place_of_born,
      native_place,
      id_number,
      id_issue_date,
      id_place,
      is_married,
      region,
      nationality,
      account_number,
      account_name,
      bank_name,
      bank_address,
      tax,
      errors,
      avatarId
    } = this.state
    // console.log('render: ',this.state);

    return (
      <div className="panel-body information">
        <div className="form-group col-md-12">
          <div className="header-title">Thông tin cá nhân</div>
        </div>
        
        <div className="form-group col-md-6">
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="control-label">Mã nhân viên (*)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mã nhân viên"
                  name="code"
                  value={sale}
                  onChange={this.onInputChange}
                  required
                  disabled
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-sm-6">
              <label className="control-label">Mã chấm công (*)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mã chấm công"
                  name="sale"
                  value={sale}
                  onChange={this.onInputChange}
                  required
                  disabled
              />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="control-label">Họ và tên (*)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên"
                  name="name"
                  value={name}
                  onChange={this.onInputChange}
                  required
              />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Ngày sinh</label>
              <input
                  type="date"
                  className="form-control"
                  placeholder="Ngày sinh"
                  name="birthday"
                  value={birthday && moment(birthday).format('YYYY-MM-DD') || ''}
                  onChange={this.onInputChange}
                  max={moment(new Date()).format('YYYY-MM-DD')}
              /> 
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Giới tính</label>
                <Select
                  id="gender"
                  className="form-control"
                  name="gender"
                  placeholder="Giới tính"
                  data={gioitinh}
                  value={info.gender}
                  onChange={this.onSelectChange}
                  renderOption={this.renderOption}
                  setSelect={this.setSelect}
                  parent="wrapper"
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="control-label">Nơi sinh</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nơi sinh"
                    name="place_of_born"
                    value={place_of_born && place_of_born || ''}
                    onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="control-label">Nguyên quán</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nguyên quán"
                    name="native_place"
                    value={native_place && native_place || ''}
                    onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={
                    classnames(
                      "form-group",
                      "col-md-6",
                      {"has-danger": errors && errors.id_number_Error}
                    )}
            >
              <label className="control-label">CMND/Căn cước/Hộ chiếu</label>
                <input
                    type="number"
                    className={
                        classnames(
                          "form-control",
                          {"form-control-danger": errors && errors.id_number_Error}
                        )}
                    placeholder="CMND/Căn cước/Hộ chiếu"
                    name="id_number"
                    value={id_number && id_number || ''}
                    onChange={this.onInputChange}
                />
              {errors && (
                <div className="errorMessage text-danger m-t-5" style={{fontSize: "smaller"}}>
                  <span>{errors.id_number_Error}</span>
                </div>
              )}
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ngày cấp</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Ngày cấp"
                  name="id_issue_date"
                  value={id_issue_date && moment(id_issue_date).format('YYYY-MM-DD') || ''}
                  onChange={this.onInputChange}
                  max={moment(new Date()).format('YYYY-MM-DD')}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Nơi cấp</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nơi cấp"
                  name="id_place"
                  value={id_place && id_place || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Trình trạng hôn nhân</label>
              <Select
                  id="is_married"
                  className="form-control"
                  name="is_married"
                  placeholder="Trình trạng hôn nhân"
                  data={honnhan}
                  value={info.is_married}
                  onChange={this.onSelectChange}
                  renderOption={this.renderOption}
                  setSelect={this.setSelect}
                  parent="wrapper"
              />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Dân tộc</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dân tộc"
                  name="region"
                  value={region && region || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Quốc tịch</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nơi cấp"
                    name="nationality"
                    value={nationality && nationality || ''}
                    onChange={this.onInputChange}
                  />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Số tài khoản</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số tài khoản"
                  name="account_number"
                  value={account_number && account_number || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên tài khoản</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên tài khoản"
                  name="account_name"
                  value={account_name && account_name || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Ngân hàng</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Ngân hàng"
                      name="bank_name"
                      value={bank_name && bank_name || ''}
                      onChange={this.onInputChange}
                  />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Chi nhánh</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Chi nhánh"
                      name="bank_address"
                      value={bank_address && bank_address || ''}
                      onChange={this.onInputChange}
                  />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label className="control-label">Mã số thuế cá nhân</label>
                  <input
                      type="number"
                      className="form-control"
                      placeholder="Mã số thuế cá nhân"
                      name="tax"
                      value={tax && tax || ''}
                      onChange={this.onInputChange}
                  />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="col-md-12">
            <div className="edit-avatar">
              {info && info.avatar ? (
                <div style={{
                      backgroundImage: `url(${global.uri}/api/profile/avatars/${info.avatar})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",width: "15em",height: "15em",borderRadius: "50%",border: "solid 2px #558b2f"
                      }}>
                </div>
              ) : (
                avatarId ? (
                  <div style={{
                      backgroundImage: `url(${global.uri}/api/profile/avatars/${avatarId})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",width: "15em",height: "15em",borderRadius: "50%",border: "solid 2px #558b2f"
                      }}>
                  </div>
                ) : (
                <div style={{
                      backgroundImage: `url(${global.uri}/api/profile/avatars/f868bdd6-430e-4b8b-bf61-1891fda95b7e)`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",width: "15em",height: "15em",borderRadius: "50%",border: "solid 2px #558b2f"
                      }}>
                </div>
              )
              )}
              <input type="file" name="file" onChange={this.avatarChange}></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
