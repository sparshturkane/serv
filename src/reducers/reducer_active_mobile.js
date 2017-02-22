import { SET_PRODUCT_NAME, SET_SUPPORTED_MODES } from '../actions/index';

const INITIAL_STATE = { ProductName: '', SupportedModes: [] };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PRODUCT_NAME:
        return { ...state, ProductName: action.payload };

        case SET_SUPPORTED_MODES:
        return { ...state, SupportedModes: action.payload};

        default:
        return state;
    }
}
