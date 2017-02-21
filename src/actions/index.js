import axios from 'axios';

export const FETCH_SUPPORTED_MOBILES = 'FETCH_SUPPORTED_MOBILES';
export const GET_REWARDS_LIST = 'GET_REWARD_LIST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

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
    var ProductID = ProductID;
    const request = axios.post(`${ROOT_URL}/Reward/getRewardsList`, ProductID );
    console.log(request);
    return {
        type: GET_REWARDS_LIST,
        payload: request,
    };
}
