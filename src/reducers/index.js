import { combineReducers } from 'redux';
import supportedMobiles from './reducer_supported_mobiles'
import rewardsList from './reducer_rewards_list'
const rootReducer = combineReducers({
    supportedMobiles : supportedMobiles,
    rewardsList : rewardsList
});

export default rootReducer;
