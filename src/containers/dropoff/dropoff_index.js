import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { getSlot, activeDropOffServiceLocation } from '../../actions/index';
import HeaderDiv from '../common/header'
import LocationSearch from '../location_search';
import navigation from '../../images/navigation.png';

class DropOffIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ServiceTypeID : 13, //dropoff ServiceTypeID
            DropOffServiceLocations : undefined,
            PartnerServiceLocationID : undefined,
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
        };
        // this.handleSetAppointment = this.handleSetAppointment.bind(this);
    }

    componentWillMount(){
        // if(this.props.makePagesActive.dropOff === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.dropOff.status === '0') {
        //     browserHistory.push('/');
        // }
    }

    handleSetAppointment(location){

        var PartnerServiceLocationID = location.PartnerServiceLocationID;
        //set active drop off location
        this.props.activeDropOffServiceLocation(location);
        console.log("set Appointment clicked !"+PartnerServiceLocationID);
        this.setState({
            PartnerServiceLocationID : PartnerServiceLocationID
        });
        const getSlotsRequest = {
            Lat : this.props.geoLocationData.latitude,//v
            Lng : this.props.geoLocationData.longitude,//v
            CurrentDate : new Date().toISOString().slice(0,10), //v
            ServiceTypeID : this.state.ServiceTypeID,
            CurrentTime : new Date().toLocaleTimeString(), //v
            PartnerServiceLocationID : PartnerServiceLocationID, //variable
        }
        this.props.getSlot(getSlotsRequest).then(()=>{
            browserHistory.push('/dropoff-form');
        });
    }

    mapDropOffLocations(){
        // this.setState({
        //     DropOffServiceLocations : this.props.DropOffServiceLocations,
        // });
        return this.props.DropOffServiceLocations.map((location) => {
            return (
                <div key={location.PartnerServiceLocationID} >
                    <div className="row" >
                        <div className="dropOFFHolderContent">
                            <div className="col-sm-8">
                                <div className="leftDropOFF">
                                    <div>
                                        <label className="MapleLabel">{location.ServiceLocationName}</label>
                                        <label className="kmLabel"><img src={navigation} />&nbsp;{Math.round( location.distance * 10 ) / 10 }Km</label>
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

                                        {/* <Link to={'/dropoff-form'} > */}
                                        <button className="SetAppointmentbtn" onClick={this.handleSetAppointment.bind(this, location)}>Set Appointment</button>
                                        {/* </Link> */}

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

    supportedModesPickup(){
        return this.props.productData.SupportedModes.map((value) => {
            switch (value) {
                case 9: //pickup
                return (
                    <Link key={value} to={'/pickup-dropoff'} className="pickUplabel PickUpHref">Pick Up</Link>
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
                    <Link key={value} to={'/dropoff'} className="dropofflabel PickUpHref active pickUpMenuActive">Drop Off Locations</Link>
                );
                default:
            }

        });
    }

    render(){

        return(
            <div>
                <HeaderDiv productData={this.props.productData}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID}/>
                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        {/* <Link to={'/pickup-dropoff'} className="pickUplabel PickUpHref">Pick Up</Link> */}
                        {this.supportedModesPickup()}

                        {/* <Link to={'/dropoff'} className="dropofflabel PickUpHref active pickUpMenuActive">Drop Off Locations</Link> */}
                        {this.supportedModesDropOff()}
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
    return bindActionCreators({ getSlot, activeDropOffServiceLocation }, dispatch);
}
//
export default connect(mapStateToProps, mapDispatchToProps)(DropOffIndex);
