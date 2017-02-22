import { POST_REQUEST_PICKUP_LOCATION } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_REQUEST_PICKUP_LOCATION:
        // console.log(action.payload.data.data);
        return { ...state, PickUpServiceLocations: action.payload.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
