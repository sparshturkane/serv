import React from 'react';
import heart from '../images/heart.png';

class HeaderDiv extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div className="topHadder row">
                <div className="heartHolder col-sm-6">
                    <img src={heart} className="heartImg" alt="Heart" />
                    <span className="topHeading">iPhone 4 Recycle</span>
                </div>
                <div className="col-sm-6"></div>
            </div>
        );
    }
}

export default HeaderDiv;
