import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { logoutUser } from "../../actions/authActions"
import { roleExist } from "../../config/permission"
import { AbilityContext } from "./Can"

const PrivateRoute = ({
  ability,
  entity,
  component: Component,
  auth,
  logoutUser,
  ...rest
}) => {
  const context = useContext(AbilityContext)
  // user is logined and role incorrect
  if (auth.isAuthenticated && !roleExist(auth.user.permission)) {
    // push noti
    localStorage.setItem("notification", "Access Denied")
    // logout
    // logoutUser()
  }

  // check can access this component
  if (ability && entity && !context.can(ability, entity)) {
    if (context.can("read", entity))
      return (window.location.href = `/${entity}`)
    return (window.location.href = "/")
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          auth.isLockScreen !== true ? (
            auth.isChangePassword !== true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/change-password" />
            )
          ) : (
            <Redirect to="/lockscreen" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(PrivateRoute)
