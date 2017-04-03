import React from 'react';
import Moment from 'react-moment';
// import { connect } from 'react-redux';
import leftarrow from '../../images/leftarrow.png';
import rightarrow from '../../images/rightarrow.png';

class TrackingSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const script = document.createElement("script");
        var t = document.createTextNode("$(function() {$('#first').carouseller({});});");
        script.appendChild(t);
        document.body.appendChild(script);

    }

    trackingCardsList(){
        // console.log("here");
        // console.log(this.props.trackingList.Logs);

        // request a weekday along with a long date

        // top of the stack will be latest so
        var top = 0;
        return this.props.trackingList.Logs.map((track) => {
            top = top + 1;
            // if groupId==5 then show Download button
            // console.log(track.DisplayInfo.Hidden);
            if (top <= 1) {
                // active card
                return (
                    <div className="car__3" key={track.ConsumerServiceRequestLogID}>
                        <div className="boxContentDiv boxContentDivActive" >
                            <div className="boxContentLabelDate">
                                <label className="boxDate">
                                    <Moment format="DD MMMM YYYY">{track.UpdatedDate}</Moment>
                                </label>
                            </div>
                            <div className="boxContentLabelTime">
                                <label className="boxTime">
                                    <Moment format=" h A">{track.UpdatedDate}</Moment>
                                </label>
                            </div>
                            <div className="boxContentLabelMessage"><label className="boxTime">{track.DisplayInfo.DisplayText}</label></div>
                            {track.GroupId==5 &&
                                <div className="boxContentLabelDownload"><label className="">Download</label></div>
                            }
                            <div className="boxContentCircle"></div>


                        </div>
                    </div>
                );
            } else {
                // inactive card
                return (
                    <div className="car__3">
                        <div className="boxContentDiv" >
                            <div className="boxContentLabelDate">
                                <label className="boxDate">
                                    <Moment format="DD MMMM YYYY">{track.UpdatedDate}</Moment>
                                </label>
                            </div>
                            <div className="boxContentLabelTime">
                                <label className="boxTime">
                                    <Moment format=" h A">{track.UpdatedDate}</Moment>
                                </label>
                            </div>
                            <div className="boxContentLabelMessage"><label className="boxTime">{track.DisplayInfo.DisplayText}</label></div>
                            {track.GroupId==5 &&
                                <div className="boxContentLabelDownload"><label className="">Download</label></div>
                            }
                        </div>
                    </div>
                );
            }

        });

    }

    render(){
        return(
            <div className="tracksliderHolder">

                <div className="row">
                    <div id="first" className="carouseller">
                        <div className="tracksliderHolderMargin">
                            <a href="javascript:void(0)" className="carouseller__left"><img src={leftarrow} alt="leftarrow"/></a>
                            <div className="carouseller__wrap">
                                <div className="carouseller__list">

                                    {this.trackingCardsList()}

                                    {/*
                                        <div className="car__3">
                                            <div className="boxContentDiv">
                                                <div className="boxContentLabelDate"><label className="boxDate">22 JANUARY 2017</label></div>
                                                <div className="boxContentLabelTime"><label className="boxTime">11 PM</label></div>
                                                <div className="boxContentLabelMessage"><label className="boxTime">dummy</label></div>
                                            </div>
                                        </div>
                                    */}
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
// function mapStateToProps(state) {
//     return {
//         trackingList: state.ConsumerServicerequest.ConsumerServiceRequestTrackRequest,
//
//     };
// }

// export default connect(mapStateToProps, null)(TrackingSlider);
