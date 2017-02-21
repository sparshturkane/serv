import { combineReducers } from 'redux';
import supportedMobiles from './reducer_supported_mobiles'
import rewardsList from './reducer_rewards_list'
import setMobileName from './reducer_active_mobile'

const rootReducer = combineReducers({
    supportedMobiles : supportedMobiles,
    rewardsList : rewardsList,
    setMobileName: setMobileName
});

export default rootReducer;
