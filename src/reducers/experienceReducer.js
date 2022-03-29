import {
    GET_EXPERIENCES
} from "../actions/types";

const initialState = {
    experiences: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_EXPERIENCES: {
            return {
                ...state,
                experiences: action.payload,
                loading: false
            }
        }
        default:
            return state;
    }
}
