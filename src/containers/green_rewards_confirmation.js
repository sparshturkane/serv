import React from 'react';
import { connect } from 'react-redux';

class GreenRewards extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    renderRewardsList(){
        console.log(this.props.rewardList);
        return this.props.rewardList.map((reward) => {
            return (

                <li className="greenRewordContentHolderLI" key={reward.ProductRewardID}>
                    <div className="grContentDiv">
                        <div className="grContentDivLeft">
                            <label className="iphone7Label">{reward.Rewards.RewardTypeName}</label>
                            <label className="LuckyDip">{reward.Rewards.RewardValue}</label>
                            <label className="LuckyDip">Eligible</label>
                            <div className="cutapple">
                                <img  src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="applelogo" className="appleLogosmall" />
                            </div>
                        </div>
                        <div className="grContentDivRight">
                            <img src={reward.Rewards.RewardPartner.RewardUrl} alt="iphone7" className="appleLogoBig"/>
                        </div>
                    </div>
                </li>
            );
        });
    }

    render(){
        return(
            <div className="row">
                
                    <div className="greenRewordContentHolder">
                        <ul className="newgreenRewordContentHolderUL">
                        {this.renderRewardsList()}
                        </ul>
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

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ makePagesActive }, dispatch);
// }

export default connect(mapStateToProps, null)(GreenRewards);
