import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData } from '../../actions/index';
import user from '../../images/userFill.png';
import edit from '../../images/edit.png';

class EditUserProfileHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ConsumerID: '',
            Name: '',
            MobileNo: '',
            AlternateMobileNo: '',
            EmailID: '',
        }
        this.handleFormEditProfile = this.handleFormEditProfile.bind(this);
        this.handleInputFieldsChange = this.handleInputFieldsChange.bind(this);
        this.handleOnSubmitUpdateUser = this.handleOnSubmitUpdateUser.bind(this);
    }

    handleFormEditProfile(event){
        event.preventDefault();
        const storeActivePageDataObj = {
            viewProfileActive : 1,
            editProfileActive : 0,
        }
        this.props.storeActivePageData(storeActivePageDataObj);
    }

    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        // console.log("signupdata" +SignUpData);

        if (SignUpData !== null) {
            const consumerID = {ConsumerID : SignUpData.data.ConsumerID};
            this.props.consumerGetProfile(consumerID).then(()=>{
                this.setState({
                    ConsumerID: this.props.userData.data.ConsumerID,
                    Name: this.props.userData.data.Name,
                    MobileNo: this.props.userData.data.MobileNo,
                    AlternateMobileNo: this.props.userData.data.AlternateMobileNo,
                    EmailID: this.props.userData.data.EmailID,
                });

                // console.log(this.props.userData.data);
            })
        }

    }

    handleInputFieldsChange(event){
        // limiting mobile number to 10 digits
        if ([event.target.name] == 'MobileNo' || [event.target.name] == 'AlternateMobileNo') {
            // console.log('mobile input');
            if(event.target.value.length < 11){
                this.setState({
                    [event.target.name] : event.target.value,
                })
            }
        } else {
            this.setState(
                {
                    [event.target.name]: event.target.value,
                    // userName: event.target.value
                }
            );
        }
        // this.setState(
        //     {
        //
        //         [event.target.name]: event.target.value,
        //
        //     }
        // );
    }

    handleOnSubmitUpdateUser(event){
        event.preventDefault();


        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        // console.log("signupdata" +SignUpData);
        const updateProfileData = {
            updateObj : {
                Name: this.state.Name,
                MobileNo: this.state.MobileNo,
                AlternateMobileNo: this.state.AlternateMobileNo,
                EmailID: this.state.EmailID,
            },
            isNew : SignUpData.data.isNew ? true : false,
            ConsumerID :SignUpData.data.ConsumerID
        }



        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData).then( () => {
            // browserHistory.push('/user-profile');
            const storeActivePageDataObj = {
                viewProfileActive : 1,
                editProfileActive : 0,
            }
            this.props.storeActivePageData(storeActivePageDataObj);
        })
    }

    render(){
        return(
            <div className="profileHolder">
                <div className="profileImgHolder">
                    <span className="profileIMGContent">SP</span>
                    <label className="profileName">{this.state.Name}</label>
                </div>
                <div className="ProfiledetailsHolder">
                    <form onSubmit={this.handleOnSubmitUpdateUser}>
                        <div className="row">
                            <div className="col-lg-2 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Mobile Number</label><br/>
                                    <input
                                        type="text"
                                        name="MobileNo"
                                        onChange={this.handleInputFieldsChange}
                                        placeholder="Mobile Number"
                                        className="inputdetails"
                                        value={this.state.MobileNo}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Email</label><br/>
                                    <input
                                        type="email"
                                        name="EmailID"
                                        onChange={this.handleInputFieldsChange}
                                        placeholder="Email"
                                        className="inputdetails"
                                        value={this.state.EmailID}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-12">
                                <div className="profiledetailsContent">
                                    <label className="profileDetails">Alternate Number</label><br/>
                                    <input
                                        type="text"
                                        name="AlternateMobileNo"
                                        onChange={this.handleInputFieldsChange}
                                        placeholder="Mobile Number"
                                        className="inputdetails"
                                        value={this.state.AlternateMobileNo}
                                        required
                                    />
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
