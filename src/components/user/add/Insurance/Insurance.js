import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import Select from "../../../common/Select";
import '../../custom.css';

import Navbar from "../../../layout/Navbar";
import Left from "../../../layout/LeftMenu";
import { contract, belong } from "../Common";

import { getUser, addUser } from '../../../../actions/userActions';


class Insurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      select: "",
      contract: {}
    }
  }

  // componentDidMount() {
  //   const { location } = this.props;
  //   this.handleRequest(this.props.match.params.id);
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps.user);
  //   if (nextProps.user.user[0] !== this.state.user) {
  //     const user = nextProps.user.user[0]
  //     this.setState({
  //       user: user
  //     });
  //   }
  // }

  componentDidUpdate() {
    console.log('Log this.state: ', this.state);
    // console.log('Log this.props: ', this.props);
  }

  // handleRequest(id) {
  //   this.props.getUser(id);
  // }

  // onInfoChange = (info) => {
  //   console.log(info);
  //   this.setState({
  //     information: info
  //   })
  // }
  // onContactChange = (contact) => {
  //   console.log(contact);
  //   this.setState({
  //     contact_information: contact
      
  //   })
  // }
  // onFamilyChange = (family) => {
  //   console.log(family);
  //   this.setState({
  //     family_information: family
  //   })
  // }
  // onEducationChange = (education) => {
  //   console.log(education);
  //   this.setState({
  //     education_background: education
  //   })
  // }
  // onExperienceChange = (work_experience) =>{
  //   console.log(work_experience);
  //   this.setState({
  //     work_experience: work_experience
  //   })
  // }

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   const result = {
  //       information: this.state.information,
  //       contact_information: this.state.contact_information,
  //       family_information: this.state.family_information,
  //       education_background: this.state.education_background,
  //       work_experience: this.state.work_experience,
  //   }

  //   const information = {
  //     data: (JSON.stringify(result))
  //   }
  //   console.log(information);
    
  //   this.props.addUser(information)
  // }
  setSelect = (select) => {
    this.setState({ select: select });
  };

  onSelectChange = (e) => {
    const { contract } = this.state;
    const payload = {
      ...contract,
      [e[0].name]: e.val(),
    };
    this.setState({
      contract: payload,
    });
    // this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const { contract } = this.state;
    const payload = {
      ...contract,
      [e.target.name]: e.target.value,
    };
    this.setState({
      contract: payload,
    });
    // this.props.onChange(payload);
  };

  goBack = (e) => {
    e.preventDefault();
    this.props.history.push(`/users`);
  }

  render() {
    const { pathname } = this.props.location;

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
                        <Link to={`/users/add/information`}>Thông tin chung</Link>
                      </li>
                      <li className={classnames({"active": pathname.includes("/contract")})}>
                        <Link to={`/users/add/contract`}>Hợp đồng</Link>
                      </li>
                      <li className={classnames({"active": pathname.includes("/insurance")})}>
                        <Link to={`/users/add/insurance`}>Bảo hiểm</Link>
                      </li>
                      <li>
                        <a>Tiếp nhận</a>
                      </li>
                    </ul>
                  </div>
                </div>
                  <form onSubmit={this.onSubmit}>
                    {/* Thông tin cá nhân */}
                    <div className="panel-body information">
                      <div className="form-group col-md-12">
                        <div className="header-title">Thông tin bảo hiểm</div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="col-sm-6">
                          <label className="control-label">Số sổ BH (*)</label>
                          <input
                              type="number"
                              className="form-control"
                              placeholder="Số sổ BH"
                              name="number"
                              onChange={this.onInputChange}
                              required
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Trạng thái sổ</label>
                          <Select
                              id="status"
                              className="form-control"
                              name="status"
                              placeholder="Chọn trạng thái"
                              data={contract}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label className="control-label">Công ty pháp nhân</label>
                          <Select
                              id="belong"
                              className="form-control"
                              name="belong"
                              placeholder="Chọn pháp nhân"
                              data={belong}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Số thẻ BHYT</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Mã HĐ"
                              name="Số sổ BH"
                              onChange={this.onInputChange}
                              required
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Mã tỉnh cấp</label>
                          <Select
                              id="level"
                              className="form-control"
                              name="belong"
                              placeholder="Chọn tỉnh cấp"
                              data={belong}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label className="control-label">ĐK khám chữa bệnh</label>
                          <Select
                              id="dkkham"
                              className="form-control"
                              name="belong"
                              placeholder="Chọn nơi khám"
                              data={belong}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body add-button">
                      <div className="col-md-12 flex-container" style={{ justifyContent: "center" }}>
                        <button type="submit" className="btn btn-success btn-rounded w-md m-r-15">Cập nhật</button>
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

export default connect(mapStateToProps, { getUser, addUser })(withRouter(Insurance));