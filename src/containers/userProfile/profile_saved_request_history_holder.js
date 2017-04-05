import React from 'react';
import edit from '../../images/edit.png';

class ProfileRequestHistoryHolder extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="dropOFFHolderContentMargin ">
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="requestHistoryHolder">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="requestMobileHolder">
                                                <img src="images/devImgs/4_ro.png" className="requestImg" alt="iphone4" />
                                            </div>
                                            <div className="requestMobileDataHolder">
                                                <label className="requestMobileName">iPhone 4</label>
                                                <label className="requestMobileStatus">Requested created</label>
                                                <label className="requestMobileDate">on 31 Jan,2017</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="requestMobileDataHolderRight">
                                                <label className="requestMobileName">Recycle Complete</label>
                                                <label className="requestMobileStatus">Completed on 10 Fab,2017</label>
                                                <label className="requestMobileDate"><span className="starStyle">&#9733; &#9733; &#9733; &#9733;</span><span className="starBlank"> &#9733;</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="requestHistoryHolder">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="requestMobileHolder">
                                                <img src="images/devImgs/4_ro.png" className="requestImg" alt="iphone4" />
                                            </div>
                                            <div className="requestMobileDataHolder">
                                                <label className="requestMobileName">iPhone 4</label>
                                                <label className="requestMobileStatus">Requested created</label>
                                                <label className="requestMobileDate">on 31 Jan,2017</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="requestMobileDataHolderRight">
                                                <label className="requestMobileName">Recycle Complete</label>
                                                <label className="requestMobileStatus">Completed on 10 Fab,2017</label>
                                                <label className="requestMobileDate"><span className="ratenow">Rate Now</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-10">
                                <div className="requestHistoryHolder">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="requestMobileHolder">
                                                <img src="images/devImgs/4_ro.png" className="requestImg" alt="iphone4" />
                                            </div>
                                            <div className="requestMobileDataHolder">
                                                <label className="requestMobileName">iPhone 4</label>
                                                <label className="requestMobileStatus">Requested created</label>
                                                <label className="requestMobileDate">on 31 Jan,2017</label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="requestMobileDataHolderRight">
                                                <label className="Cancelled">Cancelled</label>
                                                <label className="requestMobileDate">Cancelled on 10 Fab,2017</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2"></div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileRequestHistoryHolder;
