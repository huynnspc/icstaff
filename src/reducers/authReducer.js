import isEmpty from '../validation/is-empty';

import {
  SET_CURRENT_USER,
  SET_LOCK_SCREEN,
  SET_UNLOCK_SCREEN,
  SET_CHANGE_PASSWORD,
} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    isLockScreen: false,
    isChangePassword: false,
    user: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case SET_CHANGE_PASSWORD:
            return {
                ...state,
                isChangePassword: action.payload
            };
        case SET_LOCK_SCREEN: 
            return {
                ...state,
                isLockScreen: true,
            }
        case SET_UNLOCK_SCREEN: 
            return {
                ...state,
                isLockScreen: false,
            }
        default:
            return state;
    }
};