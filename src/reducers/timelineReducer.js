import {
  GET_TIMELINES
} from "../actions/types";

const initialState = {
    timelines: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TIMELINES: {
            return {
                ...state,
                timelines: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}
