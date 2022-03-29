import {
  USER_LOADING,
  GET_USERS,
  GET_USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  SET_N_USER,
  SET_USER_PAGE,
  SET_USER_PAGES,
  SALARY_LOADING,
  GET_SALARY,
  UPDATE_SALARY,
  DELETE_SALARY,
  SET_WORKS,
  SET_CONCURRENTLIES,
  SET_CONTRACT
} from "../actions/types";

const initialState = {
  nUser: 0,
  users: [],
  user: {},
  salary: [],
  page: 1,
  pages: 0,
  success: false,
  work: {},
  works: [],
  concurrenlies: [],
  contract: [],
  loading: false
};

const getWork = (arr) => {
  const _i = arr.findIndex(e => e.status)
  if (_i !== -1) return arr.splice(_i, 1)[0]
  return null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        success: false,
        loading: true
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    
    case ADD_USER:
      return {
        ...state,
        success: action.payload,
        loading: false
      };

    case EDIT_USER:
      return {
        ...state,
        success: action.payload,
        loading: false
      };

    case DELETE_USER:
      return {
        ...state,
        loading: false
      };

    // SALARY
    case SALARY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SALARY:
      return {
        ...state,
        salary: action.payload,
        loading: false
      };
    case UPDATE_SALARY:
      return {
        ...state,
        loading: false
      };
    case DELETE_SALARY:
      return {
        ...state,
        loading: false
      };
    case SET_N_USER:
      return {
        ...state,
        nUser: action.payload
      };
    case SET_USER_PAGE:
      return {
          ...state,
          page: action.payload,
      };
    case SET_USER_PAGES:
      return {
          ...state,
          pages: action.payload,
      };
    
    case SET_WORKS:
      return {
        ...state,
        work: getWork(action.payload),
        works: action.payload,
        loading: false
      };
    
    case SET_CONCURRENTLIES:
      return {
        ...state,
        concurrentlies: action.payload,
        loading: false
      };
    
    case SET_CONTRACT:
      return {
        ...state,
        contract: action.payload
      }
    
    default:
      return state;
  }
}
