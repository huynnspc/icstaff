import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

import Navbar from "../layout/Navbar";
import Left from "../layout/LeftMenu";

export default class EditUser extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>

        <div id="page-wrapper">
          {/* <!-- main content --> */}
          <div className="content">
            {/* <!-- Content Header (Page header) --> */}
            <div className="content-header">
              {/* <div className="header-icon"><i className="pe-7s-user-female"></i></div>
                            <div className="header-title">
                                <h1>Profile</h1>
                                <small>Show user data in clear profile design</small>
                                <ol className="breadcrumb">
                                    <li><a href="index.html"><i className="pe-7s-home"></i>Home</a></li>
                                    <li><a href="#">UI Elements</a></li>
                                    <li className="active">Profile</li>
                                </ol>
                            </div> */}
            </div>
            {/* <!-- /. Content Header (Page header) --> */}
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-menu">
                      <i className="fa fa-bars"></i>
                    </div>
                    <div className="card-header-headshot"></div>
                  </div>
                  <div className="card-content">
                    <div className="card-content-member">
                      {/* Username */}
                      <h4 className="m-t-0">Username</h4>
                      {/* Username */}

                      {/* Phone */}
                      <p className="m-0">
                        <i className="pe-7s-call"></i>0988852963
                      </p>
                      {/* Phone */}
                    </div>
                    <div className="card-content-languages">
                      <div className="card-content-languages-group">
                        <div>
                          <h4>Speaks:</h4>
                        </div>
                        <div>
                          <ul>
                            <li>
                              English
                              <div className="fluency fluency-4"></div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="card-content-languages-group">
                        <div>
                          <h4>Learning:</h4>
                        </div>
                        <div>
                          <ul>
                            <li>Spanish,</li>
                            <li>Russian,</li>
                            <li>German</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-content-summary">
                      <p>
                        Specialties are Creative UI, HTML5, CSS3, Semantic Web,
                        Responsive Layouts, Web Standards Compliance,
                        Performance Optimization, Cross Device Troubleshooting.
                      </p>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="card-footer-stats">
                      <div>
                        <p>PROJECTS:</p>
                        <i className="fa fa-users"></i>
                        <span>241</span>
                      </div>
                      <div>
                        <p>MESSAGES:</p>
                        <i className="fa fa-coffee"></i>
                        <span>350</span>
                      </div>
                      <div>
                        <p>Last online</p>
                        <span className="stats-small">3 days ago</span>
                      </div>
                    </div>
                    <div className="card-footer-message">
                      <h4>
                        <i className="fa fa-comments"></i> Message me
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 m-b-20">
                {/* <!-- Nav tabs --> */}
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#tab1" data-toggle="tab">
                      Bằng cấp - Chứng chỉ
                    </a>
                  </li>
                  <li>
                    <a href="#tab2" data-toggle="tab">
                      Kinh nghiệm
                    </a>
                  </li>
                </ul>
                {/* <!-- Tab panels --> */}
                <div className="tab-content">
                  <div className="tab-pane fade in active" id="tab1">
                    <div className="panel-body">
                      <p>
                        <strong>
                          Lorem Ipsum is simply dummy text of the printing and.{" "}
                        </strong>
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus .
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab2">
                    <div className="panel-body">
                      <p>
                        <strong>
                          Lorem Ipsum is simply dummy text of the printing and.{" "}
                        </strong>
                      </p>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-8">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="rating-block">
                      <h4>Average user rating</h4>
                      <h2 className="m-b-20">
                        4.3 <small>/ 5</small>
                      </h2>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        aria-label="Left Align"
                      >
                        <span
                          className="glyphicon glyphicon-star"
                          aria-hidden="true"
                        ></span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        aria-label="Left Align"
                      >
                        <span
                          className="glyphicon glyphicon-star"
                          aria-hidden="true"
                        ></span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        aria-label="Left Align"
                      >
                        <span
                          className="glyphicon glyphicon-star"
                          aria-hidden="true"
                        ></span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        aria-label="Left Align"
                      >
                        <span
                          className="glyphicon glyphicon-star"
                          aria-hidden="true"
                        ></span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        aria-label="Left Align"
                      >
                        <span
                          className="glyphicon glyphicon-star"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <h4 className="m-t-0">Rating breakdown</h4>
                    <div className="pull-left">
                      <div className="review-number">
                        <div>
                          5 <span className="glyphicon glyphicon-star"></span>
                        </div>
                      </div>
                      <div className="review-progress">
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-danger progress-bar-striped active"
                            role="progressbar"
                            aria-valuenow="5"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            style={{ width: "90%" }}
                          >
                            <span className="sr-only">
                              90% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-number">1</div>
                    </div>
                    <div className="pull-left">
                      <div className="review-number">
                        <div>
                          4 <span className="glyphicon glyphicon-star"></span>
                        </div>
                      </div>
                      <div className="review-progress">
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-primary progress-bar-striped active"
                            role="progressbar"
                            aria-valuenow="4"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            style={{ width: "80%" }}
                          >
                            <span className="sr-only">
                              80% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-number">1</div>
                    </div>
                    <div className="pull-left">
                      <div className="review-number">
                        <div>
                          3 <span className="glyphicon glyphicon-star"></span>
                        </div>
                      </div>
                      <div className="review-progress">
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-info progress-bar-striped active"
                            role="progressbar"
                            aria-valuenow="3"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            style={{ width: "70%" }}
                          >
                            <span className="sr-only">
                              70% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-number">0</div>
                    </div>
                    <div className="pull-left">
                      <div className="review-number">
                        <div>
                          2 <span className="glyphicon glyphicon-star"></span>
                        </div>
                      </div>
                      <div className="review-progress">
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-warning progress-bar-striped active"
                            role="progressbar"
                            aria-valuenow="2"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            style={{ width: "60%" }}
                          >
                            <span className="sr-only">
                              60% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-number">0</div>
                    </div>
                    <div className="pull-left">
                      <div className="review-number">
                        <div>
                          1 <span className="glyphicon glyphicon-star"></span>
                        </div>
                      </div>
                      <div className="review-progress">
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-violet progress-bar-striped active"
                            role="progressbar"
                            aria-valuenow="1"
                            aria-valuemin="0"
                            aria-valuemax="5"
                            style={{ width: "50%" }}
                          >
                            <span className="sr-only">
                              50% Complete (danger)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress-number">0</div>
                    </div>
                  </div>
                </div>
                <div className="review-block">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="review-block-img">
                        <img
                          src="assets/dist/img/avatar.png"
                          className="img-rounded"
                          alt=""
                        />
                      </div>
                      <div className="review-block-name">
                        <a href="#">nktailor</a>
                      </div>
                      <div className="review-block-date">
                        January 29, 2016
                        <br />1 day ago
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div className="review-block-rate">
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                      <div className="review-block-title">
                        this was nice in buy
                      </div>
                      <div className="review-block-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type.{" "}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="review-block-img">
                        <img
                          src="assets/dist/img/avatar2.png"
                          className="img-rounded"
                          alt=""
                        />
                      </div>
                      <div className="review-block-name">
                        <a href="#">nktailor</a>
                      </div>
                      <div className="review-block-date">
                        January 29, 2016
                        <br />1 day ago
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div className="review-block-rate">
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                      <div className="review-block-title">
                        this was nice in buy
                      </div>
                      <div className="review-block-description">
                        this was nice in buy. this was nice in buy. this was
                        nice in buy. this was nice in buy this was nice in buy
                        this was nice in buy this was nice in buy this was nice
                        in buy
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="review-block-img">
                        <img
                          src="assets/dist/img/avatar3.png"
                          className="img-rounded"
                          alt=""
                        />
                      </div>
                      <div className="review-block-name">
                        <a href="#">nktailor</a>
                      </div>
                      <div className="review-block-date">
                        January 29, 2016
                        <br />1 day ago
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div className="review-block-rate">
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-xs"
                          aria-label="Left Align"
                        >
                          <span
                            className="glyphicon glyphicon-star"
                            aria-hidden="true"
                          ></span>
                        </button>
                      </div>
                      <div className="review-block-title">
                        this was nice in buy
                      </div>
                      <div className="review-block-description">
                        this was nice in buy. this was nice in buy. this was
                        nice in buy. this was nice in buy this was nice in buy
                        this was nice in buy this was nice in buy this was nice
                        in buy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/*<!-- /.main content --> */}
        </div>
      </div>
    );
  }
}
