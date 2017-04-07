import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import heart from '../../images/heart.png';
import user from '../../images/user.png';
import bell from '../../images/bell.png';
import setting from '../../images/setting.png';
import { bindActionCreators } from 'redux';
import { consumerGetProfile } from '../../actions/index';


class HeaderDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: undefined,
            userLogo: user,
            bellLogo: bell,
            settingLogo: setting,
        };
        this.handleViewUserProfile = this.handleViewUserProfile.bind(this);
        this.handleNotification = this.handleNotification.bind(this);
        this.handleSetting = this.handleSetting.bind(this);

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

        // userLogo
        if(this.props.userLogo != undefined){
            this.setState({
                userLogo : this.props.userLogo
            })
        }

        // bell logo
        if(this.props.bellLogo != undefined){
            this.setState({
                bellLogo : this.props.bellLogo
            })
        }

        // setting logo
        if(this.props.settingLogo != undefined){
            this.setState({
                settingLogo : this.props.settingLogo
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

    handleNotification(){
        console.log("you are viewing notification");
        browserHistory.push('/user-notification');
    }

    handleSetting(){
        console.log("you are viewing settings");
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
                                <img src={this.state.bellLogo} alt="Bell" onClick={this.handleNotification} style={imageStyle} className="userIMG"/>
                            </li>
                            <li className="userContentLI">
                                <img src={this.state.settingLogo} alt="Setting" onClick={this.handleSetting} style={imageStyle} className="userIMG"/>
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
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        if( SignUpData !== null){
            browserHistory.push('/dashboard');
        }else{
            browserHistory.push('/');
        }

    }
    render(){

        var imageStyle = {
            cursor: "pointer",
        };
        return(
            <div className="topHadder row">
                <div className="heartHolder col-sm-6">
                    <img
                        src={heart}
                        className="heartImg"
                        alt="Heart"
                        onClick={this.onClickBrand.bind(this)}
                        style={imageStyle}
                    />
                    <span className="topHeading">
                        {this.props.ProductName} Recycle
                    </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDiv);
