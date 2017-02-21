import React from 'react';
import { connect } from 'react-redux';

class RewardList extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    // reward.Rewards.RewardPartner.PartnerLogoUrl
    // reward.Rewards.RewardPartner.RewardUrl
    renderRewardsList(){
        console.log(this.props.rewardList);
        return this.props.rewardList.map((reward) => {
            return (

                <li className="greenRewordContentHolderLI" key={reward.ProductRewardID}>
                    <div className="divHeadinglabelHolder">
                        <label className="divHeadinglabel">{reward.Rewards.RewardTypeName}</label>
                    </div>
                    <div className="grContentDiv">
                        <div className="grContentDivLeft">
                            <label className="iphone7Label">{reward.Rewards.RewardTypeName}</label>
                            <label className="LuckyDip">{reward.Rewards.RewardValue}</label>
                            <label className="LuckyDip">Eligible</label>
                            <div className="cutapple">
                                <img src="images/cutapple.png" alt="applelogo"/>
                            </div>
                        </div>
                        <div className="grContentDivRight">
                            <img src="images/iphone7.png" alt="iphone7"/>
                        </div>
                    </div>
                </li>
            );
        });
    }

    render(){
        return(
            <div className="greenReword">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="deviceNamelabelHolder">
                            <label className="deviceName">iPhone 4</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="greenRewordContentHolder">
                            <ul className="greenRewordContentHolderUL">
                            {this.renderRewardsList()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row landingSubmitButton">
                    <div className="col-sm-12">
                        <button type="button" className="landingLargeButton ">Recycle My iPhone 4</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rewardList: state.rewardsList.rewardsListData,
    };
}

export default connect(mapStateToProps)(RewardList);
