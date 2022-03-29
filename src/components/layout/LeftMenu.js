import React, { Component } from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import Can from "../common/Can"

export default class LeftMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { pathname } = this.props

    return (
      <div className="sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
          <ul className="nav" id="side-menu">
            <li className="nav-heading">
              <span>Main Navigation&nbsp;&nbsp;&nbsp;&nbsp;------</span>
            </li>

            <Can I="read" this="users">
              <li
                className={classnames({
                  active: pathname === "/" || pathname.includes("/users"),
                })}
              >
                <Link className="material-ripple" to="/users">
                  <i className="material-icons">home</i> Thông tin nhân sự
                </Link>
              </li>
            </Can>

            <Can I="read" this="regions">
              <li
                className={classnames({
                  active: pathname.includes("/regions"),
                })}
              >
                <Link className="material-ripple" to="/regions">
                  <i className="material-icons">bubble_chart</i> Thông tin vùng
                </Link>
              </li>
            </Can>

            <Can I="read" this="stores">
              <li
                className={classnames({ active: pathname.includes("/stores") })}
              >
                <Link className="material-ripple" to="/stores">
                  <i className="material-icons">drafts</i> Thông tin cửa hàng
                </Link>
              </li>
            </Can>

            <Can I="read" this="roles">
              <li
                className={classnames({ active: pathname.includes("/roles") })}
              >
                <Link className="material-ripple" to="/roles">
                  <i className="material-icons">business</i> Thông tin chức danh
                </Link>
              </li>
            </Can>

            <Can I="read" this="wagestosales">
              <li
                className={classnames({
                  active: pathname.includes("/wagestosales"),
                })}
              >
                <Link className="material-ripple" to="/wagestosales">
                  <i className="material-icons">business</i> Tỷ lệ Giờ lương /
                  Doanh thu
                </Link>
              </li>
            </Can>

            <Can I="read" this="chuong-trinh-goi-khach-hang">
              <li
                className={classnames({
                  active: pathname.includes("/chuong-trinh-goi-khach-hang"),
                })}
              >
                <Link
                  className="material-ripple"
                  to="/chuong-trinh-goi-khach-hang"
                >
                  <i className="material-icons">business</i> Setup Chương Trình
                  Gọi Khách Hàng
                </Link>
              </li>
            </Can>

            <Can I="read" this="notifications">
              <li
                className={classnames({
                  active: pathname.includes("/notifications"),
                })}
              >
                <a href="#" className="material-ripple">
                  <i className="material-icons">notifications_active</i> Thông
                  báo <span className="fa arrow"></span>
                </a>
                <ul className="nav nav-second-level">
                  <Can I="read" this="notifications-system">
                    <li
                      className={classnames({
                        active: pathname.includes("/notifications/system"),
                      })}
                    >
                      <Link
                        className="material-ripple"
                        to="/notifications/system"
                      >
                        <i className="material-icons">dashboard</i> Hệ thống
                      </Link>
                    </li>
                  </Can>
                  <Can I="read" this="notifications-hr">
                    <li
                      className={classnames({
                        active: pathname.includes("/notifications/hr"),
                      })}
                    >
                      <Link className="material-ripple" to="/notifications/hr">
                        <i className="material-icons">people</i> Hành chính nhân
                        sự
                      </Link>
                    </li>
                  </Can>
                  <Can I="read" this="notifications-promotions">
                    <li
                      className={classnames({
                        active: pathname.includes("/notifications/promotions"),
                      })}
                    >
                      <Link
                        className="material-ripple"
                        to="/notifications/promotions"
                      >
                        <i className="material-icons">people</i> Chương trình
                        khuyến mãi
                      </Link>
                    </li>
                  </Can>
                </ul>
              </li>
            </Can>
          </ul>
        </div>
      </div>
    )
  }
}
