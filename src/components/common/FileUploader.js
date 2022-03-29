import React from 'react'
import PropTypes from 'prop-types';

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: global.uri + "/admin/notifications/files", 
        }
    }

  componentDidMount() {
    const { url } = this.state;
    const uploader = window.dropzone("#uploader", url, this.props.onChange, this.props.onRemove);
    this.props.setUploader(uploader);
  }

  render() {
    const { url }= this.state;
    const { error, info } = this.props;

    return (
      <div className="form-group col-sm-12">
        <form id="uploader" action={url} className="dropzone" method="post" 
            encType="multipart/form-data">
          {info && <span className="help-block small">{info}</span>}
          {error && <div className="invalid-feedback">{error}</div>}
        </form>
      </div>
    );
  }
}

FileUploader.propTypes = {
    id: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

FileUploader.defaultProps = {
    data: [],
    multiple: false,
};

export default FileUploader;