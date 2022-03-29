import {
    REGION_LOADING,
    GET_REGIONS,
    GET_REGION,
    SET_REGION_PAGE,
    SET_REGION_PAGES,
  } from "../actions/types";
  
  const initialState = {
    regions: [],
    region: {},
    page: 0,
    pages: 0,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case REGION_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_REGIONS:
        return {
          ...state,
          regions: action.payload,
          loading: false
        };
      case GET_REGION:
        return {
          ...state,
          region: action.payload,
          loading: false
        };
      case SET_REGION_PAGE:
      return {
          ...state,
          page: action.payload,
      };
      case SET_REGION_PAGES:
      return {
          ...state,
          pages: action.payload,
      };
      default:
        return state;
    }
  }
  