import axios from 'axios';
import $ from 'jquery';

export const FETCH_SUPPORTED_MOBILES = 'FETCH_SUPPORTED_MOBILES';
export const GET_REWARDS_LIST = 'GET_REWARD_LIST';
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';
export const SET_SUPPORTED_MODES = 'SET_SUPPORTED_MODES';
export const GET_OTP = 'GET_OTP';
export const GET_LAT_LNG = 'GET_LAT_LNG';
export const POST_REQUEST_PICKUP_LOCATION = 'POST_REQUEST_PICKUP_LOCATION';
export const SET_ACTIVE_PRODUCT_DATA = 'SET_ACTIVE_PRODUCT_DATA';
export const POST_CONSUMER_SERVICE_REQUEST_GET_SLOT = 'POST_CONSUMER_SERVICE_REQUEST_GET_SLOT';
export const POST_TEMP_CONSUMER_GET_OTP = 'POST_TEMP_CONSUMER_GET_OTP';
export const STORE_USER_DATA = "STORE_USER_DATA";
export const POST_TEMP_CONSUMER_SIGN_UP = 'POST_TEMP_CONSUMER_SIGN_UP';
export const MAKING_PAGES_ACTIVE = 'MAKING_PAGES_ACTIVE';
export const CONSUMER_UPDATE_PROFILE = 'CONSUMER_UPDATE_PROFILE';
export const CONSUMER_GET_PROFILE = 'CONSUMER_GET_PROFILE';
export const STORE_LOCATION_DATA = 'STORE_LOCATION_DATA';
export const POST_CONSUMER_PRODUCT_ADD_DEVICE = 'POST_CONSUMER_PRODUCT_ADD_DEVICE';
export const POST_CONSUMER_SERVICE_REQUEST_SCHEDULE_RECYCLE_REQUEST = 'POST_CONSUMER_SERVICE_REQUEST_SCHEDULE_RECYCLE_REQUEST';
export const POST_CONSUMER_SERVICE_REQUEST_GET_CONSUMER_SERVICE_REQUEST_DETAILS = 'POST_CONSUMER_SERVICE_REQUEST_GET_CONSUMER_SERVICE_REQUEST_DETAILS';
export const POST_CONSUMER_SERVICE_REQUEST_TRACK_REQUEST = 'POST_CONSUMER_SERVICE_REQUEST_TRACK_REQUEST';
export const FETCH_LOCATION_PREDICTION = 'FETCH_LOCATION_PREDICTION';
export const POST_REQUEST_DROPOFF_LOCATION = 'POST_REQUEST_DROPOFF_LOCATION';
export const SET_ACTIVE_DROP_OFF_SERVICE_LOCATION = 'SET_ACTIVE_DROP_OFF_SERVICE_LOCATION';
export const GET_BROWSER_LOCATION = 'GET_BROWSER_LOCATION';
export const GET_ADDRESS_FROM_LAT_LNG = 'GET_ADDRESS_FROM_LAT_LNG';
export const SET_SHOW_HIDE_MODAL = 'SET_SHOW_HIDE_MODAL';
export const POST_TEMP_CONSUMER_SIGN_UP_ERROR = 'POST_TEMP_CONSUMER_SIGN_UP_ERROR';
export const POST_CONSUMER_SERVICE_REQUEST_DETAILS = 'POST_CONSUMER_SERVICE_REQUEST_DETAILS';
export const POST_CONSUMER_SERVICE_CANCEL_REQUEST = 'POST_CONSUMER_SERVICE_CANCEL_REQUEST';
export const STORE_RESCHEDULE_PICKUP_DATA = 'STORE_RESCHEDULE_PICKUP_DATA';
export const STORE_RESCHEDULE_DROPOFF_DATA = 'STORE_RESCHEDULE_DROPOFF_DATA';
export const POST_CONSUMER_SERVICE_RESCHEDULE_SLOTS = 'POST_CONSUMER_SERVICE_RESCHEDULE_SLOTS';
export const POST_CONSUMER_SERVICE_RESCHEDULE_REQUEST = 'POST_CONSUMER_SERVICE_RESCHEDULE_REQUEST';
export const STORE_DROP_OFF_TIME_SLOTS = 'STORE_DROP_OFF_TIME_SLOTS';
export const STORE_RESCHEDULE_RECYCLE_REQUEST_DATA = 'STORE_RESCHEDULE_RECYCLE_REQUEST_DATA';
export const STORE_ACTIVE_PHONE = 'STORE_ACTIVE_PHONE';
export const STORE_PRODUCT_REWARD_ID_ARRAY = 'STORE_PRODUCT_REWARD_ID_ARRAY';
export const STORE_PRODUCT_REWARD_DATA_ARRAY = 'STORE_PRODUCT_REWARD_DATA_ARRAY';


const ROOT_URL = 'http://staging.servify.in:8027/api';

