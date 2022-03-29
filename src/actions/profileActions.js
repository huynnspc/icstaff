import axios from 'axios';

import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_CERTIFICATES,
  ADD_CERTIFICATE,
  UPDATE_CERTIFICATE,
  DELETE_CERTIFICATE,
  GET_EXPERIENCES,
  ADD_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  GET_TIMELINES,
  ADD_TIMELINE,
  UPDATE_TIMELINE,
  DELETE_TIMELINE

} from "./types";

// PROFILE INFO
// Get current profile info
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:3000/info')
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            
            dispatch({
                type: GET_PROFILE,
                payload: res.data //api.db().info
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// Update profile info
export const updateProfile = (item) => dispatch => {
    dispatch(setProfileLoading());
    axios.put('http://localhost:3000/info', item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// CERTIFICATES
// GET_CERTIFICATES
export const getCertificates = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:3000/certificates')
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: GET_CERTIFICATES,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// UPDATE_CERTIFICATE
export const updateCertificate = (id, item) => dispatch => {
    dispatch(setProfileLoading());
    axios.put(`http://localhost:3000/certificates/${id}`, item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: UPDATE_CERTIFICATE,
                payload: true
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
            dispatch({
                type: UPDATE_CERTIFICATE,
                payload: false,
            });
        });
}

// ADD_CERTIFICATES
export const addCertificate = (item) => dispatch => {
    dispatch(setProfileLoading());
    axios.post('http://localhost:3000/certificates', item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: ADD_CERTIFICATE,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// DELETE_CERTIFICATE
export const deleteCertificate = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios.delete(`http://localhost:3000/certificates/${id}`)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: DELETE_CERTIFICATE,
                payload: true
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
            dispatch({
                type: DELETE_CERTIFICATE,
                payload: false,
            });
        });
}

// EXPERIENCES
// GET_EXPERIENCES
export const getExperiences = () => dispatch => {
    // dispatch(setProfileLoading());
    axios.get('http://localhost:3000/experiences')
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: GET_EXPERIENCES,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// ADD_EXPERIENCE
export const addExperience = (item) => dispatch => {
    dispatch(setProfileLoading());
    axios.post('http://localhost:3000/experiences', item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: ADD_EXPERIENCE,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// UPDATE_EXPERIENCE
export const updateExperience = (id, item) => dispatch => {
    dispatch(setProfileLoading());
    axios.put(`http://localhost:3000/experiences/${id}`, item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: UPDATE_EXPERIENCE,
                payload: true
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
            dispatch({
                type: UPDATE_EXPERIENCE,
                payload: false,
            });
        });
}

// DELETE_EXPERIENCE
export const deleteExperience = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios.delete(`http://localhost:3000/experiences/${id}`)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: DELETE_EXPERIENCE,
                payload: true
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
            dispatch({
                type: DELETE_EXPERIENCE,
                payload: false,
            });
        });
}

// TIMELINES
// GET_TIMELINES
export const getTimelines = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:3000/timelines')
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: GET_TIMELINES,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// ADD_TIMELINE
export const addTimeline = (item) => dispatch => {
    dispatch(setProfileLoading());
    axios.post('http://localhost:3000/timelines', item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: ADD_TIMELINE,
                payload: res.data
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
        });
}

// UPDATE_TIMELINE
export const updateTimeline = (id, item) => dispatch => {
    dispatch(setProfileLoading());
    axios.put(`http://localhost:3000/timelines/${id}`, item)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: UPDATE_TIMELINE,
                payload: true
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
            dispatch({
                type: UPDATE_TIMELINE,
                payload: false,
            });
        });
}

// DELETE_TIMELINE
export const deleteTimeline = (id) => dispatch => {
    dispatch(setProfileLoading());
    axios.delete(`http://localhost:3000/timelines/${id}`)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            dispatch({
                type: DELETE_TIMELINE,
                payload: true
            });    
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data ? err.response.data : err.message
            });
            dispatch({
                type: DELETE_TIMELINE,
                payload: false,
            });
        });
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}