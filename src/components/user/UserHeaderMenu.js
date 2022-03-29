import React, { Component, Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import Can from '../common/Can'

export default class UserHeaderMenu extends Component {
  render() {
    const { pathname } = this.props

    const lastSegment = pathname.split('/').filter(p => p).pop()

    return (
      <div className="row m-0">
        <div className="col-md-3">
          <div className="adduser">
            <Can I="create" this="users">
              <Link to={'/users/add/information'}>
                <i className="hvr-buzz-out fa fa-plus-circle"></i>
                <span className="m-l-5">Tạo mới User </span>
              </Link>
            </Can>
          </div>
        </div>
        <div className="col-md-9">
          <div className="editmenu">
            <ul>
              <Can I="update" this="users">
                {lastSegment !== 'edit' && lastSegment !== 'work' ? 
                  <li>
                    <Link to={`${pathname}/edit`}>
                      <i className="hvr-buzz-out fa fa-pencil"></i>
                      <span>Sửa</span>
                    </Link>
                  </li>
                : 
                  <li>
                    <i className="hvr-buzz-out fa fa-pencil"></i>
                    <span>Sửa</span>
                  </li>
                }
              </Can>
              {/* <li>
                <i className="hvr-buzz-out fa fa-folder-open-o"></i>
                <span>Hợp đồng</span>
              </li> */}
              <Can I="update" this="users">
                {
                  lastSegment !== 'work' ?
                    <li>
                      <i className="hvr-buzz-out fa fa-list-ul"></i>
                      <span>Thêm công việc</span>
                    </li> :
                    <li>
                      <Link onClick={() => this.props.onClick && this.props.onClick('cong-viec')} to="#">
                        <i className="hvr-buzz-out fa fa-list-ul"></i>
                        <span>Thêm công việc</span>
                      </Link>
                    </li>
                }
              </Can>
              {/* <li>
                <i className="hvr-buzz-out fa fa-money"></i>
                <span>Lương</span>
              </li> */}
              {/* <li>
                <i className="hvr-buzz-out fa fa-list-ul"></i>
                <span>Bảo hiểm</span>
              </li> */}
              <Can I="update" this="users">
                {
                  lastSegment !== 'work' ?
                    <li>
                      <i className="hvr-buzz-out fa fa-list-ul"></i>
                      <span>Thêm kiêm nhiệm</span>
                    </li> :
                    <li>
                      <Link onClick={() => this.props.onClick && this.props.onClick('kiem-nhiem')} to="#">
                        <i className="hvr-buzz-out fa fa-list-ul"></i>
                        <span>Thêm kiêm nhiệm</span>
                      </Link>
                    </li>
                }
              </Can>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
