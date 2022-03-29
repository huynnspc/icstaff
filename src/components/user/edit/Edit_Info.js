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

import { getUser, editUser } from '../../../actions/userActions';


class Edit_Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      select: "",
      information: {},
      contact_information: {},
      family_information: [],
      education_background: [],
      work_experience: [],
      errors: {}
    }

    this.timer = null
  }

  componentDidMount() {
    const { location } = this.props;
    this.handleRequest(this.props.match.params.id);
  }

  componentWillUnmount() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps',nextProps);
    if(nextProps.user.success.status == true){
      // this.props.history.goBack()
    }
    if (nextProps.user.loading !== this.state.loading) {
      this.setState({ loading: nextProps.user.loading });
      if (!nextProps.user.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }
    if(nextProps.user.user){
      if (nextProps.user.user.information != this.state.information) {
        this.setState({
          information: nextProps.user.user.information,
        });
      }

      if (nextProps.user.user.contact_information != this.state.contact_information) {
        this.setState({
          contact_information: nextProps.user.user.contact_information
        })
      }
        
      if (nextProps.user.user.family_information != this.state.family_information) {
        this.setState({
          family_information: nextProps.user.user.family_information,
        });
      }
      if (nextProps.user.user.education_background != this.state.education_background) {
        this.setState({
          education_background: nextProps.user.user.education_background,
        });
      }
      if (nextProps.user.user.work_experience != this.state.work_experience) {
        this.setState({
          work_experience: nextProps.user.user.work_experience,
        });
      }
    }
    
  }

  handleRequest(id) {
    this.props.getUser(id);
  }

  componentDidUpdate() {
    console.log('this.state',this.state);
  }

  onInfoChange = (info) => {
    const {errors} = this.state

    const validate = this.ValidationId(info)
    if(validate == false){
      this.setState({
        information: info,
        isValid: validate,
        errors:{
          ...errors,
          info: {
            id_number_Error: "Số CMND/CCCD không hợp lệ!"
          }
        },
      })
    }else{
      this.setState({
        information: info,
        isValid: validate,
        errors:{
          ...errors,
          info: {
            id_number_Error: ""
          }
        },
      })
    }
  }


  ValidationId = (value) => {
    if(value.id_number){
      if(value.id_number != ''){
        if(!validator.isLength(value.id_number, {min:9, max: 12})){
          return false
        }else{
          return true
        }
      }else{
        return false
      }
    }
  }

  ValidationMobile = (value) => {
    if(value.mobile){
      if(value.mobile != ''){
        if(!validator.isMobilePhone(value.mobile, "vi-VN")){
          return false
        }else{
          return true
        }
      }else{
        return false
      }
    }
  }

  onContactChange = (contact) => {
    console.log(contact);
    const {errors} = this.state
    const validate = this.ValidationMobile(contact)
    console.log("onContactChange", validate)
    if(validate == false){
      this.setState({
        contact_information: {
          ...contact, 
          user_id: this.state.information.id,
          delete_flag: 0
        },
        isValid: validate,
        errors:{
          ...errors,
          contact: {
            mobileError: "Số điện thoại không hợp lệ!"
          }
        }
      })
    }else{
      this.setState({
        contact_information: {
          ...contact, 
          user_id: this.state.information.id,
          delete_flag: 0
        },
        isValid: validate,
        errors:{
          ...errors,
          contact: {
            mobileError: ""
          }
        }
      })
    }

    this.setState({
      contact_information: {
        ...contact, 
        user_id: this.state.information.id,
        delete_flag: 0
      }
    })
  }

  onFamilyChange = (family) => {
    console.log('onFamilyChange',family);
    family && family.map(item => {
      item.user_id = this.state.information.id
      if(item.mobile){
        const isValid = this.familyValidation(item.mobile)
        this.setState({isValid})
      }
    })
    this.setState({
      family_information: family,
    })
  }

  familyValidation = (value) => {
    const { errors } = this.state
    
    if(!validator.isMobilePhone(value, "vi-VN")){
      this.setState({
        errors:{
          ...errors,
          familyErrors: {
            mobileCheck: false,
            mobileError: "Số điện thoại không hợp lệ!"
          }
        },
        isValid: false
      })
      return false
    }
    return true
  }

  onFamilyDelete = (family) => {
    this.setState({
      family_information: family
    })
  }

  onEducationChange = (education) => {
    console.log(education);
    education && education.map((item) => {
      item.user_id = this.state.information.id
    })
    this.setState({
      education_background: education
    })
  }

  onEducationDelete = (education) => {
    console.log('onEducationDelete', education);
    this.setState({
      education_background: education
    })
  }

  onExperienceChange = (work_experience) =>{
    console.log(work_experience);
    work_experience && work_experience.map(item => {
      item.user_id = this.state.information.id
    })
    this.setState({
      work_experience: work_experience
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      information,
      contact_information,
      family_information,
      education_background,
      work_experience,
      errors,
      isValid
    } = this.state
    const result = {
        information: information,
        contact_information: contact_information,
        family_information: family_information,
        education_background: education_background,
        work_experience: work_experience,
    }
    const info = {
      data: (JSON.stringify(result))
    }
    if(isValid != undefined){
      if(isValid == true){
        await this.props.editUser(info)
        if(this.props.user.success == true){
           this.props.history.goBack()
        }
      }else{
        errors.familyErrors && window.toast("Đã có lỗi xảy ra!", "Vui lòng kiểm tra lại các trường", 5000, "error");
      }
    }
    
  }

  goBack = (e) => {
    e.preventDefault();
    this.props.history.goBack()
  }

  render() {
    const { pathname } = this.props.location;
    const { information, contact_information, family_information, education_background, work_experience, errors } = this.state

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
                      <li className={classnames({"active" : pathname.includes("/information") || pathname.includes("/edit")})}>
                        <Link to={`#`}>Thông tin chung</Link>
                      </li>
                      <li>
                        <a>Hợp đồng</a>
                      </li>
                      <li>
                        <a>Bảo hiểm</a>
                      </li>
                      <li>
                        <a>Tiếp nhận</a>
                      </li>
                    </ul>
                  </div>
                </div>
                  <form onSubmit={this.onSubmit}>
                    {/* Thông tin cá nhân */}
                    <Information 
                      information={information} 
                      onChange={this.onInfoChange}
                      errors={errors.info}
                    />

                    {/* Thông tin liên hệ */}
                    <Contact_Information 
                      contact={contact_information} 
                      onChange={this.onContactChange}
                      errors={errors.contact}
                    />
                    
                    {/* Thông tin gia đình */}
                    <Family_Information 
                      family={family_information} 
                      onChange={this.onFamilyChange}
                      onDelete={this.onFamilyDelete}
                    />
                    
                    
                    {/* Trình độ học vấn */}
                    <Education_Background 
                      education={education_background} 
                      onChange={this.onEducationChange}
                      onDelete={this.onEducationDelete}
                    />
                    
                    {/* Kinh nghiệm làm việc */}
                    <Work_Experience 
                      experience={work_experience} 
                      onChange={this.onExperienceChange}
                    />

                  <div className="panel-body add-button">
                    <div className="col-md-12 flex-container" style={{ justifyContent: "center" }}>
                      <button type="submit" className="btn btn-success btn-rounded w-md m-r-15" >Cập nhật</button>
                      <button className="btn btn-danger btn-rounded w-md" onClick={this.goBack}>Hủy</button>
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

export default connect(mapStateToProps, { getUser, editUser })(withRouter(Edit_Info));