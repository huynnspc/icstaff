import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser, lockScreen } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {};

        this.logoutUser = this.logoutUser.bind(this);
        this.lockScreen = this.lockScreen.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser(this.props.history);
    }

    lockScreen(e) {
        e.preventDefault();
        this.props.lockScreen(this.props.history);
    }

    render() {
        return (
            <nav className="navbar navbar-fixed-top" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <i className="material-icons">apps</i>
                    </button>
                    <Link className="navbar-brand" to="/">
                        <img className="main-logo" src="https://karaoke.com.vn/wp-content/themes/icool/assets/img/logo.png" alt="" />
                    </Link>
                </div>

                <div className="nav-container">
                    <ul className="nav navbar-nav hidden-xs">
                        <li><a id="fullscreen" href="#"><i className="material-icons">fullscreen</i> </a></li>
                    </ul>

                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="material-icons">chat</i>
                                <span className="label label-danger">9</span>
                            </a>

                            <ul className="dropdown-menu dropdown-messages">
                                <li className="rad-dropmenu-header"><a href="#">New Messages</a></li>

                                <li>
                                    <a href="#" className="rad-content">
                                        <div className="inbox-item">
                                            <div className="inbox-item-img">
                                            <img src="/assets/dist/img/avatar.png" className="img-circle" alt="" /></div>
                                            <strong className="inbox-item-author">Naeem Khan</strong>
                                            <span className="inbox-item-date">-13:40 PM</span>
                                            <p className="inbox-item-text">Hey! there I'm available...</p>
                                            <span className="profile-status available pull-right"></span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="rad-content">
                                        <div className="inbox-item">
                                            <div className="inbox-item-img">
                                            <img src="/assets/dist/img/avatar2.png" className="img-circle" alt="" /></div>
                                            <strong className="inbox-item-author">Sala Uddin</strong>
                                            <span className="inbox-item-date">-13:40 PM</span>
                                            <p className="inbox-item-text">Hey! there I'm available...</p>
                                            <span className="profile-status away pull-right"></span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="rad-content">
                                        <div className="inbox-item">
                                            <div className="inbox-item-img">
                                            <img src="/assets/dist/img/avatar3.png" className="img-circle" alt="" /></div>
                                            <strong className="inbox-item-author">Mozammel</strong>
                                            <span className="inbox-item-date">-13:40 PM</span>
                                            <p className="inbox-item-text">Hey! there I'm available...</p>
                                            <span className="profile-status busy pull-right"></span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="rad-content">
                                        <div className="inbox-item">
                                            <div className="inbox-item-img">
                                            <img src="/assets/dist/img/avatar4.png" className="img-circle" alt="" /></div>
                                            <strong className="inbox-item-author">Tanzil Ahmed</strong>
                                            <span className="inbox-item-date">-13:40 PM</span>
                                            <p className="inbox-item-text">Hey! there I'm available...</p>
                                            <span className="profile-status offline pull-right"></span>
                                        </div>
                                    </a>
                                </li>

                                <li className="rad-dropmenu-footer"><a href="#">View All messages</a></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="material-icons">add_alert</i>
                                <div className="notify"> <span className="heartbit"></span> <span className="point"></span> </div>
                            </a>

                            <ul className="dropdown-menu dropdown-alerts">
                                <li className="rad-dropmenu-header"><a href="#">Your Notifications</a></li>

                                <li>
                                    <a className="rad-content" href="#">
                                        <div className="pull-left"><i className="fa fa-html5 fa-2x color-red"></i>
                                        </div>
                                        <div className="rad-notification-body">
                                            <div className="lg-text">Introduction to fetch()</div>
                                            <div className="sm-text">The fetch API</div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a className="rad-content" href="#">
                                        <div className="pull-left"><i className="fa fa-bitbucket fa-2x color-violet"></i>
                                        </div>
                                        <div className="rad-notification-body">
                                            <div className="lg-text">Check your BitBucket</div>
                                            <div className="sm-text">Last Chance</div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a className="rad-content" href="#">
                                        <div className="pull-left"><i className="fa fa-google fa-2x color-info"></i>
                                        </div>
                                        <div className="rad-notification-body">
                                            <div className="lg-text">Google Account</div>
                                            <div className="sm-text"><span className="__cf_email__" 
                                                data-cfemail="402538212d302c2500272d21292c6e232f2d">[email&#160;protected]</span></div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a className="rad-content" href="#">
                                        <div className="pull-left"><i className="fa fa-amazon fa-2x color-green"></i>
                                        </div>
                                        <div className="rad-notification-body">
                                            <div className="lg-text">Amazon Simple Notification ...</div>
                                            <div className="sm-text">Lorem Ipsum is simply dummy text...</div>
                                        </div>
                                    </a>
                                </li>

                                <li className="rad-dropmenu-footer"><a href="#">See all notifications</a></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="material-icons">person_add</i>
                            </a>

                            <ul className="dropdown-menu dropdown-user">
                                <li><Link to="/profile"><i className="ti-user"></i>&nbsp; Thông tin cá nhân</Link></li>
                                <li><Link to="/change-password"><i className="fa fa-key"></i>&nbsp; Đổi mật khẩu</Link></li>
                                <li><a href="/" onClick={this.lockScreen}><i className="ti-lock"></i>&nbsp; Khóa màn hình</a></li>
                                <li><a href="/" onClick={this.logoutUser}><i className="ti-layout-sidebar-left"></i>&nbsp; Thoát hệ thống</a></li>
                            </ul>
                        </li>

                        <li className="log_out">
                            <a href="/" onClick={this.logoutUser}>
                                <i className="material-icons">power_settings_new</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
  logoutUser,
  lockScreen,
  clearCurrentProfile,
})(withRouter(Navbar));