import {
  GET_CERTIFICATES
} from "../actions/types";

const initialState = {
    certificates: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CERTIFICATES: {
            return {
                ...state,
                certificates: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}
