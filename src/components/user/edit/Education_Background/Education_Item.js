import React, { Component } from "react";
import moment from "moment";
import Select from "../../../common/Select";

import {trinhdohocvan, hinhthucdaotao} from "../../add/Common"

export default class Education_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
      select: "",
      education: {}
    };
  }

  componentDidMount(){
    window.select2reload(`#${this.props.position}_mode_of_study`, this.props.item.mode_of_study);
    window.select2reload(`#${this.props.position}_level`, this.props.item.level);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.item !== this.state.education) {
      this.setState({education: nextProps.item});
    }
    
    if(nextProps.position !== this.state.position) {
      this.setState({position: nextProps.position});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.item.mode_of_study !== prevState.education.mode_of_study){
      window.select2reload(`#${this.props.position}_mode_of_study`, this.props.item.mode_of_study);
    }
    if(this.props.item.level !== prevState.education.level){
      window.select2reload(`#${this.props.position}_level`, this.props.item.level);
    }
  }

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
    const { education, position } = this.state;
    const payload = {
      ...education,
      idx: position,
      [e[0].name]: e.val(),
    };
    this.setState({
      education: payload,
    });
    this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const { education, position } = this.state;
    const payload = {
      ...education,
      idx: position,
      [e.target.name]: e.target.value,
    };
    this.setState({
      education: payload,
    });
    this.props.onChange(payload);
  };

  deleteItem = () => {
    const {position} = this.props
    this.props.onDelete(position);
  };

  render() {
    const { item, position } = this.props;
    const {education} = this.state
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
          <Select
            id={position + '_mode_of_study'}
            className="form-control"
            name="mode_of_study"
            placeholder="Hình thức đào tạo" //Trung cấp / Cao đẳng / Đại học
            data={hinhthucdaotao}
            value={item.mode_of_study}
            onChange={this.onSelectChange}
            renderOption={this.renderOption}
            setSelect={this.setSelect}
            parent="wrapper"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Chuyên ngành"
            name="major"
            value={item.major}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <Select
            id={position + '_level'}
            className="form-control"
            name="level"
            placeholder="Trình độ học vấn" //Trung cấp / Cao đẳng / Đại học
            data={trinhdohocvan}
            value={item.level}
            onChange={this.onSelectChange}
            renderOption={this.renderOption}
            setSelect={this.setSelect}
            parent="wrapper"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Nơi đào tạo"
            name="place"
            value={item.place}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <div className="flex-container" style={{ alignItems: "center" }}>
            <span title="Xóa" className="ti-trash" onClick={this.deleteItem}></span>
          </div>
        </td>
      </tr>
      
    );
  }
}
