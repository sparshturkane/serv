import { SET_PRODUCT_NAME } from '../actions/index';

const INITIAL_STATE = { ProductName: '' };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PRODUCT_NAME:
        console.log("selected mobile name  :"+action.payload);
        return { ...state, ProductName: action.payload };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
