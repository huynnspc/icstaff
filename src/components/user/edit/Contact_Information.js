import React, { Component } from "react";
import Select from "../../common/Select";
import validator from 'validator';
import classnames from 'classnames';

export default class Contact_Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      contact: {},
      address: "",
      company_phone: "",
      contact_address: "",
      email: "",
      extra_address1: "",
      extra_address2: "",
      mobile: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.contact){
      if(nextProps.contact.delete_flag === false){
        nextProps.contact.delete_flag = 0
      }
      if (nextProps.contact != this.state.contact) {
        this.setState({
          contact: nextProps.contact,
          address: nextProps.contact.address,
          company_phone: nextProps.contact.company_phone,
          contact_address: nextProps.contact.contact_address,
          email: nextProps.contact.email,
          extra_address1: nextProps.contact.extra_address1,
          extra_address2: nextProps.contact.extra_address2,
          mobile: nextProps.contact.mobile
        })
      }
      if (nextProps.errors != this.state.errors) {
        this.setState({
          errors: nextProps.errors
        })
      }
    }
  }

  componentDidUpdate(){
    // console.log('componentDidUpdate',this.state.errors);
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  onSelectChange = (e) => {
    const { contact } = this.state;
    const payload = {
      ...contact,
      [e[0].name]: e.val(),
    };
    this.setState({
      contact: payload,
    });
    this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const { contact } = this.state;
    let name = e.target.name
    let value = e.target.value
    
    const payload = {
      ...contact,
      [name]: value,
    };
    this.setState({
      contact: payload,
    });
    
    this.props.onChange(payload);

  };

  render() {
    const { 
      contact, 
      errors,
      address,
      company_phone,
      contact_address,
      email,
      extra_address1,
      extra_address2,
      mobile
    } = this.state;
    return (
      <div className="panel-body contact">
          <div className="row">
            <div className="form-group col-md-12">
              <div className="header-title">Th??ng tin li??n h???</div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <div className="row">
                <div className={
                    classnames(
                      "col-md-3",
                      {"has-danger": errors && errors.mobileError}
                    )}
                >
                  <label className="control-label">??i???n tho???i</label>
                  <input
                    type="number"
                    className={
                      classnames(
                        "form-control",
                        {"form-control-danger": errors && errors.mobileError}
                      )}
                    placeholder="??i???n tho???i"
                    name="mobile"
                    value={mobile && mobile || ''}
                    onChange={this.onInputChange}
                    required
                  />
                  {errors && (
                    <div className="errorMessage text-danger m-t-5" style={{fontSize: "small"}}>
                      <span>{errors.mobileError}</span>
                    </div>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">S??? n???i b???</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="S??? n???i b???"
                      value={company_phone && company_phone || ""}
                      name="company_phone"
                      onChange={this.onInputChange}
                    />
                  <div className="errorMessage text-danger m-t-5">
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email && email || ''}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="form-group col-md-4">
                  <label className="control-label">Th?????ng tr??</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Th?????ng tr??"
                      name="address"
                      value={address && address || ""}
                      onChange={this.onInputChange}
                    />
                  <div className="errorMessage text-danger m-t-5">
                    <span></span>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">?????a ch???</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="?????a ch???"
                      name="extra_address1"
                      value={extra_address1 && extra_address1 || ""}
                      onChange={this.onInputChange}
                    />
                  <div className="errorMessage text-danger m-t-5">
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label className="control-label">Ch??? ??? hi???n t???i</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ch??? ??? hi???n t???i"
                      name="contact_address"
                      value={contact_address && contact_address || ""}
                      onChange={this.onInputChange}
                    />
                  <div className="errorMessage text-danger m-t-5">
                    <span></span>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">?????a ch???</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="?????a ch???"
                      name="extra_address2"
                      value={extra_address2 && extra_address2 || ""}
                      onChange={this.onInputChange}
                    />
                  <div className="errorMessage text-danger m-t-5">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* </form> */}
      </div>
    );
  }
}
