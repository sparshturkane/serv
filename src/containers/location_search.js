import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeoLocation,fetchGeoLocationPrediction, fetchPickUpLocations, getSlot, sessionStorageLocationData, fetchDropOffLocations } from '../actions/index';

class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Landmark:'',
            LandmarkError: '',

        }
        this.handleLocationFormSubmit = this.handleLocationFormSubmit.bind(this);
    }

    handleLocationFormSubmit(event){
        event.preventDefault();
        // this.props.fetchGeoLocationPrediction(this.state.Landmark);
        this.props.fetchGeoLocation(this.state.Landmark).then( () => {


            if(this.props.geoLocationData.pincode === ''){
                this.setState({
                    LandmarkError: 'Please Enter Valid Landmark'
                })
            }

            if(this.props.ServiceTypeID === 9){
                // calling fetchPickUpLocations action serviceAvailability

                const pickUpLocationRequest = {
                    Lat: this.props.geoLocationData.latitude,
                    Lng: this.props.geoLocationData.longitude,
                    Zipcode: this.props.geoLocationData.pincode,
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
            } else if(this.props.ServiceTypeID === 13){// if ends here this space is for pickup
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
        } )

        .catch(error => {
            // console.log(error);
            // alert(error);
            this.setState({
                LandmarkError: 'Please Enter Valid Landmark'
            })
        });

        // this.props.createPost(props)
        // .then(() => {
        //     // blog post create, nav to index
        //     this.context.router.push('/');
        // })

    }

    handleOnChange(event){
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
    }

    browserLocation(){
        console.log("browserLocation hit");
        // function getLocation() {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(showPosition);
        //     } else {
        //         // x.innerHTML = "Geolocation is not supported by this browser.";
        //         console.log("Geolocation is not supported by this browser.");
        //     }
        // }
        //
        // function showPosition(position) {
        //     // x.innerHTML = "Latitude: " + position.coords.latitude +
        //     // "<br>Longitude: " + position.coords.longitude;
        //     console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
        // }
    }

    render(){
        const LandmarkError = this.state.LandmarkError;
        var LandmarkStyle = {
            color: 'red',
        };

        return(
            <div className="locationHolder">
                <div className="locationContent ">
                    <div className="row">
                        <form onSubmit={this.handleLocationFormSubmit}>
                            <div className="col-sm-4 pickuppagelocation">
                                <label className="locationLabel">Enter your location</label>
                            </div>

                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    onBlur={this.handleLocationFormSubmit}
                                    value={this.state.Landmark}
                                    onChange={this.handleOnChange.bind(this)}
                                    placeholder="Andheri West"
                                    className="inputLocation"
                                />
                                <p style={LandmarkStyle}>{LandmarkError}</p>
                                <img src="images/location.png" className="locationimg" alt="Location" />
                                <span className="loadIconHolder" onClick={this.browserLocation()} >
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
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchGeoLocation,fetchGeoLocationPrediction, fetchPickUpLocations, getSlot, sessionStorageLocationData, fetchDropOffLocations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
