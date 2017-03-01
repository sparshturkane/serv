import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import PickUpPage from './containers/pick_up';
import ConfirmRecycleRequest from './components/confirm_recycle_request';
import AwesomePage from './components/awesome';
import LoggedInDashboard from './components/dashboard';


// <Route path="posts/new" component={ PostsNew } />

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="pickup-dropoff" component={ PickUpPage } />
        <Route path="confirmation" component={ ConfirmRecycleRequest } />
        <Route path="awesome" component={ AwesomePage } />
        <Route path="dashboard" component={ LoggedInDashboard } />
    </Route>
);
