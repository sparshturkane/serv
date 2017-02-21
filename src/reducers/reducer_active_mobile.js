import { FETCH_SUPPORTED_MOBILES } from '../actions/index';

const INITIAL_STATE = { supportedMobilesList: [] };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_SUPPORTED_MOBILES:
        // console.log(action.payload.data.data);
        return { ...state, supportedMobilesList: action.payload.data.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
