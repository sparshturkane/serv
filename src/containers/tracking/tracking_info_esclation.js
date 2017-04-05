import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ProgressBarHolder from './tracking_progress_bar_holder'
import { getConsumerServiceRequestDetails, sessionStorageHeaderActivePhone } from '../../actions/index';

//images
import escalate from '../../images/Escalate.png';
import request from '../../images/Request.png';

class TrackingInfoEsclation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGroupId : undefined,
            requestList : undefined,
            ConsumerProductName : undefined,
        };
        this.handleRequestDetail = this.handleRequestDetail.bind(this);
    }

    componentWillMount(){

        // console.log(this.props.recycleRequestList.data);

        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        const requestObj = {
            ConsumerID : SignUpData.data.ConsumerID,
            ServiceTypeID : [9,13]
        }
        this.props.getConsumerServiceRequestDetails(requestObj).then(()=>{
            // console.log(this.props.recycleRequestList.data);
            this.setState({
                requestList: this.props.recycleRequestList.data
            });
            // console.log(this.props.recycleRequestList);
            this.setProductName();
        })


        this.props.trackingList.Logs.map((track)=>{
            if (track.Hidden !== true) {
                // console.log("active");
                // console.log(track.DisplayInfo.GroupId);
                this.setState({
                    activeGroupId: track.DisplayInfo.GroupId
                });

            } else {
                // console.log("inactive");
            }
        });
    }

    setProductName(){
        // console.log("working outside");
        if (this.state.requestList !== undefined) {
            // console.log("working");
            this.state.requestList.map((requestList) => {
                // console.log("running");
                if (requestList.ConsumerServiceRequest.ConsumerServiceRequestID == this.props.ConsumerServiceRequestID) {

                    this.setState({
                        ConsumerProductName : requestList.ProductName
                    });
                    this.props.sessionStorageHeaderActivePhone(requestList.ProductName);
                }
            });
        }

    }

    generateTrackingInfoBar(){
        /**
        *
        1. get the active state from Logs.DisplaysInfo.GroupID
        2. store that active GroupID in state
        3. using that state then go to data.groupDetails.groupID
        4. i might not need it

        */
    }

    handleRequestDetail(){
        console.log('requestDetails clicked');
        // on this click we have to show confirmation page modified
        // make different request details page
        // understand service and preceed
    }

    renderRescheduleButtons(){
        if(this.props.trackingList.isReschedulable === true){
            return(
                <div className="EscalateHolder">

                    <span className="EscalateLabel">
                        <span className="escalteIMG">
                            <img src={escalate} />

                        </span>
                        <label className="EscalateText">
                            Escalate Request
                        </label>
                    </span>

                    <Link to={`/recycle-detail/${this.props.ConsumerServiceRequestID}`}>
                        <span className="EscalateLabel" onClick={this.handleRequestDetail}>
                            <span className="escalteIMG">
                                <img src={request} />

                            </span>
                            <label className="EscalateText">
                                Request Details
                            </label>
                        </span>
                    </Link>
                </div>
            );
        }

    }
    render(){
        return(
            <div className="pickupInfoHolder">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="pickupInfoContent">
                            <label className="congo">{this.state.ConsumerProductName}</label><br/>
                            <label className="recyle"> Track Recycle</label>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="EscalateHolder">

                            <span className="EscalateLabel">
                                <span className="escalteIMG">
                                    <img src={escalate} />

                                </span>
                                <label className="EscalateText">
                                    Escalate Request
                                </label>
                            </span>

                            <Link to={`/recycle-detail/${this.props.ConsumerServiceRequestID}`}>
                                <span className="EscalateLabel" onClick={this.handleRequestDetail}>
                                    <span className="escalteIMG">
                                        <img src={request} />

                                    </span>
                                    <label className="EscalateText">
                                        Request Details
                                    </label>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default TrackingInfoBar;

// export default RecycleRequestList;
function mapStateToProps(state) {
    return {
        recycleRequestList: state.ConsumerServicerequest.ConsumerServiceRequestDetails
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getConsumerServiceRequestDetails, sessionStorageHeaderActivePhone }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingInfoEsclation);
