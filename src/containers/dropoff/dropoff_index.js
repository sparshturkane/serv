import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import GoogleMapReact from 'google-map-react';
import { getSlot, activeDropOffServiceLocation } from '../../actions/index';
import HeaderDiv from '../common/header'
import LocationSearch from '../location_search';
import navigation from '../../images/navigation.png';
import gMapReg from '../../images/gMapReg.png';
import gMapBlue from '../../images/gMapBlue.png';
import moment from 'moment';

const AnyReactComponent = ({ text }) => <div style={{
    position: 'relative', color: 'white', backgroundImage: "url("+gMapReg+")",
    height: 81, width: 121, top: -50, left: -21,backgroundRepeat: "no-repeat",
}}><div style={{position: 'absolute',backgroundColor: 'white', color:'black', left: 41, top: 8, textAlign: 'center', fontSize: 13, padding: 5}}> <label>{text}</label></div></div>;

const BlueMapMarker = ({ text }) => <div style={{position: text.position,
    color: text.color,
    backgroundRepeat: text.backgroundRepeat,
    backgroundImage: text.backgroundImage,
    height: text.height,
    width: text.width,
    top: text.top,
    left: text.left,
    backgroundSize: text.backgroundSize
}}></div>;

class DropOffIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ServiceTypeID : 13, //dropoff ServiceTypeID
            DropOffServiceLocations : undefined,
            PartnerServiceLocationID : undefined,
            center: {lat: this.props.geoLocationData.latitude, lng: this.props.geoLocationData.longitude},
            zoom: 11,
            size: { width:"1000px" , height:"1000px" },
            position : 'relative',
            color: 'white',
            backgroundRepeat: 'no-repeat',
            backgroundImage: "url("+gMapBlue+")",
            height: 81,
            width: 121,
            top: -31,
            left: -15,
            backgroundSize: "30px 35px",
            allBackGroundSize: [],
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

        // const script = document.createElement("script");
        // var t = document.createTextNode("$( '.seeMore' ).click(function() {"+
        //     "$(this).next('.days').slideToggle( 'slow', function() {"+
        //     "});"+
        // "});");
        // script.appendChild(t);
        // document.body.appendChild(script);

        // $( ".seeMore" ).click(function() {
        //     $(this).next(".days").slideToggle( "slow", function() {
        //
        //     });
        // });

        var backGroundArray = [];
        this.props.DropOffServiceLocations.map((location) => {
            var back = "back"+location.PartnerServiceLocationID;

            var backObj = {
                [back] : "30px 35px",
                ["top"+location.PartnerServiceLocationID]: -31,
                ["left"+location.PartnerServiceLocationID]: -15,
            }
            backGroundArray.push(backObj)
        });
        this.setState({
            allBackGroundSize : backGroundArray,
        })
    }

    componentDidMount(){
        const script = document.createElement("script");
        var t = document.createTextNode("$( '.seeMore' ).click(function() {"+
            "$(this).next('.days').slideToggle( 'slow', function() {"+
            "});"+
        "});");
        script.appendChild(t);
        document.body.appendChild(script);

        // $( ".seeMore" ).click(function() {
        //     $(this).next(".days").slideToggle( "slow", function() {
        //         // Animation complete.
        //     });
        // });
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

    handleMouseEnter(PartnerServiceLocationID){
        var backGroundArray = [];
        this.props.DropOffServiceLocations.map((location) => {
            var back = "back"+location.PartnerServiceLocationID;

            if(PartnerServiceLocationID !== location.PartnerServiceLocationID){
                var backObj = {
                    [back] : "30px 35px",
                    ["top"+location.PartnerServiceLocationID]: -31,
                    ["left"+location.PartnerServiceLocationID]: -15,
                }
            }else{
                // 40px 45px
                var backObj = {
                    [back] : "40px 45px",
                    ["top"+location.PartnerServiceLocationID]: -43,
                    ["left"+location.PartnerServiceLocationID]: -20,
                }
            }

            backGroundArray.push(backObj)
        });
        this.setState({
            allBackGroundSize : backGroundArray,
        })

        console.log('mouse-enter');
        // this.setState({
        //     backgroundSize: "35px 40px",
        // })
    }


    handleTouchStart(PartnerServiceLocationID){
        var backGroundArray = [];
        this.props.DropOffServiceLocations.map((location) => {
            var back = "back"+location.PartnerServiceLocationID;

            if(PartnerServiceLocationID !== location.PartnerServiceLocationID){
                var backObj = {
                    [back] : "30px 35px",
                    ["top"+location.PartnerServiceLocationID]: -31,
                    ["left"+location.PartnerServiceLocationID]: -15,
                }
            }else{
                // 40px 45px
                var backObj = {
                    [back] : "40px 45px",
                    ["top"+location.PartnerServiceLocationID]: -43,
                    ["left"+location.PartnerServiceLocationID]: -20,
                }
            }

            backGroundArray.push(backObj)
        });
        this.setState({
            allBackGroundSize : backGroundArray,
        })

        console.log('mouse-enter');
        // this.setState({
        //     backgroundSize: "35px 40px",
        // })
    }

    handleMouseLeave(PartnerServiceLocationID){
        // console.log('mouse-leave');
        // this.setState({
        //     backgroundSize: "30px 35px",
        // })

        var backGroundArray = [];
        this.props.DropOffServiceLocations.map((location) => {
            var back = "back"+location.PartnerServiceLocationID;

            var backObj = {
                [back] : "30px 35px",
                ["top"+location.PartnerServiceLocationID]: -31,
                ["left"+location.PartnerServiceLocationID]: -15,
            }
            backGroundArray.push(backObj)
        });
        this.setState({
            allBackGroundSize : backGroundArray,
        })
    }

    handleTouchEnd(PartnerServiceLocationID){
        // console.log('mouse-leave');
        // this.setState({
        //     backgroundSize: "30px 35px",
        // })

        var backGroundArray = [];
        this.props.DropOffServiceLocations.map((location) => {
            var back = "back"+location.PartnerServiceLocationID;

            var backObj = {
                [back] : "30px 35px",
                ["top"+location.PartnerServiceLocationID]: -31,
                ["left"+location.PartnerServiceLocationID]: -15,
            }
            backGroundArray.push(backObj)
        });
        this.setState({
            allBackGroundSize : backGroundArray,
        })
    }

    mapDropOffLocationsOldHome(){
        // this.setState({
        //     DropOffServiceLocations : this.props.DropOffServiceLocations,
        // });
        return this.props.DropOffServiceLocations.map((location) => {
            return (
                <div className="dropOFFHolderContent" key={location.PartnerServiceLocationID} >
                    <div className="row">
                        <div className="col-sm-12">
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
                    </div>
                </div>
            );
        });
    }

    timeConvert (time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
    };

    mapDropOffLocations(){
        // this.setState({
        //     DropOffServiceLocations : this.props.DropOffServiceLocations,
        // });
        return this.props.DropOffServiceLocations.map((location) => {
            var WorkingFrom = location.WorkingFrom;
            var formatedWorkingFrom = moment(WorkingFrom.toString(), 'HH:MM:ss').format('h:mm a');
            var daysArray = location.WorkingDays.split(',');
            var daysJsxStart1 = [];
            var daysJsxStart2 = [];
            var daysJsxLong = [];
            var dayCounter = 0;
            daysArray.map((day) => {
                if(dayCounter < 1){
                    daysJsxStart1.push(
                        <span key={99} className="daysStyle"> {day} | {this.timeConvert(location.WorkingFrom)} </span>
                    );
                    daysJsxStart2.push(
                        <span key={96} className="daysStyle">{this.timeConvert(location.WorkingTo)}</span>
                    );
                }else{
                    daysJsxLong.push(
                        <div key={day}><span className="daysStyle"> {day} | {this.timeConvert(location.WorkingFrom)} </span> to <span className="daysStyle">{this.timeConvert(location.WorkingTo)}</span></div>
                    );
                }

                dayCounter = dayCounter + 1;
            });
            return (
                <div className="dropOFFHolderContent"
                    onMouseEnter={this.handleMouseEnter.bind(this,location.PartnerServiceLocationID)}
                    onTouchStart={this.handleTouchStart.bind(this,location.PartnerServiceLocationID)}

                    onMouseLeave={this.handleMouseLeave.bind(this,location.PartnerServiceLocationID)}
                    onTouchEnd={this.handleTouchEnd.bind(this,location.PartnerServiceLocationID)}
                    key={location.PartnerServiceLocationID}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="leftDropOFF">
                                <div>
                                    <span onClick={this.handleSetAppointment.bind(this,location)} style={{cursor: 'pointer'}}>
                                        <label className="MapleLabel" style={{cursor: 'pointer'}}>{location.ServiceLocationName}</label>
                                        <label className="kmLabel"><img src={navigation} />&nbsp;{Math.round( location.distance * 10 ) / 10 }Km</label>
                                        <label className="TechnologyLabel" style={{cursor: 'pointer'}}>{location.NameOfFirm}</label>
                                        <p className="TechnologyLabelContent">
                                            {location.address}
                                        </p>
                                    </span>
                                    <div className="openingStyleHolder">
                                        <label className="openingLabel">Opening Days & Hours:</label>{daysJsxStart1} to {daysJsxStart2}<span className="seeMore">See More</span>
                                        <div className="days" style={{display:'none'}} >
                                            {daysJsxLong}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
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

    markerOnMap(){
        // location.PartnerServiceLocationID
        var counter = -1;
        return this.props.DropOffServiceLocations.map((location) => {
            counter++;
            var back = "back"+location.PartnerServiceLocationID;
            var blueMapStyle = {
                position : this.state.position,
                color: this.state.color,
                backgroundRepeat: this.state.backgroundRepeat,
                backgroundImage: this.state.backgroundImage,
                height: this.state.height,
                width: this.state.width,
                top: this.state.allBackGroundSize[counter]["top"+location.PartnerServiceLocationID],
                left: this.state.allBackGroundSize[counter]["left"+location.PartnerServiceLocationID],
                backgroundSize: this.state.allBackGroundSize[counter][back],
            }
            // console.log(location.Lat);
            // console.log(location.Lng);
            // console.log(this.state.allBackGroundSize[counter][back]);
            return (
                <BlueMapMarker
                    lat={location.Lat}
                    lng={location.Lng}
                    text={blueMapStyle}
                    key={location.Lat}/>
            );
        });
    }

    render(){
        return(
            <div>
                <HeaderDiv productData={this.props.productData} ProductName={this.props.productData.ProductName}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID} setLandmark={''}/>
                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        {/* <Link to={'/pickup-dropoff'} className="pickUplabel PickUpHref">Pick Up</Link> */}
                        {this.supportedModesPickup()}

                        {/* <Link to={'/dropoff'} className="dropofflabel PickUpHref active pickUpMenuActive">Drop Off Locations</Link> */}
                        {this.supportedModesDropOff()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-push-6">
                        <div className="mapHolder" style={{width: '94%', height: '600px'}}>
                            {/* this.props.storedUserData.displayOtpModal == 1 && */}
                            {this.props.geoLocationData.latitude != undefined &&

                                <GoogleMapReact
                                    defaultCenter={{lat: this.props.geoLocationData.latitude, lng: this.props.geoLocationData.longitude}}
                                    defaultZoom={this.state.zoom}
                                    defaultSize={this.state.size}
                                    >
                                    <AnyReactComponent
                                        lat={this.props.geoLocationData.latitude}
                                        lng={this.props.geoLocationData.longitude}
                                        text={'YOU'}
                                        />
                                        {this.props.DropOffServiceLocations !== undefined &&
                                            this.markerOnMap()

                                        }

                                </GoogleMapReact>
                            }
                        </div>
                    </div>

                    <div className="col-sm-6 col-sm-pull-6">
                        <div className="dropOFFHolderContentMargin ">
                            {this.props.DropOffServiceLocations !== undefined &&
                                this.mapDropOffLocations()

                            }
                            <br/>
                            {this.props.DropOffServiceLocations == undefined &&
                            <p> Please Select Location</p>
                            }
                        </div>
                    </div>
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
