//Import Action Types
import { NOTIFICATION_LOADING, ADD_NOTIFICATION } from "../../actions/types";

const initialState = {
  success: false,
  loading: false,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_LOADING:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default notification;
