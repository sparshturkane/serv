import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData, consumerFavoriteLocationGetUserLocations } from '../../actions/index';
import edit from '../../images/edit.png';

class ProfileSavedAddressHolder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        const ConsumerID = SignUpData.data.ConsumerID
        var consumerIDObj = {
            ConsumerID: ConsumerID,
        }
        this.props.consumerFavoriteLocationGetUserLocations(consumerIDObj);
    }

    renderSavedAddresses(){
        // console.log(this.props.savedUserLocation);
        if (this.props.savedUserLocation !== undefined) {
            return this.props.savedUserLocation.data.map((location) => {
                return (
                    <div className="AddressHolderContent">
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
                            <span className="rightNewPageHolder"><img src={edit} className="editImg" /><label className="editLabel">edit</label></span>
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
     return bindActionCreators({consumerGetProfile, consumerUpdateProfile, storeActivePageData, consumerFavoriteLocationGetUserLocations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSavedAddressHolder);
