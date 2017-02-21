import axios from 'axios';

export const FETCH_SUPPORTED_MOBILES = 'FETCH_SUPPORTED_MOBILES';
export const GET_REWARDS_LIST = 'GET_REWARD_LIST';
export const SET_PRODUCT_NAME = 'SET_PRODUCT_NAME';

const ROOT_URL = 'http://staging.servify.in:8018/api';

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

//storing selected mobile name
export function setMobileName(ProductName) {
    return {
        type: SET_PRODUCT_NAME,
        payload: ProductName,
    };
}
