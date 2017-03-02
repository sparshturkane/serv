import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressBarHolder from './tracking_progress_bar_holder'
import { getConsumerServiceRequestDetails } from '../../actions/index';

class TrackingInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGroupId : undefined,
            requestList : undefined,
            ConsumerProductName : undefined,
        }
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
        console.log("working outside");
        if (this.state.requestList !== undefined) {
            console.log("working");
            this.state.requestList.map((requestList) => {
                // console.log("running");
                if (requestList.ConsumerServiceRequest.ConsumerServiceRequestID == this.props.ConsumerServiceRequestID) {

                    this.setState({
                        ConsumerProductName : requestList.ConsumerProductName
                    })
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
    render(){
        return(
            <div className="pickupInfoHolder">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="pickupInfoContent">
                            <label className="congo">{this.state.ConsumerProductName}</label><br/>
                            <label className="recyle"> Track Recycle</label>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        {this.state.activeGroupId !== undefined &&
                            <ProgressBarHolder GroupId={this.state.activeGroupId} trackingList={this.props.trackingList}/>
                        }
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
    return bindActionCreators({ getConsumerServiceRequestDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingInfoBar);
