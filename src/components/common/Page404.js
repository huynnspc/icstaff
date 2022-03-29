import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Page404 extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="middle-box">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="error-text">
                            <h1>4<span className="error bounce">0</span><span className="m-l-90">4</span></h1>
                            <h3><span>Page</span><br className="hidden-xs" /> Not Found</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="error-desc">
                            <p>Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the 
                                refresh button on your browser or try found something else in our app.</p>
                                
                            <form className="navbar-form" role="search">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search for page" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-success" type="submit">Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {})(withRouter(Page404));