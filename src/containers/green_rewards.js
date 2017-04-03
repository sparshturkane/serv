import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { storeProductRewardIDArray  } from '../actions/index';

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
    handleRadioClick(ProductRewardID){
        console.log("radio clicked!"+ProductRewardID);
        // what we should do is map the array and push
        var ProductRewardIDArray = [];
        this.props.rewardList.map((value) => {
            if (value.IsMandatory === true) {
                ProductRewardIDArray.push(value.ProductRewardID);
            }
        });
        ProductRewardIDArray.push(ProductRewardID);
        this.props.storeProductRewardIDArray(ProductRewardIDArray);
        this.setState({
            ProductRewardIDArray
        })
    }


    renderRewardsList(){
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
                                <input type="radio" name="greenReward" value="w" onClick={this.handleRadioClick.bind(this, reward.ProductRewardID)}/>
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
                <div className="row">
                    <div className="divHeadinglabelHolder">
                        <label className="TopdivHeadinglabel">Green Rewards</label>
                    </div>
                    <div className="col-sm-12">
                        <div className="NewTOPgreenRewordContentHolder">
                            <ul className="topgreenRewordContentHolderUL">
                                {this.renderMandatoryRewardsList()}
                            </ul>
                        </div>
                    </div>
                </div>
                <br/>
                    <div className="row">
                        <div className="divHeadinglabelHolder">
                            <label className="divHeadinglabel">Select 1 Green Reward</label>
                        </div>
                        <div className="col-sm-12">
                            <div className="greenCardHolder">
                            <div id="first" className="carouseller carousellerHomeRadioSMall carousellerHomeRadio ">
                                <a href="javascript:void(0)" className="carouseller__left"><img src="images/leftarrow.png" alt="leftarrow" className="homePageleftArro"/></a>
                                <div className="carouseller__wrap">
                                    <div className="carouseller__list">
                                        {this.renderRewardsList()}
                                    </div>
                                </div>
                                <a href="javascript:void(0)" className="carouseller__right"><img src="images/rightarrow.png" alt="rightarrow" className="homePagerightArro"/></a>
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
    return bindActionCreators({ storeProductRewardIDArray }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GreenRewards);
