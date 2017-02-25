import { MAKING_PAGES_ACTIVE } from '../actions/index';

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
    // switch (action.type) {
    //     case MAKING_PAGES_ACTIVE:
    //
    //     return { ...state, [action.payload.pageName]: action.payload };
    //
    //
    //     // case FETCH_POSTS:
    //     // return { ...state, all: action.payload.data };
    //     default:
    //     return state;
    // }
    if(action.type === MAKING_PAGES_ACTIVE){
        console.log(action.payload);
        console.log("making pages active");
        switch (action.payload.pageName) {
            case 'pickUp':
            return{
                ...state, [action.payload.pageName]: action.payload
            };

            case 'dropOff':
            return{
                ...state, [action.payload.pageName]: action.payload
            };

            default:
            return state;
        }

    }

    return state;
}
