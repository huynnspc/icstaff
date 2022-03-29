import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import validator from 'validator';
import '../custom.css';

import Navbar from "../../layout/Navbar";
import Left from "../../layout/LeftMenu";

import UserHeaderMenu from '../UserHeaderMenu'
import UserContentMenu from '../UserContentMenu'

import ItemSalary from './ItemSalary'
import { getSalary, updateSalary, deleteSalary } from '../../../actions/userActions';


class EditSalary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userid: this.props.match.params.id,
      salary: [],
      errors: []
    };
    this.handleRequest = this.handleRequest.bind(this);
  }
  
  componentDidMount(){
    this.handleRequest()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
        this.setState({
          salary: salary
        });
      }
    }

    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors});
      window.stop_preloader();
      // if (nextProps.errors[0]) {
      //   window.toast("ĐÃ CÓ LỖI XẢY RA!", nextProps.errors[0].errors, 4000, "error");
      // }
    }
    
  }

  handleRequest() {
    this.props.getSalary(this.state.userid);
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate state: ',this.state);
  }

  ItemSalaryChange = (payload) => {
    var { salary } = this.state
    salary = salary.map((item, index) => {
      if(index === payload.idx){
        item.active_date = payload.active_date
        item.form_id = payload.form_id
        item.note = payload.note
        item.amount = payload.amount
        if(payload.id){
          item.checkEdit = 1
        }else{
          item.checkEdit = 2
        }
      }
      return item
    })
    console.log(salary);
    this.setState({salary: salary});
  }

  onDelete = (position) => {
    const {salary} = this.state
    if(salary[position].id){
      salary[position] = {
        checkEdit: 3,
        id: salary[position].id
      }
    }else{
      salary.splice(position,1)
    }
    this.setState({
      salary: salary
    })
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    const { salary } = this.state
    var data = {
      data:JSON.stringify(salary)
    }
    await this.props.updateSalary(data)
    const {errors} = this.props
    console.log('errors: ', errors);
    if(Object.keys(errors).length === 0){
      this.goBack();
    }else{
      window.toast("Đã có lỗi xảy ra!", errors[0].errors, 5000, "error");
      this.setState({
        errors: errors
      })
    }
    // this.props.history.goBack();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  addSalaryButton = () => {
    const {salary, userid} = this.state
    console.log(salary);
    salary.push({
      active_date: new Date,
      form_id: '',
      amount: '',
      note: '',
      checkEdit: 2,
      user_id: userid
    })
    this.setState({
      salary
    })
  }

  renderData = () => {
    const { salary } = this.state;
    if(salary){
      return salary.map((item, index) => {
        if(item.checkEdit !== 3){
          return (
            <ItemSalary 
              key={index}
              position={index}
              data={item}
              onChange={this.ItemSalaryChange}
              onDelete={this.onDelete}
            />
          );
        }
      });
    }
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
                  <UserContentMenu pathname={pathname} userid={userid} />

                  {/* Salary */}
                  <div className="panel-body">
                    <form onSubmit={this.handleUpdate}>
                      <div className="col-md-12">
                        <div className="header-title">CẬP NHẬT LỊCH SỬ LƯƠNG</div>
                      </div>
                      <div className="col-md-12">
                        <div className="row flex-container">
                          <div className="col-2dot4">Từ ngày</div>
                          <div className="col-2dot4">Hình thức lương</div>
                          <div className="col-2dot4">Số tiền</div>
                          <div className="col-2dot4">Ghi chú</div>
                          <div className="col-2dot4"></div>
                        </div>
                        {this.renderData()}
                      </div>
                      <div className="col-md-2 m-t-20">
                        {/* Add Salary Button */}
                        <i className="pe-7s-plus add-salary" onClick={this.addSalaryButton}></i>
                      </div>
                      <div className="col-md-12 flex-container" style={{ justifyContent: "center" }}>
                        <button 
                          className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                          type="submit" 
                          // onClick={this.handleUpdate}
                        >Cập nhật</button>
                        <button 
                          className="btn btn-danger btn-rounded w-md m-t-5 m-r-5"
                          type="button" 
                          onClick={this.goBack}
                        >Hủy bỏ</button>
                      </div>
                    </form>
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
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { getSalary, updateSalary, deleteSalary })(withRouter(EditSalary));