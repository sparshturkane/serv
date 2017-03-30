import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import heart from '../../images/heart.png';
import user from '../../images/user.png';
import bell from '../../images/bell.png';
import setting from '../../images/setting.png';
import { bindActionCreators } from 'redux';
import { consumerGetProfile } from '../../actions/index';


class HeaderDivDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: undefined,
            userLogo: user
        };
        this.handleViewUserProfile = this.handleViewUserProfile.bind(this);
    }

    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        // console.log("signupdata" +SignUpData);

        if (SignUpData !== null) {
            const consumerID = {ConsumerID : SignUpData.data.ConsumerID}
            this.props.consumerGetProfile(consumerID).then(()=>{
                this.setState({
                    userData: this.props.userData.data
                })
            })
        }

        if(this.props.userLogo != undefined){
            this.setState({
                userLogo : this.props.userLogo
            })
        }

    }

    // componentDidMount(){
    //     this.setState
    // }
    handleViewUserProfile(){
        console.log("you are viewing userprofile");
        browserHistory.push('/user-profile');
    }

    showHideUserSettings(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        // console.log("signupdata" +SignUpData);
        var imageStyle = {
            cursor: "pointer",
        };
        if( SignUpData !== null){
            return(

                <div className="col-sm-6">
                    <div className="userContent">
                        <ul className="userContentUL">
                            <li className="userContentLI">
                                <label>
                                    {this.state.userData !== undefined &&
                                        this.state.userData.Name
                                    }
                                </label>
                            </li>
                            <li className="userContentLI" >
                                <img src={this.state.userLogo} alt="user" onClick={this.handleViewUserProfile} style={imageStyle} className="userIMG" />
                            </li>
                            <li className="userContentLI">
                                <img src={bell} alt="Bell" className="userIMG"/>
                            </li>
                            <li className="userContentLI">
                                <img src={setting} alt="Setting" className="userIMG"/>
                            </li>
                        </ul>
                    </div>
                </div>

            );
        } else{
            return(
                <div className="col-sm-6">
                </div>
            );
        }
    }

    onClickBrand(){
        browserHistory.push('/');
    }
    render(){

        var imageStyle = {
            cursor: "pointer",
        };
        return(
            <div className="topHadder row">
                <div className="heartHolder col-sm-6">
                    
                </div>
                {this.showHideUserSettings()}

            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDivDashboard);
