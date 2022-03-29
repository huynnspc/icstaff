import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ability, update } from "./utils/ability"

import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"

import {
  setCurrentUser,
  logoutUser,
  lockScreen,
  unlockScreen,
} from "./actions/authActions"
import { clearCurrentProfile } from "./actions/profileActions"

import { Provider } from "react-redux"
import { AbilityContext } from "./components/common/Can"

import "./App.css"

import Login from "./components/auth/Login"
import ChangePassword from "./components/auth/ChangePassword"
import User from "./components/user/User"
import InfoAdd from "./components/user/add/InfoAdd"
import Contract from "./components/user/contract/Contract"
// import InsuranceAdd from './components/user/add/Insurance/Insurance';
// import DocumentAdd from "./components/user/add/Document/Document"

import EditUser from "./components/user/EditUser"
import UserInfo from "./components/user/info/UserInfo"
import Edit_Info from "./components/user/edit/Edit_Info"
import Insurance from "./components/user/Insurance/Insurance"
import EditInsurance from "./components/user/Insurance/EditInsurance"
import Document from "./components/user/document/Document"
import EditDocument from "./components/user/document/EditDocument"
import UserContract from "./components/user/contract/Contract"
import EditUserContract from "./components/user/contract/EditContract"
import Salary from "./components/user/salary/Salary"
import EditSalary from "./components/user/salary/EditSalary"
import Work from "./components/user/work/Work"
import EditWork from "./components/user/work/EditWork"
import Region from "./components/region/Region"
import EditRegion from "./components/region/EditRegion"
import Store from "./components/store/Store"
import EditStore from "./components/store/EditStore"
import Role from "./components/role/Role"
import EditRole from "./components/role/EditRole"
import Profile from "./components/profile/Profile"
import LockScreen from "./components/profile/LockScreen"
import System from "./components/notification/System"
import HR from "./components/notification/HR"
import Promotions from "./components/notification/Promotions"
import WagesToSales from "./components/wagestosales/WagesToSales"
import ChuongTrinhGoiKhachHang from "./components/chuongtrinhgoikhachhang/ChuongTrinhGoiKhachHang"
import Page404 from "./components/common/Page404"
import "./Config"

import store from "./store"

// Authorize user before redirect to Route
import LockRoute from "./components/common/LockRoute"
import AuthorizeRoute from "./components/common/AuthorizeRoute"
import PrivateRoute from "./components/common/PrivateRoute"

// Check for token
if (localStorage.getItem(global.token)) {
  try {
    // Set auth token header auth
    setAuthToken(localStorage.getItem(global.token))
    //Decode token & get user info and exp
    const decoded = jwt_decode(localStorage.getItem(global.token))
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))

    // Check for expired token
    const currentTime = Date.now() / 1000

    // Check accessible permission + expired
    // if (!decoded.permission || decoded.exp < currentTime || decoded.permission?.toLowerCase !== 'hr') {
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser())
      // Clear current Profile
      store.dispatch(clearCurrentProfile())
      // Redirect to login
      window.location.href = "/login"
    } else {
      // update permission on reload page
      update(decoded?.permission)
      // Lock screen
      if (localStorage.getItem(global.is_lock_screen)) {
        const isLock = localStorage.getItem(global.is_lock_screen)
        if (isLock !== true) {
          store.dispatch(unlockScreen())
        } else {
          store.dispatch(lockScreen())
        }
      }

      // Must change password in the first time
      if (localStorage.getItem(global.is_change_password)) {
        const is_change_password = localStorage.getItem(
          global.is_change_password
        )

        store.dispatch({
          type: "SET_CHANGE_PASSWORD",
          payload: is_change_password !== "false",
        })
      }
    }
  } catch (error) {
    // Logout user
    store.dispatch(logoutUser())
    // Clear current Profile
    store.dispatch(clearCurrentProfile())
    // Redirect to login
    window.location.href = "/login"
  }
}

export default class App extends Component {
  state = {}

