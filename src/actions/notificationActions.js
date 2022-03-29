import axios from "axios";
import { logoutUser } from "./authActions";

//Import Action Type
import {
  GET_ERRORS,
  NOTIFICATION_LOADING, 
  ADD_NOTIFICATION,
  // HR Notification
  GET_HR_NOTIFICATIONS,
  HR_NOTIFICATION_LOADING,
  SET_HR_NOTIFICATION_PAGE,
  SET_HR_NOTIFICATION_PAGES,
  LOAD_MORE_HR_NOTIFICATIONS,
  // System Notification
  SYSTEM_NOTIFICATION_LOADING,
  GET_SYSTEM_NOTIFICATIONS,
  // GET_SYSTEM_NOTIFICATION,
  SET_SYSTEM_NOTIFICATION_PAGE,
  SET_SYSTEM_NOTIFICATION_PAGES,
  LOAD_MORE_SYSTEM_NOTIFICATIONS,
  // Promotions
  PROMOTIONS_NOTIFICATION_LOADING,
  GET_PROMOTIONS_NOTIFICATIONS,
  SET_PROMOTIONS_NOTIFICATION_PAGE,
  SET_PROMOTIONS_NOTIFICATION_PAGES,
  LOAD_MORE_PROMOTIONS_NOTIFICATIONS

} from "./types";

//** SYSTEM NOTIFICATIONS */

// Get system notifications pages
export const getSystemNotificationPages = (category_id) => async dispatch => {
  dispatch(setSystemNotificationLoading());
  dispatch({
    type: SET_SYSTEM_NOTIFICATION_PAGES,
    payload: 0,
  });

  dispatch({
    type: SET_SYSTEM_NOTIFICATION_PAGE,
    payload: 0,
  });

  try{
    const res = await axios.get(global.uri + `/admin/notifications/index/${category_id}`)
    const { pages } = res.data;
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    dispatch({
      type: SET_SYSTEM_NOTIFICATION_PAGES,
      payload: pages,
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

// Get system notifications by page
export const getSystemNotifications = (category_id, page) => dispatch => {
  dispatch(setSystemNotificationLoading());
  
  axios.get(global.uri + `/admin/notifications/${category_id}/${page + 1}`)
  .then((res) => {
    const { payload } = res.data;

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    dispatch({
      type: SET_SYSTEM_NOTIFICATION_PAGE,
      payload: page,
    });

    dispatch({
      type: GET_SYSTEM_NOTIFICATIONS,
      payload: payload,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data ? err.response.data : err.message
    });

    dispatch({
      type: GET_SYSTEM_NOTIFICATIONS,
      payload: [],
    });
  });
};

// Load more system notifications by page
export const getMoreSystemNotifications = (category_id, page) => dispatch => {
  axios.get(global.uri + `/admin/notifications/${category_id}/${page + 1}`)
    .then((res) => {
      const { payload } = res.data;
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });

      dispatch({
        type: SET_SYSTEM_NOTIFICATION_PAGE,
        payload: page,
      });

      dispatch({
        type: LOAD_MORE_SYSTEM_NOTIFICATIONS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : err.message
      });
    });
};

//** HR NOTIFICATIONS */

// Get HR notifications pages
export const getHRNotificationPages = (category_id) => async dispatch => {
  dispatch(setHRNotificationLoading());
  dispatch({
    type: SET_HR_NOTIFICATION_PAGES,
    payload: 0,
  });

  dispatch({
    type: SET_HR_NOTIFICATION_PAGE,
    payload: 0,
  });

  try{
    const res = await axios.get(global.uri + `/admin/notifications/index/${category_id}`)
    const { pages } = res.data;
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    dispatch({
      type: SET_HR_NOTIFICATION_PAGES,
      payload: pages,
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

// Get HR notifications by page
export const getHRNotifications = (category_id, page) => dispatch => {
  dispatch(setHRNotificationLoading());
  
  axios.get(global.uri + `/admin/notifications/${category_id}/${page + 1}`)
  .then((res) => {
    const { payload } = res.data;
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    dispatch({
      type: SET_HR_NOTIFICATION_PAGE,
      payload: page,
    });

    dispatch({
      type: GET_HR_NOTIFICATIONS,
      payload: payload,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data ? err.response.data : err.message
    });

    dispatch({
      type: GET_HR_NOTIFICATIONS,
      payload: [],
    });
  });
};

// Load more HR notifications by page
export const getMoreHRNotifications = (category_id, page) => dispatch => {
  axios.get(global.uri + `/admin/notifications/${category_id}/${page + 1}`)
    .then((res) => {
      const { payload } = res.data;
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });

      dispatch({
        type: SET_HR_NOTIFICATION_PAGE,
        payload: page,
      });

      dispatch({
        type: LOAD_MORE_HR_NOTIFICATIONS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : err.message
      });
    });
};


//** PROMOTIONS NOTIFICATIONS */

// Get promotions notifications pages
export const getPromotionsNotiPages = (category_id) => async dispatch => {
  dispatch(setPromotionsNotiLoading());

  dispatch({
    type: SET_PROMOTIONS_NOTIFICATION_PAGES,
    payload: 0,
  });

  dispatch({
    type: SET_PROMOTIONS_NOTIFICATION_PAGE,
    payload: 0,
  });
  
  try{
    const res = await axios.get(global.uri + `/admin/notifications/index/${category_id}`);
    const { pages } = res.data;
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    dispatch({
      type: SET_PROMOTIONS_NOTIFICATION_PAGES,
      payload: pages,
    });
  }
  catch(err) {
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
        payload: { message: err.message }
      });
    }
  }
};

// Get promotions notifications by page
export const getPromotionsNotifications = (category_id, page) => dispatch => {
  dispatch(setPromotionsNotiLoading());
  
  axios.get(global.uri + `/admin/notifications/${category_id}/${page+1}`)
    .then((res) => {
      const { payload } = res.data;
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });

      dispatch({
        type: SET_PROMOTIONS_NOTIFICATION_PAGE,
        payload: page,
      });

      dispatch({
        type: GET_PROMOTIONS_NOTIFICATIONS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : err.message
      });

      dispatch({
        type: GET_PROMOTIONS_NOTIFICATIONS,
        payload: [],
      });
    });
};

