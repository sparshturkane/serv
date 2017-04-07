import React from 'react';
import HeaderDiv from '../common/header';
import bellLogo from '../../images/bellFill.png';
class ViewNotification extends React.Component {
    constructor(props) {
        super(props);
    }

    renderNotification(){
        return(
            <div className="notificationDiv notificationDivBorder">
                <label className="notificationLabel">Servify</label>
                <span className="notificationContent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </span>
            </div>
        );
    }

    render(){
        return(
            <div>
                <HeaderDiv bellLogo={bellLogo}/>
                <div className="separators"></div>
                <div className="pickupInfoHolder">
                    <div className="yourDetailsHolderTOP">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="yourDetailsLabel">
                                    <label className="congo">Your</label><br/>
                                    <label className="recyle">Notifications</label>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="editContent">
                                    <label className="editContentLabel">Edit</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notificationHolder">
                        <div className="row">
                            {/* <div className="activeDIVCircle"></div> */}
                            {this.renderNotification()}
                        </div>
                    </div>
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

export default ViewNotification;
