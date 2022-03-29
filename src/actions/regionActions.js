import axios from 'axios';

import {
  GET_ERRORS,
  REGION_LOADING,
  GET_REGIONS,
  GET_REGION,
  SET_REGION_PAGE,
  SET_REGION_PAGES,
} from "./types";

// Get region pages
export const getPages = () => dispatch => {
    axios.get(global.uri + '/admin/regions/index')
        .then(res => {
            const { pages } = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            dispatch({
                type: SET_REGION_PAGES,
                payload: pages
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            });
            console.log(err);

        });
};

// Get regions
export const getRegions = (page) => dispatch => {
    dispatch(setRegionLoading());
    
    axios.get(global.uri + `/admin/regions/index/${page + 1}`)
        .then(res => {
            const { payload } = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            // Set current page
            dispatch({
                type: SET_REGION_PAGE,
                payload: page + 1
            });

            dispatch({
                type: GET_REGIONS,
                payload: payload
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            });

            dispatch({
                type: GET_REGIONS,
                payload: []
            });
        });
};

// Get region
export const getRegion = (id) => dispatch => {
    dispatch(setRegionLoading());
    
    axios.get(global.uri + `/admin/regions/${id}`)
        .then(res => {
            const {payload} = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            
            dispatch({
                type: GET_REGION, 
                payload: payload
            });
        }
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
        );
};

// Set loading state
export const setRegionLoading = () => {
    return {
        type: REGION_LOADING
    }
};