import React, { Component } from "react";
import Select from "../../../common/Select";
import moment from "moment";

import {trinhdohocvan, hinhthucdaotao} from "../Common"

export default class Education_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "",
      position: '',
      education: {},
      errors: {}
    };
  }

  componentDidMount(){
    window.select2reload(`#${this.props.position}_mode_of_study`, this.props.data.mode_of_study);
    window.select2reload(`#${this.props.position}_level`, this.props.data.level);
  }

  componentWillReceiveProps(nextProps){
    const education = nextProps.data
    if(education !== this.state.education) {
      this.setState({
        education: education,
      });
    }
    
    if(nextProps.position !== this.state.position) {
      this.setState({position: nextProps.position});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.data.mode_of_study !== prevState.education.mode_of_study){
      window.select2reload(`#${this.props.position}_mode_of_study`, this.props.data.mode_of_study);
    }
    if(this.props.data.level !== prevState.education.level){
      window.select2reload(`#${this.props.position}_level`, this.props.data.level);
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
    const { education } = this.state;
    const payload = {
      ...education,
      idx: this.props.position,
      [e[0].name]: e.val(),
    };
    this.setState({
      education: payload,
    });
    this.props.onChange(payload);
  };

  onInputChange = (e) => {
    const { education } = this.state;
    const payload = {
      ...education,
      idx: this.props.position, 
      [e.target.name]: e.target.value,
    };
    this.setState({
      education: payload,
    });
    this.props.onChange(payload);
  };

  deleteItem = () => {
    const { position } = this.props;
    this.props.onDelete(position);
  };

  render() {
    const {position, data} = this.props
    return (
      <tr>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="Từ tháng"
            name="from_date"
            onChange={this.onInputChange}
            max={moment(new Date()).format('YYYY-MM-DD')}
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="Đến tháng"
            name="to_date"
            onChange={this.onInputChange}
            max={moment(new Date()).format('YYYY-MM-DD')}
          />
        </td>
        <td>
          <Select
            id={position+'_mode_of_study'}
            className="form-control"
            name="mode_of_study"
            placeholder="Hình thức đào tạo" //Trung cấp / Cao đẳng / Đại học
            data={hinhthucdaotao}
            value={data.mode_of_study || ''}
            renderOption={this.renderOption}
            onChange={this.onSelectChange}
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
            value={data.major || ''}
            onChange={this.onInputChange}
          />
        </td>
        <td>
          <Select
            id={position+'_level'}
            className="form-control"
            name="level"
            placeholder="Trình độ học vấn" //Trung cấp / Cao đẳng / Đại học
            data={trinhdohocvan}
            value={data.level || ''}
            renderOption={this.renderOption}
            onChange={this.onSelectChange}
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
            value={data.place || ''}
            onChange={this.onInputChange}
          />
        </td>
        <td><span title="Xóa" className="ti-trash" onClick={this.deleteItem}></span></td>
      </tr>


      
    );
  }
}
