import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { getConsumerServiceRequestDetails, consumerGetProfile } from '../../actions/index';

import React from 'react';
import iphone4 from '../../images/iphone4.png';
import rightarrow from '../../images/rightarrow.png';

class RecycleRequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestList : []
        }
    }

    componentWillMount(){
        /**
        * steps
        1. make action creater //done
        2. make redux //done
        3. wire that redux to page //done
        $. find the props to make the call
        4. connect and then map in here
        */
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
            const userIDObj = {
                ConsumerID : SignUpData.data.ConsumerID
            }
            this.props.consumerGetProfile(userIDObj);
        })
    }

    recycleDevicesList(){
        // console.log(this.props.recycleRequestList);
        return this.state.requestList.map((requestList) => {
            return (
                <div className="col-sm-12" key={requestList.ConsumerProductID}>
                    <div className="phoneLabelHolderContent">
                        <div className="col-sm-4 ">
                            <div className="phoneLabelHolderTab">
                                <img src={iphone4} className="iphone4" alt="iphone4" />
                                <label className="phoneLabel">{requestList.ProductName}</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="phoneLabelHolderTab">
                                <label className="raisedLabel">{requestList.ConsumerServiceRequest.Status}</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="loggedrightArrowHolder phoneLabelHolderTab">
                                <Link to={`/tracking/${requestList.ConsumerServiceRequest.ConsumerServiceRequestID}`}>
                                    <label className="raisedLabel REQUESTColor">TRACK REQUEST
                                        <img src={rightarrow} className="loggedrightArrow" alt="rightarrow" />
                                    </label>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        return(
            <div className="col-sm-6">
                <div className="row trackHolder">
                    <div className="col-sm-12">
                        <div className="trackHolderContent">
                            <label className="trackLabel">Track Your</label>

                            <label className="requestlabel"> Recycle Request</label>
                        </div>
                    </div>
                    {/* {this.recycleDevicesList()} */}
                    {this.recycleDevicesList()}

                </div>
            </div>
        );
    }
}

// export default RecycleRequestList;
function mapStateToProps(state) {
    return {
        recycleRequestList: state.ConsumerServicerequest.ConsumerServiceRequestDetails
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getConsumerServiceRequestDetails, consumerGetProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecycleRequestList);
