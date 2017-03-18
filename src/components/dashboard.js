import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
// import './swiperlocal.js';
// BUG: swiper is not working
import whiteHeart from '../images/whiteheart.png';
import appstore from '../images/appstore.png';
import heart from '../images/heart.png';
import iphone4 from '../images/iphone4.png';
import rightarrow from '../images/rightarrow.png';
import RecycleRequestList from '../containers/dashboard/recycle_request_list';

class LoggedInDashboard extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount(){
        // unauthorized users cannot use the page
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        if (SignUpData == null) {
            browserHistory.push('/');
            // browserHistory.go(1);
        }

        // const script = document.createElement("script");
        // var t = document.createTextNode(`var swiper = new Swiper('.swiper-container', {
        //     pagination: '.swiper-pagination',
        //     nextButton: '.swiper-button-next',
        //     prevButton: '.swiper-button-prev',
        //     slidesPerView: 1,
        //     paginationClickable: true,
        //     spaceBetween: 30,
        //     loop: true
        // });`);
        // script.appendChild(t);
        // document.body.appendChild(script);

    }

    componentDidMount(){
        const script = document.createElement("script");
        var t = document.createTextNode("var swiper = new Swiper('.swiper-container', {"+
            "pagination: '.swiper-pagination',"+
            "nextButton: '.swiper-button-next',"+
            "prevButton: '.swiper-button-prev',"+
            "slidesPerView: 1,"+
            "paginationClickable: true,"+
            "spaceBetween: 30,"+
            "loop: true"+
        "});");
        script.appendChild(t);
        document.body.appendChild(script);
    }
    
    pushHomePage(){
        browserHistory.push('/home');
    }
    render(){
        return(
            <div>
                {/* Swiper */}
                <div className="row">
                    <div className="spotHolder">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide" id="sliderSpot5">
                                    <div className="sliderDiv">
                                        <div className="topImg"><img src={whiteHeart} alt="whiteHeart"/ ></div>
                                        <div className="appstoreLogo">
                                            <a href="#">
                                                <img src={appstore} alt="appstore" />
                                            </a>
                                        </div>
                                        <div className="middelContent">
                                            <span className="firstTextLabel">Make This World A Better Place</span><br />
                                            <span className="secondTextLabel">Take a pledge & Spread the word</span><br />
                                            <div className="recyleHomeBtnHolder">
                                                <button type="button" className="recyleHomeBtn" onClick={this.pushHomePage.bind(this)}>Recycle your Apple device</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-slide" id="sliderSpot2">
                                    <div className="sliderDiv">
                                        <div className="topImg"><img src={heart} alt="heart" /></div>
                                        <div className="appstoreLogo"><a href="#"><img src={appstore} alt="appstore"/></a></div>
                                        <div className="middelContent">
                                            <span className="nextfirstTextLabel">Your Dead iPhone  </span><br />
                                            <span className="nextsecondTextLabel">Can Keep The Planet Alive.</span><br />
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-slide" id="sliderSpot3">
                                    <div className="sliderDiv">
                                        <div className="topImg"><img src={heart} alt="heart" /></div>
                                        <div className="appstoreLogo"><a href="#"><img src={appstore} alt="appstore" /></a></div>
                                        <div className="middelContent">
                                            <span className="nextfirstTextLabel">Dispose Responsibly </span><br />
                                            <span className="nextsecondTextLabel">& Get Rewarded For It</span><br />
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-slide" id="sliderSpot4">
                                    <div className="sliderDiv">
                                        <div className="topImg"><img src={heart} alt="heart" /></div>
                                        <div className="appstoreLogo"><a href="#"><img src={appstore} alt="appstore" /></a></div>
                                        <div className="middelContent">
                                            <span className="nextfirstTextLabel">Completely Secure </span><br/>
                                            <span className="nextsecondTextLabel">Process With Tracebility</span><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Add Pagination */}
                            <div className="swiper-pagination"></div>
                            {/* Add Arrows */}
                        </div>
                    </div>
                </div>
                {/* Swiper JS */}

                {/* main content */}
                <div className="row">
                    <RecycleRequestList />
                    <div className="col-sm-6">
                        <div className="row trackHolder">
                            <div className="col-sm-12">
                                <div className="trackHolderContent">
                                    <label className="trackLabel">Recycle </label>

                                    <label className="requestlabel"> Other iPhone</label>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="phoneLabelHolderContent">
                                    <div className="col-sm-6">
                                        <div className="loggedrightArrowHolder phoneLabelHolderTab">
                                            <Link to={`/home`} >
                                                <label  className="raisedLabel REQUESTColor">ADD ANOTHER DEVICE
                                                    <img src={rightarrow} className="loggedrightArrow" alt="leftarrow" />
                                                </label>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-sm-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// main content */}
                {/* footer */}
                <div className="separators"></div>

            </div>

        );
    }
}

export default LoggedInDashboard;
