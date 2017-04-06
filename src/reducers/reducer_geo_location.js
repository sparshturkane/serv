import { GET_LAT_LNG, FETCH_LOCATION_PREDICTION, GET_LAT_LNG_FROM_SAVED_LOCATION } from '../actions/index';

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
        var Landmark = action.payload.data.results[0].formatted_address;

        searchAddressComponents.forEach( function(map){
            if(map.types[0]==="postal_code"){
                searchPostalCode=map.short_name;
            }
        });

        return { ...state, latitude: lat, longitude:lng, pincode:searchPostalCode, Landmark: Landmark };

        case FETCH_LOCATION_PREDICTION:
        return { ...state,  LocationPrediction: action.payload};

        case GET_LAT_LNG_FROM_SAVED_LOCATION:
        return {
            ...state,
            latitude: action.payload.lat,
            longitude: action.payload.lng,
            pincode: action.payload.searchPostalCode,
            Landmark: action.payload.Landmark,
        };

        default:
        return state;
    }
}
