import React from 'react';
import { connect } from 'react-redux';
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
            userData: undefined
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

    // componentDidMount(){
    //     this.setState
    // }

    showHideUserSettings(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
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
                            <li className="userContentLI">
                                <img src={user} alt="user" />
                            </li>
                            <li className="userContentLI">
                                <img src={bell} alt="Bell" />
                            </li>
                            <li className="userContentLI">
                                <img src={setting} alt="Setting" />
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
    render(){
        return(
            <div className="topHadder row">
                <div className="heartHolder col-sm-6">
                    <img
                        src={heart}
                        className="heartImg"
                        alt="Heart" />
                    <span className="topHeading">
                        {this.props.productData.ProductName} Recycle
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
