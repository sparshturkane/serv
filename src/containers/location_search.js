import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeoLocation, fetchPickUpLocations, getSlot, sessionStorageLocationData } from '../actions/index';

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
            }// if ends here this space is for pickup
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
                                <input type="text" onBlur={this.handleLocationFormSubmit} value={this.state.Landmark} onChange={this.handleOnChange.bind(this)} placeholder="Andheri West" className="inputLocation" />
                                <p style={LandmarkStyle}>{LandmarkError}</p>
                                <img src="images/location.png" className="locationimg" alt="Location" />
                                <span className="loadIconHolder"><img src="images/loadIcon.png" className="loadIcon" alt="loadIcon" /></span>
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
    return bindActionCreators({fetchGeoLocation, fetchPickUpLocations, getSlot, sessionStorageLocationData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSearch);
