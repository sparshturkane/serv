import { STORE_USER_DATA, STORE_LOCATION_DATA, GET_BROWSER_LOCATION,GET_ADDRESS_FROM_LAT_LNG,SET_SHOW_HIDE_MODAL } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STORE_USER_DATA:
        return { ...state, UserData: action.payload };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        case STORE_LOCATION_DATA:
        return{ ...state, LocationData: action.payload };

        case GET_BROWSER_LOCATION:
        return{
            ...state,
            LocationData: {
                latitude:action.payload.data.location.lat,
                longitude:action.payload.data.location.lng
            }
        };

        case GET_ADDRESS_FROM_LAT_LNG:
        return {
            ...state,
            LocationData: {
                Landmark: action.payload.data.results[1].formatted_address,
                latitude:action.payload.data.results[1].geometry.location.lat,
                longitude:action.payload.data.results[1].geometry.location.lng
            }
        };

        case SET_SHOW_HIDE_MODAL:
        return {
            ...state,
            displayOtpModal: action.payload
        };

        default:
        return state;
    }
}
