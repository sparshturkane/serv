import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData, consumerFavoriteLocationGetUserLocations, consumerFavoriteLocationUpdateLocation } from '../../actions/index';
import edit from '../../images/edit.png';

class ProfileSavedAddressHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderSavedAddress : 0,
            ConsumerFavouriteLocationID : '',
            Address: '',
        }
    }

    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        const ConsumerID = SignUpData.data.ConsumerID
        var consumerIDObj = {
            ConsumerID: ConsumerID,
        }
        this.props.consumerFavoriteLocationGetUserLocations(consumerIDObj);
    }

    // componentDidUpdate(){
    //     const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
    //     const ConsumerID = SignUpData.data.ConsumerID
    //     var consumerIDObj = {
    //         ConsumerID: ConsumerID,
    //     }
    //     this.props.consumerFavoriteLocationGetUserLocations(consumerIDObj);
    // }

    handleEditAddress(location){
        console.log("edit address clicked");
        console.log(location);
        this.setState({
            ConsumerFavouriteLocationID: location.ConsumerFavouriteLocationID,
            renderSavedAddress: 1,
            Address: location.Address,
        });
        // we will find out the favorite location ID
        // based on that show the edit field in that location only
    }

    handleSaveAddress(location){
        console.log("save address");
        console.log(location);
        var updateLocationObj = {
            ConsumerFavouriteLocationID : location.ConsumerFavouriteLocationID,
            Address: this.state.Address,
            AddressType : location.AddressType,
            Landmark : location.Landmark,
            ConsumerID : location.ConsumerID,
            Lat : location.Lat,
            Lng : location.Lng,
            Zipcode : location.Zipcode
        }

        this.props.consumerFavoriteLocationUpdateLocation(updateLocationObj).then(()=>{
                const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
                const ConsumerID = SignUpData.data.ConsumerID
                var consumerIDObj = {
                    ConsumerID: ConsumerID,
                }
                this.props.consumerFavoriteLocationGetUserLocations(consumerIDObj);
        }).then(()=>{
            this.setState({
                renderSavedAddress: 0,
            });
        })

    }

    handleAddressChange(event){
        this.setState(
            {Address: event.target.value}
        );
    }

    defaultSavedAddressPage(){
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
                            <span className="rightNewPageHolder" onClick={this.handleEditAddress.bind(this, location)}><img src={edit} className="editImg" style={{cursor: "pointer"}}/><label className="editLabel" style={{cursor: "pointer"}}>edit</label></span>
                            <div className="col-sm-4">

                            </div>
                        </div>
                    </div>
                );
            });
        }
    }

    editSavedAddress(ConsumerFavouriteLocationID){
        if (this.props.savedUserLocation !== undefined) {
            return this.props.savedUserLocation.data.map((location) => {
                // if they are same then edit else default
                if (ConsumerFavouriteLocationID === location.ConsumerFavouriteLocationID) {
                    return (
                        <div className="AddressHolderContent" key={location.ConsumerFavouriteLocationID} style={{borderBottom: "white"}}>
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="leftDropOFF">
                                        <div>
                                            <label className="TechnologyLabel">
                                                {location.AddressType}
                                            </label>
                                            <input
                                            type="text"
                                            name="mobileNumber"
                                            placeholder="Mobile Number"
                                            className="inputdetails"
                                            value={this.state.Address}
                                            onChange={this.handleAddressChange.bind(this)} required/>
                                        </div>
                                    </div>
                                </div>
                                <span className="rightNewPageHolder">
                                    <button type="Submit" className="SaveButtonProfile" onClick={this.handleSaveAddress.bind(this, location)}>
                                        Save
                                    </button>
                                </span>
                                <div className="col-sm-4">

                                </div>
                            </div>
                        </div>
                    );
                } else {
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
                                <span className="rightNewPageHolder" onClick={this.handleEditAddress.bind(this, location)}><img src={edit} className="editImg" style={{cursor: "pointer"}}/><label className="editLabel" style={{cursor: "pointer"}}>edit</label></span>
                                <div className="col-sm-4">

                                </div>
                            </div>
                        </div>
                    );
                }

            });
        }
    }

    renderSavedAddresses(){
        // console.log(this.props.savedUserLocation);
        switch (this.state.renderSavedAddress) {
            case 0:
            return this.defaultSavedAddressPage();
            break;

            case 1:
            return this.editSavedAddress(this.state.ConsumerFavouriteLocationID);
            break;

            default:
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="dropOFFHolderContentMargin ">
                        {this.renderSavedAddresses()}

                        <div className="AddressHolderContent">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="addmoreTab">+ Add New Address </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default ProfileSavedAddressHolder;

function mapStateToProps(state) {
    return {
        productData : state.productData.ActiveProductData,
        // userData : state.SessionStorage.UserData,
        userData : state.Consumer.GetConsumerDetail,
        savedUserLocation : state.ConsumerFavoriteLocation.GetUserLocations

    };
}
//
//
function mapDispatchToProps(dispatch) {
     return bindActionCreators({consumerGetProfile, consumerUpdateProfile, storeActivePageData, consumerFavoriteLocationGetUserLocations, consumerFavoriteLocationUpdateLocation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSavedAddressHolder);
