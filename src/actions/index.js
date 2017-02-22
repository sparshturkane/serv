import axios from 'axios';

export const FETCH_SUPPORTED_MOBILES = 'FETCH_SUPPORTED_MOBILES';
export const GET_REWARDS_LIST = 'GET_REWARD_LIST';
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_SUPPORTED_MODES = 'SET_SUPPORTED_MODES';
export const GET_OTP = 'GET_OTP';
export const GET_LAT_LNG = 'GET_LAT_LNG';
export const POST_REQUEST_PICKUP_LOCATION = 'POST_REQUEST_PICKUP_LOCATION';
export const SET_ACTIVE_PRODUCT_DATA = 'SET_ACTIVE_PRODUCT_DATA';

const ROOT_URL = 'http://staging.servify.in:8018/api';

// https://maps.googleapis.com/maps/api/geocode/json?address=anderi+west&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
// https://maps.googleapis.com/maps/api/geocode/json?latlng=19.1363246,72.82766&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
const GOOGLE_MAPS_GEOCODING_ROOT_URL = 'https://maps.googleapis.com/maps/api'; // /geocode/json?address=abc+def&key=
const GOOGLE_MAPS_GEOCODING_API_KEY = 'AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes';

// getting mobile on supportedModes
export function getProductBasedOnSupportedModes() {
    const request = axios.post(`${ROOT_URL}/Product/getProductBasedOnSupportedModes`, {"SupportedModes":[9,13]});

    return {
        type: FETCH_SUPPORTED_MOBILES,
        payload: request,
    };
}

// Handelling on click of mobiles
export function getRewardsList(ProductID) {
    const request = axios.post(`${ROOT_URL}/Reward/getRewardsList`, ProductID );
    // console.log(request);
    return {
        type: GET_REWARDS_LIST,
        payload: request,
    };
}

//storing selected mobile data
export function setActiveProductData(ProductData) {
    return {
        type: SET_ACTIVE_PRODUCT_DATA,
        payload: ProductData,
    };
}

//storing selected mobile name
export function setMobileName(ProductName) {
    return {
        type: SET_PRODUCT_NAME,
        payload: ProductName,
    };
}

//storing supported modes of product
export function setSupportedModes(SupportedModes) {
    return {
        type: SET_SUPPORTED_MODES,
        payload: SupportedModes,
    };
}

//Handeling pickupPage onSubmit forms
export function pickUpPageFormSubmit(TempConsumerDetail) { //testing
    const request = axios.post(`${ROOT_URL}/TempConsumer/getOTP`, TempConsumerDetail);

    return {
        type: GET_OTP,
        payload: request,
    };
}

// handleiing google location page
// https://maps.googleapis.com/maps/api/geocode/json?address=anderi+west&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
export function fetchGeoLocation(Landmark) { //testing
    const request = axios.get(`${GOOGLE_MAPS_GEOCODING_ROOT_URL}/geocode/json?address=${Landmark}&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);

    return {
        type: GET_LAT_LNG,
        payload: request,
    };
}

// calling serviceAvailability(PickUp)
export function fetchPickUpLocations(pickUpLocationRequest) { //testing
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/serviceAvailability`, pickUpLocationRequest);

    return {
        type: POST_REQUEST_PICKUP_LOCATION,
        payload: request,
    };
}
