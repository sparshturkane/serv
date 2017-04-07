import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import { storeProductRewardIDArray, storeProductRewardDataArray } from '../actions/index';

class GreenRewards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductRewardIDArray : []
        }
    }

    // componentWillMount(){
    //     const script = document.createElement("script");
    //     var t = document.createTextNode("$(function() {"+
    //         "$('#first').carouseller();"+
    //     "});");
    //
    //     // $(function() {
    //     //     $('#fifth').carouseller();
    //     // });
    //     script.appendChild(t);
    //     document.body.appendChild(script);
    // }

    // renderRewardsList(){
    //     console.log(this.props.rewardList);
    //     return this.props.rewardList.map((reward) => {
    //         if (reward.IsMandatory === false) {
    //             return (
    //
    //                 <li className="greenRewordContentHolderLI" key={reward.ProductRewardID}>
    //                     <div className="divHeadinglabelHolder">
    //                         <label className="divHeadinglabel">{reward.Rewards.RewardTypeName}</label>
    //                     </div>
    //                     <div className="grContentDiv">
    //                         <div className="grContentDivLeft">
    //                             <label className="iphone7Label">{reward.Rewards.RewardTypeName}</label>
    //                             <label className="LuckyDip">{reward.Rewards.RewardValue}</label>
    //                             <label className="LuckyDip">Eligible</label>
    //                             <div className="cutapple">
    //                                 <img  src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="applelogo" className="appleLogosmall" />
    //                             </div>
    //                         </div>
    //                         <div className="grContentDivRight">
    //                             <img src={reward.Rewards.RewardPartner.RewardUrl} alt="iphone7" className="appleLogoBig"/>
    //                         </div>
    //                     </div>
    //                 </li>
    //             );
    //         }
    //     });
    // }
    handleRadioClick(ProductRewardID, RewardName, RewardValue){
        console.log("radio clicked!"+ProductRewardID);
        // what we should do is map the array and push
        var ProductRewardIDArray = [];
        var ProductRewardDataArray = [];
        this.props.rewardList.map((value) => {
            if (value.IsMandatory === true) {
                //id array
                ProductRewardIDArray.push(value.ProductRewardID);
                //data array
                var rewardValue1 = '';
                if(value.Rewards.RewardValue > 0){
                    rewardValue1 = "INR " +value.Rewards.RewardValue;
                }else{
                    rewardValue1 = "Eligible";
                }
                ProductRewardDataArray.push(
                    {
                        ProductRewardID: value.ProductRewardID,
                        RewardName: value.Rewards.RewardName,
                        RewardValue:rewardValue1,
                    }
                );
            }
        });
        //id array
        ProductRewardIDArray.push(ProductRewardID);
        this.props.storeProductRewardIDArray(ProductRewardIDArray);
        this.setState({
            ProductRewardIDArray
        })

        //data array
        ProductRewardDataArray.push({
            ProductRewardID: ProductRewardID,
            RewardName: RewardName,
            RewardValue: RewardValue
        });
        this.props.storeProductRewardDataArray(ProductRewardDataArray);
    }


    renderRewardsListScroller(){
        // console.log(this.props.rewardList);
        return this.props.rewardList.map((reward) => {
            if (reward.IsMandatory === false) {
                var rewardValue = '';
                if(reward.Rewards.RewardValue > 0){
                    rewardValue = "INR " +reward.Rewards.RewardValue;
                }else{
                    rewardValue = reward.Rewards.RewardTypeName;
                }
                return (

                    <div className="car__3" key={reward.ProductRewardID}>
                        <div className="grContentDiv">
                            <div className="grContentDivLeft">
                                <label className="iphone7Label">{reward.Rewards.RewardName}</label>
                                <label className="LuckyDip">{rewardValue}</label>
                                <div className="cutapple">
                                    <img src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="appleLogosmall" className="cardSmallLogo"/>

                                </div>
                            </div>
                            <div className="greenRewardChoose">
                                <input type="radio" name="greenReward" value="w" onClick={this.handleRadioClick.bind(this, reward.ProductRewardID, reward.Rewards.RewardName, rewardValue)}/>
                            </div>
                            <div className="grContentDivRight">
                                <img src={reward.Rewards.RewardPartner.RewardUrl} className="cardSmallImg"/>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }


    renderRewardsList(){
        // console.log(this.props.rewardList);
        return this.props.rewardList.map((reward) => {
            if (reward.IsMandatory === false) {
                var rewardValue = '';
                var rewardTill = '';
                var rewardTillPre= '';
                if(reward.Rewards.RewardValue > 0){
                    rewardValue = "INR " +reward.Rewards.RewardValue;

                    rewardTill = "Till "+reward.Rewards.EndDate;
                    rewardTill = <Moment format="Do MMM YY">{reward.Rewards.EndDate}</Moment>
                    rewardTillPre = "Till "
                }else{
                    rewardValue = reward.Rewards.RewardTypeName;
                    rewardTill = "Eligible";
                }
                return (

                    <li className="homepageCardContentLI" key={reward.ProductRewardID}>
                        <div className="homepageCardContent">
                            <div className="grContentDivLeft">
                                <label className="iphone7Label">{reward.Rewards.RewardName}</label>
                                <label className="LuckyDip">{rewardValue}</label>
                                <label className="LuckyDip">{rewardTillPre}{rewardTill}</label>
                                <div className="cutapple">
                                    <img src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="partnerLogo" className="cardSmallLogo"/>
                                </div>
                            </div>
                            <div className="greenRewardChoose">
                                <input type="radio" name="greenReward" value="" onClick={this.handleRadioClick.bind(this, reward.ProductRewardID, reward.Rewards.RewardName, rewardValue)}/>
                            </div>
                            <div className="grContentDivRight">
                                <img src={reward.Rewards.RewardUrl} alt="reward" className="cardSmallImg"/>
                            </div>
                        </div>
                    </li>
                );
            }
        });
    }



    renderMandatoryRewardsList(){
        // console.log(this.props.rewardList);
        return this.props.rewardList.map((reward) => {
            if (reward.IsMandatory === true) {
                var rewardValue = '';
                if(reward.Rewards.RewardValue > 0){
                    rewardValue = "INR " +reward.Rewards.RewardValue;
                }else{
                    rewardValue = reward.Rewards.RewardTypeName;
                }
                return (
                    <li className="greenRewordContentHolderLI" key={reward.ProductRewardID}>
                        <div className="divHeadinglabelHolder">
                            <label className="divHeadinglabel">{reward.Rewards.RewardTypeName}</label>
                        </div>
                        <div className="TopgrContentDiv">
                            <div className="grContentDivLeft">
                                <label className="iphone7Label">{reward.Rewards.RewardName}</label>
                                <label className="LuckyDip">{rewardValue}</label>
                                <div className="cutapple">
                                    <img src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="appleLogosmall" className="appleLogosmall"/>

                                </div>
                            </div>
                            <div className="grContentDivRight">
                                <img src={reward.Rewards.RewardPartner.RewardUrl} className="TopappleLogoBig"/>
                            </div>
                        </div>
                    </li>
                );
            }
        });
    }

    render(){
        return(
            <div>
                <br/>
                <div className="row">
                    <div className="divHeadinglabelHolder">
                        <label className="divHeadinglabel">Select 1 Green Reward</label>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="homepageCardContentHolder">
                                <ul className="homepageCardContentUL">
                                    {this.renderRewardsList()}
                                </ul>
                            </div>
                        </div>
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
    return bindActionCreators({ storeProductRewardIDArray, storeProductRewardDataArray }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GreenRewards);
