import { combineReducers } from 'redux';
import supportedMobiles from './reducer_supported_mobiles';
import rewardsList from './reducer_rewards_list';
import productData from './reducer_active_mobile';
import { reducer as formReducer} from 'redux-form';
import GeoLocationData from './reducer_geo_location'
import PickUpDropOffServiceLocationData from './reducer_pickup_dropoff_locations';
import ActiveProductData from './reducer_active_product_data';
import ConsumerServicerequest from './reducer_consumer_service_request';
import SessionStorage from './reducer_session_storage';
import TempConsumer from './reducer_temp_consumer';


const rootReducer = combineReducers({
    supportedMobiles : supportedMobiles,
    rewardsList : rewardsList,
    productData: productData,
    form: formReducer,
    GeoLocationData: GeoLocationData,
    PickUpDropOffServiceLocationData: PickUpDropOffServiceLocationData,
    ConsumerServicerequest: ConsumerServicerequest,
    SessionStorage: SessionStorage,
    TempConsumer : TempConsumer
});

export default rootReducer;
