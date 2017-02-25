import { GET_LAT_LNG } from '../actions/index';

const INITIAL_STATE = {  };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_LAT_LNG:
        // console.log(action.payload.data.data);
        // console.log(action.payload);
        var lat = action.payload.data.results[0].geometry.location.lat;
        var lng = action.payload.data.results[0].geometry.location.lng;

        var searchAddressComponents = action.payload.data.results[0].address_components;
        var searchPostalCode = "";

        searchAddressComponents.forEach( function(map){
            if(map.types[0]==="postal_code"){
                searchPostalCode=map.short_name;
            }
        });

        return { ...state, latitude: lat, longitude:lng, pincode:searchPostalCode };
        // case FETCH_POSTS
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}