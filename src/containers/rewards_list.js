import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { makePagesActive } from '../actions/index';
import { browserHistory } from 'react-router';
import GreenRewards from './green_rewards';

class RewardList extends React.Component {
    constructor(props) {
        super(props);
        this.handleRecyclMyPhoneClick = this.handleRecyclMyPhoneClick.bind(this)
    }

    // reward.Rewards.RewardPartner.PartnerLogoUrl
    // reward.Rewards.RewardPartner.RewardUrl


    // renderRewardsList(){
    //     console.log(this.props.rewardList);
    //     return this.props.rewardList.map((reward) => {
    //         return (
    // 
    //             <li className="greenRewordContentHolderLI" key={reward.ProductRewardID}>
    //                 <div className="divHeadinglabelHolder">
    //                     <label className="divHeadinglabel">{reward.Rewards.RewardTypeName}</label>
    //                 </div>
    //                 <div className="grContentDiv">
    //                     <div className="grContentDivLeft">
    //                         <label className="iphone7Label">{reward.Rewards.RewardTypeName}</label>
    //                         <label className="LuckyDip">{reward.Rewards.RewardValue}</label>
    //                         <label className="LuckyDip">Eligible</label>
    //                         <div className="cutapple">
    //                             <img  src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="applelogo" className="appleLogosmall" />
    //                         </div>
    //                     </div>
    //                     <div className="grContentDivRight">
    //                         <img src={reward.Rewards.RewardPartner.RewardUrl} alt="iphone7" className="appleLogoBig"/>
    //                     </div>
    //                 </div>
    //             </li>
    //         );
    //     });
    // }

    handleRecyclMyPhoneClick(event){
        event.preventDefault();
        console.log("recycle my phone clicked");
        const pageData = {
            pageName : 'pickUp',
            status : '1'
        }
        console.log(pageData);
        this.props.makePagesActive(pageData);
        browserHistory.push('/pickup-dropoff');

    }

    render(){
        return(
            <div className="greenReword">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="deviceNamelabelHolder">
                            <label className="deviceName">{this.props.ProductName}</label>
                        </div>
                    </div>
                </div>

                <GreenRewards />
                {/*
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="greenRewordContentHolder">
                                <ul className="greenRewordContentHolderUL">
                                {this.renderRewardsList()}
                                </ul>
                            </div>
                        </div>
                    </div>
                */}

                {/* <RecycleMyPhone ProductName={this.props.ProductName} /> */}


                <div className="row landingSubmitButton">
                    <div className="col-sm-12">
                        <Link to="/pickup-dropoff" type="button" onClick={this.handleRecyclMyPhoneClick} className="landingLargeButton ">Recycle My {this.props.ProductName}</Link>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rewardList: state.rewardsList.rewardsListData,
        ProductName: state.productData.ProductName
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makePagesActive }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardList);
