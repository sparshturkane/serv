
import { createStore, compose,applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import promise from 'redux-promise';


const enhancers = compose(
     window.devToolsExtension ? window.devToolsExtension(): f=>f
);

const middleware = applyMiddleware( promise  );

const store = createStore(rootReducer, middleware, enhancers);



export default store;
