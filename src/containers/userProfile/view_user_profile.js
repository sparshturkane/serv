import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile } from '../../actions/index';
import HeaderDiv from '../common/header';
import user from '../../images/userFill.png';

class ViewUserProfile extends React.Component {
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
                                <div className="editContent">
                                    <Link to={'/user-edit'} className="editContentLabel">Edit Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="newpickupInfoContent">
                                <form>
                                    <div className="row">

                                        <div className="col-sm-4">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Name</label><br />
                                                <label className="inputdetailsWithoutBorder">{this.state.userData.Name}</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Mobile Number</label><br />
                                                <label className="inputdetailsWithoutBorder">{this.state.userData.MobileNo}</label>

                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Email</label><br />
                                                <label className="inputdetailsWithoutBorder">{this.state.userData.EmailID}</label>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="detailsContent">
                                                <label className="labelDetails">Alternate Number</label><br />
                                                <label className="inputdetailsWithoutBorder">{this.state.userData.AlternateMobileNo}</label>

                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div className="detailsContent">
                                                <label className="labelDetails">IMEI Number of Device For Recycle</label><br />
                                                <label className="inputdetailsWithoutBorder"></label>

                                            </div>
                                        </div>
                                        <div className="col-sm-3"></div>
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

// export default ViewUserProfile;
// export default HeaderDiv;
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
     return bindActionCreators({consumerGetProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserProfile);
