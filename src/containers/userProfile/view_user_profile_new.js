import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData } from '../../actions/index';
import HeaderDiv from '../common/header';
import EditUserProfileHolder from './edit_user_profile_holder';
import ViewUserProfileHolder from './view_user_profile_holder';
import ProfileSavedAddressHolder from './profile_saved_address_holder';
import ProfileRequestHistoryHolder from './profile_saved_request_history_holder';
import user from '../../images/userFill.png';
import edit from '../../images/edit.png';

class ViewUserProfileNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewProfileActive : 1,
            editProfileActive : 0,
            savedAddressesActive: 1,
            requestHistoryActive: 0,
        }
    }

    componentWillMount(){
        const storeActivePageDataObj = {
            viewProfileActive : this.state.viewProfileActive,
            editProfileActive : this.state.editProfileActive,
        }
        this.props.storeActivePageData(storeActivePageDataObj);
    }

    handelEditProfile(){
        // browserHistory.push('/edit-profile-new');
        this.setState({
            viewProfileActive : 0,
            editProfileActive : 1,
        });
    }

    renderViewEditProfile(){

        if(this.props.activePageData === undefined){
            if ((this.state.viewProfileActive === 1) && (this.state.editProfileActive === 0)) {
                return(
                    <ViewUserProfileHolder/>
                );
            } else if ((this.state.viewProfileActive === 0) && (this.state.editProfileActive === 1)) {
                return(
                    <EditUserProfileHolder/>
                );
            }
        } else {
            if ((this.props.activePageData.viewProfileActive === 1) && (this.props.activePageData.editProfileActive === 0)) {
                return(
                    <ViewUserProfileHolder/>
                );
            } else if ((this.props.activePageData.viewProfileActive === 0) && (this.props.activePageData.editProfileActive === 1)) {
                return(
                    <EditUserProfileHolder/>
                );
            }
        }

    }

    handleToggleSaveAddress(savedAddressesActive, requestHistoryActive){
        this.setState({
            savedAddressesActive: savedAddressesActive,
            requestHistoryActive: requestHistoryActive
        })
    }

    handleToggleSaveHistory(requestHistoryActive, savedAddressesActive){
        this.setState({
            requestHistoryActive: requestHistoryActive,
            savedAddressesActive: savedAddressesActive,
        })
    }

    renderToggleAddressHistory(){
        if (this.state.savedAddressesActive === 1) {
            var savedAddressesActive = 0 ;
            var requestHistoryActive = 1 ;
            return(
                <div className="col-sm-12">
                    <label className="SaveAddress SaveAddressActive" style={{cursor: 'pointer'}}>
                        Saved Addresses
                    </label>
                    <label className="SaveAddress " style={{cursor: 'pointer'}} onClick={this.handleToggleSaveHistory.bind(this,requestHistoryActive,savedAddressesActive)}>
                        Request History
                    </label>
                </div>
            );
        }

        if (this.state.requestHistoryActive === 1) {
            var savedAddressesActive = 1 ;
            var requestHistoryActive = 0 ;
            return(
                <div className="col-sm-12">
                    <label className="SaveAddress " style={{cursor: 'pointer'}} onClick={this.handleToggleSaveAddress.bind(this,savedAddressesActive, requestHistoryActive)}>
                        Saved Addresses
                    </label>
                    <label className="SaveAddress SaveAddressActive" style={{cursor: 'pointer'}} >
                        Request History
                    </label>
                </div>
            );
        }

    }

    renderAddressHistory(){
        if (this.state.savedAddressesActive === 1) {
            return(
                <ProfileSavedAddressHolder/>
            );
        }

        if (this.state.requestHistoryActive === 1) {
            return(
                <ProfileRequestHistoryHolder/>
            );
        }
    }

    render(){
        return(
            <div>
                <HeaderDiv userLogo={user}/>
                <div className="separators"></div>

                {/* user details view*/}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="dropOFFHolderContentMargin ">
                            <div className="AddressHolderContentTOP">
                                <div className="row">
                                    <div className="col-sm-12">
                                        {this.renderViewEditProfile()}
                                        {/*
                                            <div className="profileHolder">
                                                <div className="profileImgHolder">
                                                    <span className="profileIMGContent">SP</span>
                                                    <label className="profileName">User Name </label>
                                                </div>
                                                <div className="ProfiledetailsHolder">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-2 col-sm-12">
                                                                <div className="profiledetailsContent">
                                                                    <label className="profileDetails">Mobile Number</label><br/>
                                                                    <label className="profileDetailsLabel">+91 9823873579</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-sm-12">
                                                                <div className="profiledetailsContent">
                                                                    <label className="profileDetails">Email ID</label><br/>
                                                                    <label className="profileDetailsLabel">abcd@gmail.com</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-sm-12">
                                                                <div className="profiledetailsContent">
                                                                    <label className="profileDetails">Alternate Number</label><br/>
                                                                    <label className="profileDetailsLabel">N/A</label>
                                                                </div>
                                                            </div>
                                                            <span className="rightNewPageHolder"><img src={edit} className="editImg" /><label className="editLabel" style={{cursor: "pointer"}} onClick={this.handelEditProfile.bind(this)}>edit</label></span>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* toggle saved address and request History */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="dropOFFHolderContentMargin ">
                            <div className="AddressHolderContentTOP">
                                <div className="row">
                                    {this.renderToggleAddressHistory()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>

                {/* saved address request History */}
                {this.renderAddressHistory()}
                {/*
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="dropOFFHolderContentMargin ">
                                <div className="AddressHolderContent">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="leftDropOFF">
                                                <div>

                                                    <label className="TechnologyLabel">Home</label>
                                                    <p className="TechnologyLabelContent">
                                                        7th Floor, Al Tara Building, Nr. Hiranandani Gardens, Cafe Coffee Day - Central Ave, Hiranandani Estate, Thane, Maharashtra, India
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="rightNewPageHolder"><img src={edit} className="editImg" /><label className="editLabel">edit</label></span>
                                        <div className="col-sm-4">

                                        </div>
                                    </div>
                                </div>

                                <div className="AddressHolderContent">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="leftDropOFF">
                                                <div>

                                                    <label className="TechnologyLabel">Office</label>
                                                    <p className="TechnologyLabelContent">
                                                        7th Floor, Al Tara Building, Nr. Hiranandani Gardens, Cafe Coffee Day - Central Ave, Hiranandani Estate, Thane, Maharashtra, India
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="rightNewPageHolder"><img src={edit} className="editImg" /><label className="editLabel">edit</label></span>
                                        <div className="col-sm-4">

                                        </div>
                                    </div>
                                </div>

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
                */}
                <div className="separators"></div>
            </div>
        );
    }
}

// export default ViewUserProfileNew;

function mapStateToProps(state) {
    return {
        productData : state.productData.ActiveProductData,
        activePageData : state.SessionStorage.storeActivePageData,
        userData : state.Consumer.GetConsumerDetail

    };
}
//
//
function mapDispatchToProps(dispatch) {
     return bindActionCreators({consumerGetProfile, consumerUpdateProfile, storeActivePageData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserProfileNew);
