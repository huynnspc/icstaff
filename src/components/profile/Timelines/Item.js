import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: this.props.add,
      editting: this.props.editting,
      time: this.props.time,
      position: this.props.position,
      company: this.props.company,
      detail: this.props.detail,
    };
  }

  // componentDidMount() {
  //   console.log("componentDidMount", this.state);
  // }

  // componentDidUpdate() {
  //   console.log("componentDidUpdate", this.state);
  // }

  handleEdit = () => {
    this.setState({
      editting: true,
      add: false,
    });
  };

  handleAddEditting = () => {
    this.setState({
      editting: true,
      add: true,
    });
  };

  handleAdd = (item) => {
    this.setState({
      editting: false,
      add: false,
    });
    var item = {};
    item.time = this.state.time;
    item.position = this.state.position;
    item.company = this.state.company;
    item.detail = this.state.detail;
    this.props.handleAdd(item);
  };

  handleUpdate = (id, item) => {
    this.setState({
      editting: false,
      add: false,
    });
    var item = {};
    item.time = this.state.time;
    item.position = this.state.position;
    item.company = this.state.company;
    item.detail = this.state.detail;
    this.props.handleUpdate(id, item);
  };

  handleCancel = () => {
    this.setState({
      editting: false,
      add: false,
    });
  };

  handleDelete = (id) => {
    this.props.handleDelete(id);
  };

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { add, editting } = this.state;
    if (editting === true) {
      return (
        <li className="activity-primary">
          <div className="experience">
            <input
              className="form-control m-b-5"
              type="text"
              name="year"
              placeholder="Năm"
              defaultValue={this.props.time}
              onChange={this.handleInputChange}
            />
            <input
              className="form-control m-b-5"
              type="text"
              name="experience"
              placeholder="Công việc"
              defaultValue={this.props.company}
              onChange={this.handleInputChange}
            />
            <input
              className="form-control m-b-5"
              type="text"
              name="position"
              placeholder="Vị trí công việc"
              defaultValue={this.props.position}
              onChange={this.handleInputChange}
            />
            <textarea
              rows="3"
              className="form-control"
              type="text"
              name="detail"
              placeholder="Chi tiết công việc"
              defaultValue={this.props.detail}
              onChange={this.handleInputChange}
            />
            {add === true ? (
              <button
                type="button"
                className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                onClick={() => {
                  this.handleAdd();
                }}
              >
                Thêm mới
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
                onClick={() => {
                  this.handleUpdate();
                }}
              >
                Cập nhật
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger btn-rounded w-md m-t-5 m-r-5"
              onClick={() => {
                this.handleCancel();
              }}
            >
              Hủy
            </button>
          </div>
        </li>
      );
    } else if (this.props.add === false) {
      return (
        <li className="activity-purple-add">
          <i
            className="pe-7s-plus f-r"
            onClick={() => {
              this.handleAddEditting();
            }}
          ></i>
        </li>
      );
    } else {
      return (
        <li className="activity-primary">
          {this.props.add === false ? (
            <i
              className="pe-7s-plus f-r fa-lg"
              onClick={() => {
                this.handleAddEditting();
              }}
            ></i>
          ) : (
            <i className="pe-7s-note f-r" data-toggle="dropdown"></i>
          )}
          <ul role="menu" className="dropdown-menu">
            <li
              onClick={() => {
                this.handleEdit();
              }}
            >
              <a>Sửa</a>
            </li>
            <li
              onClick={() => {
                this.handleDelete();
              }}
            >
              <a>Xóa</a>
            </li>
          </ul>
          <h4 className="m-0">
            {this.props.position} - {this.props.company}
          </h4>
          <small className="text-muted">{this.props.time}</small>
          <p>{this.props.detail}</p>
        </li>
      );
    }
  }
}
