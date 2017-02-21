import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory} from 'react-router';
import rootReducer from './reducers';
import routes from './routes';
import promise from 'redux-promise';

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
