//Import Action Types
import {
  PROMOTIONS_NOTIFICATION_LOADING,
  GET_PROMOTIONS_NOTIFICATIONS,
  SET_PROMOTIONS_NOTIFICATION_PAGE,
  SET_PROMOTIONS_NOTIFICATION_PAGES,
  LOAD_MORE_PROMOTIONS_NOTIFICATIONS
} from "../../actions/types";

const initialState = {
  notifications: [],
  pages: 0,
  page: 0,
  loading: false,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case PROMOTIONS_NOTIFICATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROMOTIONS_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case LOAD_MORE_PROMOTIONS_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
      };
    case SET_PROMOTIONS_NOTIFICATION_PAGES:
      return {
        ...state,
        pages: action.payload,
      };
    case SET_PROMOTIONS_NOTIFICATION_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default notification;
