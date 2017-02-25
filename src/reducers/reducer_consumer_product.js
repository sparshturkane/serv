import { POST_CONSUMER_PRODUCT_ADD_DEVICE } from '../actions/index';

const INITIAL_STATE = {  };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_CONSUMER_PRODUCT_ADD_DEVICE:
        return { ...state, AddDevice: action.payload.data};

        default:
        return state;
    }
}
