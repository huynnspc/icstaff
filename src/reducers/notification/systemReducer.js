//Import Action Types
import {
  SYSTEM_NOTIFICATION_LOADING,
  GET_SYSTEM_NOTIFICATIONS,
  // GET_SYSTEM_NOTIFICATION,
  SET_SYSTEM_NOTIFICATION_PAGE,
  SET_SYSTEM_NOTIFICATION_PAGES,
  LOAD_MORE_SYSTEM_NOTIFICATIONS,
} from "../../actions/types";

const initialState = {
  notifications: [],
  notification: [],
  pages: 0,
  page: 0,
  loading: false,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_NOTIFICATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SYSTEM_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
  
    case LOAD_MORE_SYSTEM_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
      };
    case SET_SYSTEM_NOTIFICATION_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_SYSTEM_NOTIFICATION_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default notification;
