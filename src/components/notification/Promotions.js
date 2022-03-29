import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';
import moment from "moment";
import PropTypes from "prop-types";
import Toggle, {Bootstrap2Toggle} from 'react-bootstrap-toggle';
import "./css/custom.css"

import {
  getHRNotificationPages,
  getHRNotifications,
  getMoreHRNotifications,

  getPromotionsNotiPages,
  getPromotionsNotifications,
  getMorePromotionsNotifications,
  addNotification,

} from "../../actions/notificationActions";

import Navbar from "../layout/Navbar";
import Left from "../layout/LeftMenu";
import Editors from "./Editors";
import Promotion_Editors from "./Promotion_Editors";
import Promotion_Item from "./Promotion_Item"

class Promotions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleActive: false,
      switch1: true,
      set: false,
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
    this.getPromotionCategory();
    this.scrollListener = window.addEventListener("scroll", this.scrollListener);
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.pr.loading !== this.state.loading) {
      this.setState({ loading: nextProps.pr.loading });

      if (!nextProps.pr.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }

    if (nextProps.pr.notifications !== this.state.notifications) {
      this.setState({
        notifications: nextProps.pr.notifications,
      });
    }

    if (nextProps.pr.pages !== this.state.pages) {
      if(nextProps.pr.pages > 0){
        this.setState({ pages: nextProps.pr.pages });
      }
      
    }

    if (nextProps.pr.page !== this.state.page) {
      console.log('nextProps.pr.page',nextProps.pr.page);
      this.setState({ page: nextProps.pr.page });
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
    // console.log('componentDidUpdate: ', this.state);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  }

  scrollListener(e) {
    this.handleScroll(e);
  }

  getPromotionCategory = () => {
    axios.get(global.uri + `/admin/notifications/categories/all`)
    .then((res) => {
      const { payload } = res.data;
      payload.map(category => {
        if(category.name === "CTKM"){
          this.setState({
            pr_category: category.id
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
    await this.props.getPromotionsNotiPages(this.state.pr_category);
    this.handleRequest(this.state.page);
  }

  handleRequest(page) {
    this.props.getPromotionsNotifications(this.state.pr_category, page);
  }

  handleMore(page) {
    this.props.getMorePromotionsNotifications(this.state.pr_category, page);
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
          // console.log("scrolling");
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
    }
  };

  async onSubmit(data) {
    console.log('submit data: ', data);
    var payload = new FormData();

    if (data.files) {
      for (var i = 0; i < data.files.length; i++) {
        payload.append("file", data.files[i], data.files[i].name);
      }
    }
    if(this.state.pr_category){
      payload.append("category_id", this.state.pr_category);
    }
    payload.append("title", data.title);
    payload.append("content", data.content);
    
    await this.props.addNotification(payload);

    if(this.props.notification.success){
      this.setState({pages: 0});
      this.handlePages();
    }
  }

  toggleActive = (toggleActive, notifyId) => {
    const payload = {
      id: notifyId
    }

    if(!toggleActive){
      axios.put(global.uri + `/admin/notifications/disable`, payload)
        .then(res => {
          this.handlePages()
        })
        .catch(err => {
          console.log(err.response.data)
        });
    }else{
      axios.put(global.uri + `/admin/notifications/enable`, payload)
        .then(res => {
          this.handlePages()
        })
        .catch(err => {
          console.log(err.response.data)
        });
    }
    
  }

  renderData() {
    const { notifications } = this.state;
    if (notifications) {
      return (
        <ul className="notification-container p-0">
          {notifications.map((notify, index) => {
            return (
              <li key={index} style={{ display: "flex" }}>
                <Promotion_Item notify={notify} toggleActive={this.toggleActive} />
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
                <h1>THÔNG BÁO CHƯƠNG TRÌNH KHUYẾN MÃI</h1>
                <small>
                  Hiển thị thông báo Chương Trình Khuyến Mãi.
                </small>

                <ol className="breadcrumb">
                  <li className="active">
                    <i className="pe-7s-home"></i> Thông báo
                  </li>
                  <li className="active">
                    <i></i> Chương Trình Khuyến Mãi
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

Promotions.propTypes = {
  getPromotionsNotiPages: PropTypes.func.isRequired,
  getPromotionsNotifications: PropTypes.func.isRequired,
  getMorePromotionsNotifications: PropTypes.func.isRequired,

  getHRNotificationPages: PropTypes.func.isRequired,
  getHRNotifications: PropTypes.func.isRequired,
  getMoreHRNotifications: PropTypes.func.isRequired,

  addNotification: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
  // hr: state.hr,
  pr: state.pr,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getPromotionsNotiPages,
  getPromotionsNotifications,
  getMorePromotionsNotifications,
  getHRNotificationPages,
  getHRNotifications,
  getMoreHRNotifications,
  addNotification
})(withRouter(Promotions));
