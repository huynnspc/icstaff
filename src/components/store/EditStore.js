import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Can from '../common/Can'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCities, getDistricts, getStore } from '../../actions/storeActions';

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

const flags = [{
  id: "ICOOL",
  name: "ICOOL"
}, {
  id: "WILL-ICOOL",
  name: "WILL-ICOOL"
}]

class EditStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      cities: [],
      districts: [],
      id: null,
      store: null,
      code: "",
      name: "",
      address: "",
      tel: "",
      city: "",
      district: "",
      abbr: "",
      flag: "",
      active: -1,
      errors: {},
      select: null,
    };

    this.getCities = this.getCities.bind(this);
    this.getDistricts = this.getDistricts.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    window.loading();
    this.getCities();
    this.handleRequest(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.loading !== this.state.loading) {
      this.setState({ loading: nextProps.store.loading });

      if (!nextProps.store.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }

    if (nextProps.match.params.id !== this.state.id) {
      this.setState({ id: nextProps.match.params.id });
    }

    if (nextProps.store.store !== this.state.store) {
      const store = nextProps.store.store;
      console.log(store);
      this.setState({
        store: store,
        code: store.StoreCode,
        name: store.StoreName,
        address: store.Address,
        tel: store.Tel,
        city: store.City,
        district: store.District,
        abbr: store.Abbr,
        flag: store.Flag,
        active: store.Active ? 1: 0,
      });
    }

    if (nextProps.store.cities !== this.state.cities) {
      const cities = nextProps.store.cities;
      this.setState({ cities: cities });
    }

    if (nextProps.store.districts !== this.state.districts) {
      const districts = nextProps.store.districts;
      this.setState({ districts: districts });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevProps.store.store !==  this.props.store.store) {
          this.getDistricts(this.props.store.city);
      }
  }

  getCities() {
    this.props.getCities();
  }

  async getDistricts() {
    await this.props.getDistricts(this.state.city);
  }

  handleRequest(id) {
    this.props.getStore(id);
  }

  goBack = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  onChange = (e) => {
    this.setState({ [e[0].name]: e.val() });
    if(e[0].name === "city") {
        this.getDistricts(e.val());
    }
    // e.preventDefault();
    // console.log("e.target.name: ", e.target.value);
    // this.setState({ [e.target.name]: e.target.value });
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
    const {
      loading,
      errors,
      store,
      code,
      name,
      address,
      tel,
      city,
      district,
      abbr,
      flag,
      active,
      cities,
      districts,
    } = this.state;

    const { pathname } = this.props.location;

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {!loading && store && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-box1"></i>
                </div>
                <div className="header-title">
                  <h1>C???a h??ng</h1>
                  <small>Hi???n th??? th??ng tin chi ti???t c???a h??ng. </small>

                  <ol className="breadcrumb">
                    <li>
                      <Link to="/stores">
                        <i className="pe-7s-home"></i> Th??ng tin c???a h??ng
                      </Link>
                    </li>
                    <li className="active">Chi ti???t</li>
                  </ol>
                </div>
              </div>

              <div id="edit-store" className="row">
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
                              &nbsp;B???n vui l??ng vui l??ng nh???p ?????y ????? th??ng tin
                              b???t bu???c (*).
                            </strong>
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="panel-body">
                      <form onSubmit={this.onSubmit} noValidate>
                        <Input
                          placeholder="M?? c???a h??ng"
                          name="code"
                          type="text"
                          label="M?? c???a h??ng (*)"
                          value={code}
                          onChange={this.onInputChange}
                          error={errors.code}
                          disabled={true}
                        />

                        <Input
                          placeholder="T??n c???a h??ng"
                          name="name"
                          type="text"
                          label="T??n c???a h??ng (*)"
                          value={name}
                          onChange={this.onInputChange}
                          error={errors.name}
                        />

                        <Input
                          placeholder="?????a ch???"
                          name="address"
                          type="text"
                          label="?????a ch??? (*)"
                          value={address}
                          onChange={this.onInputChange}
                          error={errors.address}
                        />

                        <Input
                          placeholder="??i???n tho???i"
                          name="tel"
                          type="text"
                          label="??i???n tho???i (*)"
                          value={tel}
                          onChange={this.onInputChange}
                          error={errors.tel}
                        />

                        <Select
                          id="city"
                          name="city"
                          placeholder="----- Ch???n t???nh/th??nh ph??? ----"
                          label="T???nh/Th??nh ph???"
                          defaultValue=""
                          defaultMessage="----- Ch???n t???nh/th??nh ph??? ----"
                          data={cities}
                          value={city}
                          onChange={this.onChange}
                          setSelect={this.setSelect}
                          renderOption={this.renderOption}
                          error={errors.city}
                          parent="edit-store"
                        />

                        <Select
                          id="district"
                          name="district"
                          placeholder="----- Ch???n qu???n/huy???n ----"
                          label="Qu???n/Huy???n (*)"
                          defaultValue=""
                          defaultMessage="----- Ch???n qu???n/huy???n ----"
                          data={districts}
                          value={district}
                          onChange={this.onChange}
                          setSelect={this.setSelect}
                          renderOption={this.renderOption}
                          error={errors.district}
                          parent="edit-store"
                        />

                        <Input
                          placeholder="Vi???t t???t"
                          name="abbr"
                          type="text"
                          label="Vi???t t???t (*)"
                          value={abbr}
                          onChange={this.onInputChange}
                          error={errors.abbr}
                        />

                        <Select
                          id="flag"
                          name="flag"
                          placeholder="----- Ch???n lo???i h??nh c???a h??ng ----"
                          label="Lo???i h??nh c???a h??ng"
                          defaultValue=""
                          defaultMessage="----- Ch???n lo???i h??nh c???a h??ng ----"
                          data={flags}
                          value={flag}
                          onChange={this.onChange}
                          setSelect={this.setSelect}
                          renderOption={this.renderOption}
                          error={errors.flag}
                          parent="edit-store"
                        />

                        <Select
                          id="active"
                          name="active"
                          placeholder="----- Ch???n lo???i h??nh c???a h??ng ----"
                          label="Lo???i h??nh c???a h??ng"
                          defaultValue={-1}
                          defaultMessage="----- Ch???n lo???i h??nh c???a h??ng ----"
                          data={statuses}
                          value={active}
                          onChange={this.onChange}
                          setSelect={this.setSelect}
                          renderOption={this.renderOption}
                          error={errors.active}
                          parent="edit-store"
                        />

                        <div className="form-group col-sm-12">
                          <button
                            className="btn btn-primary pull-right"
                            onClick={this.goBack}
                          >
                            Tr??? v???
                          </button>
                          <Can I="update" this="stores">
                            <button className="btn btn-success pull-right m-r-5">
                              L??u th??ng tin
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

EditStore.propTypes = {
  getCities: PropTypes.func.isRequired,
  getDistricts: PropTypes.func.isRequired,
  getStore: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  store: state.store,
  errors: state.errors,
});

export default connect(mapStateToProps, { getCities, getDistricts, getStore })(
  withRouter(EditStore)
);