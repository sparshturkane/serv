import { CONSUMER_FAVORITE_LOCATION_GET_USER_LOCATIONS,
CONSUMER_FAVORITE_LOCATION_UPDATE_LOCATION } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSUMER_FAVORITE_LOCATION_GET_USER_LOCATIONS:
        return { ...state, GetUserLocations: action.payload.data };

        // case CONSUMER_FAVORITE_LOCATION_UPDATE_LOCATION:
        // return { ...state, GetUserLocations: action.payload.data };

        default:
        return state;
    }
}
