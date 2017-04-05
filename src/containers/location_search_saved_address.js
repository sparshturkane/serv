import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PlacesAutocomplete from 'react-places-autocomplete'
import { fetchGeoLocation,fetchGeoLocationPrediction, fetchPickUpLocations, getSlot, sessionStorageLocationData, fetchDropOffLocations, getBrowserLocation, getAddressFromLatLng, fetchGeoLocationPlaceID } from '../actions/index';

class LocationSearchSavedAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Landmark:'',
            LandmarkError: '',
            address: '',
            PickUpAvaliable: 0,
            DropOffAvaliable: 0,

        }
        this.handleLocationFormSubmit = this.handleLocationFormSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onChange = (address) => this.setState({ Landmark : address, LandmarkError: '' })
    }

    componentDidMount(){
        this.setState({
            Landmark : this.props.setLandmark,
        });
    }

    componentWillMount(){
        this.props.productData.SupportedModes.map((modes) => {
            // console.log(modes);
            if (modes === 9) {
                this.setState({
                    PickUpAvaliable : 1,
                })
            }

            if (modes === 13) {
                this.setState({
                    DropOffAvaliable : 1,
                })
            }
        })
    }

    handleLocationFormSubmit(event){
        event.preventDefault();
        this.setState({
            Landmark : event.target.landmark.value
        })
        this.callingLocationActions();
    }

    handleOnBlur(event){
        this.setState({
            Landmark : event.target.value
        })
        // this.props.fetchGeoLocationPrediction(this.state.Landmark);
        this.callingLocationActions();
    }

    handleSelect(address) {
        this.setState({
            Landmark : address,
        })
        this.callingLocationActions();
    }



    callingLocationActions(){
        this.props.fetchGeoLocation(this.state.Landmark).then( () => {


            if(this.props.geoLocationData.pincode === '' && this.props.browserLocationData.Pincode ===''){
                this.setState({
                    LandmarkError: 'Please Enter Valid Landmark'
                })
            }

            if(this.state.PickUpAvaliable === 1){
                // calling fetchPickUpLocations action serviceAvailability
                var Zipcode = ''
                if(this.props.geoLocationData.pincode !== ''){
                    Zipcode = this.props.geoLocationData.pincode;
                }else{
                    Zipcode = this.props.browserLocationData.Pincode;
                }
                console.log(Zipcode);
                const pickUpLocationRequest = {
                    Lat: this.props.geoLocationData.latitude,
                    Lng: this.props.geoLocationData.longitude,
                    Zipcode: Zipcode,
                    ServiceTypeID: 9,
                    ProductID: this.props.productData.ProductID,
                };
                this.props.fetchPickUpLocations(pickUpLocationRequest).then( () =>{
                    // this.props.fetchPickUpLocations
                    const getSlotsRequest = {
                        Lat : this.props.geoLocationData.latitude,//v
                        Lng : this.props.geoLocationData.longitude,//v
                        CurrentDate : new Date().toISOString().slice(0,10), //v
                        ServiceTypeID : 9,//varia
                        CurrentTime : new Date().toLocaleTimeString(), //v
                        PartnerServiceLocationID : this.props.pickUpSerivceLocations.PartnerServiceLocationID, //variable
                        DeliveryMode : this.props.pickUpSerivceLocations.DeliveryMode, //only at the time of pickup
                    };
                    this.props.getSlot(getSlotsRequest);
                    this.props.sessionStorageLocationData(
                        {
                            Landmark: this.state.Landmark,
                            latitude: this.props.geoLocationData.latitude,
                            longitude : this.props.geoLocationData.longitude
                        }
                    );
                })
            }

            if(this.state.DropOffAvaliable === 1){// if ends here this space is for pickup
                const dropOffLocationRequest = 	{
                    Authorised:0, //s
                    BrandID:this.props.productData.BrandID,
                    IsExclusive:0, //s
                    Lat: this.props.geoLocationData.latitude,
                    Lng: this.props.geoLocationData.longitude,
                    OrderBy:0, //s
                    Page:1, //s
                    Partnered:1, //s
                    ProductID:this.props.productData.ProductID,
                    ProductSubCategoryID:this.props.productData.ProductSubCategoryID,
                    Radius:80 //s
                }

                this.props.fetchDropOffLocations(dropOffLocationRequest)
                this.props.sessionStorageLocationData(
                    {
                        Landmark: this.state.Landmark,
                        latitude: this.props.geoLocationData.latitude,
                        longitude : this.props.geoLocationData.longitude
                    }
                );
            }
            browserHistory.push('/pickup-dropoff');
        } )

        .catch(error => {
            // console.log(error);
            // alert(error);
            this.setState({
                LandmarkError: 'Please Enter Valid Landmark'
            })
        });
    }

    callingLocationActionsViaBrowserButton(){
        console.log(" calling location actions via browser");
        this.props.fetchGeoLocationPlaceID(this.props.browserLocationData.placeID).then( () => {


            if(this.props.geoLocationData.pincode === '' && this.props.browserLocationData.Pincode ===''){
                this.setState({
                    LandmarkError: 'Please Enter Valid Landmark'
                })
            }

            if(this.state.PickUpAvaliable === 1){
                // calling fetchPickUpLocations action serviceAvailability
                var Zipcode = ''
                if(this.props.geoLocationData.pincode !== ''){
                    Zipcode = this.props.geoLocationData.pincode;
                }else{
                    Zipcode = this.props.browserLocationData.Pincode;
                }
                console.log(Zipcode);
                const pickUpLocationRequest = {
                    Lat: this.props.geoLocationData.latitude,
                    Lng: this.props.geoLocationData.longitude,
                    Zipcode: Zipcode,
                    ServiceTypeID: 9,
                    ProductID: this.props.productData.ProductID,
                };
                this.props.fetchPickUpLocations(pickUpLocationRequest).then( () =>{
                    // this.props.fetchPickUpLocations
                    const getSlotsRequest = {
                        Lat : this.props.geoLocationData.latitude,//v
                        Lng : this.props.geoLocationData.longitude,//v
                        CurrentDate : new Date().toISOString().slice(0,10), //v
                        ServiceTypeID : 9,//varia
                        CurrentTime : new Date().toLocaleTimeString(), //v
                        PartnerServiceLocationID : this.props.pickUpSerivceLocations.PartnerServiceLocationID, //variable
                        DeliveryMode : this.props.pickUpSerivceLocations.DeliveryMode, //only at the time of pickup
                    };
                    this.props.getSlot(getSlotsRequest);
                    this.props.sessionStorageLocationData(
                        {
                            Landmark: this.state.Landmark,
                            latitude: this.props.geoLocationData.latitude,
                            longitude : this.props.geoLocationData.longitude
                        }
                    );

                    // drop off avaliable
                    if(this.state.DropOffAvaliable === 1){ // if ends here
                        const dropOffLocationRequest = 	{
                            Authorised:0, //s
                            BrandID:this.props.productData.BrandID,
                            IsExclusive:0, //s
                            Lat: this.props.geoLocationData.latitude,
                            Lng: this.props.geoLocationData.longitude,
                            OrderBy:0, //s
                            Page:1, //s
                            Partnered:1, //s
                            ProductID:this.props.productData.ProductID,
                            ProductSubCategoryID:this.props.productData.ProductSubCategoryID,
                            Radius:80 //s
                        }

                        this.props.fetchDropOffLocations(dropOffLocationRequest)
                        this.props.sessionStorageLocationData(
                            {
                                Landmark: this.state.Landmark,
                                latitude: this.props.geoLocationData.latitude,
                                longitude : this.props.geoLocationData.longitude
                            }
                        );
                    }
                })
            }



            browserHistory.push('/pickup-dropoff');
        } )

        .catch(error => {
            // console.log(error);
            // alert(error);
            this.setState({
                LandmarkError: 'Please Enter Valid Landmark'
            })
        });
    }

    handleOnChange(event){
        console.log("onChange");
        this.setState({
            Landmark : event.target.value,
            LandmarkError : ''
        })

        // --------suggested location try here
        // this.props.fetchGeoLocationPrediction(this.state.Landmark)
        // .catch(error => {
        //     console.log(error);
        //     // alert(error);
        //     // this.setState({
        //     //     LandmarkError: 'Please Enter Valid Landmark'
        //     // })
        // });

            // value={this.state.Landmark}
            // onChange={this.handleOnChange.bind(this)}
            // onInput={this.handleOnInput.bind(this)}

            // <input
            //     type="text"
            //     name="landmark"
            //     onBlur={this.handleOnBlur.bind(this)}
            //     value={this.state.Landmark}
            //     onChange={this.handleOnChange.bind(this)}
            //     onInput={this.handleOnInput.bind(this)}
            //
            //     placeholder="Andheri West"
            //     className="inputLocation"
            //     id="autocomplete"
            // />

    }

    handleOnInput(event){
        console.log("onInput");
        this.setState({
            Landmark : event.target.value,
            LandmarkError : ''
        })
    }

    browserLocationCode(){
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
                this.afterBrowserLocation();
            })
        }
        // this.afterBrowserLocation();
    }

    afterBrowserLocation(){
        if(this.state.currentLocation !== undefined){
            this.props.getAddressFromLatLng(this.state.currentLocation.lat, this.state.currentLocation.lng).then(()=>{
                this.setState({
                    Landmark : this.props.browserLocationData.Landmark,
                });
                this.callingLocationActions();
            })
        }
    }

    browserLocation(){
        console.log("browserLocation hit");
        // if (navigator && navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((pos) => {
        //         const coords = pos.coords;
        //         this.setState({
        //             currentLocation: {
        //                 lat: coords.latitude,
        //                 lng: coords.longitude
        //             }
        //         })
        //     })
        // }

        // this.props.getBrowserLocation().then(()=>{



        // staring works
        // if(this.state.currentLocation !== undefined){
        //     this.props.getAddressFromLatLng(this.state.currentLocation.lat, this.state.currentLocation.lng).then(()=>{
        //         this.setState({
        //             Landmark : this.props.browserLocationData.Landmark,
        //         });
        //         this.callingLocationActions();
        //     })
        // }



        // });
        //this will work with https
        // this.browserLocationCode();
        // if(this.state.Landmark === ''){
            // first this will run then other will run
            console.log("---no https---");
            this.props.getBrowserLocation().then(()=>{
                this.props.getAddressFromLatLng(this.props.browserLocationData.latitude, this.props.browserLocationData.longitude).then(()=>{
                    this.setState({
                        Landmark : this.props.browserLocationData.Landmark,
                    });
                    this.callingLocationActionsViaBrowserButton();
                })
            });
        // }


        // not woring in http will work with https
        // getLocation();
        // function getLocation() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(showPosition);
        //     } else {
        //         // x.innerHTML = "Geolocation is not supported by this browser.";
        //         console.log("Geolocation is not supported by this browser.");
        //     }
        // };
        //
        // function showPosition(position) {
        //     // x.innerHTML = "Latitude: " + position.coords.latitude +
        //     // "<br>Longitude: " + position.coords.longitude;
        //     console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
        // };
    }

    render(){
        const LandmarkError = this.state.LandmarkError;
        var LandmarkStyle = {
            color: 'red',
        };

        var imageStyle = {
            cursor: "pointer",
        };

        const cssClasses = {
            root: 'form-group',
            input: 'inputLocation',
            autocompleteContainer: 'my-autocomplete-container'
        };

        const myStyles = {
            fontFamily: 'Gotham-Book',
            fontSize: '14px',
            boxSizing: 'border-box',
            padding: '10px 40px 10px 30px',
            width: '100%',
            borderRadius: '5px',
            border: 'none',
        }



        return(
            <div className="locationHolder">
                <div className="locationContent ">
                    <div className="row">
                        <form onSubmit={this.handleLocationFormSubmit}>
                            <div className="col-sm-4 pickuppagelocation">
                                <label className="locationLabel">Enter your location</label>
                            </div>

                            <div className="col-sm-7">


                                <PlacesAutocomplete
                                    value={this.state.Landmark}
                                    onChange={this.onChange}
                                    onSelect={this.handleSelect}
                                    classNames={cssClasses}
                                    style={myStyles}
                                />
                                <p style={LandmarkStyle}>{LandmarkError}</p>
                                <img src="images/location.png" className="locationimg" alt="Location" />
                                <span style={imageStyle} className="loadIconHolder" onClick={this.browserLocation.bind(this)} >
                                    <span className="detect">Detect</span>
                                    <img src="images/loadIcon.png" className="loadIcon" alt="loadIcon"/>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


// function mapStateToProps(state) {
//   return { posts: state.posts.all };
// }

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        pickUpSerivceLocations: state.PickUpDropOffServiceLocationData.PickUpServiceLocations,
        browserLocationData : state.SessionStorage.LocationData,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchGeoLocation,fetchGeoLocationPrediction, fetchPickUpLocations, getSlot, sessionStorageLocationData, fetchDropOffLocations, getBrowserLocation, getAddressFromLatLng, fetchGeoLocationPlaceID }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearchSavedAddress);
