import React from 'react';
import leftarrow from '../../images/leftarrow.png';
import rightarrow from '../../images/rightarrow.png';

class TrackingSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="tracksliderHolder">
                <div className="row">
                    <div id="first" className="carouseller carousellerMargin">
                        <div className="tracksliderHolderMargin">
                            <a href="javascript:void(0)" className="carouseller__left"><img src={leftarrow} alt="leftarrow"/></a>
                            <div className="carouseller__wrap">
                                <div className="carouseller__list">
                                    <div className="car__3">
                                        <div className="boxContentDiv">
                                            <div className="boxContentLabelDate"><label className="boxDate">22 JANUARY 2017</label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM</label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Pickup Request Raised copy</label></div>
                                        </div>
                                    </div>
                                    <div className="car__3">
                                        <div className="boxContentDiv">
                                            <div className="boxContentLabelDate"><label className="boxDate">23 JANUARY 2017 </label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM </label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Device Picked Up  Successfully</label></div>
                                        </div>
                                    </div>
                                    <div className="car__3">
                                        <div className="boxContentDiv">
                                            <div className="boxContentLabelDate"><label className="boxDate">23 JANUARY 2017 </label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM </label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Device has Reached the Recycling Hub</label></div>
                                        </div>
                                    </div>
                                    <div className="car__3">
                                        <div className="boxContentDiv boxContentDivActive">
                                            <div className="boxContentLabelDate"><label className="boxDate">23 JANUARY 2017 </label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM </label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Green Rewards Voucher Generated Device Picked</label></div>
                                            <div className="boxContentLabelDownload"><label className="">Download</label></div>
                                            <div className="boxContentCircle"></div>
                                        </div>
                                    </div>
                                    <div className="car__3">
                                        <div className="boxContentDiv">
                                            <div className="boxContentLabelDate"><label className="boxDate">23 JANUARY 2017 </label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM </label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Device Picked Up  Successfully</label></div>
                                        </div>
                                    </div>
                                    <div className="car__3">
                                        <div className="boxContentDiv">
                                            <div className="boxContentLabelDate"><label className="boxDate">23 JANUARY 2017 </label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM </label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Device Picked Up  Successfully</label></div>
                                        </div>
                                    </div>
                                    <div className="car__3">
                                        <div className="boxContentDiv">
                                            <div className="boxContentLabelDate"><label className="boxDate">23 JANUARY 2017 </label></div>
                                            <div className="boxContentLabelTime"><label className="boxTime">11 PM </label></div>
                                            <div className="boxContentLabelMessage"><label className="boxTime">Device Picked Up  Successfully</label></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:void(0)" className="carouseller__right"><img src={rightarrow} alt="rightarrow"/></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackingSlider;
