import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import axios from "axios";
import Select from "../../common/Select";
import "../custom.css";

import Navbar from "../../layout/Navbar";
import Left from "../../layout/LeftMenu";
import UserContentMenu from "../UserContentMenu";
import { contract, representative_list } from "../add/Common";

import { getUser, addUser } from "../../../actions/userActions";
import UserHeaderMenu from "../UserHeaderMenu";

class EditInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      select: "",
      status_list: [],
      provinces_list: [],
      insurance: {},
      id: "",
      number: "",
      status: "",
      representative: "",
      health_insurance: "",
      province: "",
      place: "",
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.getProvinces();
    this.getStatus();
    this.getInsurance();
  }

  getProvinces = () => {
    axios
      .get(global.uri + `/admin/insurances/provinces`)
      .then((res) => {
        const provinces = res.data.payload;
        console.log(provinces);
        this.setState({
          provinces_list: provinces,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getStatus = () => {
    axios
      .get(global.uri + `/admin/insurances/status`)
      .then((res) => {
        const status = res.data.payload;
        console.log(status);
        this.setState({
          status_list: status,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate() {
    console.log("Log this.state.insurance: ", this.state);
    //console.log('Log this.props: ', this.props);
  }

  getInsurance = async () => {
    const user_id = this.props.match.params.id;
    window.start_preloader();
    await axios
      .get(
        global.uri + `/admin/insurances/getByUser/${this.props.match.params.id}`
      )
      .then((res) => {
        window.select2reload("#status", res.data.payload.status);
        window.select2reload(
          "#representative",
          res.data.payload.representative
        );
        window.select2reload("#province", res.data.payload.province);
        console.log("res", res.data.payload);
        // const InsurancebyUser = res.data.payload
        // console.log(InsurancebyUser);
        this.setState({
          insurance: res.data.payload,
          user_id: this.props.match.params.id,
          id: res.data.payload.id,
          number: res.data.payload.number,
          status: res.data.payload.status,
          representative: res.data.payload.representative,
          health_insurance: res.data.payload.health_insurance,
          province: res.data.payload.province,
          place: res.data.payload.place,
        });
        window.stop_preloader();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setSelect = (select) => {
    this.setState({ select: select });
  };

  renderOption = (data) => {
    return data.map((item, key) => {
      return (
        <option key={key} value={item.id} data-tokens={item.id}>
          {item.name}
        </option>
      );
    });
  };

  onSelectChange = (e) => {
    const { insurance } = this.state;
    const payload = {
      ...insurance,
      [e[0].name]: e.val(),
    };
    this.setState({
      insurance: payload,
      [e[0].name]: e.val(),
    });
  };

  onInputChange = (e) => {
    const { insurance } = this.state;
    const payload = {
      ...insurance,
      [e.target.name]: e.target.value,
    };
    this.setState({
      insurance: payload,
      [e.target.name]: e.target.value,
    });
  };

  goBack = () => {
    const userid = this.props.match.params.id;
    this.props.history.push(`/user/${userid}/insurance`);
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.insurance.id) {
      axios
        .put(global.uri + `/admin/insurances`, this.state.insurance)
        .then((res) => {
          this.getInsurance();
          this.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const insurance = {
        ...this.state.insurance,
        user_id: this.props.match.params.id,
      };
      axios
        .post(global.uri + `/admin/insurances`, insurance)
        .then((res) => {
          this.getInsurance();
          this.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // const insurance = {
    //   ...this.state.insurance,
    //   userid: this.props.match.params.id
    // }
    // axios.post(global.uri + `/admin/insurances`, insurance)
    //     .then(res => {
    //       console.log(res.data);
    //       this.goBack()
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
  };

  render() {
    const { pathname } = this.props.location;
    const {
      status_list,
      provinces_list,
      userid,
      user_id,
      id,
      number,
      province,
      status,
      representative,
      health_insurance,
      place,
      insurance,
    } = this.state;

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
                  <UserContentMenu pathname={pathname} userid={user_id} />

                  {/* Thông tin cá nhân */}
                  <div className="panel-body information">
                    <form
                      id="insurance"
                      onSubmit={this.onSubmit}
                      data-toggle="validator"
                      role="form"
                    >
                      <div className="form-group col-md-12">
                        <div className="header-title">Thông tin bảo hiểm</div>
                      </div>
                      <div className="form-group col-md-6">
                        <div className="col-sm-6 has-feedback">
                          <label className="control-label">Số sổ BH (*)</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Số sổ BH"
                            name="number"
                            value={(number && number) || ""}
                            onChange={this.onInputChange}
                            required
                          />
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Trạng thái sổ</label>
                          <Select
                            id="status"
                            className="form-control"
                            name="status"
                            placeholder="Chọn trạng thái"
                            data={status_list}
                            value={status}
                            onChange={this.onSelectChange}
                            setSelect={this.setSelect}
                            renderOption={this.renderOption}
                            parent="wrapper"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="col-sm-12">
                          <label className="control-label">
                            Công ty pháp nhân
                          </label>
                          <Select
                            id="representative"
                            className="form-control"
                            name="representative"
                            placeholder="Chọn pháp nhân"
                            data={representative_list}
                            value={representative}
                            onChange={this.onSelectChange}
                            setSelect={this.setSelect}
                            renderOption={this.renderOption}
                            parent="wrapper"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Số thẻ BHYT</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Số thẻ BHYT"
                            name="health_insurance"
                            value={(health_insurance && health_insurance) || ""}
                            onChange={this.onInputChange}
                            required
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Mã tỉnh cấp</label>
                          <Select
                            id="province"
                            className="form-control"
                            name="province"
                            placeholder="Chọn tỉnh cấp"
                            data={provinces_list}
                            value={province}
                            onChange={this.onSelectChange}
                            setSelect={this.setSelect}
                            renderOption={this.renderOption}
                            parent="wrapper"
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                        <div className="col-sm-12">
                          <label className="control-label">
                            ĐK khám chữa bệnh
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nơi ĐK khám chữa bệnh"
                            name="place"
                            value={(place && place) || ""}
                            onChange={this.onInputChange}
                            required
                          />
                          <div className="help-block with-errors"></div>
                        </div>
                      </div>
                      <div className="panel-body add-button">
                        <div
                          className="col-md-12 flex-container"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            type="submit"
                            className="btn btn-success btn-rounded w-md m-r-15"
                          >
                            Cập nhật
                          </button>
                          <button
                            className="btn btn-danger btn-rounded w-md"
                            onClick={this.goBack}
                          >
                            Hủy
                          </button>
                        </div>
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

export default connect(mapStateToProps, { getUser, addUser })(
  withRouter(EditInsurance)
);
