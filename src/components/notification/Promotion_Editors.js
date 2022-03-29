import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";

import FileUploader from '../common/FileUploader';

import './css/custom.css';

class Promotion_Editors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category_id: "",
      title: "",
      content: "",
      files: [],
      uploader: null
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onUploaderChange = this.onUploaderChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onClearForm = this.onClearForm.bind(this);
    this.onRemovedFile = this.onRemovedFile.bind(this);
    this.setUploader = this.setUploader.bind(this);
  }

  componentDidMount() {
    // window.$("#some-textarea").wysihtml5()
    const { pathname } = this.props;
    if (pathname === "/notifications/hr") {
      this.setState({
        category_id: global.hr_category,
      });
    } else if (pathname === "/notifications/system") {
      this.setState({
        category_id: global.system_category,
      });
    } else if (pathname === "/notifications/promotions") {
      this.setState({
        category_id: global.pr_category,
      });
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  onInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      title: e.target.value,
    });
  } 

  handleEditorChange (content) {
    // console.log(content)
    this.setState({
      content: content,
    });
  };

  onUploaderChange(file, error) {
    if(error) {
      if(!file.accepted) {
          window.toast("Welcome to Adminpage", 
              "Hệ thống không hỗ trợ upload loại file này (" + file.type + ")", 4000, "error");
      }
      else {
        window.toast("Welcome to Adminpage", error, 4000, "error");
      }
    }
    else {
      console.log('file: ', file);
      let { files } = this.state;
      files.push(file);
      this.setState({ files: files });
      console.log('====================================');
      console.log('Files length: ', files.length);
      console.log('====================================');
    }
  }

  onRemovedFile(file) {
    let {files} = this.state;
    files = files.filter(item => item !== file)
    this.setState({files: files});
  }

  onSave(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.onClearForm();
  };

  onClearForm() {
    console.log('Clear Form')
    this.setState({
      content: "",
      files: []
    });
    // dropzone.js
    window.clearAll(this.state.uploader);
  };

  setUploader(uploader) {
    this.setState({uploader: uploader});
  }

  render() {
    return (
      <div className="panel panel-bd">
        <div className="panel-heading">
          <div className="panel-title p-l-15">
            <h4>NỘI DUNG THÔNG BÁO</h4>
          </div>
        </div>

        <div className="panel-body">
          <form onSubmit={this.onSave}>
            <div className="form-group col-md-12 d-flex p-2">
              <label className="control-label">Tiêu đề</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Tiêu đề" 
                name="title" 
                onChange={this.onInputChange} 
                required
              />  
            </div>
            <div className="form-group col-md-12 d-flex p-2">
              <label className="control-label">Nội dung</label>
              <Editor
                apiKey='fejosdtrb91fexvzpr2svmabuqt0o5y50zq2vcymcml803y8'
                initialValue=""
                value={this.state.content}
                init={{
                  height: 400,
                  menubar: false,
                  entity_encoding : "raw",
                  toolbar_mode: 'wrap',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code wordcount',
                    'paste'
                  ],
                  toolbar:
                    `undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat`,
                  forced_root_block : '',
                  force_br_newlines : true,
                  force_p_newlines : false,
                  paste_as_text: true
                }}
                onEditorChange={this.handleEditorChange}
              />
            </div>

            <div className="form-group col-md-12 d-flex p-2">
              <button
                type="submit"
                className="btn btn-primary btn-rounded w-md float-right"
              >
                Gửi
              </button>
            </div>
          </form>

          <div className="form-group col-md-12 d-flex p-2">
            <FileUploader 
              id="uploader" 
              info="" 
              error="" 
              onChange={this.onUploaderChange} 
              onRemove={this.onRemovedFile} 
              setUploader={this.setUploader}
            />
            <small>
              File đính kèm (.doc, .docx, .xlsx, .xls, .pdf, .png, .jpg, .jpeg) 
            </small>
            <br />
            <small>Dung lượng {"<"} 20MB</small>
            </div>
        </div>
      </div>
    );
  }
}

export default Promotion_Editors;
