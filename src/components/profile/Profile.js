import React, { Component } from "react";
import Select from 'react-select';
import PropTypes from "prop-types";
import classnames from 'classnames';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../layout/Navbar";
import Left from "../layout/LeftMenu";
import Right from "../layout/RightMenu";
import Experiences from './Experiences/Experiences';
import Certificates from './Certificates/Certificates';
import Timelines from './Timelines/Timelines';
// import Select from '../common/Select';
import Input from '../common/Input';


import validator from 'validator';

import { 
  getCurrentProfile,
  updateProfile
} from "../../actions/profileActions";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const roles = [{
  id: 0,
  name: "Quản lý"
}, {
  id: 1,
  name: "Thu ngân"
}, {
  id: 2,
  name: "Phục vụ"
}, {
  id: 3,
  name: "Tạp vụ"
}]

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profile: null,
      editting: true,
      add: false,
      values: [],
      validate: {},
      onValidate: true, 
      errors: {},
      select: null,
      langs: [
        { id: "0", name: "Vietnamese" },
        { id: "1", name: "Chinese" },
        { id: "2", name: "English" },
        { id: "3", name: "Japanese" },
        { id: "4", name: "Korean" },
        { id: "5", name: "French" }
      ],
      selectedOption: null
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    window.loading();
    this.handleRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== this.state.profile) {
      this.setState({
        profile: nextProps.profile.profile
      });
    }
    if(nextProps.profile.profile.languages && Object.keys(nextProps.profile.profile.languages).length > 0){
      this.setState({
        values: nextProps.profile.profile.languages
      });
      // select.js
      window.append(this.state.select, nextProps.profile.profile.languages);
    }
  }

  componentDidUpdate(){
    // console.log(this.state.profile)
    console.log("validate: ", this.state.validate)
  }

  handleRequest() {
    this.props.getCurrentProfile();
  }

  updateProfile = (item) => {
    if(confirm("Bạn có muốn thay đổi thông tin?")){ //eslint-disable-line
      this.props.updateProfile(item)
      this.handleRequest()
    }
  }

  handleUpdate = (item) => {
    if(confirm("Bạn có muốn thay đổi thông tin?")){ //eslint-disable-line
      const {profile} = this.state
      const item = {
        ...profile,
        languages: this.state.values
      }
      this.setState({
        editting: false,
        add: false
      });
      // this.props.updateProfile(item)
      // this.handleRequest()
    }
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ 
      profile: {
        ...this.state.profile,
        [name]: value
      }
    });
  };

  onValidate = (errorMessage) => {
    var onValidate = []
    console.log(onValidate);
    if(errorMessage != null){
      console.log("Input errorMessage != null",errorMessage);
      var onValidates = onValidate.push(errorMessage)
      console.log("onValidates",onValidates);
      this.setState({
        onValidate: false
      })
    }else{
        this.setState({
          onValidate: true
        })
    }
    // if(errorMessage === "email" || "phone" || "cmnd"){
    //   console.log("Input errorMessage",errorMessage);
    //   // this.setState({
    //   //   onValidate: false
    //   // })
    // // }else{
    // //   this.setState({
    // //     onValidate: true
    // //   })
    // }
    // this.setState({
    //   onValidate: errorMessage
    // })
    // console.log(onValidate);
  }

  handleCancel = () => {
    this.setState({
      editting: false,
      add: false
    });
  };

  handleEdit = () => {
    this.setState({
      editting: true
    });
  };

  setSelect = (select) => {
    this.setState({select: select});
  }

  onChange = (e) => {
    var {profile} = this.state
    profile.languages = e.val()
    console.log('e.val()',e.val());
    this.setState({
      values: e.val()
    });
  };

  handleSelectChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption.value)
    );
  };
  
  renderLanguages = () => {
    const {values, langs} = this.state
    const result = langs.filter(lang => values.includes(lang.id))
    if (result) {
      return (
        result.map((language, index) => {
          return (
            <span key={index} className="label label-pill label-success m-r-5">{language.name}</span>
          )
        })
      )
    }
  }

  render() {
    const { loading, errors, profile, add, editting, values, langs, validate, onValidate, selectedOption  } = this.state;
    console.log("onValidate State", onValidate);
    const { pathname } = this.props.location;
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />
        <Right />
        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {!loading && profile && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-user"></i>
                </div>
                <div className="header-title">
                  <h1>Thông tin cá nhân</h1>
                  <small>Hiển thị thông tin cá nhân</small>
                  <ol className="breadcrumb">
                    <li>
                      <a href="/">
                        <i className="pe-7s-home"></i> Home
                      </a>
                    </li>
                    <li className="active">Profile</li>
                  </ol>
                </div>
              </div>
              <div id="edit-profile" className="row">
                <div className="col-sm-12 col-md-4 p-0">
                  <div className="col-sm-12">
                    <div className="card">
                      {/* Info Header */}
                      <div className="card-header">
                        <div className="card-header-menu">
                          <button className="d-content" onClick={()=>{this.handleEdit()}}>
                            <i className="fa fa-edit"></i>
                          </button>
                          
                        </div>
                        <div className="card-header-headshot">
                          <img src="http://localhost:3001/assets/dist/img/avatar.png"></img>
                        </div>
                      </div>
                      {editting === false ?
                      <div className="card-content">
                        <div className="card-content-member">
                          {/* fullname */}
                          <h4 className="m-t-0">{profile.fullname}</h4>
                          {/* fullname */}
                          {/* store_name */}
                          <p className="m-0">
                            <i className="pe-7s-map-marker"></i>{profile.store}
                            <span className="m-5"> - </span>
                            <i className="pe-7s-id"></i>{profile.role}
                          </p>
                          {/* store_name */}
                        </div>
                        <div className="card-content-languages">
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Số ĐT:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.phone ? <li>{profile.phone}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Email:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.email ? <li>{profile.email}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>CMND:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.cmnd ? <li>{profile.cmnd}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Địa chỉ:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.address ? <li>{profile.address}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Quê quán:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.born ? <li>{profile.born}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Trình độ học vấn:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.education ? <li>{profile.education}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Ngoại ngữ:</h4>
                            </div>
                            <div>
                                {this.renderLanguages()}
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="card-content">
                        <div className="card-content-member">
                          <h4 className="m-t-0">Thay đổi thông tin</h4>
                        </div>
                        <div className="card-content-languages">
                          <form>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Họ tên:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  placeholder="Họ tên"
                                  name="fullname"
                                  type="text"
                                  label=""
                                  value={profile.fullname}
                                  onChange={this.handleInputChange}
                                  error={errors.code}
                                  disabled={true}
                                />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Chi nhánh:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  placeholder="Chi nhánh"
                                  name="store"
                                  type="text"
                                  label=""
                                  value={profile.store}
                                  onChange={this.handleInputChange}
                                  error={errors.code}
                                  // disabled={true}
                                />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Chức danh:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                              <Select
                                value={selectedOption}
                                onChange={this.handleSelectChange}
                                options={options}
                              />
                              {/* <Select
                                id="role"
                                name="role"
                                placeholder="----- Chức danh -----"
                                label=""
                                defaultValue=""
                                defaultMessage="----- Chức danh -----"
                                data={roles}
                                value={values}
                                onChange={this.onChange}
                                setSelect={this.setSelect}
                                error={errors.language}
                                parent="edit-profile"
                              /> */}
                                {/* <Input
                                  placeholder="Chức danh"
                                  name="role"
                                  type="text"
                                  label=""
                                  value={profile.role}
                                  onChange={this.handleInputChange}
                                  error={errors.code}
                                /> */}
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Số ĐT:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  id="phone"
                                  placeholder="Số ĐT"
                                  name="phone"
                                  type="number"
                                  label=""
                                  value={profile.phone}
                                  onChange={this.handleInputChange}
                                  onValidate={this.onValidate}
                                  validate={true}
                                  error={errors.code}
                                />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Email:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                              <Input
                                id="inputEmail"
                                placeholder="Email"
                                name="email"
                                type="email"
                                label=""
                                value={profile.email}
                                onChange={this.handleInputChange}
                                onValidate={this.onValidate}
                                validate={true}
                                error={errors.code}
                              />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>CMND:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  placeholder="CMND"
                                  name="cmnd"
                                  type="number"
                                  label=""
                                  value={profile.cmnd}
                                  onChange={this.handleInputChange}
                                  onValidate={this.onValidate}
                                  validate={true}
                                  error={errors.code}
                                />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Địa chỉ:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  placeholder="Địa chỉ"
                                  name="address"
                                  type="text"
                                  label=""
                                  value={profile.address}
                                  onChange={this.handleInputChange}
                                  error={errors.code}
                                />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Quê quán:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  placeholder="Quê quán"
                                  name="born"
                                  type="text"
                                  label=""
                                  value={profile.born}
                                  onChange={this.handleInputChange}
                                  error={errors.code}
                                />
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Trình độ học vấn:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                                <Input
                                  placeholder="Trình độ học vấn"
                                  name="education"
                                  type="text"
                                  label=""
                                  value={profile.education}
                                  onChange={this.handleInputChange}
                                  error={errors.code}
                                />
                            </div>
                          </div>
                          
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Ngoại ngữ:</h4>
                            </div>
                            <div className="form-group col-sm-12 m-0">
                              {/* <Select
                                id="language"
                                name="language"
                                placeholder="----- Chọn ngôn ngữ -----"
                                label=""
                                defaultValue=""
                                defaultMessage="----- Chọn ngôn ngữ -----"
                                data={langs}
                                value={values}
                                onChange={this.onChange}
                                setSelect={this.setSelect}
                                error={errors.language}
                                multiple={true}
                                parent="edit-profile"
                              /> */}
                            </div>
                          </div>
                          <div className="update-info d-flex">
                          {onValidate === false ? 
                            <button
                              disabled
                              type="button"
                              className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                              onClick={() => {
                                this.handleUpdate();
                              }}
                            >
                              Cập nhật
                            </button>
                          : 
                            <button
                              type="button"
                              className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                              onClick={() => {
                                this.handleUpdate();
                              }}
                            >
                              Cập nhật
                            </button>
                          }
                            {/* <button
                              type="button"
                              className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                              onClick={() => {
                                this.handleUpdate();
                              }}
                            >
                              Cập nhật
                            </button> */}
                            <button
                              type="button"
                              className="btn btn-danger btn-rounded w-md m-t-5 m-r-5"
                              onClick={() => {
                                this.handleCancel();
                              }}
                            >
                              Hủy
                            </button>
                          </div>
                          </form>
                        </div>
                      </div>
                      
                      }
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-8 p-0">
                  <div className="col-sm-12 m-b-20">
                    {/* <!-- Nav tabs --> */}
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#tab1" data-toggle="tab">
                          <i className="pe-7s-study p-r-5"></i>
                          Bằng cấp - Chứng chỉ
                        </a>
                      </li>
                      <li>
                        <a href="#tab2" data-toggle="tab">
                          <i className="pe-7s-star p-r-5"></i>
                          Kinh nghiệm làm việc
                        </a>
                      </li>
                      <li>
                        <a href="#tab3" data-toggle="tab">
                          <i className="pe-7s-graph2 p-r-5"></i>
                          Quá trình
                        </a>
                      </li>
                    </ul>
                    {/* <!-- Tab panels --> */}
                    <div className="tab-content">
                      <div className="tab-pane fade in active" id="tab1">
                        <Certificates />
                      </div>
                      <div className="tab-pane fade in" id="tab2">
                        <Experiences />
                      </div>
                      <div className="tab-pane fade in" id="tab3">
                        <Timelines />
                      </div>
                    </div>
                  </div>
                  {/* <Timeline /> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { 
  getCurrentProfile,
  updateProfile
})(withRouter(Profile));
