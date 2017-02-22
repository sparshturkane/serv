import { SET_ACTIVE_PRODUCT_DATA } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_ACTIVE_PRODUCT_DATA:
        // console.log(action.payload.data.data);
        return { ...state, ProductData: action.payload };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