  render() {
    return (
      <Provider store={store}>
        <AbilityContext.Provider value={ability}>
          <Router>
            <Switch>
              <LockRoute path="/login" exact component={Login} />
              <AuthorizeRoute path="/lockscreen" exact component={LockScreen} />
              <AuthorizeRoute
                path="/change-password"
                exact
                component={ChangePassword}
              />
              <PrivateRoute path="/profile" exact component={Profile} />
              <PrivateRoute path="/" exact component={User} />
              <PrivateRoute
                path="/users"
                exact
                ability="read"
                entity="users"
                component={User}
              />
              <PrivateRoute
                path="/users/add/information"
                exact
                ability="create"
                entity="users"
                component={InfoAdd}
              />{" "}
              <PrivateRoute
                path="/users/add/contract"
                exact
                ability="create"
                entity="users"
                component={Contract}
              />{" "}
              {/* <PrivateRoute path="/users/add/insurance"
                                            exact
                                            component={InsuranceAdd} />
                                          <PrivateRoute path="/users/add/document"
                                            exact
                                            component={DocumentAdd} /> */}
              <PrivateRoute
                path="/user/:id/info"
                exact
                ability="read"
                entity="users"
                component={UserInfo}
              />{" "}
              <PrivateRoute
                path="/user/:id/info/edit"
                exact
                ability="update"
                entity="users"
                component={Edit_Info}
              />{" "}
              <PrivateRoute
                path="/user/:id/insurance"
                exact
                ability="read"
                entity="users"
                component={Insurance}
              />{" "}
              <PrivateRoute
                path="/user/:id/insurance/edit"
                exact
                ability="update"
                entity="users"
                component={EditInsurance}
              />{" "}
              <PrivateRoute
                path="/user/:id/document"
                exact
                ability="read"
                entity="users"
                component={Document}
              />{" "}
              <PrivateRoute
                path="/user/:id/document/edit"
                exact
                ability="update"
                entity="users"
                component={EditDocument}
              />{" "}
              <PrivateRoute
                path="/user/:id/contract"
                exact
                ability="read"
                entity="users"
                component={UserContract}
              />{" "}
              <PrivateRoute
                path="/user/:id/contract/edit"
                exact
                ability="update"
                entity="users"
                component={EditUserContract}
              />{" "}
              <PrivateRoute
                path="/user/:id/salary"
                exact
                ability="read"
                entity="users"
                component={Salary}
              />{" "}
              <PrivateRoute
                path="/user/:id/salary/edit"
                exact
                component={EditSalary}
              />{" "}
              <PrivateRoute
                path="/user/:id/work"
                exact
                ability="read"
                entity="users"
                component={Work}
              />{" "}
              <PrivateRoute
                path="/user/:id/work/edit"
                exact
                ability="read"
                entity="users"
                component={EditWork}
              />
              <PrivateRoute
                path="/regions"
                exact
                ability="read"
                entity="regions"
                component={Region}
              />{" "}
              <PrivateRoute
                path="/regions/:id"
                exact
                ability="update"
                entity="regions"
                component={EditRegion}
              />
              <PrivateRoute
                path="/stores"
                exact
                ability="read"
                entity="stores"
                component={Store}
              />{" "}
              <PrivateRoute
                path="/stores/:id"
                exact
                ability="update"
                entity="stores"
                component={EditStore}
              />
              <PrivateRoute
                path="/roles"
                exact
                ability="read"
                entity="roles"
                component={Role}
              />{" "}
              <PrivateRoute
                path="/roles/:id"
                exact
                ability="read"
                entity="roles"
                component={EditRole}
              />
              <PrivateRoute
                path="/wagestosales"
                exact
                ability="read"
                entity="wagestosales"
                component={WagesToSales}
              />
              <PrivateRoute
                path="/chuong-trinh-goi-khach-hang"
                exact
                ability="read"
                entity="chuong-trinh-goi-khach-hang"
                component={ChuongTrinhGoiKhachHang}
              />
              <PrivateRoute
                path="/notifications/system"
                exact
                ability="read"
                entity="notifications-system"
                component={System}
              />{" "}
              <PrivateRoute
                path="/notifications/hr"
                exact
                ability="read"
                entity="notifications-hr"
                component={HR}
              />{" "}
              <PrivateRoute
                path="/notifications/promotions"
                exact
                ability="read"
                entity="notifications-promotions"
                component={Promotions}
              />
              <Route component={Page404}> </Route>
            </Switch>{" "}
          </Router>{" "}
        </AbilityContext.Provider>{" "}
      </Provider>
    )
  }
}
