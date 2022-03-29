import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser, unlockScreen } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class LockScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
          password: "",
          errors: {},
        };

        this.logoutUser = this.logoutUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
  
    componentDidMount() {
        if (!this.props.auth.isLockScreen) {
          this.props.history.push("/");
        }
    }
  
    componentWillReceiveProps(nextProps) {
      if (!nextProps.auth.isLockScreen) {
        window.stop_preloader();
        this.props.history.goBack();
      }
  
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
        window.stop_preloader();
  
        if (nextProps.errors.errors) {
          window.toast(global.title, nextProps.errors.errors, 4000, "error");
        }
      }
    }

    logoutUser(e) {
        e.preventDefault();

        this.props.clearCurrentProfile();
        this.props.logoutUser(this.props.history);
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    onSubmit(e) {
      e.preventDefault();
      window.start_preloader();
  
      const userData = {
        password: this.state.password,
      };
  
      this.props.unlockScreen(userData);
    };

    render() {
        const { password, errors } = this.state;
        const { user } = this.props.auth;

        return (
          <div className="lock-wrapper-page">
            <div className="text-center">
              <a href="index.html" className="logo-lock">
                <i className="icon socicon-feedburner"></i>{" "}
                <span>AdminPage</span>{" "}
              </a>
            </div>

            <form
              className="text-center m-t-20"
              onSubmit={this.onSubmit}
              noValidate
            >
              <div className="user-thumb">
                <img
                  src={global.avatar_uri + user.avatar}
                  className="img-responsive img-circle img-thumbnail"
                  alt="thumbnail"
                />
              </div>

              <div className="form-group">
                <h3>{user.name}</h3>
                <p className="text-muted">
                  Bạn vui lòng nhập mật khẩu để truy cập trang chủ.
                </p>

                <div className="input-group m-t-20">
                  <input
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  <i className="fa fa-key"></i>

                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-success">
                      Log In
                    </button>
                  </span>
                </div>

                <div className="invalid-feedback">{errors.password}</div>
              </div>

              <div className="text-left">
                <a to="/" className="text-muted" onClick={this.logoutUser}>
                  Thoát hệ thống ?
                </a>
              </div>
            </form>
          </div>
        );
    }
}

LockScreen.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    unlockScreen: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {
  logoutUser,
  unlockScreen,
  clearCurrentProfile,
})(withRouter(LockScreen));