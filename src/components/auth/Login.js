import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authActions';

import Input from '../common/Input';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    const noti = localStorage.getItem("notification")
    if (noti) window.toast(global.title, noti, 4000, "error") || localStorage.removeItem("notification")
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.stop_preloader();
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    window.start_preloader();

    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="login-wrapper">
        <div className="container-center">
          <div className="panel panel-bd">
            <div className="panel-heading">
              <div className="view-header">
                <div className="header-icon">
                  <i className="pe-7s-unlock"></i>
                </div>
                <div className="header-title">
                  <h3>Login</h3>
                  <small>
                    <strong>
                      &nbsp;Vui lòng sử dụng tài khoản của bạn để truy cập vào
                      hệ thống.
                    </strong>
                  </small>
                </div>
              </div>
            </div>

            <div className="panel-body">
              <form onSubmit={this.onSubmit} noValidate>
                <Input
                  placeholder="Mã nhân viên (hoặc Email)"
                  name="username"
                  type="text"
                  label="Mã nhân viên (hoặc Email)"
                  icon="glyphicon glyphicon-user"
                  value={username}
                  onChange={this.onChange}
                  error={errors.username}
                />

                <Input
                  placeholder="*********************"
                  name="password"
                  type="password"
                  label="Mật khẩu"
                  icon="fa fa-key"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <div>
                  <button className="btn btn-primary pull-right">Login</button>
                </div>
              </form>
            </div>
          </div>
          <div id="bottom_text">
            Chưa có tài khoản? <a href="#">Đăng ký</a>
            <br />
            <a href="#">Quên mật khẩu</a>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);