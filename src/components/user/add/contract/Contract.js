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


class Contract extends Component {
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
                        <Link to={`/users/add/information`}>Th??ng tin chung</Link>
                      </li>
                      <li className={classnames({"active": pathname.includes("/contract")})}>
                      <Link to={`/users/add/contract`}>H???p ?????ng</Link>
                      </li>
                      <li className={classnames({"active": pathname.includes("/insurance")})}>
                        <Link to={`/users/add/insurance`}>B???o hi???m</Link>
                      </li>
                      <li>
                        <Link href="#">Ti???p nh???n</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                  <form onSubmit={this.onSubmit}>
                    {/* Th??ng tin c?? nh??n */}
                    <div className="panel-body information">
                      <div className="form-group col-md-12">
                        <div className="header-title">Th??ng tin chung</div>
                      </div>
                      <div className="form-group col-md-4">
                        <div className="col-sm-6">
                          <label className="control-label">M?? H?? (*)</label>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="M?? H??"
                                  name="code"
                                  onChange={this.onInputChange}
                                  required
                              />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">H???p ?????ng (*)</label>
                          <Select
                              id="contract"
                              className="form-control"
                              name="contract"
                              placeholder="H???p ?????ng"
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
                          <label className="control-label">Tr???c thu???c</label>
                          <Select
                              id="belong"
                              className="form-control"
                              name="belong"
                              placeholder="Tr???c thu???c"
                              data={belong}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                              required
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label className="control-label">V??? tr?? c??ng vi???c</label>
                          <Select
                              id="position"
                              className="form-control"
                              name="belong"
                              placeholder="V??? tr?? c??ng vi???c"
                              data={belong}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                              required
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <label className="control-label">Ch???c v???</label>
                          <Select
                              id="level"
                              className="form-control"
                              name="belong"
                              placeholder="Ch???c v???"
                              data={belong}
                              onChange={this.onSelectChange}
                              setSelect={this.setSelect}
                              parent="wrapper"
                              required
                          />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Hi???u l???c t??? ng??y</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Ng??y c???p"
                              name="id_issue_date"
                              onChange={this.onInputChange}
                              required
                            />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">?????n ng??y</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Ng??y c???p"
                              name="id_issue_date"
                              onChange={this.onInputChange}
                              required
                            />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Ng??y k??</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Ng??y c???p"
                              name="id_issue_date"
                              onChange={this.onInputChange}
                              required
                            />
                          <div className="errorMessage text-danger m-t-5">
                            <span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel-body information">
                      <div className="form-group col-md-12">
                        <div className="header-title">L????ng</div>
                      </div>
                    </div>

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

export default connect(mapStateToProps, { getUser, addUser })(withRouter(Contract));