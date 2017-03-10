import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import DateTimeField from 'react-datetime';
import { Link } from 'react-router';
// import { reduxForm } from 'redux-form';
import HeaderDiv from './common/header'
import LocationSearch from './location_search';
import OtpPage from './otp_page';
import { pickUpPageFormSubmit, fetchPickUpLocations, setActiveProductData, sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive  } from '../actions/index';

class PickUpPage extends React.Component {
    constructor(props) {
        super(props);
        // ServiceTypeID = 9 for PickUp
        // ServiceTypeID = 13 for Dropoff
        this.handleInputFieldsChange = this.handleInputFieldsChange.bind(this);
        this.handleOnSubmitPickUpForm = this.handleOnSubmitPickUpForm.bind(this);
        this.state = {
            ServiceTypeID : 9,
            userName : '',
            userMobileNo : '',
            date : '',
            dateNew:'',
            userEmail : '',
            userAlternateNo : '',
            userIMEINumber : '',
            userCompleteAddress : '',
            displayOtpModal : 0,
            firstDate: '',
            lastDate: '',
        }
    }

    componentWillMount(){
        // console.log(this.props.makePagesActive.pickUp.status);
        // const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        // console.log(SignUpData.data.ConsumerID);

        // if(this.props.makePagesActive.pickUp === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.pickUp.status === '0') {
        //     browserHistory.push('/');
        // }

        // $(React.ReactDOM.findDOMNode(this.refs.date)).datepicker();

        // browserHistory.push('/');
    }

    componentDidUpdate(){
        // if(this.props.getSlotsData.getSlot !== undefined){
        //     console.log(this.props.getSlotsData.getSlot.data.length);
        //     var firstDateObj = this.props.getSlotsData.getSlot.data[0];
        //     var lastDateObj = this.props.getSlotsData.getSlot.data[this.props.getSlotsData.getSlot.data.length - 1];
        //
        //     console.log(new Date(firstDateObj.date).toISOString().slice(0,10));
        //
        //     console.log(new Date(lastDateObj.date).toISOString().slice(0,10));
        //
        //     this.setState(
        //         {
        //             firstDate : new Date(firstDateObj.date).toISOString().slice(0,10),
        //             lastDateObj : new Date(lastDateObj.date).toISOString().slice(0,10)
        //         }
        //     )
        // }

    }

    supportedModesPickup(){
        return this.props.productData.SupportedModes.map((value) => {
            switch (value) {
                case 9: //pickup
                return (
                    <Link key={value} to={'/pickup-dropoff'} className="pickUplabel  PickUpHref active pickUpMenuActive">Pick Up</Link>
                );

                // case 13:
                // return (
                //     <p key={value}>dropoff</p>
                // );
                default:
            }

        });
    }

    supportedModesDropOff(){
        return this.props.productData.SupportedModes.map((value) => {
            switch (value) {
                // case 9:
                // return (
                //     <p key={value}>pickup</p>
                // );

                case 13://dropoff
                return (
                    <Link key={value} to={'/dropoff'} className="dropofflabel PickUpHref ">Drop Off Locations</Link>
                );
                default:
            }

        });
    }

    handleOnSubmitPickUpForm(event){
        event.preventDefault();
        // making confirmation page active
        const pageDataConfirmation = {
            pageName : 'confirmation',
            status : '1'
        }
        this.props.makePagesActive(pageDataConfirmation);
        //
        /**
        * if user is registered then
        1. schedule recycle request (if imeiNumber then also give to srr)
        2. add device (can be called after slots ignore what is written brackets)
        */

        /**
        * if user is new / TempConsumer
        1. otp
        2. signup
        3. updateProfile
        4. schedule recycle request ( if imeiNumber then give to srr)
        5. add device (can be called after slots ignore what is written brackets)
        */

        //
        /**
        * currently assuming that every user is new user
        1. store userData in SessionStorage
        2. user call otp service
        3. if status is successfull then open otp page hidden conditional rendering
        4.
        */
        const userDataRequest= {
            userName : this.state.userName,
            userMobileNo : this.state.userMobileNo,
            date : event.target.date.value,
            // dateNew : event.target.dateNew.value,
            userEmail : this.state.userEmail,
            userAlternateNo : this.state.userAlternateNo,
            userIMEINumber : this.state.userIMEINumber,
            userCompleteAddress : this.state.userCompleteAddress,
            ServiceTypeID : this.state.ServiceTypeID,
        }

        console.log(userDataRequest);
        this.props.sessionStorageUserData(userDataRequest);

        const getOTPRequestData = {
            TempConsumerID : 0,// we will have to change it in revisions
            MobileNo : this.state.userMobileNo,
        }

        this.getOTPRequest(getOTPRequestData, userDataRequest);

    }

