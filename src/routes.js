import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import PickUpPage from './containers/pick_up';
import ConfirmRecycleRequest from './components/confirm_recycle_request';
import AwesomePage from './components/awesome';
import LoggedInDashboard from './components/dashboard';
import TrackingPage from './containers/tracking/tracking';
import DropOffIndex from './containers/dropoff/dropoff_index';
import DropOffForm from './containers/dropoff/dropoff_form';
import ViewUserProfile from './containers/userProfile/view_user_profile';
import EditUserProfile from './containers/userProfile/edit_user_profile';


// <Route path="posts/new" component={ PostsNew } />

export default (
    <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="/pickup-dropoff" component={ PickUpPage } />
        <Route path="/dropoff" component={ DropOffIndex } />
        <Route path="/dropoff-form" component={ DropOffForm } />
        <Route path="/confirmation" component={ ConfirmRecycleRequest } />
        <Route path="/awesome" component={ AwesomePage } />
        <Route path="/dashboard" component={ LoggedInDashboard } />
        // <Route path="tracking" component={ TrackingPage } />
        <Route path="/tracking/:ConsumerServiceRequestID" component={ TrackingPage } />
        <Route path="/user-profile" component={ ViewUserProfile } />
        <Route path="/user-edit" component={ EditUserProfile } />
    </Route>
);
