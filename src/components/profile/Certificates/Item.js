import React, { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: this.props.add,
      editting: this.props.editting,
      year: this.props.year,
      certificate: this.props.experience,
      specialized: this.props.specialized
    };
  }

  // componentDidMount(){
  //   console.log('Item componentDidMount',this.state)
  // }

  // componentDidUpdate(){
  //   console.log('Item componentDidUpdate',this.state)
  // }

  handleEdit = () => {
    this.setState({
      editting: true,
      add: false
    });
  };

  handleAddEditting = () => {
    this.setState({
      editting: true,
      add: true,
    });
  }

  handleAdd = (item) => {
    this.setState({
      editting: false,
      add: false,
    });
    var item = {};
    item.year = this.state.year;
    item.certificate = this.state.certificate;
    item.specialized = this.state.specialized;
    this.props.handleAdd(item);
  };

  handleUpdate = (id, item) => {
    this.setState({
      editting: false,
      add: false
    });
    var item = {};
    item.year = this.state.year;
    item.certificate = this.state.certificate;
    item.specialized = this.state.specialized;
    this.props.handleUpdate(id, item);
  };

  handleCancel = () => {
    this.setState({
      editting: false,
      add: false
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
              placeholder="Thời gian"
              defaultValue={this.props.year}
              onChange={this.handleInputChange}
            />
            <input
              className="form-control m-b-5"
              type="text"
              name="certificate"
              placeholder="Trường"
              defaultValue={this.props.certificate}
              onChange={this.handleInputChange}
            />
            <input
              className="form-control m-b-5"
              type="text"
              name="specialized"
              placeholder="Chuyên ngành"
              defaultValue={this.props.specialized}
              onChange={this.handleInputChange}
            />
            
            {add === true ?
            <button
              type="button"
              className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
              onClick={() => {
                this.handleAdd();
              }}
            >
              Thêm mới
            </button>
            : 
            <button
              type="button"
              className="btn btn-success btn-rounded w-md m-t-5 m-r-5"
              onClick={() => {
                this.handleUpdate();
              }}
            >
              Cập nhật
            </button>
            }
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
      )
    }else if(this.props.add === false){
      return (
        <li className="activity-purple-add">
            <i className="pe-7s-plus f-r" onClick={() => {this.handleAddEditting()}}></i>
        </li>
      )
    }else{
      return (
        <li className="activity-primary">
          {this.props.add === false ?
            <i className="pe-7s-plus f-r fa-lg" onClick={() => {this.handleAddEditting()}}></i>
            :
            <i className="pe-7s-note f-r" data-toggle="dropdown"></i>
          }
            <ul role="menu" className="dropdown-menu">
              <li onClick={() => {this.handleEdit()}}><a>Sửa</a></li>
              <li onClick={() => {this.handleDelete()}}><a>Xóa</a></li>
            </ul>
          <h4 className="m-0">{this.props.certificate}</h4>
          <small className="text-muted">{this.props.year}</small>
          <p>{this.props.specialized}</p>
        </li>
      )
    }
  }
}
