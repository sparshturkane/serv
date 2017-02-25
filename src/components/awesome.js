import React from 'react';
import HeaderDiv from '../containers/common/header';

class AwesomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <HeaderDiv />
                <div className="separators"></div>

                <div className="awesomeInfoHolder">
                    <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">
                            <div className="awesomeInfoContent">
                                <label className="awesomeLabel">Awesome!!!</label>
                                <div className="earthHolder">
                                    <img src="images/Earth.png" className="earth" alt="Earth"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4"></div>
                    </div>

                    <div className="row awesometextHolder">
                        <div className="col-sm-2 col-md-3"></div>
                        <div className="col-sm-8 col-md-6">
                            <label className="betterPlace">You made this world a better place.</label><br/>
                            <p className="recyclingHub">You will receive your Green Rewards once your device is received at the recycling hub.</p><br/>
                            <button type="button" className="pickUPlargebutton">Continue</button>
                        </div>
                        <div className="col-sm-2 col-md-3"></div>
                    </div>
                </div>

                <div className="separators"></div>
            </div>
        );
    }
}

export default AwesomePage;
