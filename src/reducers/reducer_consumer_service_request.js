import {
    POST_CONSUMER_SERVICE_REQUEST_GET_SLOT,
    POST_CONSUMER_SERVICE_REQUEST_SCHEDULE_RECYCLE_REQUEST,
    POST_CONSUMER_SERVICE_REQUEST_GET_CONSUMER_SERVICE_REQUEST_DETAILS,
    POST_CONSUMER_SERVICE_REQUEST_TRACK_REQUEST,
    POST_CONSUMER_SERVICE_REQUEST_DETAILS,
    POST_CONSUMER_SERVICE_RESCHEDULE_SLOTS
} from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_CONSUMER_SERVICE_REQUEST_GET_SLOT:
        return { ...state, getSlot: action.payload.data };

        case POST_CONSUMER_SERVICE_REQUEST_SCHEDULE_RECYCLE_REQUEST:
        return { ...state, ScheduleRecycleRequest: action.payload.data };

        case POST_CONSUMER_SERVICE_REQUEST_GET_CONSUMER_SERVICE_REQUEST_DETAILS:
        return { ...state, ConsumerServiceRequestDetails: action.payload.data };

        case POST_CONSUMER_SERVICE_REQUEST_TRACK_REQUEST:
        return { ...state, ConsumerServiceRequestTrackRequest: action.payload.data };

        case POST_CONSUMER_SERVICE_REQUEST_DETAILS:
        return { ...state, ConsumerServiceRequestRecycleDetail: action.payload.data };

        case POST_CONSUMER_SERVICE_RESCHEDULE_SLOTS:
        return { ...state, ConsumerServiceRequestRescheduleSlots: action.payload.data };
        // case FETCH_POSTS:
        // return { ...state, all: action.payload.data };
        default:
        return state;
    }
}
