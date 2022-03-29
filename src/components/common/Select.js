import React from 'react'
import PropTypes from 'prop-types';

class Select extends React.Component {


  componentDidMount() {
    const select = window.select("#" + this.props.id, "#" + this.props.parent);
    window.onChange("#" + this.props.id, this.props.onChange);
    this.props.setSelect(select);
  }

  onChange() {
    
  }  

  componentDidUpdate(){
    
  }


  render() {
    const {
      id,
      name,
      placeholder,
      label,
      defaultValue,
      defaultMessage,
      data,
      value,
      error,
      info,
      onChange,
      setSelect,
      disabled,
      multiple,
      required,
    } = this.props;
    let currentValue = value || defaultValue;

    return (
      <div>
        {label && <label className="control-label">{label}</label>}

        <select
          className="form-control"
          id={id}
          name={name}
          data-placeholder={placeholder}
          value={currentValue}
          onChange={this.onChange}
          disabled={disabled}
          multiple={multiple}
          required={required}
        >
          <option value={defaultValue} data-tokens={defaultValue}>
            {defaultMessage}
          </option>
          {data && this.props.renderOption(data) }
          {/* data &&
              data.length > 0 &&
                data.map((item, key) => {
                  return (
                    <option key={key} value={item.id} data-tokens={item.id}>
                      {item.name}
                    </option>
                  );
                }) */}
          
        </select>
        {info && <span className="help-block small">{info}</span>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

Select.propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string.isRequired,
    placeholder:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]),
    defaultMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    data: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]),
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    parent: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    renderOption: PropTypes.func.isRequired,
}

Select.defaultProps = {
    data: [],
    multiple: false,
};

export default Select;