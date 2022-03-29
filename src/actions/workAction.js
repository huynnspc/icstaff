import {
    WORK_LOADING,
    SET_STORE,

    SET_DEPARTMENT,

    SET_WORK_ROLE,
    SET_WORK_ROLE_SUB,

    SET_WORK,
    SET_CONCURRENTLY,

    GET_ERRORS
} from './types'

import axios from 'axios'

export const getStore = () => async (dispatch) => {
    try {
        const res = await axios.get(`${global.uri}/admin/works/storeOrDepartment/store`)
        dispatch({ type: SET_STORE, payload: res.data.payload })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response?.data ? err.response.data : err.message
        });
    }
}

export const getDepartment = () => async (dispatch) => {
    try {
        const res = await axios.get(`${global.uri}/admin/works/storeOrDepartment/department`)
        dispatch({ type: SET_DEPARTMENT, payload: res.data.payload })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response?.data ? err.response.data : err.message
        });
    }
}

export const getRole = () => async (dispatch) => {
    try {
        const res = await axios.get(`${global.uri}/admin/works/role`)
        dispatch({ type: SET_WORK_ROLE, payload: res.data.payload })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response?.data ? err.response.data : err.message
        });
    }
}

export const getSubRole = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${global.uri}/admin/works/subRole/${id}`)
        dispatch({ type: SET_WORK_ROLE_SUB, payload: { [id]: res.data.payload } })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response?.data ? err.response.data : err.message
        });
    }
}

const setWorkLoading = (isLoading) => ({type: WORK_LOADING, payload: isLoading})

const setWork = (work) => ({ type: SET_WORK, payload: work })

export const getWork = (id) => async (dispatch) => {
  try {
    dispatch(setWorkLoading());
    const res = await axios.get(`${global.uri}/admin/works/getById/${id}`)
    const { payload: work } = res.data
    
    dispatch({ type: GET_ERRORS, payload: {} })

    dispatch(setWork({
      ...work,
      role: work._role,
      subRole: work._subRole,
      nameBranch: work._office || work._branch,
      branchType: (work.branchType !== "branch" ? "1" : "2")
    }))
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data ? err.response.data : err.message
    });
  }
}

export const clearWork = () => (dispatch) => {
  dispatch(setWork(null))
}

export const addWork = (work) => async (dispatch) => {
  try {
    const res = await axios.post(`${global.uri}/admin/works`, work)
    const { status } = res.data;
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });

    return true
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data ? err.response.data : err.message
    });
    return false
  }
}

export const updateWork = (work) => async (dispatch) => {
  try {
    const res = await axios.put(`${global.uri}/admin/works`, work)
    const { status } = res.data;
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });

    return true
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data ? err.response.data : err.message
    });
    return false
  }
}

export const deleteWork = (id) => async (dispatch) => {
  try {
    
  } catch (err) {

  }
}


//#region ConCurrently 
const setConcurrentlyLoading = () => ({ type: WORK_LOADING })

const setConcurrently = (con) => ({type: SET_CONCURRENTLY, payload: con})

export const getConcurrently = (id) => async (dispatch) => {
  try {
    dispatch(setConcurrentlyLoading());
    
    const res = await axios.get(`${global.uri}/admin/works/getById/${id}`)
    const { payload: work } = res.data
    
    dispatch({ type: GET_ERRORS, payload: {}})
    dispatch(setConcurrently({
      ...work,
      role: work._role,
      subRole: work._subRole,
      nameBranch: work._office || work._branch,
      branchType: (work.branchType !== "branch" ? "1" : "2")
    }))
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data ? err.response.data : err.message
    });
  }
}

export const   clearConcurrenly = () => (dispatch) => {
  dispatch(setConcurrently(null))
}

export const addConcurrently = (con) => async (dispatch) => {
  try {

  } catch (err) {

  }
}

export const updateConcurrently = (con) => async (dispatch) => {
  try {

  } catch (err) {

  }
}

export const deleteConcurrently = (id) => async (dispatch) => {
  try {
    
  } catch (err) {

  }
}
//#endregion