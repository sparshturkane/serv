import React from 'react';

class TrackingInfoBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="pickupInfoHolder">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="pickupInfoContent">
                            <label className="congo">iPhone 4 </label><br/>
                            <label className="recyle"> Track Recycle</label>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="progressBarHolder">
                            <div className="progressBarContent">
                                <div className="myProgress1">
                                    <div className="myBar1"></div>
                                </div>
                            </div>
                            <ul className="progressBarUL">
                                <li className="progressBarLI activeState">PICKUP</li>
                                <li className="progressBarLI activeState">RECEIVED</li>
                                <li className="progressBarLI currentState">REWARDS</li>
                                <li className="progressBarLI">RECYCLE</li>
                                <li className="progressBarLI">FEEDBACK</li>
                            </ul>
                            <ul className="spriteIMGUL">
                                <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                                <li className="spriteIMGLI activeState"><span className="newCircleBox activeCircle"></span></li>
                                <li className="spriteIMGLI currentState"><span className="newCircleBox currentCircleBox"></span></li>
                                <li className="spriteIMGLI"><span className="newCircleBox"></span></li>
                                <li className="spriteIMGLI"><span className="newCircleBox"></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackingInfoBar;
