import React, { Component } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import validator from 'validator';
import PropTypes from "prop-types";
import Select from "../../common/Select";
import '../custom.css';

import Navbar from "../../layout/Navbar";
import Left from "../../layout/LeftMenu";
import UserContentMenu from '../UserContentMenu';

import Information from './Information';
import Contact_Information from './Contact_Information'
import Family_Information from './Family_Information/Family_Information'
import Education_Background from './Education_Background/Education_Background'
import Work_Experience from './Work_Experience/Work_Experience'

import { getUser, addUser } from '../../../actions/userActions';


class InfoAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        isValidForm: true
      },
      user_id: '',
      user: [],
      select: "",
      information: {},
      contact_information: {},
      family_information: [],
      education_background: [],
      work_experience: []
    }
  }

  componentDidMount() {
    const { location } = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.success.payload){
      this.props.history.push(`/user/${nextProps.user.success.payload}/info`)
    }
    if (nextProps.user.success.payload !== this.state.user_id) {
      this.setState({
        user_id: nextProps.user.success.payload
      });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors.message, 4000, "error");
      }
    }
  }

  componentDidUpdate() {
  }

  handleRequest(id) {
    this.props.getUser(id);
  }

  onInfoChange = (info) => {
    this.validation(info)
    this.setState({
      information: info
    })
  }
  onContactChange = (contact) => {
    this.validation(contact)
    this.setState({
      contact_information: contact
      
    })
  }
  onFamilyChange = (family) => {
    this.setState({
      family_information: family
    })
  }
  onEducationChange = (education) => {
    this.setState({
      education_background: education
    })
  }
  onExperienceChange = (work_experience) =>{
    this.setState({
      work_experience: work_experience
    })
  }

  validation = (value) => {
    if(value.id_number){
      if(!validator.isInt(value.id_number)){
        this.setState({
          errors: {
            ...this.state.errors,
            infoErrors: {
              ...this.state.infoErrors,
              id_number: "CMND phai la so nguyen"
            },
            isValidForm: false
          }
        })
      }else if(!validator.isLength(value.id_number, {min:9, max: 12})){
        this.setState({
          errors: {
            ...this.state.errors,
            infoErrors: {
              ...this.state.infoErrors,
              id_number: "CMND phai co 9 hoac 12 so"
            },
            isValidForm: false
          }
        })
      }else{
        this.setState({
          errors: {
            ...this.state.errors,
            infoErrors: {
              ...this.state.infoErrors,
              id_number: ""
            },
            isValidForm: true
          }
        })
      }
    }
    if(value.mobile){
      if(!validator.isMobilePhone(value.mobile, "vi-VN")){
        this.setState({
          errors: {
            ...this.state.errors,
            contactErrors: {
              ...this.state.contactErrors,
              mobile: "So dien thoai khong hop le"
            },
            isValidForm: false
          }
        })
      }else{
        this.setState({
          errors: {
            ...this.state.errors,
            contactErrors: {
              ...this.state.contactErrors,
              mobile: ""
            },
            isValidForm: true
          }
        })
      }
    }
    if(value.email){
      if(!validator.isEmail(value.email)){
        this.setState({
          errors: {
            ...this.state.errors,
            contactErrors: {
              ...this.state.contactErrors,
              email: "Email khong hop le"
            },
            isValidForm: false
          }
        })
      }else{
        this.setState({
          errors: {
            ...this.state.errors,
            contactErrors: {
              ...this.state.contactErrors,
              email: ""
            },
            isValidForm: true
          }
        })
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.family_information.length === 0)
      window.toast(global.title, "Ch??a nh???p th??ng tin gia ????nh", 4000, "error");
    else if (this.state.education_background.length === 0) 
      window.toast(global.title, "Ch??a nh???p tr??nh ????? h???c v???n", 4000, "error");
    else if (this.state.work_experience.length === 0)
      window.toast(global.title, "Ch??a kinh nghi???m l??m vi???c", 4000, "error");
    else {
      const result = {
        information: this.state.information,
        contact_information: this.state.contact_information,
        family_information: this.state.family_information,
        education_background: this.state.education_background,
        work_experience: this.state.work_experience,
      }

      const information = { data: JSON.stringify(result) }
      if(!this.state.errors.isValidForm)
        window.toast(global.title, "G???p l???i khi t???o t??i kho???n", 4000, "error");
      else this.props.addUser(information)
    }
    // this.props.addUser(information)
  }

  goBack = (e) => {
    e.preventDefault();
    this.props.history.push(`/users`);
  }

  render() {
    const { pathname } = this.props.location;
    const { user, errors } = this.state;

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>

        <div id="page-wrapper">
          <div className="content userinfo">
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-bd lobidrag">
                <div className="panel-heading">
                  <div className="panel-title">
                    <ul className="menu">
                      <li className={classnames({"active": pathname.includes("/information")})}>
                        <Link to={`/users/add/information`}>Th??ng tin chung</Link>
                      </li>
                      {/* <li className={classnames({"active": pathname.includes("/contract")})}>
                      <Link to={`/users/add/contract`}>H???p ?????ng</Link>
                      </li>
                      <li className={classnames({"active": pathname.includes("/insurance")})}>
                        <Link to={`/users/add/insurance`}>B???o hi???m</Link>
                      </li>
                      <li>
                        <a>Ti???p nh???n</a>
                      </li> */}
                    </ul>
                  </div>
                </div>
                  <form onSubmit={this.onSubmit}>
                  {/* Th??ng tin c?? nh??n */}
                  <Information onChange={this.onInfoChange} errors={errors && errors.infoErrors} />

                  {/* Th??ng tin li??n h??? */}
                  <Contact_Information onChange={this.onContactChange} errors={errors && errors.contactErrors} />
                  
                  {/* Th??ng tin gia ????nh */}
                  <Family_Information onChange={this.onFamilyChange}/>
                  
                  {/* Tr??nh ????? h???c v???n */}
                  <Education_Background onChange={this.onEducationChange}/>
                  
                  {/* Kinh nghi???m l??m vi???c */}
                  <Work_Experience onChange={this.onExperienceChange}/>

                  <div className="panel-body add-button">
                    <div className="col-md-12 flex-container" style={{ justifyContent: "center" }}>
                      <button type="submit" className="btn btn-success btn-rounded w-md m-r-15">C???p nh???t</button>
                      <button className="btn btn-danger btn-rounded w-md" onClick={this.goBack}>H???y</button>
                    </div>
                  </div>
                  
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUser, addUser })(withRouter(InfoAdd));