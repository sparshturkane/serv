import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { tempConsumerSignUp, consumerUpdateProfile, tempConsumerGetOTP, showHideModal } from '../actions/index';

class OtpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otpNumber : '',
            displayOtpModal : 'block'
        };
        this.handelInputChange = this.handelInputChange.bind(this);
        this.handleOptFromSubmit = this.handleOptFromSubmit.bind(this);
    }
    /**
    *
    1. otp // done
    2. signup //
    3. updateProfile
    4. schedule recycle request ( if imeiNumber then give to srr)
    5. add device (can be called after slots ignore what is written brackets)
    */
    handelInputChange(event){
        this.setState({
            otpNumber : event.target.value
        })
    }

    handleOptFromSubmit(event){
        event.preventDefault();
        /**
        *
        1. once user presses submit
        2. call sigup service
        3. if 2== positive call updateProfile
        4. schedule recycle request
        */
        const signUpRequest = {
            TempConsumerID : 0,
            MobileNo: this.props.sessionStorageUserData.userMobileNo,
            Otp: this.state.otpNumber
        }
        // console.log(this.props.sessionStorage);
        this.props.tempConsumerSignUp(signUpRequest)
        .then(()=>{
            // here i will have to save the user data on localmachine
            // update user profile
            this.updateUserProfile();
            // browserHistory.push('/confirmation');
        })


    }

    componentWillMount(){
        // this.updateUserProfile();
        const script = document.createElement("script");
        var t = document.createTextNode("function close(){document.getElementById('overlay').style.display = 'none';}");
        script.appendChild(t);
        document.body.appendChild(script);


    }

    updateUserProfile(){
        // in this case we have consumer id from localStorage
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
        var updateProfileData = undefined;
        if ( this.props.ServiceTypeID == '9' ) {
            updateProfileData = {
                updateObj : {
                    EmailID : this.props.sessionStorageUserData.userEmail,
                    Name : this.props.sessionStorageUserData.userName,
                    FirstRegisteredFrom : "Consumer-Web",
                    AlternateMobileNo : this.props.sessionStorageUserData.userAlternateNo,
                    Zipcode : this.props.sessionStorageLocationData.pincode,
                    Lat : this.props.sessionStorageLocationData.latitude,
                    Lng : this.props.sessionStorageLocationData.longitude,
                    Landmark : this.props.sessionStorageLocationData.Landmark,
                    Address : this.props.sessionStorageUserData.userCompleteAddress,
                    AddressType :'Home'
                },
                isNew : SignUpData.data.isNew ? true : false,
                ConsumerID :SignUpData.data.ConsumerID
            }
        } else if( this.props.ServiceTypeID == '13' ) {
            updateProfileData = {
                updateObj : {
                    EmailID : this.state.userEmail,
                    Name : this.state.userName,
                    FirstRegisteredFrom : "Consumer-Web",
                    Zipcode : this.props.geoLocationData.pincode,
                    Lat : this.props.geoLocationData.latitude,
                    Lng : this.props.geoLocationData.longitude,
                    Landmark : this.props.sessionStorageLocationData.Landmark,
                },
                isNew : SignUpData.data.isNew ? true : false,
                ConsumerID :SignUpData.data.ConsumerID
            }
        }




        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData).then(()=>{
            browserHistory.push('/confirmation');
        })

    }

    onCloseModal(){
        // this.setState({
        //     displayOtpModal : "none"
        // })
        console.log("close modal");
        this.props.showHideModal('0');
    }

    onGetCall(){
        // console.log("get call");
        // {"TempConsumerID":0,"MobileNo":"8097804715", "voiceOtp" : true}
        const getOTPRequestData = {
            TempConsumerID : 0,// we will have to change it in revisions
            MobileNo : this.props.sessionStorageUserData.userMobileNo,
            voiceOtp : true
        }

        // this.getOTPRequest(getOTPRequestData, userDataRequest);
        // otp via call
        this.props.tempConsumerGetOTP(getOTPRequestData)
    }

    render(){
        var display = {
            display: this.state.displayOtpModal,
        };

        var imageStyle = {
            cursor: "pointer",
        };

        return(
            <div className="overlay"  id="overlay" style={display}>
                <div className="otpHolder" >
                    <form onSubmit={this.handleOptFromSubmit}>
                        <img src="images/cross.png" id="close" className="cross" alt="cross" onClick={this.onCloseModal.bind(this)} />
                        <div className="otpLabel">
                            <label>OTP</label>
                            <label className="Verification">Verification</label>

                        </div>
                        <div className="otpinputHolder">
                            <div className="newOTPHide"> </div>
                            <input type="text" name="otpnumber" value={this.state.otpNumber} onChange={this.handelInputChange} className="otpinput" maxLength="4" pattern="\d{4}"/>
                            <img src="images/otpUnderline.png" className="otpUnderline" alt="otpUnderline"/>
                        </div>

                        <div className="bottomContent">
                            <span className="recived Verification">Did not receive an OTP?</span>
                            <span className="getback" style={imageStyle} onClick={this.onGetCall.bind(this)} >Get a call back</span>
                        </div>

                        <button type="submit" className="largebutton">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

// export default OtpPage;
function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        pickUpSerivceLocations: state.PickUpDropOffServiceLocationData.PickUpServiceLocations,
        sessionStorageUserData: state.SessionStorage.UserData,
        sessionStorageLocationData: state.SessionStorage.LocationData,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ tempConsumerSignUp, consumerUpdateProfile, tempConsumerGetOTP, showHideModal }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(OtpPage);
