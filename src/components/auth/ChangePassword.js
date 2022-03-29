import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changePassword, logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

import Input from '../common/Input';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password: "",
      confirm_password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  goBack(e) {
      e.preventDefault();
      this.props.history.goBack();
  }

  logoutUser(e) {
      e.preventDefault();

      this.props.clearCurrentProfile();
      this.props.logoutUser(this.props.history);
  }

  submit(e) {
      e.preventDefault();
      window.start_preloader();
  
      const userData = {
        old_password: this.state.old_password,
        new_password: this.state.new_password,
        confirm_password: this.state.confirm_password,
      };
  
      console.log('userData: ', userData);
  
      this.props.changePassword(userData, this.props.history);
  }

  render() {
    const { old_password, new_password, 
        confirm_password, errors } = this.state;
    const { isChangePassword } = this.props.auth;

    console.log("errors: ", errors);

    return (
      <div className="register-wrapper">
        <div className="container-center lg">
          <div className="panel panel-bd">
            <div className="panel-heading">
              <div className="view-header">
                <div className="header-icon">
                  <i className="pe-7s-pen"></i>
                </div>
                <div className="header-title">
                  <h3>Đổi mật khẩu</h3>
                  <small>
                    <strong>
                      &nbsp;Bạn vui lòng nhập đầy đủ
                      <br /> thông tin phía dưới.
                    </strong>
                  </small>
                </div>
              </div>
            </div>

            <div className="panel-body">
              <form
                ref={(element) => (this.form = element)}
                onSubmit={this.submit}
                noValidate
              >
                <Input
                  placeholder="*********************"
                  name="old_password"
                  type="password"
                  label="Mật khẩu hiện tại"
                  icon="fa fa-key"
                  value={old_password}
                  onChange={this.onChange}
                  error={errors.old_password}
                />

                <Input
                  placeholder="*********************"
                  name="new_password"
                  type="password"
                  label="Mật khẩu mới"
                  icon="fa fa-key"
                  value={new_password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <Input
                  placeholder="*********************"
                  name="confirm_password"
                  type="password"
                  label="Xác nhận mật khẩu"
                  icon="fa fa-key"
                  value={confirm_password}
                  onChange={this.onChange}
                  error={errors.confirm_password}
                />

                <div>
                  <Link
                    href="#"
                    onClick={this.logoutUser}
                    className="btn btn-primary pull-left"
                  >
                    Thoát hệ thống
                  </Link>

                  {!isChangePassword && (
                    <Link
                      href="#"
                      onClick={this.goBack}
                      className="btn btn-primary pull-right"
                    >
                      Trở về
                    </Link>
                  )}

                  <Link
                    href="#"
                    onClick={this.submit}
                    className="btn btn-success pull-right m-r-5"
                  >
                    Đổi mật khẩu
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {
  changePassword,
  logoutUser,
  clearCurrentProfile,
})(withRouter(ChangePassword));