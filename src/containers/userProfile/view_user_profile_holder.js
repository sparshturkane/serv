import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData } from '../../actions/index';
import user from '../../images/userFill.png';
import edit from '../../images/edit.png';

class ViewUserProfileHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                ConsumerID: '',
                Name: '',
                MobileNo: '',
                AlternateMobileNo: '',
                EmailID: '',
            }
        };
    }

    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);

        if (SignUpData !== null) {
            const consumerID = {ConsumerID : SignUpData.data.ConsumerID}
            this.props.consumerGetProfile(consumerID).then(()=>{
                this.setState({
                    userData: this.props.userData.data
                })
            })
        }

    }

    handleEditProfileClick(){
        const storeActivePageDataObj = {
            viewProfileActive : 0,
            editProfileActive : 1,
        }
        this.props.storeActivePageData(storeActivePageDataObj);
    }

    titleCase() {
        var str = "sparsh turkane"
        var words = str.toLowerCase().split(' ');

        for(var i = 0; i < words.length; i++) {
            var letters = words[i].split('');
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join('');
        }
        return words.join(' ');
        console.log(words.join(' '));
    }

    render(){
        return(
            <div className="profileHolder">
                <div className="profileImgHolder">
                    <span className="profileIMGContent">
                        {/* <input type="file" name="fileToUpload" id="fileToUpload"/> */}

                        SP
                    </span>
                    
                    <label className="profileName">
                        {this.state.userData.Name !== '' &&
                            this.titleCase(this.state.userData.Name)
                        }
                    </label>
                </div>
                <div className="ProfiledetailsHolder">
                    <form>
                        <div className="row">
                            <div className="col-lg-2 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Mobile Number</label><br/>
                                    <label className="profileDetailsLabel">{this.state.userData.MobileNo}</label>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Email ID</label><br/>
                                    <label className="profileDetailsLabel">{this.state.userData.EmailID}</label>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Alternate Number</label><br/>
                                    <label className="profileDetailsLabel">{this.state.userData.AlternateMobileNo }</label>
                                </div>
                            </div>
                            <span className="rightNewPageHolder" onClick={this.handleEditProfileClick.bind(this)}>
                                <img src={edit} className="editImg" />
                                <label className="editLabel" style={{cursor: "pointer"}} onClick={this.handleEditProfileClick.bind(this)} >
                                    edit
                                </label>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// export default ViewUserProfileHolder;

// export default EditUserProfile;
function mapStateToProps(state) {
    return {
        productData : state.productData.ActiveProductData,
        // userData : state.SessionStorage.UserData,
        userData : state.Consumer.GetConsumerDetail

    };
}
//
//
function mapDispatchToProps(dispatch) {
     return bindActionCreators({consumerGetProfile, consumerUpdateProfile, storeActivePageData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserProfileHolder);
