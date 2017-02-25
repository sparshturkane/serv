import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { tempConsumerSignUp, consumerUpdateProfile } from '../actions/index';

class OtpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otpNumber : ''
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
            browserHistory.push('/confirmation');
        })


    }
    updateUserProfile(){
        // in this case we have consumer id from localStorage
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
        const updateProfileData = {
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



        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData);
        browserHistory.push('/confirmation');
    }

    render(){
        return(
            <div className="overlay"  id="overlay">
                <div className="otpHolder" >
                    <form onSubmit={this.handleOptFromSubmit}>
                        <img src="images/cross.png" id="close" className="cross" alt="cross"/>
                        <div className="otpLabel">
                            <label>OTP</label>
                            <label className="Verification">Verification</label>

                        </div>
                        <div className="otpinputHolder">
                            <div className="newOTPHide"> </div>
                            <input type="text" name="otpnumber" value={this.state.otpNumber} onChange={this.handelInputChange} className="otpinput" maxLength="4" pattern="\d{4}" required/>
                            <img src="images/otpUnderline.png" className="otpUnderline" alt="otpUnderline"/>
                        </div>

                        <div className="bottomContent">
                            <span className="recived Verification">Did not receive an OTP?</span>
                            <span className="getback">Get a call back</span>
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
    return bindActionCreators({ tempConsumerSignUp, consumerUpdateProfile }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(OtpPage);
