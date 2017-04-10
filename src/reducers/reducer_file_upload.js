import { FETCH_FILE_UPLOAD_URL } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_FILE_UPLOAD_URL:
        return { ...state, FileUploadUrl: action.payload.data};

        default:
        return state;
    }
}
