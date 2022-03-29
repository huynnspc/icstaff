import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../layout/Navbar";
import Left from "../layout/LeftMenu";
import Right from "../layout/RightMenu";
import Experiences from './Experiences/Experiences'
import Certificates from './Certificates/Certificates'

import { 
  getCurrentProfile
} from "../../actions/profileActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profile: null,
      // certificates: null,
      // experiences: null,
      editting: false,
      add: false,
      errors: {},
    };
    this.handleRequest = this.handleRequest.bind(this);
  }
  componentDidMount() {
    window.loading();
    this.handleRequest();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== this.state.profile) {
      this.setState({
        profile: nextProps.profile.profile,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.profile !== this.state.profile) {
    //   console.log('this.state',this.state);
    // }
    // console.log('this.state',this.state);
    // this.handleRequest();
    
  }

  handleRequest() {
    this.props.getCurrentProfile();
  }

  render() {
    const { loading, errors, profile } = this.state;
    const { pathname } = this.props.location;
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />
        <Right />
        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {!loading && profile && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-user"></i>
                </div>
                <div className="header-title">
                  <h1>Profile</h1>
                  <small>Show user data in clear profile design</small>
                  <ol className="breadcrumb">
                    <li>
                      <a href="index.html">
                        <i className="pe-7s-home"></i>Home
                      </a>
                    </li>
                    <li>
                      <a href="#">UI Elements</a>
                    </li>
                    <li className="active">Profile</li>
                  </ol>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-4">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-header-menu">
                          <i className="fa fa-bars"></i>
                        </div>
                        <div className="card-header-headshot"></div>
                      </div>
                      <div className="card-content">
                        <div className="card-content-member">
                          {/* fullname */}
                          <h4 className="m-t-0">{profile.fullname}</h4>
                          {/* fullname */}
                          {/* store_name */}
                          <p className="m-0">
                            <i className="pe-7s-map-marker"></i>{profile.store}
                            <span className="m-5"> - </span>
                            <i className="pe-7s-id"></i>{profile.role}
                          </p>
                          {/* store_name */}
                        </div>
                        <div className="card-content-languages">
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Số ĐT:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.phone ? <li>{profile.phone}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Email:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.email ? <li>{profile.email}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>CMND:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.cmnd ? <li>{profile.cmnd}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Địa chỉ:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.address ? <li>{profile.address}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Quê quán:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.address ? <li>{profile.address}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Trình độ học vấn:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.education ? <li>{profile.education}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                          <div className="card-content-languages-group">
                            <div>
                              <h4>Ngoại ngữ:</h4>
                            </div>
                            <div>
                              <ul>
                                {profile.language ? <li>{profile.language}</li> : <li>Đang cập nhật</li>}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-8">
                  <div className="col-sm-12 m-b-20">
                    {/* <!-- Nav tabs --> */}
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#tab1" data-toggle="tab">
                          <i className="pe-7s-study p-r-5"></i>
                          Bằng cấp - Chứng chỉ
                        </a>
                      </li>
                      <li>
                        <a href="#tab2" data-toggle="tab">
                          <i className="pe-7s-star p-r-5"></i>
                          Kinh nghiệm
                        </a>
                      </li>
                    </ul>
                    {/* <!-- Tab panels --> */}
                    <div className="tab-content">
                      <div className="tab-pane fade in active" id="tab1">
                          <Certificates />
                      </div>
                      <div className="tab-pane fade in" id="tab2">
                        <Experiences />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="main">
                      <ul className="cbp_tmtimeline">
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2017-01-26 18:30"
                          >
                            <span>01/26/17</span> <span>15:40</span>
                          </time>
                          <i className="fa fa-mobile"></i>
                          <div className="cbp_tmlabel">
                            <h2>Ricebean black-eyed pea</h2>
                            <p>
                              Winter purslane courgette pumpkin quandong
                              komatsuna fennel green bean cucumber watercress.
                              Pea sprouts wattle seed rutabaga okra yarrow cress
                              avocado grape radish bush tomato ricebean
                              black-eyed pea maize eggplant. Cabbage lentil
                              cucumber chickpea sorrel gram garbanzo plantain
                              lotus root bok choy squash cress potato summer
                              purslane salsify fennel horseradish dulse. Winter
                              purslane garbanzo artichoke broccoli lentil corn
                              okra silver beet celery quandong. Plantain salad
                              beetroot bunya nuts black-eyed pea collard greens
                              radish water spinach gourd chicory prairie turnip
                              avocado sierra leone bologi.
                            </p>
                          </div>
                        </li>
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2017-01-26T12:04"
                          >
                            <span>01/26/17</span> <span>12:04</span>
                          </time>
                          <i className="fa fa-desktop"></i>
                          <div className="cbp_tmlabel">
                            <h2>Greens radish arugula</h2>
                            <p>
                              Caulie dandelion maize lentil collard greens
                              radish arugula sweet pepper water spinach kombu
                              courgette lettuce. Celery coriander bitterleaf
                              epazote radicchio shallot winter purslane collard
                              greens spring onion squash lentil. Artichoke salad
                              bamboo shoot black-eyed pea brussels sprout garlic
                              kohlrabi.
                            </p>
                          </div>
                        </li>
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2017-01-26 05:36"
                          >
                            <span>01/26/17</span> <span>05:36</span>
                          </time>
                          <i className="fa fa-envelope-o"></i>
                          <div className="cbp_tmlabel">
                            <h2>Sprout garlic kohlrabi</h2>
                            <p>
                              Parsnip lotus root celery yarrow seakale tomato
                              collard greens tigernut epazote ricebean melon
                              tomatillo soybean chicory broccoli beet greens
                              peanut salad. Lotus root burdock bell pepper
                              chickweed shallot groundnut pea sprouts welsh
                              onion wattle seed pea salsify turnip scallion
                              peanut arugula bamboo shoot onion swiss chard.
                              Avocado tomato peanut soko amaranth grape fennel
                              chickweed mung bean soybean endive squash beet
                              greens carrot chicory green bean. Tigernut
                              dandelion sea lettuce garlic daikon courgette
                              celery maize parsley komatsuna black-eyed pea bell
                              pepper aubergine cauliflower zucchini. Quandong
                              pea chickweed tomatillo quandong cauliflower
                              spinach water spinach.
                            </p>
                          </div>
                        </li>
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2017-04-15 13:15"
                          >
                            <span>4/15/17</span> <span>13:15</span>
                          </time>
                          <i className="fa fa-mobile"></i>
                          <div className="cbp_tmlabel">
                            <h2>Watercress ricebean</h2>
                            <p>
                              Peanut gourd nori welsh onion rock melon mustard
                              jícama. Desert raisin amaranth kombu aubergine
                              kale seakale brussels sprout pea. Black-eyed pea
                              celtuce bamboo shoot salad kohlrabi leek squash
                              prairie turnip catsear rock melon chard taro
                              broccoli turnip greens. Fennel quandong potato
                              watercress ricebean swiss chard garbanzo. Endive
                              daikon brussels sprout lotus root silver beet
                              epazote melon shallot.
                            </p>
                          </div>
                        </li>
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2013-04-16 21:30"
                          >
                            <span>4/16/13</span> <span>21:30</span>
                          </time>
                          <i className="fa fa-globe"></i>
                          <div className="cbp_tmlabel">
                            <h2>Courgette daikon</h2>
                            <p>
                              Parsley amaranth tigernut silver beet maize fennel
                              spinach. Ricebean black-eyed pea maize scallion
                              green bean spinach cabbage jícama bell pepper
                              carrot onion corn plantain garbanzo. Sierra leone
                              bologi komatsuna celery peanut swiss chard silver
                              beet squash dandelion maize chicory burdock tatsoi
                              dulse radish wakame beetroot.
                            </p>
                          </div>
                        </li>
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2013-04-17 12:11"
                          >
                            <span>4/17/13</span> <span>12:11</span>
                          </time>
                          <i className="fa fa-desktop"></i>
                          <div className="cbp_tmlabel">
                            <h2>Greens radish arugula</h2>
                            <p>
                              Caulie dandelion maize lentil collard greens
                              radish arugula sweet pepper water spinach kombu
                              courgette lettuce. Celery coriander bitterleaf
                              epazote radicchio shallot winter purslane collard
                              greens spring onion squash lentil. Artichoke salad
                              bamboo shoot black-eyed pea brussels sprout garlic
                              kohlrabi.
                            </p>
                          </div>
                        </li>
                        <li>
                          <time
                            className="cbp_tmtime"
                            dateTime="2013-04-18 09:56"
                          >
                            <span>4/18/13</span> <span>09:56</span>
                          </time>
                          <i className="fa fa-mobile"></i>
                          <div className="cbp_tmlabel">
                            <h2>Sprout garlic kohlrabi</h2>
                            <p>
                              Parsnip lotus root celery yarrow seakale tomato
                              collard greens tigernut epazote ricebean melon
                              tomatillo soybean chicory broccoli beet greens
                              peanut salad. Lotus root burdock bell pepper
                              chickweed shallot groundnut pea sprouts welsh
                              onion wattle seed pea salsify turnip scallion
                              peanut arugula bamboo shoot onion swiss chard.
                              Avocado tomato peanut soko amaranth grape fennel
                              chickweed mung bean soybean endive squash beet
                              greens carrot chicory green bean. Tigernut
                              dandelion sea lettuce garlic daikon courgette
                              celery maize parsley komatsuna black-eyed pea bell
                              pepper aubergine cauliflower zucchini. Quandong
                              pea chickweed tomatillo quandong cauliflower
                              spinach water spinach.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { 
  getCurrentProfile
})(withRouter(Profile));
