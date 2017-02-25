import { POST_TEMP_CONSUMER_SIGN_UP } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_TEMP_CONSUMER_SIGN_UP:

        // locally storing the signup accesstoken
        localStorage.setItem('SignUpData', JSON.stringify(action.payload.data));

        // returning accesstoken to redux store
        return { ...state, SignUpData: action.payload.data };


        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
