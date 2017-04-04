import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import GreenRewards from '../containers/green_rewards_confirmation';
import FooterDiv from './footer.js';
import HeaderDiv from '../containers/common/header';
import RecycleUserDetail from '../containers/confirmation/confirm_recycle_user_detail';
import SubmitRecycleRequestButton from '../containers/confirmation/submit_recycle_request'

class ConfirmRecycleRequest extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentWillMount(){
        // if(this.props.makePagesActive.confirmation === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.confirmation.status === '0') {
        //     browserHistory.push('/');
        // }
    }

    greenRewardList(){
        // ProductRewardDataArray
        // <div className="grContentDiv">
        // </div>
        return this.props.ProductRewardDataArray.map((reward) => {
            return(
                <li className="conformDivLI" key={reward.ProductRewardID}>
                    <div className="conformDiv">
                        <label className="iphone7Label">{reward.RewardName}</label>
                        <label className="LuckyDip">{reward.RewardValue}</label>
                    </div>
                </li>

            );
        });
    }

    render(){
        return(
            <div>
                <HeaderDiv productData={this.props.productData} ProductName={this.props.productData.ProductName} userData={this.props.userData}/>
                <div className="separators"></div>

                <RecycleUserDetail />

                <div className="greenReword">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="devicelabelContent">
                                <label className="devicelabel">Green Rewards</label>
                            </div>
                            {/* <GreenRewards /> */}
                            <div className="conformDivHolder">
                                <ul className="conformDivUL">
                                    {this.greenRewardList()}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <SubmitRecycleRequestButton />
                </div>

                <div className="separators"></div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData,
        ProductRewardDataArray: state.SessionStorage.ProductRewardDataArray,
        makePagesActive: state.MakePagesActive,

    };
}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// }

export default connect(mapStateToProps, null)(ConfirmRecycleRequest);
