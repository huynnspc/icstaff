import axios from 'axios';
import {logoutUser} from './authActions'

import {
  GET_ERRORS,
  STORE_LOADING,
  GET_CITIES,
  GET_DISTRICTS,
  GET_STORES,
  GET_STORE,
  SET_STORE_PAGE,
  SET_STORE_PAGES,
} from "./types";

// Get store pages
export const getPages = () => async dispatch => {

    try{
        const res = await axios.get(global.uri + '/admin/stores/index')
        const { pages } = res.data;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch({
            type: SET_STORE_PAGES,
            payload: pages
        });
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                });
            } else {
              console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            });
        }
    }
    // axios.get(global.uri + '/admin/stores/index')
    //     .then(res => {
    //         const { pages } = res.data;
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: {}
    //         });

    //         dispatch({
    //             type: SET_STORE_PAGES,
    //             payload: pages
    //         });
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: GET_ERRORS, 
    //             payload: err.response.data ? err.response.data : err.message
    //         });
    //     });
};

// Get stores
export const getStores = (page) => async dispatch => {
    dispatch(setStoreLoading());

    try{
        const res = await axios.get(global.uri + `/admin/stores/index/${page + 1}`)
        const {payload} = res.data;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        // Set current page
        dispatch({
            type: SET_STORE_PAGE,
            payload: page + 1
        });

        dispatch({
            type: GET_STORES,
            payload: payload
        });
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                });
            } else {
              console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            });
        }
    }
    
    // axios.get(global.uri + `/admin/stores/index/${page + 1}`)
    //     .then(res => {
    //         const { payload } = res.data;
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: {}
    //         });

    //         // Set current page
    //         dispatch({
    //             type: SET_STORE_PAGE,
    //             payload: page + 1
    //         });

    //         dispatch({
    //             type: GET_STORES,
    //             payload: payload
    //         });
    //     })
    //     .catch(err => 
    //         dispatch({
    //             type: GET_ERRORS, 
    //             payload: err.response.data ? err.response.data : err.message
    //         })
    //     );
};

// Get cities
export const getCities = () => dispatch => {    
    axios.get(global.uri + `/admin/stores/get-cities`)
        .then(res => {
            const { payload } = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            dispatch({
                type: GET_CITIES,
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

// Get districts
export const getDistricts = (city_id) => dispatch => {
    dispatch(setStoreLoading());
    
    axios.get(global.uri + `/admin/stores/get-districts/${city_id}`)
        .then(res => {
            const { payload } = res.data;
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });

            dispatch({
                type: GET_DISTRICTS,
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

// Get store
export const getStore = (id) => async dispatch => {
    dispatch(setStoreLoading());

    try{
        const res = await axios.get(global.uri + `/admin/stores/${id}`)
        const {payload} = res.data;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        
        dispatch({
            type: GET_STORE, 
            payload: payload
        });
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                });
            } else {
              console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            });
        }
    }
    
    // axios.get(global.uri + `/admin/stores/${id}`)
    //     .then(res => {
    //         const {payload} = res.data;
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: {}
    //         });
            
    //         dispatch({
    //             type: GET_STORE, 
    //             payload: payload
    //         });

    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: GET_ERRORS, 
    //             payload: err.response.data ? err.response.data : err.message
    //         })
    //     });
};

// Set loading state
export const setStoreLoading = () => {
    return {
        type: STORE_LOADING
    }
};