    getOTPRequest(getOTPRequestData, userDataRequest){

        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
        if( SignUpData !== null){

            if(SignUpData.data.ConsumerID){
                // will have to remove this and push "/confirmation"
                // this.setState({
                //     displayOtpModal : 1,
                // })

                // call update user profile
                this.updateUserProfile();

            }
        } else {
            this.props.tempConsumerGetOTP(getOTPRequestData).then(()=>{
                this.props.sessionStorageUserData(userDataRequest);
                this.setState({
                    displayOtpModal : 1,
                })
            });

        }

    }

    updateUserProfile(){
        // in this case we have consumer id from localStorage
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
        const updateProfileData = {
            updateObj : {
                EmailID : this.state.userEmail,
                Name : this.state.userName,
                FirstRegisteredFrom : "Consumer-Web",
                AlternateMobileNo : this.state.userAlternateNo,
                Zipcode : this.props.geoLocationData.pincode,
                Lat : this.props.geoLocationData.latitude,
                Lng : this.props.geoLocationData.longitude,
                Landmark : this.props.storedUserData.LocationData.Landmark,
                Address : this.state.userCompleteAddress,
                AddressType :'Home'
            },
            isNew : SignUpData.data.isNew ? true : false,
            ConsumerID :SignUpData.data.ConsumerID
        }



        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData).then( () => {
            browserHistory.push('/confirmation');
        })

    }

    handleInputFieldsChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value,
                // userName: event.target.value
            }
        );
    }

    avaliableDates(){
        // this.props.getSlotsData.getSlot.data;

    }



    handleDateTimeSelect(date) {

        const currentDate = DateTimeField.moment();
        date = date < currentDate ? currentDate : date;
        this.setState({ dateNew:date });

    }

    render(){
        //
        //
        /**
        * General ES6 syntax notes
        * const handleSubmit = this.props.handleSubmit;
        * const { handleSubmit } = this.props;
        * const title = this.props.fields.title;
        */
        // const { fields:{ userName, MobileNo, email, alternateNumber, imeiNumber, pickUpDate, userAddress }, handleSubmit } = this.props;
        // const { fields:{ MobileNo,TempConsumerID }, handleSubmit } = this.props;
        // console.log(MobileNo);
        var firstDate = '';
        var lastDate = '';
        if(this.props.getSlotsData.getSlot !== undefined){
            // console.log(this.props.getSlotsData.getSlot.data.length);
            var firstDateObj = this.props.getSlotsData.getSlot.data[0];
            var lastDateObj = this.props.getSlotsData.getSlot.data[this.props.getSlotsData.getSlot.data.length - 1];

            // console.log(new Date(firstDateObj.date).toISOString().slice(0,10));
            //
            // console.log(new Date(lastDateObj.date).toISOString().slice(0,10));

            firstDate = new Date(firstDateObj.date).toISOString().slice(0,10);
            lastDate = new Date(lastDateObj.date).toISOString().slice(0,10);

        }

        const inputProps = {
            name: 'date',
            placeholder: 'DD/MM/YYYY',
            className: 'inputdetails'

        }
        var yesterday = DateTimeField.moment().subtract(1, 'day');
        var valid = function( current ){
            // console.log(current.isAfter( yesterday ));
            // return current.isAfter( yesterday );

            return current.isBetween( firstDate, lastDate, null, '[]' ) && current.day() !== 0;
        };

        return(
            <div>
                {this.state.displayOtpModal == 1 &&
                    <OtpPage ServiceTypeID={this.state.ServiceTypeID}/>
                }
                <HeaderDiv productData={this.props.productData}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID}/>

                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">

                        {/* <Link to={'/pickup-dropoff'} className="pickUplabel  PickUpHref active pickUpMenuActive">Pick Up</Link> */}
                        {this.supportedModesPickup()}
                        {/* <Link to={'/dropoff'} className="dropofflabel PickUpHref ">Drop Off Locations</Link> */}
                        {this.supportedModesDropOff()}
                    </div>
                </div>
                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form onSubmit={this.handleOnSubmitPickUpForm}>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label>
                                            <br />
                                            <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputFieldsChange} placeholder="Name" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label>
                                            <br />

                                            <input type="number" name="userMobileNo" value={this.state.userMobileNo} onChange={this.handleInputFieldsChange} placeholder="Mobile No" className="inputdetails" required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label>
                                            <br />
                                            <input type="email" name="userEmail" value={this.state.userEmail} onChange={this.handleInputFieldsChange} placeholder="Email" className="inputdetails" required />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Alternate Number</label>
                                            <br />
                                            <input type="text" name="userAlternateNo" value={this.state.userAlternateNo} onChange={this.handleInputFieldsChange} placeholder="Number" className="inputdetails" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">IMEI Number of Device For Recycle</label>
                                            <br />
                                            <input type="text" name="userIMEINumber" value={this.state.userIMEINumber} onChange={this.handleInputFieldsChange} className="inputdetails" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Pickup Date*</label>
                                            <br />
                                            {/* <input className="inputdetails" name="date"  value={this.state.date} onChange={this.handleInputFieldsChange} id="date" placeholder="DD/MM/YYYY" type="text" required /> */}

                                            <DateTimeField
                                                timeFormat={false}
                                                dateFormat="DD/MM/YYYY"
                                                inputProps={inputProps}
                                                isValidDate={ valid }
                                                closeOnSelect={ true }
                                            />

                                            <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar" /></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Complete Address*</label>
                                            <br />
                                            <input type="text" name="userCompleteAddress" value={this.state.userCompleteAddress} onChange={this.handleInputFieldsChange} placeholder="Flat, Building Name, Street, City" className="inputdetails" required />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContentbutton">
                                            <button type="button" className="btn mySmallbtn">Home</button>
                                            <button type="button" className="btn mySmallbtn">Office</button>
                                            <button type="button" className="btn mySmallbtn">Other</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="detailsContentlargeButton ">
                                            <button type="submit" className="pickUPlargebutton">Submit</button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/*<div id="menu1" className="tab-pane fade">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label>
                                            <br />
                                            <input type="text" name="userName" placeholder="Name" className="inputdetails" required />
                                        </div>

                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label>
                                            <br />
                                            <input type="number" name="MobileNo" placeholder="MobileNo" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label>
                                            <br />
                                            <input type="email" name="email" placeholder="Email" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Alternate Number</label>
                                            <br />
                                            <input type="number" name="alternateNumber" placeholder="Number" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">IMEI Number of Device For Recycle</label>
                                            <br />
                                            <input type="number" name="imeiNumber" className="inputdetails" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>*/}
                </div>
                {/*<!-- footer start here - -->*/}
                <div className="separators"></div>
            </div>
        );
    }
}

