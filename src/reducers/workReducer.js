import {
  WORK_LOADING,
  SET_WORK,
  ADD_WORK,
  UPDATE_WORK,
  SET_CONCURRENTLY,
  ADD_CONCURRENTLY,
  UPDATE_CONCURRENTLY,

  SET_STORE,
  SET_DEPARTMENT,
  SET_WORK_ROLE,
  SET_WORK_ROLE_SUB
} from '../actions/types'

const initialState = {
  loading: false,
  success: false,
  
  work: null,
  concurrently: null,

  stores: [],
  departments: [],
  roles: [],

  subRoles: {}
}

export default function workReducer(state = initialState, action) {
  switch (action.type) {
    case WORK_LOADING:
      return {
        ...state,
        loading: true
      }
    
    case SET_WORK:
      return {
        ...state,
        work: action.payload,
        loading: false
      }
    case ADD_WORK:
      return {
        ...state,
        success: action.payload
      }
    case UPDATE_WORK:
      return {
        ...state,
        success: action.payload
      }
    
    case SET_CONCURRENTLY: 
      return {
        ...state,
        concurrently: action.payload,
        loading: false
      }
    case ADD_CONCURRENTLY:
      return {
        ...state,
        success: action.payload
      }
    case UPDATE_CONCURRENTLY:
      return {
        ...state,
        success: action.payload
      }
    
    case SET_STORE:
      return {
        ...state,
        stores: action.payload
      }
    
    case SET_DEPARTMENT:
      return {
        ...state,
        departments: action.payload
      }
    
    case SET_WORK_ROLE:
      return {
        ...state,
        roles: action.payload
      }
    
    case SET_WORK_ROLE_SUB:
      return {
        ...state,
        subRoles: { ...state.subRoles, ...action.payload }
      }
    
    default:
      return state
  }
}