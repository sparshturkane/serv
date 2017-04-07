import React from 'react';
import { browserHistory } from 'react-router';
import HeaderDiv from '../common/header';
import settingLogo from '../../images/SettingsFill.png';

// browserHistory.push('/edit-profile-new');
class ViewSettings extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout  = this.handleLogout.bind(this);
    }

    handleLogout(){
        // here remove all the stored data in local storage
        localStorage.clear();
        browserHistory.push('/home');
    }

    render(){
        return(
            <div>
                <HeaderDiv settingLogo={settingLogo}/>
                <div className="separators"></div>
                    <div className="pickupInfoHolder">
                        <div className="yourDetailsHolderTOP">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="yourDetailsLabel">
                                        <label className="congo">Your</label><br/>
                                        <label className="recyle">Setting</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">

                                </div>
                            </div>
                        </div>
                        <div className="NewnotificationHolder">
                            <div className="row ">
                                {/*
                                    <div className="col-sm-8 borderSetting">
                                        <div className="NewnotificationDiv ">
                                            <span className="notificationContent">Send me an email about other offering from Servify
                                            </span>
                                            <span className="NewnotificationCheckBox">
                                                <input type="checkbox" id="c1" name="cc" />
                                                <label for="c1" className=""><span></span></label>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 borderSetting">
                                        <div className="NewnotificationDiv">
                                            <span className="notificationContent">Send me an push notification about other offering from Servify</span>
                                            <span className="NewnotificationCheckBox">
                                                <input type="checkbox" id="c2" name="cc" />
                                                <label for="c2" className=""><span></span></label>
                                            </span>
                                        </div>
                                    </div>
                                */}

                                <div className="col-sm-8 borderSetting">
                                    <div className="NewnotificationDiv">
                                        <span className="notificationContent">About Servify</span>
                                        <span className="NewnotificationCheckBox">
                                            <img src="images/rightNewPage.png" className="aboutServify"/>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-sm-8 borderSetting">
                                    <div className="NewnotificationDiv" >
                                        <span className="notificationContent" style={{cursor: "pointer"}} onClick={this.handleLogout} >Logout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default ViewSettings;
