import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Item from "./Item";

import {
  getTimelines,
  updateTimeline,
  deleteTimeline,
  addTimeline
} from "../../../actions/profileActions";

class Timelines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      timelines: null,
      editting: false,
      add: false,
      errors: {},
    };
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    window.loading();
    this.handleRequest();
  }

  // componentDidUpdate() {
  //   console.log("Timeline", this.state);
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timelines.timelines !== this.state.timelines) {
      this.setState({
        timelines: nextProps.timelines.timelines,
      });
    }
  }

  handleRequest() {
    this.props.getTimelines();
  }

  addTimeline = (item) => {
    if (confirm("Bạn có muốn thêm?")) {//eslint-disable-line
      this.props.addTimeline(item);
      this.handleRequest();
    }
  };

  updateTimeline = (id, item) => {
    if (confirm("Bạn có muốn thay đổi thông tin?")) {//eslint-disable-line
      this.props.updateTimeline(id, item);
      this.handleRequest();
    }
  };

  deleteTimeline = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {//eslint-disable-line
      this.props.deleteTimeline(id);
      this.handleRequest();
    }
  };

  render() {
    const { timelines, editting, add } = this.state;
    return (
      <div className="review-block">
        <div className="panel-body">
          <ul className="activity-list list-unstyled">
            {timelines &&
              timelines.map((timeline, index) => {
                return (
                  <Item
                    key={index}
                    time={timeline.time}
                    company={timeline.company}
                    position={timeline.position}
                    detail={timeline.detail}
                    handleUpdate={(id, item) => {
                      this.updateTimeline(timeline.id, item);
                    }}
                    handleDelete={(id) => {
                      this.deleteTimeline(timeline.id);
                    }}
                  />
                );
              })}
            <Item
              add={add}
              handleAdd={(item) => {
                this.addTimeline(item);
              }}
            />
          </ul>
        </div>
      </div>
    );
  }
}

Timelines.propTypes = {
  timelines: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  timelines: state.timelines,
});

export default connect(mapStateToProps, {
  getTimelines,
  updateTimeline,
  deleteTimeline,
  addTimeline
})(withRouter(Timelines));
