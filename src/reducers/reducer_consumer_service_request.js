import { POST_CONSUMER_SERVICE_REQUEST_GET_SLOT } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_CONSUMER_SERVICE_REQUEST_GET_SLOT:
        return { ...state, getSlot: action.payload.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
