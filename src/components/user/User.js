import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Can from '../common/Can'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'
import './custom.css';

import { getPages, deleteUser, blockUser, unblockUser } from '../../actions/userActions';

import Navbar from '../layout/Navbar';
import Left from '../layout/LeftMenu';

import Pagination from 'react-paginate';
import { TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      q: '',
      s_page: 1,
      e_page: 1,
      range: 1,
      ranges: 0,
      pages_on_range: [],
      users: [],
      errors: {},
    };

    this.onSearch = this.onSearch.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.renderData = this.renderData.bind(this);
    this.renderPages = this.renderPages.bind(this);
  }

  componentDidMount() {
    window.loading();
    window.datatable();
    this.props.getPages()
    let _t = null
    document.querySelector('#input-search').addEventListener("keydown", e => {
      if(!_t) clearTimeout(_t)
      if (e.code === "Enter") {
        this.setState({ q: e.target.value })
        this.handleRequest(1)
        return 
      }
      _t = setTimeout(() => {
        this.setState({ q: e.target.value })
        this.handleRequest(1)
      }, 500)
    })
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

    if (nextProps.user.users !== this.state.users) {
      this.setState({ users: nextProps.user.users });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  onSearch(e) {
    this.setState({ q: e.target.value })
    this.handleRequest(1)
  }

  handleRequest(page) {
    this.props.getPages(page, this.state.q);
  }

  prev(e) {
    e.preventDefault();
    if(this.props.page > 1) this.handleRequest(this.props.page - 1)
  }

  next(e) {
    e.preventDefault();
    if(this.props.page < this.props.pages) this.handleRequest(this.props.page + 1)
  }

  onPageChange = (e) => {
    this.handleRequest(e.selected + 1);
  }

  deleteUser = (id) => {
    Swal.fire({
      title: 'Xóa người dùng này?',
      text: "Bạn có chắc muốn xóa nhân viên này không?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.props.deleteUser(id);
        // this.props.getUsers(this.state.page);
        Swal.fire(
          'Đã xóa!',
          '',
          'success'
        )
      }
    })
  }

  blockUser = (user) => {
    console.log(user.Active);
    if(user.Active === true) {
      Swal.fire({
        title: 'Khóa người dùng này?',
        text: "Bạn có chắc muốn Khóa nhân viên này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.props.blockUser(user.Id);
          // this.props.getUsers(this.state.page);
          Swal.fire(
            'Đã Khóa!',
            '',
            'success'
          )
        }
      })
    }else{
      Swal.fire({
        title: 'Mở Khóa người dùng này?',
        text: "Bạn có chắc muốn Mở Khóa nhân viên này không?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.props.unblockUser(user.Id);
          // this.props.getUsers(this.state.page);
          Swal.fire(
            'Đã Mở Khóa!',
            '',
            'success'
          )
        }
      })
    }
  }

  renderData() {
    const { users } = this.state;
    return users.map((user, index) => {
      return (
        <tr key={index} className={classnames({"blocked": user.Active === false})}>
          <td className={classnames({"editor": user.Active === true,"editor blocked": user.Active === false})}>
            <span title="Sửa" className="ti-pencil" onClick={(e) => {
                e.preventDefault();
                window.location.href=`/user/${user.Id}/info`;
              }}>
            </span>
            <span title="Xóa" className="ti-trash" onClick={() => this.deleteUser(user.Id)}></span>
            <span 
              title="Khóa" 
              className={classnames({"pe-7s-unlock": user.Active === true, "pe-7s-lock blocked": user.Active === false})}
              onClick={() => this.blockUser(user)}
            ></span>
            <span title="Tùy chỉnh" className="ti-settings"></span>
          </td>
          <td>
            <Link to={`/user/${user.Id}/info`}>{user.Fullname}</Link>
          </td>
          <td>
            <Link to={`/user/${user.Id}/info`}>{user.UserCode}</Link>
          </td>
          <td>{user.Username}</td>
          <td>Vùng</td>
          <td>Chi nhánh</td>
          <td>{user.RoleName}</td>
          <td>Thuộc</td>
          <td>Ngày sinh</td>
          <td>Ngày vào công ty</td>
          <td>Ca làm việc</td>
          {/* <td style={{ textAlign: "center" }}>
            {user.Active && (
              <span className="label label-pill label-success">Active</span>
            )}

            {!user.Active && (
              <span className="label label-pill label-danger">Disabled</span>
            )}
          </td> */}
        </tr>
      );
    });
  }

  renderPages() {
    const { page, pages } = this.props;
    return [...Array(pages)].map((i, index) => 
        <li key={index + 1} className={classnames("paginate_button", { active: index + 1 === page })}>
          <a href="#" onClick={this.paginator(index + 1)}>
            {index + 1}
          </a>
        </li>  
    )
  }

  getDate(){
    var today = new Date();
    return today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  }

  render() {
    const { loading, range, ranges, users } = this.state;
    const { pathname } = this.props.location;

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {1 && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-box1"></i>
                </div>
                <div className="header-title">
                  <h1>DANH SÁCH NHÂN VIÊN</h1>
                  <small>{this.getDate()}</small>
                  {/* <ol className="breadcrumb">
                    <li className="active">
                      <i className="pe-7s-home"></i> Thông tin nhân sự
                    </li>
                  </ol> */}
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="panel panel-bd lobidrag">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <span>Employees ({ this.props.nUser })</span>
                        <Can I="create" this="users">
                          <Link to="/users/add/information"  target="_blank" className="btn btn-success btn-rounded w-md m-b-5 f-r">
                            Thêm user &nbsp; <i className="glyphicon glyphicon-plus"></i>
                          </Link>
                        </Can>
                      </div>
                      <div className="panel-title">
                        <ul className="menu">
                          <Can I="delete" this="users">
                            <li>
                              <a>Xóa</a>
                            </li>
                          </Can>
                          <Can I="update" this="users">
                            <li>
                              <a>Khóa</a>
                            </li>
                          </Can>
                          <Can I="update" this="users">
                            <li>
                            <a>Sửa</a>
                            </li>
                          </Can>
                            <li>
                              <a>Export</a>
                            </li>
                          <Can I="create" this="users">
                            <li>
                              <a>Import</a>
                            </li>
                          </Can>
                            <li>
                              <a>Template</a>
                            </li>
                        </ul>
                      </div>
                    </div>

                    <div className="panel-body">
                      <div className="table-responsive">
                        <table id="dataTableExample1" className="usertable table table-bordered table-striped table-hover" >
                          <thead>
                            <tr>
                              <th className="search" colSpan={11}>
                                <div className="input">
                                  <TextField id="input-search" onBlur={this.onSearch}/>
                                  <SearchIcon />
                                </div>
                                {/* <Button variant="outlined">Tìm kiếm</Button> */}
                              </th>
                            </tr>
                            <tr>
                              <th>Thao tác</th>
                              <th>Tên nhân viên</th>
                              <th>Mã nhân viên</th>
                              <th>Tên đăng nhập</th>
                              <th>Vùng quản lý</th>
                              <th>Chi nhánh</th>
                              <th>Chức danh</th>
                              <th>Thuộc</th>
                              <th>Ngày sinh</th>
                              <th>Ngày vào công ty</th>
                              <th>Ca làm việc</th>
                            </tr>
                          </thead>

                          <tfoot>
                            <tr>
                              <th>Thao tác</th>
                              <th>Tên nhân viên</th>
                              <th>Mã nhân viên</th>
                              <th>Tên đăng nhập</th>
                              <th>Vùng quản lý</th>
                              <th>Chi nhánh</th>
                              <th>Chức danh</th>
                              <th>Thuộc</th>
                              <th>Ngày sinh</th>
                              <th>Ngày vào công ty</th>
                              <th>Ca làm việc</th>
                            </tr>
                          </tfoot>

                          <tbody>{this.renderData()}</tbody>
                        </table>
                      </div>

                      {users.length > 0 && (
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="data2_paginate"
                        >
                          <Pagination containerClassName="pagination pull-right"
                            id="paginate_container"
                            pageCount={this.props.pages}
                            pageRangeDisplayed={2}
                            forcePage={this.props.page - 1}
                            marginPagesDisplayed={2}
                            previousClassName={classnames("paginate_button previous", { disabled: this.props.page === 1 })}
                            nextClassName={classnames("paginate_button next", { disabled: this.props.page === this.props.pages })}
                            activeClassName={classnames("paginate_button active")}
                            onPageChange={this.onPageChange}
                          />
                        {/* <ul className="pagination pull-right" id="paginate_container">
                            <li
                              className={classnames("paginate_button previous",
                                { disabled: this.props.page === 1 })
                              }
                            >
                              <a
                                href="#"
                                aria-controls="data2"
                                data-dt-idx="0"
                                tabIndex="0"
                                onClick={this.prev}
                              >
                                Previous
                              </a>
                            </li>

                            {this.renderPages()}

                            <li
                              className={classnames("paginate_button next",
                                { disabled: this.props.page === this.props.pages })
                              }
                            >
                              <a
                                href="#"
                                aria-controls="data2"
                                data-dt-idx="7"
                                tabIndex="0"
                                onClick={this.next}
                              >
                                Next
                              </a>
                            </li>
                          </ul> */}
                        </div>
                      )}
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

User.propTypes = {
    getPages: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  page: state.user.page,
  pages: state.user.pages,
  nUser: state.user.nUser,
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { getPages, deleteUser, blockUser, unblockUser })(withRouter(User));