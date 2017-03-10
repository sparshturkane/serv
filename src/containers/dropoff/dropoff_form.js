import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive } from '../../actions/index';
import HeaderDiv from '../common/header'
import LocationSearch from '../location_search';
import OtpPage from '../otp_page';

class DropOffForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ServiceTypeID : 13, //dropoff ServiceTypeID
            userName : '',
            userMobileNo : '',
            date : '',
            userEmail : '',
            displayOtpModal : 0,
            firstDate: '',
            lastDate: '',
        };
        this.handleInputFieldsChange = this.handleInputFieldsChange.bind(this);
        this.handleOnSubmitPickUpForm = this.handleOnSubmitPickUpForm.bind(this);
    }

    componentWillMount(){
        // if(this.props.makePagesActive.dropOff === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.dropOff.status === '0') {
        //     browserHistory.push('/');
        // }

        const script = document.createElement("script");
        var t = document.createTextNode("$(document).ready(function() { var date_input=$('input[name="+"date"+"]');"+
        "var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : 'body';"+
        "date_input.datepicker({"+
        "format: 'dd/mm/yyyy',"+
        "container: container,"+
        "todayHighlight: true,"+
        "autoclose: true,"+
        // "datesDisabled: ['23/02/2017','24/02/2017'],"+
        "}); })");
        script.appendChild(t);
        document.body.appendChild(script);

    }

    handleInputFieldsChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value,
                // userName: event.target.value
            }
        );
    }

    handleOnSubmitPickUpForm(event){
        event.preventDefault();
        // making confirmation page active
        const pageDataConfirmation = {
            pageName : 'confirmation',
            status : '1'
        }
        this.props.makePagesActive(pageDataConfirmation);

        const userDataRequest= {
            userName : this.state.userName,
            userMobileNo : this.state.userMobileNo,
            date : event.target.date.value,
            // dateNew : event.target.dateNew.value,
            userEmail : this.state.userEmail,
            ServiceTypeID : this.state.ServiceTypeID,
        }

        console.log("userDataRequest");
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
                Zipcode : this.props.geoLocationData.pincode,
                Lat : this.props.geoLocationData.latitude,
                Lng : this.props.geoLocationData.longitude,
                Landmark : this.props.storedUserData.LocationData.Landmark,
            },
            isNew : SignUpData.data.isNew ? true : false,
            ConsumerID :SignUpData.data.ConsumerID
        }



        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData).then( () => {
            browserHistory.push('/confirmation');
        })

    }

    render(){
        return(
            <div>
                {this.state.displayOtpModal == 1 &&
                    <OtpPage ServiceTypeID={this.state.ServiceTypeID}/>
                }
                <HeaderDiv productData={this.props.productData}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID}/>
                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        <Link to={'/pickup-dropoff'} className="pickUplabel PickUpHref">Pick Up</Link>
                        <Link to={'/dropoff'} className="dropofflabel PickUpHref active pickUpMenuActive">Drop Off Locations</Link>
                    </div>
                </div>

                <div className="detailsHolder ">
                    <div className="row">
                        <form onSubmit={this.handleOnSubmitPickUpForm}>
                            <div className="col-sm-4">
                                <div className="detailsContent">
                                    <label className="labelDetails">Name*</label><br />
                                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputFieldsChange} placeholder="Name" className="inputdetails" required/>
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="detailsContent">
                                    <label className="labelDetails">Mobile Number*</label><br />
                                    <input type="number" name="userMobileNo" value={this.state.userMobileNo} onChange={this.handleInputFieldsChange} placeholder="Mobile Number" className="inputdetails" required/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="detailsContent">
                                    <label className="labelDetails">Email*</label><br />
                                    <input type="email" name="userEmail" value={this.state.userEmail} onChange={this.handleInputFieldsChange} placeholder="Email" className="inputdetails" required />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="detailsContent" >
                                    <label className="labelDetails">Choose Date*</label><br />
                                    <input className="inputdetails" name="date" id="date" placeholder="DD/MM/YYYY" type="text" required />
                                    <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar" /></span>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="detailsContent">
                                    <label className="labelDetails">Choose Time Slot</label><br />
                                    <div className="dropoffBTNHolder">
                                        <button type="button" className="dropOffBTN">10am - 12 pm</button>
                                        <button type="button" className="dropOffBTN">12pm - 2pm</button>
                                        <button type="button" className="activeBtnTime dropOffBTN">2pm - 4pm</button>
                                    </div>
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

                <div className="separators"></div>

            </div>
        );
    }
}

// export default DropOffForm;
function mapStateToProps(state) {
    return {
        // supportedMobiles: state.supportedMobiles.supportedMobilesList,
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        makePagesActive: state.MakePagesActive,
        storedUserData : state.SessionStorage,
        // getSlotsData: state.ConsumerServicerequest,
        // DropOffServiceLocations: state.PickUpDropOffServiceLocationData.DropOffServiceLocations
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropOffForm);
