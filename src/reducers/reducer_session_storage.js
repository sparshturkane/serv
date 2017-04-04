import {
    STORE_USER_DATA,
    STORE_LOCATION_DATA,
    GET_BROWSER_LOCATION,
    GET_ADDRESS_FROM_LAT_LNG,
    SET_SHOW_HIDE_MODAL,
    STORE_DROP_OFF_TIME_SLOTS,
    STORE_RESCHEDULE_RECYCLE_REQUEST_DATA,
    STORE_ACTIVE_PHONE,
    STORE_PRODUCT_REWARD_ID_ARRAY,
    STORE_PRODUCT_REWARD_DATA_ARRAY
} from '../actions/index';

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

        var searchAddressComponents = action.payload.data.results[1].address_components;
        var searchPostalCode = "";

        searchAddressComponents.forEach( function(map){
            if(map.types[0]==="postal_code"){
                searchPostalCode=map.short_name;
            }
        });

        return {
            ...state,
            LocationData: {
                Landmark: action.payload.data.results[1].formatted_address,
                latitude:action.payload.data.results[1].geometry.location.lat,
                longitude:action.payload.data.results[1].geometry.location.lng,
                Pincode: searchPostalCode,
                placeID: action.payload.data.results[1].place_id,
            }
        };

        case SET_SHOW_HIDE_MODAL:
        return {
            ...state,
            displayOtpModal: action.payload
        };

        case STORE_DROP_OFF_TIME_SLOTS:
        return {
            ...state,
            dropOffTimeSlot: action.payload
        };

        case STORE_RESCHEDULE_RECYCLE_REQUEST_DATA:
        return {
            ...state,
            rescheduleRecycleRequestData: action.payload
        };

        case STORE_ACTIVE_PHONE:
        return {
            ...state,
            activePhoneName: action.payload
        };

        case STORE_PRODUCT_REWARD_ID_ARRAY:
        return {
            ...state,
            ProductRewardIDArray: action.payload
        };

        case STORE_PRODUCT_REWARD_DATA_ARRAY:
        return {
            ...state,
            ProductRewardDataArray: action.payload
        };

        default:
        return state;
    }
}
