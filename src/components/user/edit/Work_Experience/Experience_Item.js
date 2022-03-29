import React, { Component } from "react";
import moment from "moment";
import Select from "../../../common/Select";

export default class Experience_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
      select: "",
      experience: {},
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.item !== this.state.experience) {
      this.setState({experience: nextProps.item});
    }
    
    if(nextProps.position !== this.state.position) {
      this.setState({position: nextProps.position});
    }
  }

  setSelect = (select) => {
    this.setState({ select: select });
  };

  onInputChange = (e) => {
    const { experience, position } = this.state;
    const payload = {
      ...experience,
      idx: position,
      [e.target.name]: e.target.value,
    };
    this.setState({
      experience: payload,
    });
    this.props.onChange(payload);
  };

  deleteItem = () => {
    const { position } = this.state;
    this.props.onDelete(position);
  };

  render() {
    const { item, position } = this.props;
    return (
      <tr>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="Từ tháng"
            name="from_date"
            value={moment(item.from_date).format('YYYY-MM-DD')}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="Đến tháng"
            name="to_date"
            value={moment(item.to_date).format('YYYY-MM-DD')}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Công ty"
            name="company"
            value={item.company}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Vị trí"
            name="position"
            value={item.position}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Người tham chiếu"
            name="manager"
            value={item.manager}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            placeholder="Điện thoại"
            name="mobile"
            value={item.mobile}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Mô tả công việc"
            name="description"
            value={item.description}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <div className="flex-container" style={{ alignItems: "center" }}>
            <span title="Xóa" className="ti-trash" onClick={this.deleteItem}></span>
          </div>
        </td>
      </tr>
      // <div className="form-group col-md-12 flex-container">
      //     <div className="col-sm-2">
      //       <input
      //         type="date"
      //         className="form-control"
      //         placeholder="Từ tháng"
      //         name="from_date"
      //         value={moment(item.from_date).format('YYYY-MM-DD')}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="col-sm-2">
      //       <input
      //         type="date"
      //         className="form-control"
      //         placeholder="Đến tháng"
      //         name="to_date"
      //         value={moment(item.to_date).format('YYYY-MM-DD')}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="col-sm-2">
      //       <input
      //         type="text"
      //         className="form-control"
      //         placeholder="Công ty"
      //         name="company"
      //         value={item.company}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="col-sm-2">
      //       <input
      //         type="text"
      //         className="form-control"
      //         placeholder="Vị trí"
      //         name="position"
      //         value={item.position}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="col-sm-2">
      //       <input
      //         type="text"
      //         className="form-control"
      //         placeholder="Người tham chiếu"
      //         name="manager"
      //         value={item.manager}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="col-sm-2">
      //       <input
      //         type="number"
      //         className="form-control"
      //         placeholder="Điện thoại"
      //         name="mobile"
      //         value={item.mobile}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="col-sm-2">
      //       <input
      //         type="text"
      //         className="form-control"
      //         placeholder="Mô tả công việc"
      //         name="description"
      //         value={item.description}
      //         onChange={this.onInputChange}
      //       />
      //       <div className="errorMessage text-danger m-t-5">
      //         <span></span>
      //       </div>
      //     </div>
      //     <div className="flex-container" style={{ alignItems: "center" }}>
      //       <span title="Xóa" className="ti-trash" onClick={() => {this.deleteItem()}}></span>
      //     </div>
      //   </div>
    );
  }
}
