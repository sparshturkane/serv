import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData } from '../../actions/index';
import user from '../../images/userFill.png';
import edit from '../../images/edit.png';

class EditUserProfileHolder extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormEditProfile = this.handleFormEditProfile.bind(this);
    }

    handleFormEditProfile(event){
        event.preventDefault();
        const storeActivePageDataObj = {
            viewProfileActive : 1,
            editProfileActive : 0,
        }
        this.props.storeActivePageData(storeActivePageDataObj);
    }

    render(){
        return(
            <div className="profileHolder">
                <div className="profileImgHolder">
                    <span className="profileIMGContent">SP</span>
                    <label className="profileName">User Name</label>
                </div>
                <div className="ProfiledetailsHolder">
                    <form onSubmit={this.handleFormEditProfile}>
                        <div className="row">
                            <div className="col-lg-2 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Mobile Number</label><br/>
                                    <input type="text" name="mobileNumber"  placeholder="Mobile Number" className="inputdetails" value="+91 9823873579" required />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Email</label><br/>
                                    <input type="email" name="email" placeholder="Email" className="inputdetails" value="sreevathsa.prabhakar@servify.in" required />
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Alternate Number</label><br/>
                                    <input type="text" name="mobileNumber"  placeholder="Mobile Number" className="inputdetails" value="+Add" required />
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <button type="Submit" className="SaveButtonProfile">Save</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// export default EditUserProfileHolder;
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfileHolder);
