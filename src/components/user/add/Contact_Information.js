import React, { Component } from 'react'
import classnames from 'classnames';
import Select from "../../common/Select"

export default class Contact_Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: "",
            contact: {}
        }
    }
    setSelect = (select) => {
        this.setState({ select: select });
    };

    onSelectChange = (e) => {
        const {contact} = this.state
        const payload = {
            ...contact,
            [e[0].name]: e.val()
        }
        this.setState({
            contact: payload
        })
        this.props.onChange(payload);
    };

    onInputChange = (e) => {
        const {contact} = this.state
        const payload = {
            ...contact,
            [e.target.name]: e.target.value 
        }
        this.setState({
            contact: payload
        })
        this.props.onChange(payload);
    }


    render() {
        const {contact} = this.state
        const {errors} = this.props
        return (
            <div className="panel-body">
                <div className="form-group">
                    <div className="header-title">Thông tin liên hệ</div>
                </div>
                <div className="row form-group">
                    <div className={classnames("col-sm-6",{"has-danger": errors && errors.mobile})}>
                        <label className="control-label">Điện thoại (*)</label>
                        <input required type="number" className="form-control" placeholder="Điện thoại" name="mobile" onChange={this.onInputChange} required/>
                        {errors && (
                            <div className="errorMessage text-danger m-t-5" style={{fontSize: "smaller"}}>
                                <span>{errors.mobile}</span>
                            </div>
                        )}
                    </div>
                    <div className="col-sm-6">
                        <label className="control-label">Số nội bộ (*)</label>
                        <input required type="number" className="form-control" placeholder="Số nội bộ" defaultValue={contact.company_phone} name="company_phone" onChange={this.onInputChange} />
                        <div className="errorMessage text-danger m-t-5"><span></span></div>
                    </div>
                    <div className={classnames("col-sm-12",{"has-danger": errors && errors.email})}>
                        <label className="control-label">Email (*)</label>
                        <input required type="email" className="form-control" placeholder="Email" name="email" onChange={this.onInputChange} required/>
                        {errors && (
                            <div className="errorMessage text-danger m-t-5" style={{fontSize: "smaller"}}>
                                <span>{errors.email}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-sm-6 form-group">
                        <label className="control-label">Thường trú (*)</label>
                        <input required type="text" className="form-control" placeholder="Thường trú" name="address" onChange={this.onInputChange} required/>
                        <div className="errorMessage text-danger m-t-5"><span></span></div>
                    </div>
                    <div className="col-sm-6 form-group">
                        <label className="control-label">Địa chỉ (*)</label>
                        <input required type="text" className="form-control" placeholder="Địa chỉ" name="extra_address1" onChange={this.onInputChange} />
                        <div className="errorMessage text-danger m-t-5"><span></span></div>
                    </div>
                    <div className="col-sm-6">
                        <label className="control-label">Chỗ ở hiện tại (*)</label>
                        <input required type="text" className="form-control" placeholder="Chỗ ở hiện tại" name="contact_address" onChange={this.onInputChange} />
                        <div className="errorMessage text-danger m-t-5"><span></span></div>
                    </div>
                    <div className="col-sm-6">
                        <label className="control-label">Địa chỉ (*)</label>
                        <input required type="text" className="form-control" placeholder="Địa chỉ" name="extra_address2" onChange={this.onInputChange} />
                        <div className="errorMessage text-danger m-t-5"><span></span></div>
                    </div>
                </div>
            </div>
        )
    }
}
