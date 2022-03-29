import axios from 'axios';

import {
  GET_ERRORS,
  ROLE_LOADING,
  GET_ROLES,
  GET_ROLE,
  SET_ROLE_PAGE,
  SET_ROLE_PAGES,
} from "./types";

// Get role pages
export const getPages = () => dispatch => {
    axios.get(global.uri + '/admin/roles/index')
        .then(res => {
            const { pages } = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            dispatch({
                type: SET_ROLE_PAGES,
                payload: pages
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            });
        });
};

// Get roles
export const getRoles = (page) => dispatch => {
    dispatch(setRoleLoading());
    
    axios.get(global.uri + `/admin/roles/index/${page + 1}`)
        .then(res => {
            const { payload } = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            // Set current page
            dispatch({
                type: SET_ROLE_PAGE,
                payload: page + 1
            });

            dispatch({
                type: GET_ROLES,
                payload: payload
            });
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
        );
};

// Get role
export const getRole = (id) => dispatch => {
    dispatch(setRoleLoading());
    
    axios.get(global.uri + `/admin/roles/${id}`)
        .then(res => {
            const {payload} = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            
            dispatch({
                type: GET_ROLE, 
                payload: payload
            });
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
        );
};

// Set loading state
export const setRoleLoading = () => {
    return {
        type: ROLE_LOADING
    }
};