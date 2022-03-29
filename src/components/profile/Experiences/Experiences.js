import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Item from './Item'

import { 
  getExperiences,
  updateExperience,
  deleteExperience,
  addExperience
} from "../../../actions/profileActions";

class Experiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      experiences: null,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.experiences.experiences !== this.state.experiences) {
      this.setState({
        experiences: nextProps.experiences.experiences,
      });
    }
  }

  handleRequest() {
    this.props.getExperiences();
  }

  addExperience = (item) => {
    if(confirm("Bạn có muốn thêm?")){ //eslint-disable-line
      this.props.addExperience(item)
      this.handleRequest()
    }
  }

  updateExperience = (id, item) => {
    if(confirm("Bạn có muốn thay đổi thông tin?")){ //eslint-disable-line
      this.props.updateExperience(id, item)
      this.handleRequest()
    }
  }

  deleteExperience = (id) => {
    if(confirm("Bạn có chắc chắn muốn xóa?")){ //eslint-disable-line
      this.props.deleteExperience(id)
      this.handleRequest()
    }
  }

  render() {
    const { experiences, editting, add } = this.state
      return (
        <div className="review-block">
              <div className="panel-body">
                  <ul className="activity-list list-unstyled">
                    {experiences && experiences.map((experience, index) => {
                        return (
                          <Item
                            key={index}
                            year={experience.year}
                            experience={experience.experience}
                            position={experience.position}
                            detail={experience.detail}
                            handleUpdate={(id, item) => {this.updateExperience(experience.id, item)}}
                            handleDelete={(id) => {this.deleteExperience(experience.id)}}
                          />
                        )
                      })
                    }
                    <Item
                      add={add}
                      handleAdd={(item) => {this.addExperience(item)}}
                    />
                  </ul>
              </div>
        </div>
      )
    
  }
}

Experiences.propTypes = {
  experiences: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  experiences: state.experiences
});

export default connect(mapStateToProps, {
  getExperiences,
  updateExperience,
  deleteExperience,
  addExperience
})(withRouter(Experiences));