// https://maps.googleapis.com/maps/api/geocode/json?address=anderi+west&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
// https://maps.googleapis.com/maps/api/geocode/json?latlng=19.1363246,72.82766&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
const GOOGLE_MAPS_GEOCODING_ROOT_URL = 'https://maps.googleapis.com/maps/api'; // /geocode/json?address=abc+def&key=

// RAW https://maps.googleapis.com/maps/api/place/autocomplete/json?input=miraroad&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
// const GOOGLE_MAPS_AUTOCOMPLETE_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=miraroad&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes';
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

//storing selected gift list array
export function storeProductRewardIDArray(storeProductRewardIDArray) {
    return {
        type: STORE_PRODUCT_REWARD_ID_ARRAY,
        payload: storeProductRewardIDArray,
    };
}

// storing product reward data
export function storeProductRewardDataArray(storeProductRewardDataArray) {
    return {
        type: STORE_PRODUCT_REWARD_DATA_ARRAY,
        payload: storeProductRewardDataArray,
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

// getting geo location based on place id when browser buton is clicked
export function fetchGeoLocationPlaceID(placeID) { //testing
    const request = axios.get(`${GOOGLE_MAPS_GEOCODING_ROOT_URL}/geocode/json?place_id=${placeID}&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);

    return {
        type: GET_LAT_LNG,
        payload: request,
    };
}

// GET BROWSER location
export function getBrowserLocation() { //testing
    const request = axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);

    return {
        type: GET_BROWSER_LOCATION,
        payload: request,
    };
}

// get landmark from lat Lng
export function getAddressFromLatLng(lat,lng) { //testing
    const request = axios.get(`${GOOGLE_MAPS_GEOCODING_ROOT_URL}/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);

    return {
        type: GET_ADDRESS_FROM_LAT_LNG,
        payload: request,
    };
}

export function fetchGeoLocationPrediction(SearchKeyword) { //testing
    var config = {
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json'
        }
    };

    // const request = axios.post(`${GOOGLE_MAPS_GEOCODING_ROOT_URL}/place/autocomplete/json?input=${SearchKeyword}&types=geocode&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);
    const request = axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${SearchKeyword}&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes`, config);
    // /place/autocomplete/json?input=miraroad&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
    return {
        type: FETCH_LOCATION_PREDICTION,
        payload: request,
    };
}
//
// export function fetchGeoLocationPrediction(SearchKeyword) { //testing
//     // var config = {
//     //     headers: {
//     //         'Access-Control-Allow-Origin' : '*',
//     //         'Content-Type': 'application/json'
//     //     }
//     // };
//
//     // const request = axios.post(`${GOOGLE_MAPS_GEOCODING_ROOT_URL}/place/autocomplete/json?input=${SearchKeyword}&types=geocode&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);
//     // const request = axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${SearchKeyword}&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes`, config);
//     // /place/autocomplete/json?input=miraroad&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes
//     $.ajax({
//         url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${SearchKeyword}&types=geocode&key=AIzaSyB5roJvGx-u49wYK6niNSC2e44N0JyvQes`,
//         type: "GET",
//         dataType: 'json',
//         cache: false,
//         success: function(response){
//             return {
//                 type: FETCH_LOCATION_PREDICTION,
//                 payload: response,
//             };
//         }
//     });
//
//
// }

// calling serviceAvailability(PickUp)
export function fetchPickUpLocations(pickUpLocationRequest) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/serviceAvailability`, pickUpLocationRequest);

    return {
        type: POST_REQUEST_PICKUP_LOCATION,
        payload: request,
    };
}

// calling carry in service
export function fetchDropOffLocations(dropOffLocationRequest) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/getServiceLocationsForCarryIn`, dropOffLocationRequest);

    return {
        type: POST_REQUEST_DROPOFF_LOCATION,
        payload: request,
    };
}

//ActiveDropOffServiceLocation
export function activeDropOffServiceLocation(activeServiceLocationObj) {
    return {
        type: SET_ACTIVE_DROP_OFF_SERVICE_LOCATION,
        payload: activeServiceLocationObj,
    };
}

// active modal
export function showHideModal(status) {
    return {
        type: SET_SHOW_HIDE_MODAL,
        payload: status,
    };
}

