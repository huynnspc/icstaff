import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getPages, getStores } from '../../actions/storeActions';

import Navbar from '../layout/Navbar';
import Left from '../layout/LeftMenu';

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      s_page: 1,
      e_page: 1,
      page: 0,
      pages: 0,
      range: 1,
      ranges: 0,
      pages_on_range: [],
      stores: [],
      errors: {},
    };

    this.handlePages = this.handlePages.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.renderData = this.renderData.bind(this);
    this.renderPaginator = this.renderPaginator.bind(this);
    this.renderPages = this.renderPages.bind(this);
  }

  componentDidMount() {
    window.loading();
    window.datatable();

    this.handlePages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.store.loading !== this.state.loading) {
      this.setState({ loading: nextProps.store.loading });

      if (!nextProps.store.loading) {
        window.stop_preloader();
      } else {
        window.start_preloader();
      }
    }

    if (nextProps.store.pages !== this.state.pages) {
      const ranges = Math.floor(nextProps.store.pages / global.pages_on_range);
      this.setState({ pages: nextProps.store.pages, ranges });
    }

    if (nextProps.store.page !== this.state.page) {
      this.setState({ page: nextProps.store.page - 1 });
    }

    if (nextProps.store.stores !== this.state.stores) {
      this.setState({ stores: nextProps.store.stores });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      window.stop_preloader();

      if (nextProps.errors.errors) {
        window.toast(global.title, nextProps.errors.errors, 4000, "error");
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.pages !== this.state.pages) {
      if (this.state.pages > 0) {
        this.handleRequest(this.state.page);
        this.renderPaginator();
      }
    }

    if(prevState.s_page !== this.state.s_page) {
      this.renderPaginator();
    }

    if(prevState.page !== this.state.page) {
      this.renderPaginator();
    }
  }

  handlePages() {
    this.props.getPages();
  }

  handleRequest(page) {
    this.props.getStores(page);
  }

  prev(e) {
    e.preventDefault();
    let {s_page, range} = this.state;

    if (s_page > 1)
    {
        s_page = s_page > global.pages_on_range ? s_page - global.pages_on_range : 1;
        range--;

        this.setState({s_page: s_page, range: range});
    }
  }

  next(e) {
    e.preventDefault();
    let {s_page, e_page, pages, range} = this.state;

    if (e_page < pages)
    {
        s_page = e_page + 1;
        range++;

        this.setState({s_page: s_page, range: range});
    }
  }

  paginator = (page) => e => {
    e.preventDefault();
    this.handleRequest(page - 1);
  }

  renderData() {
    const { stores } = this.state;

    return stores.map((store, index) => {
      return (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{index + 1}</td>
          <td style={{ textAlign: "center" }}>
            <Link to={`/stores/${store.Id}`}>{store.StoreCode}</Link>
          </td>
          <td><Link to={`/stores/${store.Id}`}>{store.StoreName}</Link></td>
          <td>{store.Address}</td>
          <td>{store.City}</td>
          <td>{store.District}</td>
          <td style={{ textAlign: "center" }}>{store.CreatedBy}</td>
          <td style={{ textAlign: "center" }}>
            {moment(store.CreatedDate).format("DD MMM YYYY")}
          </td>
          <td style={{ textAlign: "center" }}>
            {store.Active && (
              <span className="label label-pill label-success">Active</span>
            )}

            {!store.Active && (
              <span className="label label-pill label-danger">Disabled</span>
            )}
          </td>
        </tr>
      );
    });
  }

  renderPaginator() {
    let { s_page, e_page, pages } = this.state;
    let count = 0;
    let pages_on_range = [];

    for (var j = s_page;  j < s_page + global.pages_on_range && j < pages + 1; j++) {
      e_page = j;
      count++;

      pages_on_range.push(j);
    }

    s_page = (e_page - count) + 1;

    this.setState({s_page, e_page, pages_on_range});
  }

  renderPages() {
    const {page, pages_on_range} = this.state;

    return pages_on_range.map((item, index) => {
      return (
        <li
          key={index}
          className={classnames("paginate_button", {
            active: item !== page + 1 ? false : true,
          })}
        >
          <a href="#" aria-controls="data2" data-dt-idx={item} tabIndex="0"
            onClick={this.paginator(item)}>
            {item}
          </a>
        </li>
      );
    });
  }

  render() {
    const { loading, range, ranges, stores } = this.state;
    const { pathname } = this.props.location;

    return (
      <div id="wrapper" className="wrapper animsition">
        <Navbar />
        <Left pathname={pathname} />

        <div className="control-sidebar-bg"></div>
        <div id="page-wrapper">
          {!loading && stores.length > 0 && (
            <div className="content">
              <div className="content-header">
                <div className="header-icon">
                  <i className="pe-7s-box1"></i>
                </div>
                <div className="header-title">
                  <h1>C???a h??ng</h1>
                  <small>Hi???n th??? th??ng tin li??n quan ?????n c???a h??ng. </small>

                  <ol className="breadcrumb">
                    <li className="active">
                      <i className="pe-7s-home"></i> Th??ng tin c???a h??ng
                    </li>
                  </ol>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="panel panel-bd lobidrag">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <h4>STORE INFO</h4>
                      </div>
                    </div>

                    <div className="panel-body">
                      <div className="table-responsive">
                        <table
                          id="data"
                          className="table table-bordered table-striped table-hover"
                        >
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>M?? c???a h??ng</th>
                              <th>T??n c???a h??ng</th>
                              <th>?????a ch???</th>
                              <th>T???nh/TP</th>
                              <th>Qu???n/Huy???n</th>
                              <th>Ng?????i t???o</th>
                              <th>Ng??y t???o</th>
                              <th>Tr???ng th??i</th>
                            </tr>
                          </thead>

                          <tfoot>
                            <tr>
                              <th>No.</th>
                              <th>M?? c???a h??ng</th>
                              <th>T??n c???a h??ng</th>
                              <th>?????a ch???</th>
                              <th>T???nh/TP</th>
                              <th>Qu???n/Huy???n</th>
                              <th>Ng?????i t???o</th>
                              <th>Ng??y t???o</th>
                              <th>Tr???ng th??i</th>
                            </tr>
                          </tfoot>

                          <tbody>{this.renderData()}</tbody>
                        </table>
                      </div>

                      {stores.length > 0 && (
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="data2_paginate"
                        >
                          <ul className="pagination pull-right">
                            <li
                              className={classnames(
                                "paginate_button previous",
                                {
                                  disabled: range !== 1 ? false : true,
                                }
                              )}
                            >
                              <a
                                href="#"
                                aria-controls="data2"
                                data-dt-idx="0"
                                tabIndex="0"
                                onClick={this.prev}
                              >
                                Previous
                              </a>
                            </li>

                            {this.renderPages()}

                            <li
                              className={classnames("paginate_button next", {
                                disabled: range > ranges ? true : false,
                              })}
                            >
                              <a
                                href="#"
                                aria-controls="data2"
                                data-dt-idx="7"
                                tabIndex="0"
                                onClick={this.next}
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Store.propTypes = {
    getPages: PropTypes.func.isRequired,
    getStores: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  store: state.store,
  errors: state.errors,
});

export default connect(mapStateToProps, { getPages, getStores })(withRouter(Store));