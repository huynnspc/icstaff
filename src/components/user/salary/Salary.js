import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import moment from "moment";
import '../custom.css';

import Navbar from "../../layout/Navbar";
import Left from "../../layout/LeftMenu";
import UserHeaderMenu from '../UserHeaderMenu'
import UserContentMenu from '../UserContentMenu'

import { addSalary, getSalary } from '../../../actions/userActions';

class Salary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.match.params.id,
      salary: [],
      loading: false,
    }
    this.handleRequest = this.handleRequest.bind(this);
    this.renderSalary = this.renderSalary.bind(this);
  }

  componentDidMount(){
    this.handleRequest()
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
    
    if(nextProps){
      if (nextProps.user.salary !== this.state.slary) {
        const salary = nextProps.user.salary
        console.log('salary: ',salary);
        this.setState({
          salary: salary
        });
      }
    }
    
  }

  componentDidUpdate(){
  }

  handleRequest() {
    this.props.getSalary(this.state.userid);
  }

  renderSalary(){
    const { salary } = this.state;
    return salary.map((salary, index) => {
      return (
        <tr key={index}>
          <td>{moment(salary.active_date).format("DD/MM/YYYY")}</td>
          <td>{new Intl.NumberFormat('en').format(salary.amount)}</td>
          <td>{salary.formOfSalary}</td>
          <td>{salary.note}</td>
        </tr>
      );
    });
  }

  render() {
    const { pathname } = this.props.location;
    const { userid } = this.state;
    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>

        <div id="page-wrapper">
          <div className="content userinfo">
            <UserHeaderMenu pathname={pathname} userid={userid} />
            <div className="row">
              <div className="col-sm-12">
                <div className="panel panel-bd lobidrag">
                  <UserContentMenu 
                    pathname={pathname} 
                    userid={userid}
                  />

                  {/* L????ng */}
                  <div className="panel-body">
                    <div className="col-md-12">
                      <div className="header-title">L????NG</div>
                    </div>
                    <div className="col-md-12">
                      <div className="table-responsive">
                      <table className="table table-striped b-t">
                          <thead>
                            <tr>
                              <th>Ng??y ??p d???ng</th>
                              <th>M???c l????ng ??p d???ng</th>
                              <th>H??nh th???c l????ng</th>
                              <th>Ghi ch??</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.renderSalary()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
  user: state.user
});

export default connect(mapStateToProps, { getSalary })(withRouter(Salary));