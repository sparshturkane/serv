import { combineReducers } from 'redux';
import supportedMobiles from './reducer_supported_mobiles';
import rewardsList from './reducer_rewards_list';
import productData from './reducer_active_mobile';
import { reducer as formReducer} from 'redux-form';
import GeoLocationData from './reducer_geo_location'
import PickUpServiceLocationData from './reducer_pickup_locations';
import ActiveProductData from './reducer_active_product_data';


const rootReducer = combineReducers({
    supportedMobiles : supportedMobiles,
    rewardsList : rewardsList,
    productData: productData,
    form: formReducer,
    GeoLocationData: GeoLocationData,
    PickUpServiceLocationData: PickUpServiceLocationData,
});

export default rootReducer;
