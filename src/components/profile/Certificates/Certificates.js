import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Item from './Item'

import { 
  getCertificates,
  updateCertificate,
  deleteCertificate,
  addCertificate
} from "../../../actions/profileActions";

class Certificates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      certificates: null,
      editting: false,
      add: false,
      errors: {}
    };
    this.handleRequest = this.handleRequest.bind(this);
  }


  componentDidMount() {
    window.loading();
    this.handleRequest();
  }

  // componentDidUpdate(){
  //   console.log('componentDidUpdate',this.state)
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.certificates.certificates !== this.state.certificates) {
      this.setState({
        certificates: nextProps.certificates.certificates,
      });
    }
  }

  handleRequest() {
    this.props.getCertificates();
  }

  addCertificate = (item) => {
    if(confirm("Bạn có muốn thêm?")){ //eslint-disable-line
      this.props.addCertificate(item)
      this.handleRequest()
    }
  }

  updateCertificate = (id, item) => {
    if(confirm("Bạn có muốn thay đổi thông tin?")){ //eslint-disable-line
      this.props.updateCertificate(id, item)
      this.handleRequest()
    }
  }

  deleteCertificate = (id) => {
    if(confirm("Bạn có chắc chắn muốn xóa?")){ //eslint-disable-line
      this.props.deleteCertificate(id)
      this.handleRequest()
    }
  }

  render() {
    const { certificates, editting, add } = this.state
      return (
        <div className="review-block">
              <div className="panel-body">
                  <ul className="activity-list list-unstyled">
                    {certificates && certificates.map((certificate, index) => {
                        return (
                          <Item
                            key={index}
                            year={certificate.year}
                            certificate={certificate.certificate}
                            specialized={certificate.specialized}
                            handleUpdate={(id, item) => {this.updateCertificate(certificate.id, item)}}
                            handleDelete={(id) => {this.deleteCertificate(certificate.id)}}
                          />
                        )
                      })
                    }
                    <Item
                      add={add}
                      handleAdd={(item) => {this.addCertificate(item)}}
                    />
                  </ul>
              </div>
        </div>
      )
    
  }
}

Certificates.propTypes = {
  certificates: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  certificates: state.certificates
});

export default connect(mapStateToProps, {
  getCertificates,
  updateCertificate,
  deleteCertificate,
  addCertificate
})(withRouter(Certificates));