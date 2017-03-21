import { STORE_RESCHEDULE_DROPOFF_DATA, STORE_RESCHEDULE_PICKUP_DATA } from '../actions/index';

const INITIAL_STATE = {  };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case STORE_RESCHEDULE_PICKUP_DATA:
        return { ...state, ReschedulePickupData: action.payload };

        case STORE_RESCHEDULE_DROPOFF_DATA:
        return { ...state, RescheduleDropoffData: action.payload };
        
        default:
        return state;
    }
}
