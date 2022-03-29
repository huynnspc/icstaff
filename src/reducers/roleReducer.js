import {
    ROLE_LOADING,
    GET_ROLES,
    GET_ROLE,
    SET_ROLE_PAGE,
    SET_ROLE_PAGES,
  } from "../actions/types";
  
  const initialState = {
    roles: [],
    role: {},
    page: 0,
    pages: 0,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ROLE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ROLES:
        return {
          ...state,
          roles: action.payload,
          loading: false
        };
      case GET_ROLE:
        return {
          ...state,
          role: action.payload,
          loading: false
        };
      case SET_ROLE_PAGE:
      return {
          ...state,
          page: action.payload,
      };
      case SET_ROLE_PAGES:
      return {
          ...state,
          pages: action.payload,
      };
      default:
        return state;
    }
  }
  