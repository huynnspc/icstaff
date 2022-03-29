import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import "../custom.css";

import Navbar from "../../layout/Navbar";
import Left from "../../layout/LeftMenu";
import UserHeaderMenu from "../UserHeaderMenu";
import UserContentMenu from "../UserContentMenu";
import Information from "./Information";
import Information_Extra from "./Information_Extra";
import Family_Information from "./Family_Information";
import Education_Background from "./Education_Background";
import Work_Experience from "./Work_Experience";

import { getUser } from "../../../actions/userActions";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.handleRequest(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loading !== this.state.loading) {
      this.setState({ loading: nextProps.user.loading });
      if (!nextProps.user.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }
    if (nextProps.user.user !== this.state.user) {
      const user = nextProps.user.user;
      this.setState({
        user: user,
      });
    }
  }

  componentDidUpdate() {}

  handleRequest(id) {
    this.props.getUser(id);
  }

  render() {
    const { pathname } = this.props.location;
    const { user } = this.state;
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          <div className="content userinfo">
            <UserHeaderMenu
              pathname={pathname}
              userid={this.props.match.params.id}
            />
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-bd lobidrag">
                  <UserContentMenu
                    pathname={pathname}
                    userid={this.props.match.params.id}
                  />
                  {/* Thông tin chung */}
                  <Information data={user} />
                  {/* Thông tin khác */}
                  <Information_Extra data={user} />
                  {/* Thông tin gia đình */}
                  <Family_Information data={user} />
                  {/* Trình độ học vấn */}
                  <Education_Background data={user} />

                  {/* Kinh nghiệm làm việc */}
                  <Work_Experience data={user} />
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

export default connect(mapStateToProps, { getUser })(withRouter(UserInfo));
