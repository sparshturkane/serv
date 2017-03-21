// dependencies
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getConsumerServiceRequestTrackRequest } from '../../actions/index';

// pages
import HeaderDiv from '../common/header';
import TrackingInfoEsclation from './tracking_info_esclation';
import TrackingInfoBar from './tracking_info_bar';
import TrackingSlider from './tracking_slider';

// images
import leftarrow from '../../images/leftarrow.png';
import rightarrow from '../../images/rightarrow.png';



class TrackingPage extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.params.ConsumerServiceRequestID);
        /**
        * done tracking
        1. have  ConsumerServiceRequestID
        2. call the service
        3. actions
        4. reducer

        */
        this.state = {
            trackingList : undefined
        }
    }

    componentWillMount(){
        const requestObj = {
            ConsumerServiceRequestID: this.props.params.ConsumerServiceRequestID,
        }
        this.props.getConsumerServiceRequestTrackRequest(requestObj).then(()=>{
            this.setState({
                trackingList: this.props.trackingList.data
            });
        })
    }

    render(){
        return(
            <div>
                <HeaderDiv productData={this.props.productData} userData={this.props.userData}/>

                <div className="separators"></div>

                {this.state.trackingList !== undefined &&
                    <TrackingInfoEsclation
                        trackingList={this.state.trackingList}
                        ConsumerServiceRequestID={this.props.params.ConsumerServiceRequestID}
                    />
                }
                <hr className="hrmargin"/>

                {this.state.trackingList !== undefined &&
                    <TrackingInfoBar
                        trackingList={this.state.trackingList}
                        ConsumerServiceRequestID={this.props.params.ConsumerServiceRequestID}
                    />
                }

                {this.state.trackingList !== undefined &&
                    <TrackingSlider
                        trackingList={this.state.trackingList}
                    />
                }

                <div className="separators"></div>
            </div>
        );
    }
}

// export default TrackingPage;
function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData,
        trackingList: state.ConsumerServicerequest.ConsumerServiceRequestTrackRequest,

    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getConsumerServiceRequestTrackRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage);
