import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tempConsumerSignUp } from '../actions/index';

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
            MobileNo: this.props.sessionStorage.userMobileNo,
            Otp: this.state.otpNumber
        }
        // console.log(this.props.sessionStorage);
        this.props.tempConsumerSignUp(signUpRequest)


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
        sessionStorage: state.SessionStorage.UserData,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ tempConsumerSignUp }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(OtpPage);
