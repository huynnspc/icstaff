import axios from 'axios';
import {logoutUser} from './authActions'
import {
  GET_ERRORS,
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

  WORK_LOADING,
  SET_WORKS,
  SET_CONCURRENTLIES,
  SET_CONTRACT
} from "./types";

// Get user pages
export const getPages = (page = 1, q = "") => async dispatch => {
    try{
        const res = await axios.get(global.uri + '/admin/users/getByUsernameOrCode', {
            params: { page, q }
        })
        const { nUser, users } = res.data.payload;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch({
            type: SET_USER_PAGE,
            payload: page
        });

        dispatch({
            type: SET_N_USER,
            payload: nUser
        })

        dispatch({
            type: SET_USER_PAGES,
            payload: Math.round(nUser / 10)
        });

        dispatch({
            type: GET_USERS,
            payload: users
        })
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                });
            } else {
            //   console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response?.data ? err.response.data : err.message
            });
        }
    }
    // axios.get(global.uri + '/admin/users/index')
    //     .then(res => {
    //         const { pages } = res.data;
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: {}
    //         });

    //         dispatch({
    //             type: SET_USER_PAGES,
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

// Get users
export const getUsers = (page) => async dispatch => {
    dispatch(setUserLoading());

    try{
        const res = await axios.get(global.uri + `/admin/users/index/${page + 1}`)
        const { payload, nUser } = res.data;
        console.log('page action',page)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch({
            type: SET_N_USER,
            payload: nUser
        })

        // Set current page
        dispatch({
            type: SET_USER_PAGE,
            payload: page + 1
        });

        dispatch({
            type: GET_USERS,
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
    
    // axios.get(global.uri + `/admin/users/index/${page + 1}`)
    //     .then(res => {
    //         const { payload } = res.data;
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: {}
    //         });

    //         // Set current page
    //         dispatch({
    //             type: SET_USER_PAGE,
    //             payload: page + 1
    //         });

    //         dispatch({
    //             type: GET_USERS,
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

// Get user
export const getUser = (id) => async dispatch => {
    dispatch(setUserLoading());

    try{
        const res = await axios.get(global.uri + `/admin/users/${id}`)
        const { payload } = res.data;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        
        dispatch({
            type: GET_USER, 
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
};

// Add user
export const addUser = (item) => async dispatch => {
    dispatch(setUserLoading());

    try{
        const res = await axios.post(global.uri + `/admin/users/add`, item)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        
        dispatch({
            type: ADD_USER, 
            payload: res.data
        })
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                })
                
                dispatch({
                    type: ADD_USER,
                    payload: false
                })
            } else {
              console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
            
            dispatch({
                type: ADD_USER,
                payload: false
            })
        }
    }
};

// Edit user
export const editUser = (item) => async dispatch => {
    dispatch(setUserLoading());

    try{
        const res = await axios.put(global.uri + `/admin/users`, item)
        console.log(res.data);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        
        dispatch({
            type: EDIT_USER, 
            payload: res.data.status
        })
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                })
                
                dispatch({
                    type: EDIT_USER,
                    payload: false
                })
            } else {
              console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
            
            dispatch({
                type: EDIT_USER,
                payload: false
            })
        }
    }
    
    // await axios.put(global.uri + `/admin/users`, item)
    //     .then(res => {
    //         console.log(res.data);
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: {}
    //         })
            
    //         dispatch({
    //             type: EDIT_USER, 
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err.response.data);
    //         dispatch({
    //             type: GET_ERRORS, 
    //             payload: err.response.data ? err.response.data : err.message
    //         })
            
    //         dispatch({
    //             type: ADD_USER,
    //             payload: false
    //         })
    //     });
};

// Delete user
export const deleteUser = (id) => async dispatch => {
    try {
        const res = await axios.delete(global.uri + `/admin/users/${id}`);
        console.log(res.data);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        dispatch({
            type: DELETE_USER, 
            payload: true
        });
    }
    catch(err){
        dispatch({
            type: GET_ERRORS, 
            payload: err.response.data ? err.response.data : err.message
        })
    }
};

// Block user
export const blockUser = (id) => async dispatch => {
    try {
        const res = await axios.put(global.uri + `/admin/users/block/${id}`);
        console.log(res.data);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        dispatch({
            type: DELETE_USER, 
            payload: true
        });
    }
    catch(err){
        dispatch({
            type: GET_ERRORS, 
            payload: err.response.data ? err.response.data : err.message
        })
    }
};
// Unblock user
export const unblockUser = (id) => async dispatch => {
    try {
        const res = await axios.put(global.uri + `/admin/users/unblock/${id}`);
        console.log(res.data);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        dispatch({
            type: DELETE_USER, 
            payload: true
        });
    }
    catch(err){
        dispatch({
            type: GET_ERRORS, 
            payload: err.response.data ? err.response.data : err.message
        })
    }
};

