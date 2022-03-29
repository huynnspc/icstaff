import React, { Component }  from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';
import validator from 'validator';

class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      isInputValid: this.props.validate,
      errorMessage: ''
    }
  }

  handleInputValidation = () => {
    // const {isInputValid} = this.state
    // console.log("isInputValid",isInputValid);
    // if(isInputValid){
    // this.props.onValidate(isInputValid)
    // }
    
    const {value, name, validate} = this.props
    if(validate){
      if(name === "email"){
        const checkingResult = validator.isEmail(value)
        this.props.onValidate(null)
        if (checkingResult === true) {
          this.setState({
            isInputValid: true,
            errorMessage: ''
          })
        }else{
          const errorMessage = 'email'
          this.props.onValidate(errorMessage)
          this.setState({
            isInputValid: false,
            errorMessage: 'Email không đúng định dạng'
          })
        }    
      } 
      if(name === "phone"){
        const checkingResult = validator.isMobilePhone(value) && validator.isLength(value,{min:10, max:11})
        this.props.onValidate(null)
        if (checkingResult === true) {
          this.setState({
            isInputValid: true,
            errorMessage: ''
          })
        }else{
          const errorMessage = 'phone'
          this.props.onValidate(errorMessage)
          this.setState({
            isInputValid: false,
            errorMessage: 'Vui lòng nhập số ĐT gồm 10 - 11 chữ số.'
          })
        }         
      }
      if(name === "cmnd"){
        const checkingResult = validator.isAlphanumeric(value) && validator.isLength(value,{min:9, max:12})
        this.props.onValidate(null)
        if (checkingResult === true) {
          this.setState({
            isInputValid: true,
            errorMessage: ''
          })
        }else{
          const errorMessage = 'cmnd'
          this.props.onValidate(errorMessage)
          this.setState({
            isInputValid: false,
            errorMessage: 'Vui lòng nhập số CMND gồm 9 chữ số hoặc CCCD gồm 12 chữ số.'
          })
        }        
      }
    }
  }

  renderError = () => {
    const {isInputValid, errorMessage} = this.state
    if(isInputValid !== true){
      return (
        <div className="errorMessage text-danger m-t-5">
          <span>{errorMessage}</span>
        </div>
      )
    }else {
      return null
    }
  }
    
  render() {
    const {
      id,
      name,
      placeholder,
      label,
      icon,
      value,
      error,
      info,
      type, 
      onChange,
      onValidate,
      disabled, 
      validate,
      pattern
    } = this.props
    return (
      <div className={classnames("form-group", {
        "col-sm-12": icon ? false : true
      })}>
        {label && <label className="control-label">{label}</label>}
        <div className={classnames("input-group", {
          "col-sm-12": icon ? false : true
        })}>
            {icon && (
                <span className="input-group-addon">
                    <i className={icon}></i>
                </span>
            )}
          <input
            id={id}
            type={type}
            className={classnames("form-control", {
              "is-invalid": error || this.state.errorMessage,
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={this.handleInputValidation}
            pattern={pattern}
          />
          {this.renderError()}
        </div>
        {info && <span className="help-block small">{info}</span>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
}
}
Input.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    validate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
      PropTypes.bool
    ]),
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

Input.defaultProps = {
    type: 'text'
};

export default Input;