import React, { Component, Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"

export default class UserContentMenu extends Component {
  render() {
    const { pathname, userid } = this.props
    return (
      <div className="panel-heading">
        <div className="panel-title">
          <ul className="menu">
            <li className={classnames({ active: pathname.includes("/info") })}>
              <Link to={`/user/${userid}/info`}> Chi tiết</Link>
            </li>
            <li className={classnames({ active: pathname.includes("/work") })}>
              <Link to={`/user/${userid}/work`}>Công việc</Link>
            </li>
            <li className={classnames({ active: pathname.includes("/insurance") })}>
              <Link to={`/user/${userid}/insurance`}>Bảo hiểm</Link>
            </li>
            <li className={classnames({ active: pathname.includes("/document") })}>
              <Link to={`/user/${userid}/document`}>Tiếp nhận</Link>
            </li>
            <li className={classnames({ active: pathname.includes("/contract") })}>
              <Link to={`/user/${userid}/contract`}>Hợp đồng</Link>
            </li>
            <li className={classnames({ active: pathname.includes("/salary") })}>
              <Link to={`/user/${userid}/salary`}>Lương</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
