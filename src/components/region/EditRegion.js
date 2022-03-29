import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Can from '../common/Can'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRegion } from '../../actions/regionActions';

import './css/custom.css';

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

class EditRegion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      id: null,
      region: null,
      code: "",
      name: "",
      active: -1,
      errors: {},
      select: null,
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    window.loading();
    this.handleRequest(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.region.loading !== this.state.loading) {
      this.setState({ loading: nextProps.region.loading });

      if (!nextProps.region.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }

    if(nextProps.match.params.id !== this.state.id) {
        this.setState({ id: nextProps.match.params.id });
    }

    if (nextProps.region.region !== this.state.region) {
      const region = nextProps.region.region;
      this.setState({
        region: region,
        code: region.RegionCode,
        name: region.RegionName,
        active: region.Active ? 1 : 0,
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
    this.props.getRegion(id);
  }

  goBack = (e) => {
      e.preventDefault();
      this.props.history.goBack();
  }

  onChange = (e) => {
    this.setState({ [e[0].name]: e.val() });
    if(e[0].name === "city") {
        this.getDistricts(e.val());
    }
  };

  onInputChange = (e) => {
    e.preventDefault();
    console.log("e.target.name: ", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  setSelect = (select) => {
    this.setState({select: select});
  }

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.id} data-tokens={item.id}>
          {item.name}
        </option>
      );
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  };

  render() {
    const { loading, errors, region, code, name, active } = this.state;
    const { pathname } = this.props.location;

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {!loading && region && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-box1"></i>
                </div>
                <div className="header-title">
                  <h1>Phân vùng</h1>
                  <small>Hiển thị thông tin chi tiết vùng. </small>

                  <ol className="breadcrumb">
                    <li>
                      <Link to="/regions">
                        <i className="pe-7s-home"></i> Thông tin phân vùng
                      </Link>
                    </li>
                    <li className="active">Chi tiết</li>
                  </ol>
                </div>
              </div>

              <div id="edit-region" className="row">
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
                          placeholder="Mã vùng"
                          name="code"
                          type="text"
                          label="Mã vùng (*)"
                          value={code}
                          onChange={this.onInputChange}
                          error={errors.code}
                          disabled={true}
                        />

                        <Input
                          placeholder="Tên vùng"
                          name="name"
                          type="text"
                          label="Tên vùng (*)"
                          value={name}
                          onChange={this.onInputChange}
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
                          setSelect={this.setSelect}
                          error={errors.active}
                          parent="edit-region"
                          renderOption={this.renderOption}
                        />

                        <div className="form-group col-sm-12">
                          <button className="btn btn-primary pull-right" onClick={this.goBack}>
                            Trở về
                          </button>
                          <Can I="update" this="regions">
                            <button className="btn btn-success pull-right m-r-5">
                              Lưu thông tin
                            </button>
                          </Can>
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

EditRegion.propTypes = {
  getRegion: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    region: state.region,
  errors: state.errors,
});

export default connect(mapStateToProps, { getRegion })(withRouter(EditRegion));