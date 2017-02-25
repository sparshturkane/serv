import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import { createStore, compose,applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import rootReducer from './reducers/index';
import promise from 'redux-promise';



// ReactDOM.render(
//     <Provider store={store}>
//         <Router history={browserHistory} routes={routes} />
//     </Provider>,
//
//     document.getElementById('root')
// );



const enhancers = compose(
     window.devToolsExtension ? window.devToolsExtension(): f=>f
);

const createStoreWithMiddleware = applyMiddleware(
    promise
)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer, enhancers)}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,

    document.getElementById('root')
);
