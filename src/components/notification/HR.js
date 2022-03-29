import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import moment from "moment";
import PropTypes from "prop-types";

import {
  getHRNotificationPages,
  getHRNotifications,
  getMoreHRNotifications,
  addNotification,
} from "../../actions/notificationActions";

import Navbar from "../layout/Navbar";
import Left from "../layout/LeftMenu";
import Editors from "./Editors";

class HR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      page: 0,
      pages: 0,
      notifications: [],
      scrolling: false,
      errors: {},
    };

    this.scrollListener = this.scrollListener.bind(this);
    this.handlePages = this.handlePages.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleMore = this.handleMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  componentDidMount() {
    window.loading();

    this.handlePages();
    this.getHRCategory();

    window.addEventListener("scroll", this.scrollListener);
    console.log("this.scrollListener-amount: ", this.scrollListener);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hr.loading !== this.state.loading) {
      this.setState({ loading: nextProps.hr.loading });

      if (!nextProps.hr.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }

    if (nextProps.hr.notifications !== this.state.notifications) {
      this.setState({
        notifications: nextProps.hr.notifications,
      });
    }

    if (nextProps.hr.pages !== this.state.pages) {
      this.setState({ pages: nextProps.hr.pages });
    }

    if (nextProps.hr.page !== this.state.page) {
      this.setState({ page: nextProps.hr.page });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

      if (nextProps.errors.errors) {
        window.stop_preloader();
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate page: ', this.state.page);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  }

  scrollListener(e) {
    this.handleScroll(e);
  }

  getHRCategory = () => {
    axios.get(global.uri + `/admin/notifications/categories/all`)
    .then((res) => {
      const { payload } = res.data;
      payload.map(category => {
        if(category.name === "Hành Chính"){
          this.setState({
            hr_category: category.id
          })
        }
      })
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  }
  
  async handlePages() {
    await this.setState({pages: 0, page: 0});
    await this.props.getHRNotificationPages(this.state.hr_category);
    this.handleRequest(this.state.page);
  }


  handleRequest(page) {
    this.props.getHRNotifications(this.state.hr_category, page);
  }

  handleMore(page) {
    this.props.getMoreHRNotifications(this.state.hr_category, page);
  }

  handleScroll = (e) => {
    const { scrolling, page, pages } = this.state;
    if (scrolling) return;
    if (pages <= page) return;

    const listHeight = document.querySelector("ul.notification-container");

    if (listHeight != null) {
      if (listHeight.offsetTop == null) return;

      if (listHeight.offsetTop != null) {
        const scroll = window.scrollY + window.innerHeight / 4;

        if (listHeight.clientHeight < scroll) {
          this.loadMore();
        }
      }
    }
  };

  loadMore = () => {
    const { page, pages } = this.state;

    if (page == pages - 1) return;
    if (page < pages) {
      this.setState({
        page: page + 1,
      });

      this.handleMore(page + 1);

      // console.log('Page', this.state.page)
      // console.log('Pages', this.state.pages)
    }
  };

  async onSubmit(data) {
    var payload = new FormData();

    if (data.files) {
      for (var i = 0; i < data.files.length; i++) {
        payload.append("file", data.files[i], data.files[i].name);
      }
    }

    payload.append("category_id", this.state.hr_category);
    payload.append("title", data.title);
    payload.append("content", data.content);

    console.log('submit payload: ',payload.values());
    for (var value of payload.values()) {
      console.log(value); 
    }

    await this.props.addNotification(payload);
    
    if(this.props.notification.success){
      this.setState({pages: 0});
      this.handlePages();
    }
  }

  renderData() {
    const { notifications } = this.state;

    if (notifications) {
      return (
        <ul className="notification-container p-0">
          {notifications.map((notify, index) => {
            return (
              <li key={index} index={index} style={{ display: "flex" }}>
              {/* Modal Popup */}
              <div className="modal fade" id={`modal-${notify.id}`} role="dialog">
                  <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title">
                          {notify.senderName} ({moment(notify.sendDate).format("DD/MM/YYYY")})
                        </h4>
                      </div>
                      <div className="modal-body" dangerouslySetInnerHTML={{ __html: notify.content }} />
                      
                      <div className="modal-footer">
                        {
                          notify.file &&
                          notify.file.map((file, index) => {
                            return (
                                <div className="files" key={index}>
                                  <a href={global.uri + "/api/notifications/files/" + file.id} >
                                    {file.name + file.extension}
                                  </a>
                                </div>
                            );
                          })
                        }
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              {/* End Modal Popup */}
                <div className="modal-panel">    
                  <div className="panel panel-bd lobidrag">
                    {/* Title */}
                    <div className="panel-heading">
                      <div className="panel-title">
                        <h4>
                          {notify.senderName} ({moment(notify.sendDate).format("DD/MM/YYYY")})
                        </h4>
                      </div>
                    </div>

                    {/* Body content */}
                    <div className="panel-body" 
                      dangerouslySetInnerHTML={{ __html: notify.content }} 
                    />
                      
                    {/* Files attachment */}
                    <div className="panel-footer">
                        {notify.file &&
                          notify.file.map((file, index) => {
                            return (
                              <div className="files" key={index}>
                                <a href={global.uri + "/api/notifications/files/" + file.id}>
                                  {file.name + file.extension}
                                </a>
                              </div>
                            );
                          })
                        }
                      <div className="detail" data-toggle="modal" data-target={`#modal-${notify.id}`}>Xem chi tiết</div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }

  render() {
    const { pathname } = this.props.location;
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>

        <div id="page-wrapper">
          <div className="content">
            <div className="content-header">
              <div className="header-icon">
                <i className="pe-7s-note2"></i>
              </div>
              <div className="header-title">
                <h1>THÔNG BÁO HÀNH CHÍNH - NHÂN SỰ</h1>
                <small>
                  Hiển thị thông báo từ phòng hành chính - nhân sự.{" "}
                </small>

                <ol className="breadcrumb">
                  <li className="active">
                    <i className="pe-7s-home"></i> Thông báo
                  </li>
                  <li className="active">
                    <i></i> Hành chính - Nhân sự
                  </li>
                </ol>
              </div>
              <div className="clearfix"></div>
            </div>

            {/* Editor */}
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <Editors onSubmit={this.onSubmit} pathname={pathname} />
              </div>
            </div>

            {/* Notification list */}
            <div className="row">
              <div className="col-md-12 col-lg-8">
                {this.renderData()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HR.propTypes = {
  getHRNotificationPages: PropTypes.func.isRequired,
  getHRNotifications: PropTypes.func.isRequired,
  getMoreHRNotifications: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
  hr: state.hr,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getHRNotificationPages,
  getHRNotifications,
  getMoreHRNotifications,
  addNotification
})(withRouter(HR));
