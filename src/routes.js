import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import PickUpPage from './containers/pick_up';

// <Route path="posts/new" component={ PostsNew } />

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="pickup-dropoff" component={ PickUpPage } />
    </Route>
);