// Load more promotions notifications by page
export const getMorePromotionsNotifications = (category_id, page) => dispatch => {
  axios.get(global.uri + `/admin/notifications/${category_id}/${page + 1}`)
    .then((res) => {
      const { payload } = res.data;
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });

      dispatch({
        type: SET_PROMOTIONS_NOTIFICATION_PAGE,
        payload: page,
      });

      dispatch({
        type: LOAD_MORE_PROMOTIONS_NOTIFICATIONS,
        payload: payload,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : err.message
      });
    });
};

// Post the new notifications
export const addNotification = (payload) => async dispatch => {
  dispatch(setNotificationLoading());
  
  await axios.post(global.uri + '/admin/notifications/add', payload)
  .then((res) => {
    console.log(res);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });

    dispatch({
      type: ADD_NOTIFICATION,
      payload: true,
    });
  })
  .catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data ? err.response.data : err.message
    });

    dispatch({
      type: ADD_NOTIFICATION,
      payload: false,
    });
  });
};

// Set loading state
export const setNotificationLoading = () => {
    return {
        type: NOTIFICATION_LOADING
    }
};

// Set system loading state
export const setSystemNotificationLoading = () => {
    return {
        type: SYSTEM_NOTIFICATION_LOADING
    }
};

// Set HR loading state
export const setHRNotificationLoading = () => {
    return {
        type: HR_NOTIFICATION_LOADING
    }
};

// Set Promotions loading state
export const setPromotionsNotiLoading = () => {
  return {
      type: PROMOTIONS_NOTIFICATION_LOADING
  }
};
