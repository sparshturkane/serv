import React from 'react';
import HeaderDiv from './common/header'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Moment from 'react-moment';

class GreenRewardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeRow: [],
        }
    }

    componentWillMount(){
        // this.renderRow();
    }

    // renderCol(){
    //     for (var i = 0; i < 2; i++) {
    //         return(
    //             <div className="col-lg-6 ">
    //                 <div className="cardRewardInfoHolder">
    //                     <div className="row">
    //                         <div className="col-lg-6 col-md-4 col-sm-5">
    //                             <div className="cardRewardInfoContent">
    //                                 <div className="grContentDiv">
    //                                     <div className="grContentDivLeft">
    //                                         <label className="iphone7Label">Flipkart Vouchers</label>
    //                                         <label className="LuckyDip">INR 300</label>
    //                                         <label className="LuckyDip">Till 5th Jan 17</label>
    //                                         <div className="cutapple">
    //                                             <img src="https://s3-ap-southeast-1.amazonaws.com/consumerappassets/Recycle-Rewards/Paytm_Logo.png" className="cardSmallLogo" />
    //                                         </div>
    //                                     </div>
    //                                     <div className="rewardBottomright">
    //                                         <img src="https://s3-ap-southeast-1.amazonaws.com/consumerappassets/Recycle-Rewards/Paytm_Reward.png " className="rewardBottomrightImg" />
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="col-lg-6 col-md-8 col-sm-7">
    //                             <div className="cardRewardInfoContentDetails">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
    //                                     incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
    //                                     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    //
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     }
    //
    // }

    // renderRow(){
    //     var rewardArrayCount = Math.ceil(5/2);
    //     console.log("rewardArrayCount "+rewardArrayCount);
    //     var storeRow = [];
    //     for (var i = 0; i < rewardArrayCount; i++) {
    //         console.log("run---");
    //         storeRow.push(
    //             <div className="row">
    //                 {this.renderCol()}
    //             </div>
    //         );
    //     }
    //     this.setState({
    //         storeRow: storeRow,
    //     })
    //
    // }

    // renderRowMap(){
    //     // var rowLoop =Math.ceil(this.props.rewardList.length/2);
    //     // var iCounter = 0;
    //     //
    //     // return this.props.rewardList.map((reward) => {
    //     //     iCounter++;
    //     //     if (iCounter < rowLoop) {
    //     //         console.log(iCounter+"runs--" +rowLoop);
    //             return(
    //
    //             );
    //     //     }
    //     // });
    // }

    renderColMap(){
        return this.props.rewardList.map((reward) => {
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
            return(
                <div className="col-lg-6 " key={reward.ProductRewardID}>
                    <div className="cardRewardInfoHolder">
                        <div className="row">
                            <div className="col-lg-6 col-md-4 col-sm-5">
                                <div className="cardRewardInfoContent">
                                    <div className="grContentDiv">
                                        <div className="grContentDivLeft">
                                            <label className="iphone7Label">{reward.Rewards.RewardName}</label>
                                            <label className="LuckyDip">{rewardValue}</label>
                                            <label className="LuckyDip">{rewardTillPre}{rewardTill}</label>
                                            <div className="cutapple">
                                                <img src={reward.Rewards.RewardPartner.PartnerLogoUrl} alt="partnerLogo" className="cardSmallLogo" />
                                            </div>
                                        </div>
                                        <div className="rewardBottomright">
                                            <img src={reward.Rewards.RewardUrl} alt="reward" className="rewardBottomrightImg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-8 col-sm-7">
                                <div className="cardRewardInfoContentDetails">
                                    {reward.Rewards.Description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }



    render(){
        return(
            <div>
                <HeaderDiv/>
                <div className="separators"></div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="rewordInfoHolder">
                            <label className="congo">About</label><br/>
                            <label className="recyle">Green Rewards</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="rewordInfoMenu ">
                            <div className="AddressHolderContentTOP">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="SaveAddress SaveAddressActive">Rewards Voucher</label>
                                        {/* <label className="SaveAddress ">Lucky Dip</label> */}
                                        <div className="newCancelHolder">
                                            <Link to={'/home'} >
                                                <span className="escalteIMG">
                                                    <img src="images/cancel.png" className="cancelIMG" />
                                                </span><label className="cancelText">Close</label>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>
                {/* main row then cols */}
                <div className="row">
                    {this.renderColMap()}
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

// export default GreenRewardInfo;

function mapStateToProps(state) {
    return {
        rewardList: state.rewardsList.rewardsListData,
        ProductName: state.productData.ProductName
    };
}

export default connect(mapStateToProps, null)(GreenRewardInfo);