// SALARY
// Get salary
export const getSalary = (id) => async dispatch => {
    dispatch(setSalaryLoading());

    try{
        const res = await axios.get(global.uri + `/admin/salarys/getByUserId/${id}`)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        
        dispatch({
            type: GET_SALARY, 
            payload: res.data.payload
        });
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data ? err.response.data : err.message
                })
            } else {
              console.log(err.response.data);
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
        }
    }

    axios.get(global.uri + `/admin/salarys/getByUserId/${id}`)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            
            dispatch({
                type: GET_SALARY, 
                payload: res.data.payload
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
        }
        );
};

// Update salary
export const updateSalary = (item) => async dispatch => {
    dispatch(setSalaryLoading());

    try {
        const res = await axios.put(global.uri + `/admin/salarys`, item)
        const { status } = res.data;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        dispatch({
            type: UPDATE_SALARY, 
            payload: status
        });
    } catch (err) {
        dispatch(setSalaryLoading(false));
        console.log(err.response);
        if (err.response) {
            if (err.response.status !== 401) {
              dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
              });
            } else {
              dispatch(logoutUser());
            }
          } else {
            dispatch({
              type: GET_ERRORS,
              payload: { message: err.message },
            });
          }

    }
};

// Delete Salary
export const deleteSalary = (id) => dispatch => {
    dispatch(setSalaryLoading());
    axios.delete(global.uri + `/admin/salarys/${id}`)
        .then(res => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
            
            dispatch({
                type: DELETE_SALARY, 
                payload: true
            });
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS, 
                payload: err.response.data ? err.response.data : err.message
            })
        );
};

// Set Salary Loading State
export const setSalaryLoading = () => {
    return {
        type: SALARY_LOADING
    }
};

// Set loading state
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
};

//#region Work
const setWorkLoading = () => ({ type: WORK_LOADING })

const setWork = (work) => ({ type: SET_WORKS, payload: work })

const setConcurrentlies = (con) => ({type: SET_CONCURRENTLIES, payload: con})

export const getWorks = (id) => async (dispatch) => {
  try {
    dispatch(setWorkLoading());
    const res = await Promise.all([
        (await axios.get(`${global.uri}/admin/works/getByTypeJob/${id}/1`)).data,
        (await axios.get(`${global.uri}/admin/works/getByTypeJob/${id}/2`)).data,
    ])
      
    dispatch({ type: GET_ERRORS, payload: {}})
      
    dispatch(setWork(res[0].payload))
    dispatch(setConcurrentlies(res[1].payload))
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response?.data ? err.response.data : err.message
    });
  }
}
export const getUserWorks = (id) => async (dispatch) => {
    try {
        const res = (await axios.get(`${global.uri}/admin/works/getByTypeJob/${id}/1`)).data
        
        dispatch({ type: GET_ERRORS, payload: {}})
        
        dispatch(setWork(res.payload))
    } catch (err) {
        dispatch({
        type: GET_ERRORS,
        payload: err.response?.data ? err.response.data : err.message
        });
    }
}

export const getUserConcurrenlies = (id) => async (dispatch) => {
    try {
        const res = (await axios.get(`${global.uri}/admin/works/getByTypeJob/${id}/2`)).data
        
        dispatch({ type: GET_ERRORS, payload: {}})
        
        dispatch(setConcurrentlies(res.payload))
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response?.data ? err.response.data : err.message
        });
    }
}
//#endregion


//#region Contract
const setContract = (c) => ({type: SET_CONTRACT, payload: c})

export const getContract = (id) => async (dispatch) => {
    dispatch(setUserLoading());
    
    try {
        const res = await axios.get(global.uri + `/admin/contracts/getByUserId/${id}`)
        const { payload } = res.data;
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch(setContract(payload))

        return true;
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response?.data ? err.response.data : err.message
                });
            } else dispatch(logoutUser());
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response?.data ? err.response.data : err.message
            });
        }
        return false;
    }
    
}

export const updateContracts = (id, item) => async (dispatch) => {
    dispatch(setUserLoading())

    try{
        const res = await axios.put(global.uri + `/admin/contracts`, {
            jsonData: item,
            userId: id
        })
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
        
        return true
    }
    catch (err) {
        if (err.response) {
            if (err.response.status !== 401) {
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response?.data ? err.response.data : err.message
                })
            } else {
              dispatch(logoutUser());
            }
        } else {
            dispatch({
                type: GET_ERRORS, 
                payload: err.response?.data ? err.response.data : err.message
            })
        }

        return false
    }
}
//#endregion