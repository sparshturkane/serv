// dependencies
import React from 'react';
import { browserHistory } from 'react-router';

// javascript pages
import ChooseDeviceHolder from '../containers/all_mobiles';
import RewardList from '../containers/rewards_list';
class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        // console.log(SignUpData);
        // if (SignUpData !== null) {
        // if (SignUpData !== null) {
        //     browserHistory.push('/dashboard');
        // } else {
        //     browserHistory.push('/');
        // }
    }

    render(){
        return(
            <div>

                {/* spotlight swiper */}
                <div className="row">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">

                        <div className="spotHolder">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide" id="sliderSpot1">
                                        <div className="sliderDiv">
                                            <div className="topImg"><img src="images/whiteheart.png" alt="whiteHeart"/>
                                            </div>
                                            <div className="appstoreLogo">
                                                <a href="#">
                                                    <img src="images/appstore.png" alt="appstore"/>
                                                </a>
                                            </div>
                                            <div className="middelContent">
                                                <span className="firstTextLabel">Unlock A Better Planet</span>
                                                <br />
                                                <span className="secondTextLabel">E-waste is not what our planet deserves.</span>
                                                <br />
                                                <div className="recyleHomeBtnHolder">
                                                    <button type="button" className="recyleHomeBtn">Recycle your Apple device</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide" id="sliderSpot2">
                                        <div className="sliderDiv">
                                            <div className="topImg"><img src="images/heart.png" alt="heart"/>
                                            </div>
                                            <div className="appstoreLogo">
                                                <a href="#"><img src="images/appstore.png" alt="appstore"/>
                                                </a>
                                            </div>
                                            <div className="middelContent">
                                                <span className="nextfirstTextLabel">Your Dead iPhone  </span>
                                                <br />
                                                <span className="nextsecondTextLabel">Can Keep The Planet Alive.</span>
                                                <br />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide" id="sliderSpot3">
                                        <div className="sliderDiv">
                                            <div className="topImg"><img src="images/heart.png" alt="heart"/>
                                            </div>
                                            <div className="appstoreLogo">
                                                <a href="#"><img src="images/appstore.png" alt="appstore"/>
                                                </a>
                                            </div>
                                            <div className="middelContent">
                                                <span className="nextfirstTextLabel">Dispose Responsibly </span>
                                                <br />
                                                <span className="nextsecondTextLabel">& Get Rewarded For It</span>
                                                <br />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="swiper-slide" id="sliderSpot4">
                                        <div className="sliderDiv">
                                            <div className="topImg"><img src="images/heart.png" alt="heart"/>
                                            </div>
                                            <div className="appstoreLogo">
                                                <a href="#"><img src="images/appstore.png" alt="appstore"/>
                                                </a>
                                            </div>
                                            <div className="middelContent">
                                                <span className="nextfirstTextLabel">Completely Secure </span>
                                                <br />
                                                <span className="nextsecondTextLabel">Process With Tracebility</span>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="swiper-pagination"></div>

                            </div>
                        </div>



                    </div>
                </div>

                {/* ChooseDeviceHolder */}
                <ChooseDeviceHolder />
                {/* ..//ChooseDeviceHolder */}

                {/* rewards based on perticular device */}
                <RewardList />
                {/* ..//rewards based on perticular device */}

                <div className="separators"></div>


                {/* bottom carouseller */}
                <div className="row">
                    <div className="mySlider">
                        <div id="fifth" className="carouseller carousellerpaddingHome">
                            <a href="javascript:void(0)" className="carouseller__left">
                                <img src="images/homeleftarrow.png" alt="left Arrow" className="homePageleftArro"/>
                            </a>
                            <div className="carouseller__wrap">
                                <div className="carouseller__list">
                                    <div className="car__7">
                                        <div className="homepageBoxSlider1">
                                            <div className="homepageBoxContent">
                                                <label className="HomepageTopBoxLabel">Track Recycle</label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">Request</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car__7">
                                        <div className="homepageBoxSlider2">
                                            <div className="homepageBoxContent">

                                                <label className="HomepageTopBoxLabel">Download</label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">& Recycle</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car__7">
                                        <div className="homepageBoxSlider3">
                                            <div className="homepageBoxContent">

                                                <label className="HomepageTopBoxLabel">Pledge</label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">& Invite</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car__7">
                                        <div className="homepageBoxSlider1">
                                            <div className="homepageBoxContent">

                                                <label className="HomepageTopBoxLabel">Track Recycle </label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">Request</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car__7">
                                        <div className="homepageBoxSlider2">
                                            <div className="homepageBoxContent">

                                                <label className="HomepageTopBoxLabel">Pledge</label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">& Invite</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car__7">
                                        <div className="homepageBoxSlider1">
                                            <div className="homepageBoxContent">

                                                <label className="HomepageTopBoxLabel">Pledge</label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">& Invite</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="car__7">
                                        <div className="homepageBoxSlider2">
                                            <div className="homepageBoxContent">

                                                <label className="HomepageTopBoxLabel">Track Recycle</label>
                                                <br />
                                                <label className="homepageCenterBoxLabel">Request</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:void(0)" className="carouseller__right">
                                <img src="images/homerightarrow.png" alt="Right Arrow" className="homePagerightArro"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>

            </div>
        );
    }
}

export default Home;
