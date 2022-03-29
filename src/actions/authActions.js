import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_LOCK_SCREEN,
  SET_UNLOCK_SCREEN,
  SET_CHANGE_PASSWORD,
} from "./types";

import setAuthToken from '../utils/setAuthToken';
import { update } from '../utils/ability';

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
    axios.post(global.uri + '/admin/users/login', userData)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            // Save to localStorage
            const { token, is_first } = res.data;

            // Force user must changed password in the first login
            dispatch(setChangePassword(is_first));

            // Set token to ls
            localStorage.setItem(global.token, token);
            localStorage.setItem(global.is_change_password, is_first);

            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));

            update(decoded?.permission)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response?.data ? err.response.data : err.message
            });
        });
};

// Change password
export const changePassword = (userData, history) => (dispatch) => {
    if (userData) {
      axios
        .post(global.uri + '/admin/users/change-password', userData)
        .then((res) => {
          dispatch({
            type: GET_ERRORS,
            payload: {},
          });

          // Logout & redirect to Login screen
          // Remove token from localStorage
          localStorage.removeItem(global.token);
          localStorage.removeItem(global.is_lock_screen);
          localStorage.removeItem(global.is_change_password);

          // Remove auth header for future reuqests
          setAuthToken(false);
          if (history) history.push("/");

          // Set curent user to {} which will set isAuthenticated to false
          dispatch(setChangePassword(false));
          dispatch(unlockScreen(false));
          dispatch(setCurrentUser({}));
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data ? err.response.data : err.message
          });
        });
    } else {
      dispatch(setChangePassword(false));
    }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Set changed password in user
export const setChangePassword = (isChangePassword) => {
    return {
        type: SET_CHANGE_PASSWORD,
        payload: isChangePassword
    }
}

// Set lock screen
export const lockScreen = (history) => dispatch => {
    if(history) history.push('/lockscreen');
    localStorage.setItem(global.is_lock_screen, true);

    dispatch({
        type: SET_LOCK_SCREEN
    });
}

// Set unlock screen
export const unlockScreen = (userData) => (dispatch) => {
    if(userData) {
        axios.post(global.uri + '/admin/users/unlock', userData)
            .then(res => {
                localStorage.setItem(global.is_lock_screen, false);
                dispatch({
                    type: GET_ERRORS,
                    payload: {}
                });

                dispatch({
                    type: SET_UNLOCK_SCREEN
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data ? err.response.data : err.message
                });
            });
    }
    else {
        localStorage.setItem(global.is_lock_screen, false);
        dispatch({
            type: SET_UNLOCK_SCREEN
        });
    }
};

export const logoutUser = (history) => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem(global.token);
    localStorage.removeItem(global.is_lock_screen);
    localStorage.removeItem(global.is_change_password);

    // Remove auth header for future reuqests
    setAuthToken(false);
    if(history) history.push('/');

    // Set curent user to {} which will set isAuthenticated to false
    dispatch(setChangePassword(false));
    dispatch(unlockScreen(false));
    dispatch(setCurrentUser({}));
}