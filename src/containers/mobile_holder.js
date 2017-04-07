import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class MobileHolder extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSupportedMobiles(){
        // console.log(this.props.supportedMobiles);
        var counter = -1;
        return this.props.supportedMobiles.map((mobile) => {
            // const ProductIDArray =`{ "ProductIDs" : [${mobile.ProductID}]}`
            // var ProductIDArray = {
            //     ProductIDs: [mobile.ProductID]
            // };
            counter=counter + 1;
            var idCounter = "overPhnDispImg_"+counter;
            return (
                <li key={mobile.ProductID}>
                    <div className="HomemobileHolder">
                        <span className="mobileIMGHolder" id={idCounter}><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span>
                        <span className="mobileIMGHolderActive" ><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                        <label className="mobileLabel">{mobile.ProductName}</label>
                    </div>
                </li>
            );
        });
    }


    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="greenRewordContentHolder">
                        <div className="pagespan container" style={{width: "100%"}}>
                            <div className="wrap">

                                <div className="frame" id="forcecentered">
                                    <ul className="clearfix">
                                        {/* his.renderSupportedMobiles() */}

                                            <li className="active">
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_0" ><img src="images/devImgs/3g.png" className="mobileIMG"  role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 3GS</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_1" ><img src="images/devImgs/3g.png" className="mobileIMG"  role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 4</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_2" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 4s</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_3" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 5</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_4" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 5c</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_5" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 5s</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_6" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 6</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_7" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 6 Plus</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_8" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 6s</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_9" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 6s Plus</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_10" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone SE</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_11" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 7</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_12" ><img src="images/devImgs/3g.png" className="mobileIMG" role="presentation"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" role="presentation"/></span>
                                                    <label className="mobileLabel">iPhone 7 Plus</label>
                                                </div>
                                            </li>

                                    </ul>
                                </div>

                                <div className="controls center">
                                    <span className="btn prev Sliderprev"><i className="icon-chevron-left"></i> <img src="images/leftarrow.png" alt="leftarrow" className=""/></span>
                                    <span className="btn next Slidernext"><img src="images/rightarrow.png" alt="rightarrow" /> <i className="icon-chevron-right"></i></span>
                                </div>
                            </div>


                            <div className="underLineHolder1">
                                <img src="images/topi1.png" className="topi1"/>
                                <hr className="underLineHolder"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

// export default MobileHolder;
function mapStateToProps(state) {
    return {
        supportedMobiles: state.supportedMobiles.supportedMobilesList
    };
}

export default connect(mapStateToProps, null)(MobileHolder);
