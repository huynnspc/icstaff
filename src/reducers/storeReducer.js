import {
    STORE_LOADING,
    GET_STORES,
    GET_CITIES,
    GET_DISTRICTS,
    GET_STORE,
    SET_STORE_PAGE,
    SET_STORE_PAGES,
  } from "../actions/types";
  
  const initialState = {
    stores: [],
    cities: [],
    districts: [],
    store: null,
    page: 0,
    pages: 0,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case STORE_LOADING:
        return {
          ...state,
          loading: true,
        };
      case GET_CITIES:
        return {
          ...state,
          cities: action.payload,
          loading: false,
        };
      case GET_DISTRICTS:
        return {
          ...state,
          districts: action.payload,
          loading: false,
        };
      case GET_STORES:
        return {
          ...state,
          stores: action.payload,
          loading: false,
        };
      case GET_STORE:
        return {
          ...state,
          store: action.payload,
          loading: false,
        };
      case SET_STORE_PAGE:
        return {
          ...state,
          page: action.payload,
        };
      case SET_STORE_PAGES:
        return {
          ...state,
          pages: action.payload,
        };
      default:
        return state;
    }
  }
  