// export default PickUpPage;
function mapStateToProps(state) {
    return {
        supportedMobiles: state.supportedMobiles.supportedMobilesList,
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        makePagesActive: state.MakePagesActive,
        storedUserData : state.SessionStorage,
        getSlotsData: state.ConsumerServicerequest,
    };
}

// {
//     "Lat": "19.1122275845444",//GeoLocationData
//     "Lng": "72.8611849227308", //GeoLocationData
//     "Zipcode": 400099, //GeoLocationData
//     "ServiceTypeID" : 9, //9 Pickup
//     "ProductID" : 4 // Selected in first service
// }


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setActiveProductData, fetchPickUpLocations, sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive }, dispatch);
}
//
export default connect(mapStateToProps, mapDispatchToProps)(PickUpPage);

// function validate(values) {
//     const errors = {};
//     if (!values.MobileNo) {
//         errors.MobileNo = 'Enter a mobileNo';
//     }
//
//     if (!values.TempConsumerID) {
//         errors.TempConsumerID = 'TempConsumerID cannot be empty';
//     }
//     return errors;
// }

// export default connect(mapStateToProps)(PickUpPage);
// fields: [
//     'userName',
//     'MobileNo',
//     'email',
//     'alternateNumber',
//     'imeiNumber',
//     'pickUpDate',
//     'userAddress'
// ]
// export default reduxForm({
//     form: 'PickUpFrom',
//     fields: [
//         'MobileNo',
//         'TempConsumerID'
//     ],
//     validate
// }, null, { pickUpPageFormSubmit })(PickUpPage)
