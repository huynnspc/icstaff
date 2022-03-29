import React, { Component } from 'react'
// import Select from "../common/Select";
import Select from 'react-select';
import {Gia_Tri_Loc, Dieu_Kien_Loc, Loai_Ket_Hop, Gioi_Tinh, Loai_The, Nghe_Nghiep} from './Common'
const colourStyles = {
  control: styles => ({
    ...styles, 
    border: 'none',
    backgroundColor: '#1C1F22',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "none"
  }),
  option: base => ({
    ...base,
    color: '#000',
    height: '100%',
  }),
  singleValue: styles => ({ 
    ...styles, 
    color: '#999'
  }),
}

export default class DK_Ket_Hop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      select: null,
      dk_ket_hop: {},
      position: '',
      data: {}
    };
    this.myRef = React.createRef();
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps.data', nextProps.data);
    
    if(nextProps.position !== this.state.position){
      this.setState({
        position: nextProps.position
      })
    }

    if(nextProps.data !== this.state.data){
      this.setState({
        data: nextProps.data
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log('this.state.data', this.state.data);

    if(this.props.data !== prevState.data) {
      
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
    console.log(e.val());
    const { dk_loc } = this.state;
    const payload = {
      ...dk_loc,
      [e[0].name]: e.val(),
    };
    this.setState({
      dk_loc: payload,
      [e[0].name]: e.val()
    });
  };

  onInputChange = (e) => {
    const { dk_ket_hop } = this.state;
    const payload = {
      ...dk_ket_hop,
      [e.target.name]: e.target.value,
    };
    this.setState({
      dk_ket_hop: payload
    });
    this.props.onChange(payload, this.props.position)
  }

  handleChange = (selectedOption, options) => {
    const { dk_ket_hop } = this.state;
    console.log('selectedOption',selectedOption);
    const payload = {
      ...dk_ket_hop,
      [options.name]: selectedOption,
    };
    this.setState({
      dk_ket_hop: payload
    });
    console.log('handleChange payload: ',payload);

    this.props.onChange(payload, this.props.position)
  }

  renderInput = () => {
    const { gia_tri_loc, data } = this.props;
    switch(gia_tri_loc){
      case "1":
        return(
          <input
            type="number"
            className="form-control"
            placeholder="Giá trị bill"
            name="bill"
            onChange={this.onInputChange}
            required
            value={data.bill}
          />
        )
        break;
      case "2":
        return(
          <input
            type="number"
            className="form-control"
            placeholder="Độ tuổi"
            name="age"
            onChange={this.onInputChange}
            required
            value={data.age}
          />
        )
        break;
      case "3":
        return(
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Giới tính"
            styles={colourStyles}
            onChange={this.handleChange}
            name="gioi_tinh"
            options={Gioi_Tinh}
            value={data.gioi_tinh}
          /> 
        )
        break;
      case "4":
        return(
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Loại thẻ"
            styles={colourStyles}
            onChange={this.handleChange}
            name="loai_the"
            options={Loai_The}
            value={data.loai_the}
          />
        )
        break;
      case "5":
        return(
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Nghề nghiệp"
            styles={colourStyles}
            onChange={this.handleChange}
            name="nghe_nghiep"
            options={Nghe_Nghiep}
            value={data.nghe_nghiep}
          />
        )
        break;
      default:
        break;
    }
  }

  xoa_dieu_kien_ket_hop = () => {
    this.props.onDelete(this.props.position)
  }

  render() {
    const {data} = this.props
    
    return (
      <div className="row">
        <div className="form-group col-sm-3">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Loại kết hợp"
            styles={colourStyles}
            onChange={this.handleChange}
            name="loai_ket_hop"
            options={Loai_Ket_Hop}
            value={data.loai_ket_hop}
          /> 
        </div>
        <div className="form-group col-sm-3">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Điều kiện loại kết hợp"
            styles={colourStyles}
            onChange={this.handleChange}
            name="dieu_kien_loai_ket_hop"
            options={Dieu_Kien_Loc}
            value={data.dieu_kien_loai_ket_hop}
          />
        </div>
        <div className="form-group col-sm-3">
          {this.renderInput()}
        </div>
        <div className="form-group col-sm-3">
          <button 
            type="button" 
            className="btn btn-danger btn-circle m-b-5 f-l"
            style={{ paddingTop: "3px" }}
            onClick={this.xoa_dieu_kien_ket_hop}
          >
            <i className="glyphicon glyphicon-remove" style={{ paddingTop: "3px" }}></i>
          </button>
        </div>
      </div>
    )
  }
}
