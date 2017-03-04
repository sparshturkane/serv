import { POST_REQUEST_PICKUP_LOCATION, POST_REQUEST_DROPOFF_LOCATION, SET_ACTIVE_DROP_OFF_SERVICE_LOCATION } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_REQUEST_PICKUP_LOCATION:
        return { ...state, PickUpServiceLocations: action.payload.data.data };

        case POST_REQUEST_DROPOFF_LOCATION:
        return { ...state, DropOffServiceLocations: action.payload.data.data };

        case SET_ACTIVE_DROP_OFF_SERVICE_LOCATION:
        return {...state, ActiveDropOffServiceLocation: action.payload}
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
