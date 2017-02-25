import { CONSUMER_UPDATE_PROFILE } from '../actions/index';

const INITIAL_STATE = { rewardsListData: [] };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSUMER_UPDATE_PROFILE:
        // console.log(action.payload.data.data);
        return { ...state, ConsumerDetail: action.payload.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
