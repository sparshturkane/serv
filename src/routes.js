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
import RecycleRequestDetail from './containers/recycleRequestDetail/recycle_request_detail';
import ReschedulePickup from './containers/recycleRequestDetail/reschedule_pickup';
import RescheduleDropoff from './containers/recycleRequestDetail/reschedule_dropoff';
import RescheduleConfirmation from './containers/recycleRequestDetail/reschedule_confirmation';
import FindImei from './components/find_imei';

// demo
// import Demo from './components/geolocationTest';


// <Route path="posts/new" component={ PostsNew } />


// console.log(SignUpData);

// if (SignUpData !== null) {
//     // here user is logged in
//     function customRoutes() {
//         return(
//             <Route path="/" component={App} >
//                 <IndexRoute component={Home} />
//                 <Route path="/pickup-dropoff" component={ PickUpPage } />
//                 <Route path="/dropoff" component={ DropOffIndex } />
//                 <Route path="/dropoff-form" component={ DropOffForm } />
//                 <Route path="/confirmation" component={ ConfirmRecycleRequest } />
//                 <Route path="/awesome" component={ AwesomePage } />
//                 <Route path="/dashboard" component={ LoggedInDashboard } />
//                 // <Route path="tracking" component={ TrackingPage } />
//                 <Route path="/tracking/:ConsumerServiceRequestID" component={ TrackingPage } />
//                 <Route path="/user-profile" component={ ViewUserProfile } />
//                 <Route path="/user-edit" component={ EditUserProfile } />
//             </Route>
//         );
//     }
// } else {
//     // here user is logged out
//     function customRoutes() {
//         return (
//             <Route path="/" component={App} >
//                 <IndexRoute component={Home} />
//                 <Route path="/pickup-dropoff" component={ PickUpPage } />
//                 <Route path="/dropoff" component={ DropOffIndex } />
//                 <Route path="/dropoff-form" component={ DropOffForm } />
//                 <Route path="/confirmation" component={ ConfirmRecycleRequest } />
//                 <Route path="/awesome" component={ AwesomePage } />
//                 <Route path="/dashboard" component={ LoggedInDashboard } />
//                 // <Route path="tracking" component={ TrackingPage } />
//                 <Route path="/tracking/:ConsumerServiceRequestID" component={ TrackingPage } />
//                 <Route path="/user-profile" component={ ViewUserProfile } />
//                 <Route path="/user-edit" component={ EditUserProfile } />
//             </Route>
//         );
//     }
// }

// function customRoutes() {
//     if (SignUpData !== null) {
//         return (
//             <Route path="/" component={App} >
//                 <IndexRoute component={Home} />
//                 <Route path="/pickup-dropoff" component={ PickUpPage } />
//                 <Route path="/dropoff" component={ DropOffIndex } />
//                 <Route path="/dropoff-form" component={ DropOffForm } />
//                 <Route path="/confirmation" component={ ConfirmRecycleRequest } />
//                 <Route path="/awesome" component={ AwesomePage } />
//                 <Route path="/dashboard" component={ LoggedInDashboard } />
//                 // <Route path="tracking" component={ TrackingPage } />
//                 <Route path="/tracking/:ConsumerServiceRequestID" component={ TrackingPage } />
//                 <Route path="/user-profile" component={ ViewUserProfile } />
//                 <Route path="/user-edit" component={ EditUserProfile } />
//             </Route>
//         );
//     } else {
//         return (
//             <Route path="/" component={App} >
//                 <IndexRoute component={Home} />
//                 <Route path="/pickup-dropoff" component={ PickUpPage } />
//                 <Route path="/dropoff" component={ DropOffIndex } />
//                 <Route path="/dropoff-form" component={ DropOffForm } />
//                 <Route path="/confirmation" component={ ConfirmRecycleRequest } />
//                 <Route path="/awesome" component={ AwesomePage } />
//                 <Route path="/dashboard" component={ LoggedInDashboard } />
//                 // <Route path="tracking" component={ TrackingPage } />
//                 <Route path="/tracking/:ConsumerServiceRequestID" component={ TrackingPage } />
//                 <Route path="/user-profile" component={ ViewUserProfile } />
//                 <Route path="/user-edit" component={ EditUserProfile } />
//             </Route>
//         );
//     }
//
// }


// export default (customRoutes);
const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
// if (SignUpData !== null) {
//     // import Home from './components/dashboard';
//     Home = LoggedInDashboard
// }
// <IndexRoute component={Home} />
// homePage(){
//
//     if (SignUpData !== null) {
//         return(
//             <IndexRoute component={LoggedInDashboard} />
//         );
//     } else {
//         <IndexRoute component={Home} />
//     }
//
// };
export default (
    <Route path="/" component={App} >
        {SignUpData !== null &&
            <IndexRoute component={LoggedInDashboard} />
        }
        {SignUpData == null &&
            <IndexRoute component={Home} />
        }
        <Route path="/pickup-dropoff" component={ PickUpPage } />
        <Route path="/dropoff" component={ DropOffIndex } />
        <Route path="/dropoff-form" component={ DropOffForm } />
        <Route path="/confirmation" component={ ConfirmRecycleRequest } />
        <Route path="/awesome" component={ AwesomePage } />
        <Route path="/dashboard" component={ LoggedInDashboard } />
        <Route path="/home" component={ Home } />
        // <Route path="tracking" component={ TrackingPage } />
        <Route path="/tracking/:ConsumerServiceRequestID" component={ TrackingPage } />
        <Route path="/user-profile" component={ ViewUserProfile } />
        <Route path="/user-edit" component={ EditUserProfile } />
        <Route path="/recycle-detail/:ConsumerServiceRequestID" component={ RecycleRequestDetail } />
        <Route path="/reschedule-pickup" component={ ReschedulePickup } />
        <Route path="/reschedule-dropoff" component={ RescheduleDropoff } />
        <Route path="/reschedule-confirmation/:ConsumerServiceRequestID" component={ RescheduleConfirmation } />
        <Route path="/find-imei" component={ FindImei } />
    </Route>
);
