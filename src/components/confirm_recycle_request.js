import React from 'react';
import GreenRewards from '../containers/green_rewards';
import FooterDiv from './footer.js';
import HeaderDiv from '../containers/common/header';
import RecycleUserDetail from '../containers/confirmation/confirm_recycle_user_detail';
import SubmitRecycleRequestButton from '../containers/confirmation/submit_recycle_request'

class ConfirmRecycleRequest extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div>
                <HeaderDiv />
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

export default ConfirmRecycleRequest;
