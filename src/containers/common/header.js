import React from 'react';
import { connect } from 'react-redux';
import heart from '../../images/heart.png';
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
                        src={heart}
                        className="heartImg"
                        alt="Heart" />
                    <span className="topHeading">
                        {this.props.productData.ProductName} Recycle
                    </span>
                </div>
                {this.props.userData !== undefined &&
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
                }

            </div>
        );
    }
}

export default HeaderDiv;
// function mapStateToProps(state) {
//     return {
//         productData: state.productData.ActiveProductData,
//         userData: state.SessionStorage.UserData
//
//     };
// }
//
//
// // function mapDispatchToProps(dispatch) {
// //     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// // }
//
// export default connect(mapStateToProps, null)(HeaderDiv);
