import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRole } from '../../actions/roleActions';

import './custom.css';

import Navbar from '../layout/Navbar';
import Left from '../layout/LeftMenu';

import Input from '../common/Input';
import Select from '../common/Select';

const statuses = [{
  id: 0,
  name: "Disabled"
}, {
  id: 1,
  name: "Active"
}]

class EditRole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      id: null,
      role: null,
      code: "",
      name: "",
      active: -1,
      errors: {},
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    window.loading();
    this.handleRequest(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.role.loading !== this.state.loading) {
      this.setState({ loading: nextProps.role.loading });

      if (!nextProps.role.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }

    if(nextProps.match.params.id !== this.state.id) {
        this.setState({ id: nextProps.match.params.id });
    }

    if (nextProps.role.role !== this.state.role) {
      const role = nextProps.role.role;
      this.setState({
        role: role,
        code: role.RoleCode,
        name: role.RoleName,
        active: role.Active ? 1: 0,
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  handleRequest(id) {
    this.props.getRole(id);
  }

  goBack = (e) => {
      e.preventDefault();
      this.props.history.goBack();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { loading, errors, role, code, name, active } = this.state;
    const { pathname } = this.props.location;
    console.log("errors: ", errors);

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {!loading && role && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-box1"></i>
                </div>
                <div className="header-title">
                  <h1>Chức danh</h1>
                  <small>Hiển thị thông tin chi tiết chức danh. </small>

                  <ol className="breadcrumb">
                    <li>
                      <Link to="/roles">
                        <i className="pe-7s-home"></i> Thông tin chức danh
                      </Link>
                    </li>
                    <li className="active">Chi tiết</li>
                  </ol>
                </div>
              </div>

              <div id="edit-role" className="row">
                <div className="col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
                  <div className="panel panel-bd lobidrag">
                    <div className="panel-heading">
                      <div className="view-header">
                        <div className="header-icon">
                          <i className="pe-7s-unlock"></i>
                        </div>
                        <div className="header-title">
                          <small>
                            <strong>
                              &nbsp;Bạn vui lòng vui lòng nhập đầy đủ thông tin bắt buộc (*).
                            </strong>
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body">
                      <form onSubmit={this.onSubmit} noValidate>

                        <Input
                          placeholder="Mã chức danh"
                          name="code"
                          type="text"
                          label="Mã chức danh (*)"
                          value={code}
                          onChange={this.onChange}
                          error={errors.code}
                          disabled={true}
                        />

                        <Input
                          placeholder="Tên chức danh"
                          name="name"
                          type="text"
                          label="Tên chức danh (*)"
                          value={name}
                          onChange={this.onChange}
                          error={errors.name}
                        />

                        <Select
                          id="active"
                          name="active"
                          placeholder="----- Chọn trạng thái ----"
                          label="Trạng thái"
                          defaultValue={-1}
                          defaultMessage="----- Chọn trạng thái ----"
                          data={statuses}
                          value={active}
                          onChange={this.onChange}
                          error={errors.active}
                          parent="edit-role"
                        />

                        <div className="form-group col-sm-12">
                            <button className="btn btn-primary pull-right" onClick={this.goBack}>
                            Trở về
                            </button>
                          <button className="btn btn-success pull-right m-r-5">
                            Lưu thông tin
                          </button>
                        </div>
                      </form>
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

EditRole.propTypes = {
  getRole: PropTypes.func.isRequired,
  role: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.role,
  errors: state.errors,
});

export default connect(mapStateToProps, { getRole })(withRouter(EditRole));