import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile } from '../../actions/index';
import HeaderDiv from '../common/header';
import user from '../../images/userFill.png';

class EditUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: {
            ConsumerID: '',
            Name: '',
            MobileNo: '',
            AlternateMobileNo: '',
            EmailID: '',
            // }
        };
        this.handleInputFieldsChange = this.handleInputFieldsChange.bind(this);
        this.handleOnSubmitUpdateUser = this.handleOnSubmitUpdateUser.bind(this);
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

    // componentDidMount(){
    //     const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
    //     const updateProfileData = {
    //         updateObj : {
    //             Name: this.state.userData.Name,
    //             MobileNo: this.state.userData.MobileNo,
    //             AlternateMobileNo: this.state.userData.AlternateMobileNo,
    //             EmailID: this.state.userData.EmailID,
    //         },
    //         isNew : SignUpData.data.isNew ? true : false,
    //         ConsumerID :SignUpData.data.ConsumerID
    //     }
    //
    //     console.log(updateProfileData);
    // }

    handleInputFieldsChange(event){
        this.setState(
            {

                [event.target.name]: event.target.value,

            }
        );
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
            browserHistory.push('/user-profile');
        })
    }

    render(){
        return(
            <div>
                <HeaderDiv userLogo={user}/>
                <div className="separators"></div>

                <div className="pickupInfoHolder">
                    <div className="yourDetailsHolderTOP">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="yourDetailsLabel">
                                    <label className="congo">Your</label><br />
                                    <label className="recyle">Details</label>
                                </div>
                            </div>
                            <div className="col-sm-6">

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="newpickupInfoContent">
                                <form onSubmit={this.handleOnSubmitUpdateUser}>
                                    <div className="row">

                                        <div className="col-sm-4">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Name*</label><br />
                                                <input type="text" name="Name" placeholder="Name" onChange={this.handleInputFieldsChange} className="inputdetails" value={this.state.Name} required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Mobile Number1*</label><br />
                                                <input type="text" name="MobileNo" onChange={this.handleInputFieldsChange} placeholder="Mobile Number" className="inputdetails" value={this.state.MobileNo} required />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Email*</label><br />
                                                <input type="email" name="EmailID" onChange={this.handleInputFieldsChange} placeholder="Email" className="inputdetails" value={this.state.EmailID} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Alternate Number</label><br />
                                                <input type="text" name="AlternateMobileNo" onChange={this.handleInputFieldsChange} placeholder="Mobile Number" className="inputdetails"  value={this.state.AlternateMobileNo} />
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="detailsContent">
                                                <label className="labelDetails">IMEI Number of Device For Recycle</label><br />
                                                <input type="text" name="name" className="inputdetails"  />
                                            </div>
                                        </div>
                                        <div className="col-sm-3"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="detailsSaveContentlargeButton ">
                                                <button type="Submit" className="pickUPlargebutton">Save</button>
                                            </div>
                                        </div>
                                        <div className="col-sm-4"></div>

                                    </div>
                                </form>


                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

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
     return bindActionCreators({consumerGetProfile, consumerUpdateProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);
