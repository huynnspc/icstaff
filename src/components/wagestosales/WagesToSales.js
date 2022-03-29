import React, { Component, Fragment } from "react";

import { Link, withRouter } from "react-router-dom";
import Can, { AbilityContext } from "../common/Can";
import axios from 'axios';
import { connect } from "react-redux";
import classnames from "classnames";
import Swal from "sweetalert2";
import moment from "moment";
import Select from "../common/Select";
import $ from 'jquery';
import ModalAdd from "./ModalAdd"
import ModalEdit from "./ModalEdit"
import Navbar from "../layout/Navbar";
import Left from "../layout/LeftMenu";

class WagesToSales extends Component {
  static contextType = AbilityContext
  constructor(props) {
    super(props);
    this.state = {
      loadding: false,
      data: [],
      select: null,
      stores: [],
      modalAdd: {},
    }
  }

  componentDidMount(){
    this.getStores()
    this.getData()
  } 

  getStores = () => {
    axios.get(global.uri + `/admin/stores/getAll`)
      .then(res => {
          this.setState({
            stores: res.data.payload
          })
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }

  getData = () => {
    this.setState({
      loadding: true
    })
    const res = axios.get(global.uri + `/admin/expense_rates`)
      .then(res => {
          const payload = res.data.payload
          this.setState({
            data: res.data.payload,
            loadding: false
          })
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }

  componentDidUpdate() {
    if(! this.state.loadding){
      window.stop_preloader();
    }else{
      window.start_preloader();
    }
  }


  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user.loading !== this.state.loading) {
  //     this.setState({ loading: nextProps.user.loading });
  //     if (!nextProps.user.loading) {
  //       window.stop_preloader();
  //     } else {
  //       window.start_preloader();
  //     }
  //   }
    
  //   if(nextProps){
  //     if (nextProps.user.salary !== this.state.slary) {
  //       const salary = nextProps.user.salary
  //       console.log('salary: ',salary);
  //       this.setState({
  //         salary: salary
  //       });
  //     }
  //   }
    
  // }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  renderData = () => {
    const {data, stores} = this.state
    return data.map((item, key) => {
      return (
        <tr key={key}>
          <td>
            {
              (this.context.can("update","wagestosales")) && (
                <button
                  onClick={() => this.renderModalEdit(item, stores)}
                  className="btn btn-info btn-xs"
                  data-toggle="modal"
                  data-target="#modal_edit"
                  title="Edit">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
              )
            }
            {
              (this.context.can("delete", "wagestosales")) && (
                <button 
                  className="btn btn-danger btn-xs m-l-5" 
                  data-toggle="tooltip" 
                  data-placement="right" 
                  title="Delete"
                  onClick={() => this.onDeleteItem(item.id)}>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
              )
            }
            
          </td>
          <td>{key+1}</td>
          <td>
            {stores && stores.map(store => {
              if(item.cuahang_id == store.storeCode){
                return store.storeName
              }
            })}
          </td>
          <td>{item.day_rate}</td>
          <td>{item.weekend_rate}</td>
          <td>{item.holiday_rate}</td>
          <td>{item.percent}</td>
          <td>{new Intl.NumberFormat('en').format(item.allowance_for_meals)}</td>
          <td>{moment(item.active_date).format('DD-MM-YYYY')}</td>
        </tr>
      );
    })
  }

  renderModalEdit = (item, stores) => {
    // console.log(item);
    this.setState({
      ItemModalEdit: {
        item,
        stores
      }
    })
  }

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.storeCode} data-tokens={item.storeCode}>
          {item.storeName}
        </option>
      );
    })
  }
  
  onSelectChange = (e) => {
    console.log(e.val());
    const { modalAdd } = this.state;
    const payload = {
      ...modalAdd,
      [e[0].name]: e.val(),
    };
    this.setState({
      modalAdd: payload
    });
  };

  onInputChange = (e) => {
    e.preventDefault();
    const { modalAdd } = this.state;
    const payload = {
      ...modalAdd,
      [e.target.name]: e.target.value,
    };
    this.setState({
      modalAdd: payload
    });
  };

  onDeleteItem = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa?",
      text: "Bạn có chắc muốn xóa dữ liệu này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(global.uri + `/admin/expense_rates/${id}`)
          Swal.fire("Đã xóa!", "", "success");
          this.getData()
        }
        catch (err){
          console.log(err.response.data)
        }
        
      }
    });
  }

  render() {
    const { pathname } = this.props.location;
    const {data, stores} = this.state
    const {ItemModalEdit} = this.state

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />
        <div id="page-wrapper">
          <div className="content">
            <div className="content-header">
              <div className="header-icon">
                <i className="pe-7s-graph2"></i>
              </div>
              <div className="header-title">
                <h1>Tỷ lệ Giờ lương / Doanh thu</h1>
              </div>
            </div>
            
            <div className="row">
                <div className="col-sm-12">
                  <div className="panel panel-bd lobidrag">
                    <div className="panel-heading">
                      <div className="row">
                        <div className="col-sm-6">
                        </div>
                      <div className="col-sm-6">
                          <Can I="create" this="wagestosales">
                            <button 
                              type="button" 
                              className="btn btn-primary btn-outline btn-rounded w-md m-b-5 f-r"
                              data-toggle="modal" data-target="#modal-add"
                            >
                              Thêm <i className="hvr-buzz-out pe-7s-plus" style={{ fontSize: "24px" }}></i>
                            </button>
                          </Can>
                          {/* ModalAdd Popup */}
                          <ModalAdd stores={stores} handleModalAdd={this.getData}/>
                          {/* End ModalAdd Popup */}
                        </div>
                      </div>
                    </div>

                    <div className="panel-body">
                      <div className="table-responsive">
                        <table id="data" className="table table-bordered table-striped table-hover">
                          <thead>
                            <tr>
                              <th></th>
                              <th>STT</th>
                              <th>Tên chi nhánh</th>
                              <th>Tỷ lệ ngày thường</th>
                              <th>Tỷ lệ cuối tuần</th>
                              <th>Tỷ lệ lễ</th>
                              <th>Phần trăm chặn dưới</th>
                              <th>Tiền cơm</th>
                              <th>Ngày áp dụng</th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th></th>
                              <th>STT</th>
                              <th>Tên chi nhánh</th>
                              <th>Tỷ lệ ngày thường</th>
                              <th>Tỷ lệ cuối tuần</th>
                              <th>Tỷ lệ lễ</th>
                              <th>Phần trăm chặn dưới</th>
                              <th>Tiền cơm</th>
                              <th>Ngày áp dụng</th>
                            </tr>
                          </tfoot>
                          <tbody>
                            {this.renderData()}
                          </tbody>
                        </table>
                      </div>
                      {/* ModalEdit Popup */}
                      {/* {this.renderModalEdit()} */}
                      <ModalEdit data={ItemModalEdit} handleModalEdit={this.getData} />
                      {/* End ModalEdit Popup */}
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

// const mapStateToProps = (state) => ({
//   user: state.user
// });

export default WagesToSales