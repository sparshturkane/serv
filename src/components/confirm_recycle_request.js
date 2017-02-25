import React from 'react';
import GreenRewards from '../containers/green_rewards';
import FooterDiv from './footer.js';

class ConfirmRecycleRequest extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div>
                <div className="topHadder row">
                    <div className="heartHolder col-sm-6">
                        <img
                            src="images/heart.png"
                            className="heartImg"
                            alt="Heart" />
                        <span className="topHeading">
                            iPhone 4 Recycle
                        </span>
                    </div>
                    <div className="col-sm-6">
                        <div className="userContent">
                            <ul className="userContentUL">
                                <li className="userContentLI">
                                    <label>
                                        Amit Nanda
                                    </label>
                                </li>
                                <li className="userContentLI">
                                    <img src="images/user.png" alt="user" />
                                </li>
                                <li className="userContentLI">
                                    <img src="images/bell.png" alt="Bell" />
                                </li>
                                <li className="userContentLI">
                                    <img src="images/setting.png" alt="Setting" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>

                <div className="pickupInfoHolder">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="pickupInfoContent">
                                <label className="congo">Congratulations!</label><br />
                                <label className="recyle"> Recycle Request is Registered.</label>
                                <div className="deviceInfo">
                                    <div className="col-sm-3">
                                        <label className="devicelabel">Device</label><br />
                                        <label className="deciceInfoLabel">iPhone 4</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="devicelabel">Pickup Location</label><br />
                                        <label className="deciceInfoLabel">1022, Solitare Corporate Park, Chakala, Andheri</label>
                                    </div>
                                    <div className="col-sm-3">
                                        <label className="devicelabel">Pickup Date</label><br />
                                        <label className="deciceInfoLabel">03 January 2017</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>

                <div className="greenReword">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="devicelabelContent">
                                <label className="devicelabel">Green Rewards</label>
                            </div>
                            <GreenRewards />
                        </div>
                    </div>


                    <div className="row submitButton">
                        <div className="col-sm-4">
                            <button type="button" className="pickUPlargebutton">Submit</button>
                        </div>
                        <div className="col-sm-8"></div>
                    </div>
                </div>

                <div className="separators"></div>
            </div>

        );
    }
}

export default ConfirmRecycleRequest;
