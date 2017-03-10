import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import GreenRewards from '../containers/green_rewards';
import FooterDiv from './footer.js';
import HeaderDiv from '../containers/common/header';
import RecycleUserDetail from '../containers/confirmation/confirm_recycle_user_detail';
import SubmitRecycleRequestButton from '../containers/confirmation/submit_recycle_request'

class ConfirmRecycleRequest extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentWillMount(){
        // if(this.props.makePagesActive.confirmation === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.confirmation.status === '0') {
        //     browserHistory.push('/');
        // }
    }

    render(){
        return(
            <div>
                <HeaderDiv productData={this.props.productData} userData={this.props.userData}/>
                <div className="separators"></div>

                <RecycleUserDetail />

                <div className="greenReword">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="devicelabelContent">
                                <label className="devicelabel">Green Rewards</label>
                            </div>
                            <GreenRewards />
                        </div>
                    </div>
                    <SubmitRecycleRequestButton />
                </div>

                <div className="separators"></div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData,
        makePagesActive: state.MakePagesActive,

    };
}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// }

export default connect(mapStateToProps, null)(ConfirmRecycleRequest);
