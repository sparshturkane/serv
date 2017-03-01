// dependencies
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getConsumerServiceRequestTrackRequest } from '../../actions/index';

// pages
import HeaderDiv from '../common/header';
import TrackingInfoBar from './tracking_info_bar';
import TrackingSlider from './tracking_slider';

// images
import leftarrow from '../../images/leftarrow.png';
import rightarrow from '../../images/rightarrow.png';


class TrackingPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.params.ConsumerServiceRequestID);
        /**
        * done tracking
        1. have  ConsumerServiceRequestID
        2. call the service
        3. actions
        4. reducer

        */
    }

    componentWillMount(){

        const script = document.createElement("script");
        var t = document.createTextNode("$(function() {$('#first').carouseller({});});");
        script.appendChild(t);
        document.body.appendChild(script);


        const requestObj = {
            ConsumerServiceRequestID: this.props.params.ConsumerServiceRequestID,
        }
        this.props.getConsumerServiceRequestTrackRequest(requestObj)
    }

    render(){
        return(
            <div>
                <HeaderDiv productData={this.props.productData} userData={this.props.userData} />

                <div className="separators"></div>

                <TrackingInfoBar />

                <TrackingSlider />

                <div className="separators"></div>
            </div>
        );
    }
}

// export default TrackingPage;
function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData

    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getConsumerServiceRequestTrackRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackingPage);
