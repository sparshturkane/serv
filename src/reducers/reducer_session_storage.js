import { STORE_USER_DATA, STORE_LOCATION_DATA } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STORE_USER_DATA:
        return { ...state, UserData: action.payload };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        case STORE_LOCATION_DATA:
        return{ ...state, LocationData: action.payload };
        default:
        return state;
    }
}