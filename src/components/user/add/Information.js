import React, { Component } from "react";
import axios from 'axios';
import moment from "moment";
import validator from 'validator';
import classnames from 'classnames';
import Select from "../../common/Select";
import { gioitinh, honnhan } from "./Common";

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: null,
      info: {},
      error: {}
    };
  }

  componentDidUpdate() {
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

  dateChange = (date) => {
    const { info } = this.state
    const payload = {
      ...info,
      birthday: moment(new Date(date)).format("YYYY-MM-DD"),
    };
    this.setState({
      info: payload,
    });
    this.props.onChange(payload);
  };

  render() {
    const { classes } = this.props;
    const {info, avatarId} = this.state
    const {errors} = this.props
    return (
      <div className="panel-body">
        <div className="row">
          <div className="form-group col-md-12">
            <div className="header-title">Th??ng tin c?? nh??n</div>
          </div>
        </div>
          <div className="form-group col-md-7">
            <div className="row form-group">
              <div className="col-sm-6">
                <label className="control-label">M?? nh??n vi??n (*)</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="M?? nh??n vi??n"
                        name="code"
                        onChange={this.onInputChange}
                        required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="control-label">M?? ch???m c??ng (*)</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="M?? ch???m c??ng"
                    name="sale"
                    onChange={this.onInputChange}
                    required
                />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className={
                    classnames(
                      "col-md-12",
                      {"has-danger": errors && errors.name}
                    )}
              >
                <label className="control-label">H??? v?? t??n (*)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="H??? v?? t??n"
                    name="name"
                    onChange={this.onInputChange}
                    maxLength="60"
                    required
                />
                {errors && (
                  <div className="errorMessage text-danger m-t-5" style={{fontSize: "smaller"}}>
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <label className="control-label">Ng??y sinh (*)</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Ng??y sinh"
                  name="birthday"
                  onChange={this.onInputChange}
                  max={moment(new Date()).format("YYYY-MM-DD")}
                  required
                /> 
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="control-label">Gi???i t??nh (*)</label>
                <Select
                    id="gender"
                    className="form-control"
                    name="gender"
                    placeholder="Gi???i t??nh"
                    data={gioitinh}
                    renderOption={this.renderOption}
                    onChange={this.onSelectChange}
                    setSelect={this.setSelect}
                    parent="wrapper"
                    required
                />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12">
                <label className="control-label">N??i sinh (*)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="N??i sinh"
                    name="place_of_born"
                    onChange={this.onInputChange}
                    required
                />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12">
                <label className="control-label">Nguy??n qu??n (*)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nguy??n qu??n"
                    name="native_place"
                    onChange={this.onInputChange}
                    required
                />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className={
                    classnames(
                      "col-md-6",
                      {"has-danger": errors && errors.id_number}
                    )}>
                <label className="control-label">CMND/C??n c?????c/H??? chi???u (*)</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="CMND/C??n c?????c/H??? chi???u"
                    name="id_number"
                    onChange={this.onInputChange}
                    required
                />
                {errors && (
                  <div className="errorMessage text-danger m-t-5" style={{fontSize: "smaller"}}>
                    <span>{errors.id_number}</span>
                  </div>
                )}
                
              </div>
              <div className="col-sm-6">
                <label className="control-label">Ng??y c???p (*)</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Ng??y c???p"
                    name="id_issue_date"
                    onChange={this.onInputChange}
                    max={moment(new Date()).format("YYYY-MM-DD")}
                    required
                  />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <label className="control-label">N??i c???p (*)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="N??i c???p"
                    name="id_place"
                    onChange={this.onInputChange}
                    required
                  />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
              <div className="col-md-6">
                <label className="control-label">Tr??nh tr???ng h??n nh??n (*)</label>
                <Select
                    id="is_married"
                    className="form-control"
                    name="is_married"
                    placeholder="Tr??nh tr???ng h??n nh??n"
                    data={honnhan}
                    onChange={this.onSelectChange}
                    renderOption={this.renderOption}
                    setSelect={this.setSelect}
                    parent="wrapper"
                    required
                />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <label className="control-label">D??n t???c (*)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="D??n t???c"
                    name="region"
                    onChange={this.onInputChange}
                    required
                  />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="control-label">Qu???c t???ch (*)</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Qu???c t???ch"
                    name="nationality"
                    onChange={this.onInputChange}
                    required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <label className="control-label">S??? t??i kho???n (*)</label>
                    <input
                    type="number"
                    className="form-control"
                    placeholder="S??? t??i kho???n"
                    name="account_number"
                    onChange={this.onInputChange}
                    required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="control-label">T??n t??i kho???n (*)</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="T??n t??i kho???n"
                    name="account_name"
                    onChange={this.onInputChange}
                    required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-6">
                <label className="control-label">Ng??n h??ng (*)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ng??n h??ng"
                        name="bank_name"
                        onChange={this.onInputChange}
                        required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="control-label">Chi nh??nh (*)</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Chi nh??nh"
                        name="bank_address"
                        onChange={this.onInputChange}
                        required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12">
                <label className="control-label">M?? s??? thu??? c?? nh??n</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="M?? s??? thu??? c?? nh??n"
                        name="tax"
                        onChange={this.onInputChange}
                        required
                    />
                <div className="errorMessage text-danger m-t-5">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        <div className="col-md-5 order-first">
          <div className="col-md-12">
            <div className="edit-avatar">
              {info && info.avatar ? (
                <img src={global.uri + `/api/profile/avatars/` + info.avatar}/>
              ) : (
                avatarId ? (
                  <img src={global.uri + `/api/profile/avatars/` + avatarId}/>
                ) : (
                <img src={global.uri + `/api/profile/avatars/f868bdd6-430e-4b8b-bf61-1891fda95b7e`} />
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
