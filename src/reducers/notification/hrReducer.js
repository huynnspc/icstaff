//Import Action Types
import {
  HR_NOTIFICATION_LOADING,
  GET_HR_NOTIFICATIONS,
  SET_HR_NOTIFICATION_PAGE,
  SET_HR_NOTIFICATION_PAGES,
  LOAD_MORE_HR_NOTIFICATIONS,
} from "../../actions/types";

const initialState = {
  notifications: [],
  pages: 0,
  page: 0,
  loading: false,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case HR_NOTIFICATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HR_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case LOAD_MORE_HR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
      };
    case SET_HR_NOTIFICATION_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_HR_NOTIFICATION_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default notification;
