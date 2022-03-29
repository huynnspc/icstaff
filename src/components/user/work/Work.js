import "../custom.css"

import React, { Component } from "react"
import { connect } from "react-redux"
import Can from '../../common/Can'

import moment from "moment"

import Navbar from "../../layout/Navbar"
import Left from "../../layout/LeftMenu"

import UserHeaderMenu from "../UserHeaderMenu"
import UserContentMenu from "../UserContentMenu"

import EditWorkDialog from "./EditWorkDialog"
import EditConcurrentlyDialog from "./EditConcurrentlyDialog"

import { getWorks, getUserWorks, getUserConcurrenlies } from '../../../actions/userActions'
import {
  getConcurrently, getWork,
  clearWork, clearConcurrenly,
  addWork, updateWork, updateConcurrently
} from "../../../actions/workAction"

class Work extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: this.props.match.params.id,
      work: [],
      loading: false,
      workModal: false,
      concurrentlyModal: false,
      edit: false
    }

    this.editSelect = this.editSelect.bind(this)

    this.onWorkSubmit = this.onWorkSubmit.bind(this)
    this.onConcurrentlySubmit = this.onConcurrentlySubmit.bind(this)

    this.onEditWork = this.onEditWork.bind(this)
    this.onEditConcurrenly = this.onEditConcurrenly.bind(this)
    this.onCloseWork = this.onCloseWork.bind(this)
    this.onCloseConcurrenly = this.onCloseConcurrenly.bind(this)


    this.renderWork = this.renderWork.bind(this)
    this.renderWorkHistory = this.renderWorkHistory.bind(this)
    this.renderConcurrently = this.renderConcurrently.bind(this)
  }

  componentDidUpdate() { console.log(this.state.work) }

  componentDidMount() {
    this.props.getWorks(this.state.userid)
  }
  
  editSelect(e) {
    if (e === 'cong-viec') 
      this.setState({workModal: true})

    if (e === 'kiem-nhiem') 
      this.setState({concurrentlyModal: true })
  }

  async onWorkSubmit({ edit, ...work }) {
    if (edit) {
      if(await this.props.updateWork({ _user: this.state.userid, ...work })) {
        this.props.getUserWorks(this.state.userid)
        return this.onCloseWork()
      }
    }
    else {
      await this.props.addWork({ _user: this.state.userid, ...work })
        this.props.getUserWorks(this.state.userid)
      return this.onCloseWork()
    }
  }

  async onConcurrentlySubmit({ edit, ...con }) {
    if (edit) {
      if(await this.props.updateWork({ _user: this.state.userid, ...con })) {
        this.props.getUserConcurrenlies(this.state.userid)
        return this.onCloseConcurrenly()
      }
    }
    else {
      await this.props.addWork({ _user: this.state.userid, ...con })
        this.props.getUserConcurrenlies(this.state.userid)
      return this.onCloseConcurrenly()
    }
  }

  onEditWork = async (id) => {
    await this.props.getWork(id)
    this.setState({workModal: true, edit: true})
  }

  onEditConcurrenly = async (id) => {
    await this.props.getConcurrently(id)
    this.setState({concurrentlyModal: true, edit: true})
  }

  onCloseWork = () => {
    this.setState({ workModal: false, edit: false })
    this.props.clearWork()
  }
  
  onCloseConcurrenly = () => {
    this.setState({ concurrentlyModal: false, edit: false })
    this.props.clearConcurrenly()
  }

  renderWork(work) {
    console.log(work.activeDate)
    return (
      <table className="table table-striped b-t">
        <tbody>
          <tr>
            <td>Trực thuộc</td>
            <td>{ work.branchType == 'office' ?  'Văn phòng': 'Chi nhánh' }</td>
            <td>Chi nhánh</td>
            <td>{ work.nameBranch }</td>
          </tr>
          <tr>
            <td>Vị trí công việc</td>
            <td>{ work.role }</td>
            <td>Chức vụ</td>
            <td>{ work.subRole }</td>
          </tr>
          <tr>
            <td>Trạng thái</td>
            <td>Đang làm việc</td>
            <td>Ngày chính thức</td>
            <td>{ moment(work.activeDate).format('DD/MM/yyyy') }</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderWorkHistory(history = []) {
    return (
      <table className="table table-striped b-t">
        <thead>
          <tr>
            <th>Từ ngày</th>
            <th>Trạng thái</th>
            <th>Chi nhánh</th>
            <th>Vị trí công việc</th>
            <Can I="update" this="users">
              <th style={{width: '25px'}}></th>
            </Can>
          </tr>
        </thead>
        <tbody>
          {
            history && history.map(work => (
              <tr key={ work.id }>
                <td>{moment(work.activeDate).format('DD/MM/yyy')}</td>
                <td>{work.status ? 'Đang làm việc' : 'Đã làm việc'}</td>
                <td>{work.nameBranch || work.nameBranc}</td>
                <td>{work.role}</td>
                <Can I="update" this="users">
                  <td>
                    <div onClick={() => this.onEditWork(work.id)}
                      style={{ borderBottom: '1px solid white', width: '20px', textAlign: 'center', cursor: 'pointer' }}>
                      <i className="hvr-buzz-out fa fa-pencil" />
                    </div>
                  </td>
                </Can>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }

  renderConcurrently(cons) {
    return (
      <table className="table table-striped b-t">
        <thead>
          <tr>
            <th>Vị trí công việc</th>
            <th>Phòng Ban</th>
            <th>Chi nhánh</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
            <Can I="update" this="users">
              <th></th>
            </Can>
          </tr>
        </thead>
        <tbody>
          {
            cons && cons.map(con => (
              <tr key={ con.id }>
                <td>{ con.role }</td>
                <td>{ con.branchType === 'office' ? con.nameBranch : '' }</td>
                <td>{ con.branchType !== 'office' ? con.nameBranch : '' }</td>
                <td>{ moment(con.activeDate).format('DD/MM/yyyy') }</td>
                <td>{ con.deactiveDate ? moment(con.deactiveDate).format('DD/MM/yyyy') : '' }</td>
                <td>{con.status ? 'Đang làm việc' : 'Đã làm việc'}</td>
                <Can I="update" this="users">
                  <td>
                    <div onClick={() => this.onEditConcurrenly(con.id)}
                      style={{ borderBottom: '1px solid white', width: '20px', textAlign: 'center', cursor: 'pointer'  }}>
                      <i className="hvr-buzz-out fa fa-pencil" />
                    </div>
                  </td>
                </Can>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }

  render() {
    const { pathname } = this.props.location
    const { userid } = this.state
    return (
      <>
        <div id="wrapper" className="wrapper animsition">
          <Navbar />
          <Left pathname={pathname} />

          <div className="control-sidebar-bg"></div>

          <div id="page-wrapper">
            <div className="content userinfo">
              <UserHeaderMenu pathname={pathname} userid={userid} onClick={this.editSelect}/>
              <div className="row">
                <div className="col-sm-12">
                  <div className="panel panel-bd lobidrag">
                    <UserContentMenu pathname={pathname} userid={userid} />

                    {/* Lương */}
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="header-title">
                            CÔNG VIỆC
                            <Can I="update" this="users">
                              {
                                this.props.work &&
                                <div style={{ float: 'right' }}>
                                  <div onClick={() => this.onEditWork(this.props.work.id)}
                                    style={{ borderBottom: '1px solid white', width: '20px', textAlign: 'center', cursor: 'pointer' }}>
                                    <i className="hvr-buzz-out fa fa-pencil" />
                                  </div>
                                </div>
                              }
                            </Can>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            { this.props.work && this.renderWork(this.props.work) }
                          </div>
                        </div>
                      </div>
                      {/* Lich su cong viec */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="header-title">LỊCH SỬ CÔNG VIỆC</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            {this.props.works?.length ?
                              this.renderWorkHistory(this.props.works) :
                              <div className="text-center">Chưa có công việc nào</div>}
                          </div>
                        </div>
                      </div>
                      {/* Kiêm nhiệm */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="header-title">KIÊM NHIỆM</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            { this.renderConcurrently(this.props.concurrentlies) }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.workModal && 
          <EditWorkDialog data={ this.props.edit_work } edit={this.state.edit} onClose={this.onCloseWork} onSubmit={this.onWorkSubmit}/>
        }
        {
          this.state.concurrentlyModal &&
          <EditConcurrentlyDialog data={ this.props.edit_concurrently } edit={this.state.edit} onClose={this.onCloseConcurrenly} onSubmit={this.onConcurrentlySubmit}/>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  work: state.user.work,
  works: state.user.works,
  concurrentlies: state.user.concurrentlies,

  edit_work: state.work.work,
  edit_concurrently: state.work.concurrently
})

export default connect(mapStateToProps, {
  getWorks,
  getUserWorks,
  getUserConcurrenlies,
  getConcurrently,
  getWork,
  clearWork,
  clearConcurrenly,
  addWork,
  updateWork,
  updateConcurrently
})(Work)
