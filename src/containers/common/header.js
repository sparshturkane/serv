import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


class HeaderDiv extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div className="topHadder row">
                <div className="heartHolder col-sm-6">
                    <img
                        src="images/heart.png"
                        className="heartImg"
                        alt="Heart" />
                    <span className="topHeading">
                        {this.props.productData.ProductName} Recycle
                    </span>
                </div>
                <div className="col-sm-6">
                    <div className="userContent">
                        <ul className="userContentUL">
                            <li className="userContentLI">
                                <label>
                                    {this.props.userData.userName}
                                </label>
                            </li>
                            <li className="userContentLI">
                                <img src="images/user.png" alt="user" />
                            </li>
                            <li className="userContentLI">
                                <img src="images/bell.png" alt="Bell" />
                            </li>
                            <li className="userContentLI">
                                <img src="images/setting.png" alt="Setting" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData

    };
}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// }

export default connect(mapStateToProps, null)(HeaderDiv);
