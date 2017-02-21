import { GET_REWARDS_LIST } from '../actions/index';

const INITIAL_STATE = { rewardsListData: [] };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_REWARDS_LIST:
        // console.log(action.payload.data.data);
        return { ...state, rewardsListData: action.payload.data.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
