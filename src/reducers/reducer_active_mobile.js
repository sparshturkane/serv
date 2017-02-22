import { SET_PRODUCT_NAME, SET_SUPPORTED_MODES, SET_ACTIVE_PRODUCT_DATA } from '../actions/index';

const INITIAL_STATE = { ProductName: '', SupportedModes: [], ActiveProductData:{} };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PRODUCT_NAME:
        return { ...state, ProductName: action.payload };

        case SET_SUPPORTED_MODES:
        return { ...state, SupportedModes: action.payload};

        case SET_ACTIVE_PRODUCT_DATA:
        console.log("ActiveProductData"+action.payload);
        return { ...state, ActiveProductData: action.payload.ProductData};

        default:
        return state;
    }
}
