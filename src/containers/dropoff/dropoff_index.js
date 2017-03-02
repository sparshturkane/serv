import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { pickUpPageFormSubmit, fetchPickUpLocations, setActiveProductData, sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile } from '../../actions/index';
import HeaderDiv from '../common/header'
import LocationSearch from '../location_search';

class DropOffIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ServiceTypeID : 13, //dropoff ServiceTypeID
            DropOffServiceLocations : undefined,
            // userName : '',
            // userMobileNo : '',
            // date : '',
            // dateNew:'',
            // userEmail : '',
            // userAlternateNo : '',
            // userIMEINumber : '',
            // userCompleteAddress : '',
            // displayOtpModal : 0,
            // firstDate: '',
            // lastDate: '',
        }
    }

    mapDropOffLocations(){
        // this.setState({
        //     DropOffServiceLocations : this.props.DropOffServiceLocations,
        // });
        return this.props.DropOffServiceLocations.map((location) => {
            return (
                <div>
                    <div className="row">
                        <div className="dropOFFHolderContent">
                            <div className="col-sm-8">
                                <div className="leftDropOFF">
                                    <div>
                                        <label className="MapleLabel">{location.ServiceLocationName}</label>
                                        <label className="kmLabel"><img src="images/navigation.png"/>&nbsp;{Math.round( location.distance * 10 ) / 10 }Km</label>
                                        <label className="TechnologyLabel">{location.NameOfFirm}</label>
                                        <p className="TechnologyLabelContent">
                                            {location.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="rightDropOFF">
                                    <div className="SetAppointmentbtnHolder">
                                        <a href="dropOffDetails.html"><button className="SetAppointmentbtn">Set Appointment</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>


            );
        });
    }

    render(){

        return(
            <div>
                <HeaderDiv productData={this.props.productData}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID}/>
                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        <Link to={'/pickup-dropoff'} className="pickUplabel PickUpHref">Pick Up</Link>
                        <Link to={'/dropoff'} className="dropofflabel PickUpHref active pickUpMenuActive">Drop Off Locations</Link>
                    </div>
                </div>

                <div className="dropOFFHolderContentMargin ">
                    {this.props.DropOffServiceLocations !== undefined &&
                        this.mapDropOffLocations()
                    }

                    {this.props.DropOffServiceLocations == undefined &&
                    <p> Please Select Location</p>
                    }
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

// export default DropOffIndex;
function mapStateToProps(state) {
    return {
        supportedMobiles: state.supportedMobiles.supportedMobilesList,
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        makePagesActive: state.MakePagesActive,
        storedUserData : state.SessionStorage,
        getSlotsData: state.ConsumerServicerequest,
        DropOffServiceLocations: state.PickUpDropOffServiceLocationData.DropOffServiceLocations
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
    return bindActionCreators({ setActiveProductData, fetchPickUpLocations, sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile }, dispatch);
}
//
export default connect(mapStateToProps, mapDispatchToProps)(DropOffIndex);
