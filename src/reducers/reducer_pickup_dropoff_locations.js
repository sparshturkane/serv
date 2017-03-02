import { POST_REQUEST_PICKUP_LOCATION, POST_REQUEST_DROPOFF_LOCATION } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_REQUEST_PICKUP_LOCATION:
        return { ...state, PickUpServiceLocations: action.payload.data.data };

        case POST_REQUEST_DROPOFF_LOCATION:
        return { ...state, DropOffServiceLocations: action.payload.data.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