// getSlots
export function getSlot(getSlotRequest) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/getSlot`, getSlotRequest);

    return {
        type: POST_CONSUMER_SERVICE_REQUEST_GET_SLOT,
        payload: request,
    };
}

// getotp
export function tempConsumerGetOTP(getOTPRequest) {
    const request = axios.post(`${ROOT_URL}/TempConsumer/getOTP`, getOTPRequest);

    return {
        type: POST_TEMP_CONSUMER_GET_OTP,
        payload: request,
    };
}

// session store user data
export function sessionStorageUserData(userData) {
    return {
        type: STORE_USER_DATA,
        payload: userData,
    };
}

// session storing dropOff Button timeSlots
export function sessionStorageDropOffTimeSlot(timeSlotsData) {
    return {
        type: STORE_DROP_OFF_TIME_SLOTS,
        payload: timeSlotsData,
    };
}

// store rescheduleRequestData
export function sessionStorageRescheduleRecycleData(rescheduleRequestObj) {
    return {
        type: STORE_RESCHEDULE_RECYCLE_REQUEST_DATA,
        payload: rescheduleRequestObj,
    };
}

// session storing Header active phone
export function sessionStorageHeaderActivePhone(activePhoneName) {
    return {
        type: STORE_ACTIVE_PHONE,
        payload: activePhoneName,
    };
}

// tempconsumer signup
export function tempConsumerSignUp(signUpRequest) {
    const request = axios.post(`${ROOT_URL}/TempConsumer/signup`, signUpRequest)
    .catch(function (error) {
        console.log(error.error);;
        return {
            type: POST_TEMP_CONSUMER_SIGN_UP_ERROR,
            payload: request,
        }
    });;

    return {
        type: POST_TEMP_CONSUMER_SIGN_UP,
        payload: request,
    }

}

// making pages active
export function makePagesActive(pageData) {


    return {
        type: MAKING_PAGES_ACTIVE,
        payload: pageData,
    };
}

// session store location data
export function sessionStorageLocationData(locationData) {
    return {
        type: STORE_LOCATION_DATA,
        payload: locationData,
    };
}

// UPDAING CONSUMER USER profile

export function consumerUpdateProfile(updateProfileData) {
    const request = axios.post(`${ROOT_URL}/Consumer/updateProfile`, updateProfileData);

    return {
        type: CONSUMER_UPDATE_PROFILE,
        payload: request,
    };
}

// get user profile
export function consumerGetProfile(userIDObj) {
    const request = axios.post(`${ROOT_URL}/Consumer/getProfile`, userIDObj);

    return {
        type: CONSUMER_GET_PROFILE,
        payload: request,
    };
}

// consumer adding product
export function consumerProductAddDevice(addDeviceRequest) {
    const request = axios.post(`${ROOT_URL}/ConsumerProduct/addDevice`, addDeviceRequest );
    // console.log(request);
    return {
        type: POST_CONSUMER_PRODUCT_ADD_DEVICE,
        payload: request,
    };
}

// schedule recycle request
export function consumerScheduleRecycleRequest(scheduleRecycleRequestData) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/scheduleRecycleRequest`, scheduleRecycleRequestData );
    // console.log(request);
    return {
        type: POST_CONSUMER_SERVICE_REQUEST_SCHEDULE_RECYCLE_REQUEST,
        payload: request,
    };
}

// list of all recycle request
export function getConsumerServiceRequestDetails(requestObj) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/getConsumerServiceRequestDetails`, requestObj );
    // console.log(request);
    return {
        type: POST_CONSUMER_SERVICE_REQUEST_GET_CONSUMER_SERVICE_REQUEST_DETAILS,
        payload: request,
    };
}

// tracking details
export function getConsumerServiceRequestTrackRequest(requestObj) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/trackRequest`, requestObj );
    // console.log(request);
    return {
        type: POST_CONSUMER_SERVICE_REQUEST_TRACK_REQUEST,
        payload: request,
    };
}

// recycle request Details
export function getConsumerServiceRequestRecycleDetails(requestObj) {
    // ConsumerServicerequest/requestDetails
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/requestDetails`, requestObj );
    // console.log(request);
    return {
        type: POST_CONSUMER_SERVICE_REQUEST_DETAILS,
        payload: request,
    };
}

// cancel recycle request
export function consumerServicerequestCancelRequest(requestObj) {
    // ConsumerServicerequest/requestDetails
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/cancelRequest`, requestObj );
    // console.log(request);
    return {
        type: POST_CONSUMER_SERVICE_CANCEL_REQUEST,
        payload: request,
    };
}

// reschedule pickup
export function reschedulePickupData(pickupData) {
    return {
        type: STORE_RESCHEDULE_PICKUP_DATA,
        payload: pickupData,
    };
}

// reschedule dropoff data
export function rescheduleDropoffData(pickupData) {
    return {
        type: STORE_RESCHEDULE_DROPOFF_DATA,
        payload: pickupData,
    };
}

// reschedule get slots
export function consumerServicerequestRescheduleSlots(requestObj) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/rescheduleSlots`, requestObj );
    return {
        type: POST_CONSUMER_SERVICE_RESCHEDULE_SLOTS,
        payload: request,
    };
}

// reschedule request
export function consumerServicerequestRescheduleRequest(requestObj) {
    const request = axios.post(`${ROOT_URL}/ConsumerServicerequest/rescheduleRequest`, requestObj );
    return {
        type: POST_CONSUMER_SERVICE_RESCHEDULE_REQUEST,
        payload: request,
    };
}
