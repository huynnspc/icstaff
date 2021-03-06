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
          <div className="header-title">Th??ng tin c?? nh??n</div>
        </div>
        
        <div className="form-group col-md-6">
          <div className="row">
            <div className="form-group col-sm-6">
              <label className="control-label">M?? nh??n vi??n (*)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="M?? nh??n vi??n"
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
              <label className="control-label">M?? ch???m c??ng (*)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="M?? ch???m c??ng"
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
              <label className="control-label">H??? v?? t??n (*)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="H??? v?? t??n"
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
              <label className="control-label">Ng??y sinh</label>
              <input
                  type="date"
                  className="form-control"
                  placeholder="Ng??y sinh"
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
              <label className="control-label">Gi???i t??nh</label>
                <Select
                  id="gender"
                  className="form-control"
                  name="gender"
                  placeholder="Gi???i t??nh"
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
              <label className="control-label">N??i sinh</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="N??i sinh"
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
              <label className="control-label">Nguy??n qu??n</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nguy??n qu??n"
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
              <label className="control-label">CMND/C??n c?????c/H??? chi???u</label>
                <input
                    type="number"
                    className={
                        classnames(
                          "form-control",
                          {"form-control-danger": errors && errors.id_number_Error}
                        )}
                    placeholder="CMND/C??n c?????c/H??? chi???u"
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
              <label className="control-label">Ng??y c???p</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Ng??y c???p"
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
              <label className="control-label">N??i c???p</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="N??i c???p"
                  name="id_place"
                  value={id_place && id_place || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tr??nh tr???ng h??n nh??n</label>
              <Select
                  id="is_married"
                  className="form-control"
                  name="is_married"
                  placeholder="Tr??nh tr???ng h??n nh??n"
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
              <label className="control-label">D??n t???c</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="D??n t???c"
                  name="region"
                  value={region && region || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Qu???c t???ch</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="N??i c???p"
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
              <label className="control-label">S??? t??i kho???n</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="S??? t??i kho???n"
                  name="account_number"
                  value={account_number && account_number || ''}
                  onChange={this.onInputChange}
                />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">T??n t??i kho???n</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="T??n t??i kho???n"
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
              <label className="control-label">Ng??n h??ng</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Ng??n h??ng"
                      name="bank_name"
                      value={bank_name && bank_name || ''}
                      onChange={this.onInputChange}
                  />
              <div className="errorMessage text-danger m-t-5">
                <span></span>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Chi nh??nh</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Chi nh??nh"
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
              <label className="control-label">M?? s??? thu??? c?? nh??n</label>
                  <input
                      type="number"
                      className="form-control"
                      placeholder="M?? s??? thu??? c?? nh??n"
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
