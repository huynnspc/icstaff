import React, { Component, Fragment } from "react";
import moment from "moment";
import axios from 'axios';
import classnames from 'classnames';
import Toggle, { Bootstrap2Toggle } from "react-bootstrap-toggle";

export default class Promotion_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleActive: true,
      disable: false
    };
  }

  componentDidMount(){
    if(this.props.notify.disable == true){
      this.setState({
        toggleActive: !this.props.notify.disable
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.notify.disable != this.state.disable){
      this.setState({
        disable: nextProps.notify.disable
      })
    }
  }

  componentDidUpdate(){
  }

  onToggle = () => {
    const {toggleActive, disable} = this.state
    const {notify} = this.props
    const payload = {
      id: notify.id
    }
    console.log(payload);
    this.setState({
      toggleActive: !toggleActive,
    });
    this.props.toggleActive(!toggleActive, notify.id)
  };

  render() {
    const { notify } = this.props;
    const {toggleActive, disable} = this.state
    
    return (
      <Fragment>
        {/* Modal Popup */}
        <div className="modal fade" id={`modal-${notify.id}`} role="dialog">
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">
                  {notify.senderName} ({moment(notify.sendDate).format("DD/MM/YYYY")})
                </h4>
              </div>
              <div className="modal-body" dangerouslySetInnerHTML={{ __html: notify.content }} />
              
              <div className="modal-footer">
                {
                  notify.file &&
                  notify.file.map((file, index) => {
                    return (
                        <div className="files" key={index}>
                          <a href={global.uri + "/api/notifications/files/" + file.id} >
                            {file.name + file.extension}
                          </a>
                        </div>
                    );
                  })
                }
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-panel" style={!toggleActive ? {opacity: "0.4"} : {} }>    
          <div className="panel panel-bd lobidrag">
            {/* Title */}
            <div className="panel-heading">
              <div className="panel-title">
                <h4>{notify.senderName} ({moment(notify.sendDate).format("DD/MM/YYYY")})</h4>
                <div className="hidden_toggle" style={{ float: "right" }}>
                  <Toggle
                    onstyle="success"
                    onClick={this.onToggle}
                    on={"Enable"}
                    off={"Disable"}
                    size="xs"
                    offstyle="danger"
                    active={this.state.toggleActive}
                    data-style="android" 
                    data-onstyle="info"
                  />
                </div>
              </div>
            </div>

            {/* Body content */}
            <div className="panel-body" 
              dangerouslySetInnerHTML={{ __html: notify.content }} 
            />
              
            {/* Files attachment */}
            <div className="panel-footer">
                {notify.file &&
                  notify.file.map((file, index) => {
                    return (
                      <div className="files" key={index}>
                        <a href={global.uri + "/api/notifications/files/" + file.id}>
                          {file.name + file.extension}
                        </a>
                      </div>
                    );
                  })
                }
              <div className="detail" data-toggle="modal" data-target={`#modal-${notify.id}`}>Xem chi tiết</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
