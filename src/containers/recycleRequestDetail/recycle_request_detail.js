import React from 'react';
import Moment from 'react-moment';
import HeaderDiv from '../common/header';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { getConsumerServiceRequestRecycleDetails, consumerServicerequestCancelRequest, reschedulePickupData, rescheduleDropoffData, consumerServicerequestRescheduleSlots } from '../../actions/index';

// images
import reschedule from '../../images/reshedule.png';
import cancel from '../../images/cancel.png';
//getConsumerServiceRequestRecycleDetails
class RecycleRequestDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recycleDetail: undefined,
        };
        this.handleCancelRecycleRequest = this.handleCancelRecycleRequest.bind(this);
        this.handleRescheduleRecycleRequest = this.handleRescheduleRecycleRequest.bind(this);
    }

    componentWillMount(){
        var ConsumerServiceRequestID = this.props.params.ConsumerServiceRequestID;
        // before components mount we will get necessary details
        var requestObj = {
            ConsumerServiceRequestID : ConsumerServiceRequestID
        }
        this.props.getConsumerServiceRequestRecycleDetails(requestObj).then(()=>{
            this.setState({
                recycleDetail: this.props.recycleDetail.data
            });

            (new Date()).toLocaleTimeString();

            var rescheduleSlotsRequestObj = {
                ConsumerServiceRequestID,
                CurrentDate : (new Date()).toISOString().split('T')[0],
                CurrentTime : (new Date()).toLocaleTimeString()
            }
            this.props.consumerServicerequestRescheduleSlots(rescheduleSlotsRequestObj);
        })
    }

    rewardsListold(){
        // console.log(this.props.rewardList);
        if( this.props.recycleDetail!== undefined){
            return this.props.recycleDetail.data.ProductReward.map((reward) => {
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

        // return(<li>sparsh</li>);

    }

    rewardsList(){
        // console.log(this.props.rewardList);
        if( this.props.recycleDetail!== undefined){
            return this.props.recycleDetail.data.ProductReward.map((reward) => {
                var rewardValue = '';
                if(reward.Rewards.RewardValue > 0){
                    rewardValue = "INR " +reward.Rewards.RewardValue;
                }else{
                    rewardValue = "Eligible";
                }
                return (
                    <li className="conformDivLI" key={reward.ProductRewardID}>
                        <div className="conformDiv">
                            <label className="iphone7Label">{reward.Rewards.RewardName}</label>
                            <label className="LuckyDip">{rewardValue}</label>
                        </div>
                    </li>
                );
            });
        }

        // return(<li>sparsh</li>);

    }

    handleCancelRecycleRequest(){
        // console.log("cancel");
        var cancelRequest = {
            ConsumerServiceRequestID: this.props.params.ConsumerServiceRequestID,
            Remarks: ""
        }
        this.props.consumerServicerequestCancelRequest(cancelRequest).then(()=>{
            browserHistory.push('/dashboard');
        })
    }

    handleRescheduleRecycleRequest(){
        // console.log("reschedule");
        // base on service typeID redirect to pickup or drop off page
        // on the bases of avaliable modes display pickup or drop off page
        // console.log(this.state.recycleDetail.servicetype.ServiceTypeID);
        var ServiceTypeID = this.state.recycleDetail.servicetype.ServiceTypeID
        if (ServiceTypeID==9) {
            // pickup
            this.props.reschedulePickupData(this.state.recycleDetail);
            browserHistory.push('/reschedule-pickup');

        } else if(ServiceTypeID==13) {
            // dropoff
            this.props.rescheduleDropoffData(this.state.recycleDetail);
            browserHistory.push('/reschedule-dropoff');

        }
    }

    renderRescheduleRequest(){
        // isCancelable
        // isReschedulable
        if (this.props.trackingList.isReschedulable === true) {
            return(
                <span className="resheduleHolder">
                    <button type="button" onClick={this.handleRescheduleRecycleRequest} className="resheduleCancel">
                        <span className="resheduleImg">
                            <img src={reschedule} />

                        </span> Reschedule Request
                    </button>
                </span>
            );
        }

    }

    renderCancelRequest(){
        if (this.props.trackingList.isCancelable === true) {
            return(
                <span className="submitButtonHolder">
                    <button type="button" onClick={this.handleCancelRecycleRequest} className="resheduleCancel">
                        <span className="resheduleImg">
                            <img src={cancel} />

                        </span> Cancel Request
                    </button>
                </span>
            );
        }

    }

    renderLocation(){
        if(this.props.recycleDetail.data.ServiceTypeID == 9){
            return(
                <div className="col-sm-6">
                    <label className="devicelabel">Pickup Location</label><br />
                    <label className="deciceInfoLabel">{this.props.recycleDetail.data.Address}</label>
                </div>
            );
        } else {
            <div className="col-sm-6">
            </div>
        }

    }

    renderDate(){
        if(this.props.recycleDetail.data.ServiceTypeID == 9){
            return(
                <div className="col-sm-3">
                    <label className="devicelabel">Pickup Date</label><br />

                    <label className="deciceInfoLabel">
                        <Moment format="DD MMMM YYYY">{this.props.recycleDetail.data.ScheduledDateTime}</Moment>
                    </label>
                </div>
            );
        } else if(this.props.recycleDetail.data.ServiceTypeID == 13){
            return(
                <div className="col-sm-3">
                    <label className="devicelabel">DropOff Date</label><br />

                    <label className="deciceInfoLabel">
                        <Moment format="DD MMMM YYYY">{this.props.recycleDetail.data.ScheduledDateTime}</Moment>
                    </label>
                </div>
            );
        }
    }
    render(){

        return(

            <div>
                {this.state.recycleDetail !== undefined &&
                    <HeaderDiv ProductName={this.props.recycleDetail.data.product.ProductName}/>
                }

                <div className="separators"></div>

                {this.state.recycleDetail !== undefined &&
                    <div className="pickupInfoHolder">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="pickupInfoContent">
                                    <label className="congo"> Request</label><br />
                                    <label className="recyle"> Details</label>
                                    <div className="deviceInfo">
                                        <div className="col-sm-3">
                                            <label className="devicelabel">Device</label><br />
                                            <label className="deciceInfoLabel">{this.props.recycleDetail.data.product.ProductName}</label>
                                        </div>
                                        {this.renderLocation()}
                                        {this.renderDate()}
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-4"></div>
                        </div>
                    </div>
                }

                <div className="greenReword">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="devicelabelContent">
                                <label className="devicelabel">Green Rewards</label>
                            </div>
                            <div className="conformDivHolder">
                                <ul className="conformDivUL">
                                    {this.rewardsList()}
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="row submitButton">
                        <div className="col-sm-12">
                            {this.renderRescheduleRequest()}
                            {this.renderCancelRequest()}
                            {/*
                                <span className="resheduleHolder">
                                    <button type="button" onClick={this.handleRescheduleRecycleRequest} className="resheduleCancel">
                                        <span className="resheduleImg">
                                            <img src={reschedule} />

                                        </span> Reschedule Request
                                    </button>
                                </span>
                                <span className="submitButtonHolder">
                                    <button type="button" onClick={this.handleCancelRecycleRequest} className="resheduleCancel">
                                        <span className="resheduleImg">
                                            <img src={cancel} />

                                        </span> Cancel Request
                                    </button>
                                </span>
                            */}
                        </div>
                    </div>
                </div>
                <div className="separators"></div>

            </div>

        );

    }
}

// export default RecycleRequestDetail;
function mapStateToProps(state) {
    return {
        recycleDetail: state.ConsumerServicerequest.ConsumerServiceRequestRecycleDetail,
        trackingList: state.ConsumerServicerequest.ConsumerServiceRequestTrackRequest.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getConsumerServiceRequestRecycleDetails, consumerServicerequestCancelRequest, reschedulePickupData, rescheduleDropoffData, consumerServicerequestRescheduleSlots }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecycleRequestDetail);
