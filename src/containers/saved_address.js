import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { makePagesActive, sessionStorageHeaderActivePhone, consumerGetProfile, consumerUpdateProfile, storeActivePageData, consumerFavoriteLocationGetUserLocations, fetchPickUpLocations, getSlot, fetchDropOffLocations  } from '../actions/index';
import HeaderDiv from './common/header'
import LocationSearchSavedAddress from './location_search_saved_address'
import rightNewPage from '../images/rightNewPage.png';

class SavedAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PickUpAvaliable : 0,
            DropOffAvaliable : 0,
        }
    }

    componentWillMount(){
        // sign up data
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        if( SignUpData !== null){
            const ConsumerID = SignUpData.data.ConsumerID
            var consumerIDObj = {
                ConsumerID: ConsumerID,
            }
            this.props.consumerFavoriteLocationGetUserLocations(consumerIDObj);
        }

        // storing ServiceTypeID pickup and dropoff from selected mobiles
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

    handleSavedAddressClick(location){
        // here we will have to call get slots service and based on that move to next page
        // service avaliability get slot
        //  --- the pickup and dropoff request will be based on mobiles supported modes
        //   this will be avaliable from selected mobile
        //
        //1. pickUpLocationRequest
        //2. fetchPickUpLocations
        //3. dropOffLocationRequest
        //4. fetchDropOffLocations

        // browserHistory.push('/pickup-dropoff');
        this.callingLocationActions(location);


    }

    callingLocationActions(location){
        console.log('calling location actions');
        // this.props.fetchGeoLocation(this.state.Landmark).then( () => {


        // if(this.props.geoLocationData.pincode === '' && this.props.browserLocationData.Pincode ===''){
        //     this.setState({
        //         LandmarkError: 'Please Enter Valid Landmark'
        //     })
        // }

        if(this.state.PickUpAvaliable === 1){
            // calling fetchPickUpLocations action serviceAvailability
            const pickUpLocationRequest = {
                Lat: location.Lat,
                Lng: location.Lng,
                Zipcode: location.Zipcode,
                ServiceTypeID: 9,
                ProductID: this.props.productData.ProductID,
            };
            this.props.fetchPickUpLocations(pickUpLocationRequest).then( () =>{
                // this.props.fetchPickUpLocations
                const getSlotsRequest = {
                    Lat : location.Lat,//v
                    Lng : location.Lng,//v
                    CurrentDate : new Date().toISOString().slice(0,10), //v
                    ServiceTypeID : 9,//varia
                    CurrentTime : new Date().toLocaleTimeString(), //v
                    PartnerServiceLocationID : this.props.pickUpSerivceLocations.PartnerServiceLocationID, //variable
                    DeliveryMode : this.props.pickUpSerivceLocations.DeliveryMode, //only at the time of pickup
                };
                this.props.getSlot(getSlotsRequest).then(() => {
                    browserHistory.push('/pickup-dropoff');
                });
            })
        }

        if(this.state.DropOffAvaliable === 1){ // if ends here this space is for pickup
            const dropOffLocationRequest = 	{
                Authorised:0, //s
                BrandID:this.props.productData.BrandID,
                IsExclusive:0, //s
                Lat: location.Lat,
                Lng: location.Lng,
                OrderBy:0, //s
                Page:1, //s
                Partnered:1, //s
                ProductID:this.props.productData.ProductID,
                ProductSubCategoryID:this.props.productData.ProductSubCategoryID,
                Radius:80 //s
            }

            this.props.fetchDropOffLocations(dropOffLocationRequest)
        }


        // } )

        // .catch(error => {
        //     // console.log(error);
        //     // alert(error);
        //     this.setState({
        //         LandmarkError: 'Please Enter Valid Landmark'
        //     })
        // });
    }

    renderSavedAddresses(){
        // console.log(this.props.savedUserLocation);
        if (this.props.savedUserLocation !== undefined) {
            return this.props.savedUserLocation.data.map((location) => {
                return (
                    <div className="AddressHolderContent" key={location.ConsumerFavouriteLocationID}>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="leftDropOFF">
                                    <div>

                                        <label className="TechnologyLabel">
                                            {location.AddressType}
                                        </label>
                                        <p className="TechnologyLabelContent">
                                            {location.Address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <span className="rightNewPageHolder" onClick={this.handleSavedAddressClick.bind(this, location)}><img src={rightNewPage} /></span>
                            <div className="col-sm-4">

                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    render(){
        return(
            <div>
                <HeaderDiv/>
                <div className="separators"></div>
                <LocationSearchSavedAddress/>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="dropOFFHolderContentMargin ">
                            <div className="AddressHolderContent">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="MapleLabel">Saved Addresses</label>
                                    </div>
                                </div>
                            </div>
                            {this.renderSavedAddresses()}
                        </div>
                    </div>
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

// export default SavedAddress;

function mapStateToProps(state) {
    return {
        productData : state.productData.ActiveProductData,
        // userData : state.SessionStorage.UserData,
        userData : state.Consumer.GetConsumerDetail,
        savedUserLocation : state.ConsumerFavoriteLocation.GetUserLocations,
        pickUpSerivceLocations: state.PickUpDropOffServiceLocationData.PickUpServiceLocations,

    };
}
//
//
function mapDispatchToProps(dispatch) {
     return bindActionCreators({consumerGetProfile, consumerUpdateProfile, storeActivePageData, consumerFavoriteLocationGetUserLocations, fetchPickUpLocations, getSlot, fetchDropOffLocations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedAddress);
