import React from 'react';
import { connect } from 'react-redux';

class RecycleUserDetail extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div className="pickupInfoHolder">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="pickupInfoContent">
                            <label className="congo">Congratulations!</label><br />
                            <label className="recyle"> Recycle Request is Registered.</label>
                            <div className="deviceInfo">
                                <div className="col-sm-3">
                                    <label className="devicelabel">Device</label><br />
                                    <label className="deciceInfoLabel">{this.props.productData.ProductName}</label>
                                </div>
                                <div className="col-sm-6">
                                    <label className="devicelabel">Pickup Location</label><br />
                                    <label className="deciceInfoLabel">{this.props.userData.userCompleteAddress}</label>
                                </div>
                                <div className="col-sm-3">
                                    <label className="devicelabel">Pickup Date</label><br />
                                    <label className="deciceInfoLabel">{this.props.userData.date}</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData

    };
}




// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// }

export default connect(mapStateToProps, null)(RecycleUserDetail);
