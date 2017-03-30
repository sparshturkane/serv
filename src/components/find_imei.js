import React from 'react';
import HeaderDiv from '../containers/common/header';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import imei from '../images/imei.png';
import imei2 from '../images/imei2.png';

class FindImei extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <HeaderDiv ProductName={this.props.activePhoneName}/>
                <div className="separators"></div>

                <div className="pickupInfoHolder">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="pickupInfoContent">
                                <label className="congo">Where to </label><br/>
                                <label className="recyle">find IMEI Number ?</label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="CancelHolder">

                                <span className="CancelHolder1">
                                    <Link to={'/pickup-dropoff'} >
                                        <span className="escalteIMG">
                                            <img src="images/cancel.png" className="cancelIMG"/>

                                        </span>

                                        <label className="cancelText">
                                            Close
                                        </label>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="hrmargin"/>
                <div className="imeiHolder">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mobileHolder">
                                <label className="imeiContent">Go to <strong>Settings > General > About</strong> and look for your device's serial number, IMEI/MEID, and ICCID. If you'd like to paste this information tap and hold on the number and copy it.</label>
                                <div>
                                    <img src={imei}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mobileHolder">
                                <label className="imeiContent">Or you can find the serial number and IMEI/MEID on the SIM tray
                                </label>
                                <div>
                                    <img src={imei2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

// export default FindImei;
function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData,
        makePagesActive: state.MakePagesActive,
        activePhoneName : state.SessionStorage.activePhoneName,

    };
}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// }

export default connect(mapStateToProps, null)(FindImei);
