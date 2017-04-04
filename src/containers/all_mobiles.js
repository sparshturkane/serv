import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData, showHideModal } from '../actions/index';
import MobileHolder from './mobile_holder';


class ChooseDeviceHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMobileName: '',
            activeMobilePos: '',
            pageReloaded: 0,
            supportedMobilesJsx: [],
        }
    }

    componentWillMount(){
        this.props.getProductBasedOnSupportedModes()
        .then( () => {
            const mobile = this.props.supportedMobiles[0];
            var ProductIDArray = {
                ProductIDs: [mobile.ProductID]
            };

            var ProductName = mobile.ProductName;
            var SupportedModes = mobile.SupportedModes;
            // productData = mobile
            this.handleProductClick(ProductIDArray, ProductName, SupportedModes, mobile)
            this.props.showHideModal('0');
            this.supportedMobilesJsx();
        })
        // .then(() => {
        //     // blog post create, nav to index
        //     this.renderSupportedMobiles();
        // })

        // {
        //     "AlternateMobileNo":
        //     "MobileNo":
        //     "EmailID":
        //     "Name":
        //     "Zipcode":
        //     "Lat":
        //     "Lng":
        //     "Landmark"
        //
        // }
        // <script src="%PUBLIC_URL%/js/plugins.js"></script>
        // <script src="%PUBLIC_URL%/js/sly.js"></script>
        // <script src="%PUBLIC_URL%/js/horizontal.js"></script>
        // <script src="%PUBLIC_URL%/js/modernizr.js"></script>
        // plugin js
        // var script = document.createElement("script");
        // script.src = "/js/jquery.easing.1.3.js";
        // script.async = true;
        // document.body.appendChild(script);
        //
        // // plugin js
        //  script = document.createElement("script");
        // script.src = "/js/plugins.js";
        // script.async = true;
        // document.body.appendChild(script);
        //
        // // sly js
        //  script = document.createElement("script");
        // script.src = "/js/sly.js";
        // script.async = true;
        // document.body.appendChild(script);
        //
        // // horizontal js
        //  script = document.createElement("script");
        // script.src = "/js/horizontal.js";
        // script.async = true;
        // document.body.appendChild(script);
        //
        // // modernizr js
        //  script = document.createElement("script");
        // script.src = "/js/modernizr.js";
        // script.async = true;
        // document.body.appendChild(script);

    }

    componentDidMount(){
        // modernizr js
        var script = document.createElement("script");
        script.src = "/js/modernizr.js";
        script.async = false;
        document.body.appendChild(script);

        // plugin js
         script = document.createElement("script");
        script.src = "/js/plugins.js";
        script.async = false;
        document.body.appendChild(script);

        // sly js
         script = document.createElement("script");
        script.src = "/js/sly.js";
        script.async = false;
        document.body.appendChild(script);

        // horizontal js
         script = document.createElement("script");
        script.src = "/js/horizontal.js";
        script.async = false;
        document.body.appendChild(script);



         script = document.createElement("script");
        var t = document.createTextNode("function changeRollOverImg(imgNumPos){"+
            "$('.mobileIMGHolder').css('display', 'block');"+
            "var hidDivNme = '#overPhnDispImg_'+imgNumPos;"+
            "$(hidDivNme).css('display', 'none');"+
            "localStorage.setItem('imgNumPos', JSON.stringify(imgNumPos));"+
        "}");
        script.appendChild(t);
        document.body.appendChild(script);


        if (this.state.pageReloaded == 0) {
            this.setState({
                pageReloaded : 1
            });
            browserHistory.push('/home');
        }


        // calling interval to get localStorage data
        this.loadInterval = setInterval(
            () => {

                // console.log(pickUpDate);
                this.getActiveMobileInfo();
            },
            500
        );


        // <script src="%PUBLIC_URL%/js/jquery.easing.1.3.js"></script>

    }

    componentWillUnmount () {
        // alert('component unmounted');
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }

    getActiveMobileInfo(){
        const activeMobilePos = JSON.parse(localStorage.getItem('imgNumPos'));
        // this.setState({
        //     activeMobilePos: activeMobilePos
        // });
        var counterMap = 0;
        this.props.supportedMobiles.map((mobile) => {
            // console.log(activeMobilePos +"---"+ counterMap);
            if(activeMobilePos == counterMap){
                var ProductIDArray = {
                    ProductIDs: [mobile.ProductID]
                };
                this.handleProductClick(ProductIDArray, mobile.ProductName, mobile.SupportedModes, mobile)
            }
            counterMap = counterMap + 1;
        });


    }

    handleProductClick(ProductIDArray, ProductName, SupportedModes, ProductData) {
        this.props.getRewardsList(ProductIDArray);
        this.props.setMobileName(ProductName);
        this.props.setSupportedModes(SupportedModes);
        // console.log("active all mobile product data" + ProductData);
        this.props.setActiveProductData(ProductData);
        this.setState({
            activeMobileName : ProductName
        });
    }

    renderSupportedMobiles14(){
        console.log(this.props.supportedMobiles);
        return this.props.supportedMobiles.map((mobile) => {
            // const ProductIDArray =`{ "ProductIDs" : [${mobile.ProductID}]}`
            var ProductIDArray = {
                ProductIDs: [mobile.ProductID]
            };
            return (

                <li className="centerAllIMGLI" key={mobile.ProductID} onClick={this.handleProductClick.bind(this,ProductIDArray, mobile.ProductName, mobile.SupportedModes, mobile)}>
                    <div className="centerAllIMGDiv" >
                        <img src="images/smartPhone.png" className="mobileNEWIMG" alt="smartPhone" />
                        <span className="mobileNameSpan">{mobile.ProductName}</span>
                    </div>
                </li>
            );
        });
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
                        <span className="mobileIMGHolder" id={idCounter}><img src="images/devImgs/3g.png" className="mobileIMG" /></span>
                        <span className="mobileIMGHolderActive" ><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" /></span>
                        <label className="mobileLabel">{mobile.ProductName}</label>
                    </div>
                </li>
            );
        });
    }


    supportedMobilesJsx(){
        // console.log(this.props.supportedMobiles);
        var counter = -1;
        var supportedMobilesJsx = [];
        this.props.supportedMobiles.map((mobile) => {
            // const ProductIDArray =`{ "ProductIDs" : [${mobile.ProductID}]}`
            // var ProductIDArray = {
            //     ProductIDs: [mobile.ProductID]
            // };
            counter=counter + 1;
            var idCounter = "overPhnDispImg_"+counter;
             supportedMobilesJsx.push(
                <li key={mobile.ProductID}>
                    <div className="HomemobileHolder">
                        <span className="mobileIMGHolder" id={idCounter}><img src="images/devImgs/3g.png" className="mobileIMG" /></span>
                        <span className="mobileIMGHolderActive" ><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG" /></span>
                        <label className="mobileLabel">{mobile.ProductName}</label>
                    </div>
                </li>
            );
        });

        this.setState({
            supportedMobilesJsx : supportedMobilesJsx,
        })
    }

    render(){
        return(
            <div className="ChooseDeviceHolder">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="deviceNamelabelHolder">
                            <label className="chooseDevice">Choose </label>
                            <label className="recycleLabel">Device To Recycle</label>
                        </div>
                    </div>
                </div>

                <MobileHolder/>
                {/*
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="greenRewordContentHolder">
        						<div className="pagespan container" style={{width: "100%"}}>
                                    <div className="wrap">

                                        <div className="frame" id="forcecentered">
                                            <ul className="clearfix">

                                                <li className="active">
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_0" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 3GS</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_1" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 4</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_2" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 4s</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_3" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 5</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_4" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 5c</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_5" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 5s</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_6" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 6</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_7" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 6 Plus</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_8" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 6s</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_9" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 6s Plus</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_10" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone SE</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_11" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
                                                        <label className="mobileLabel">iPhone 7</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="HomemobileHolder"><span className="mobileIMGHolder" id="overPhnDispImg_12" ><img src="images/devImgs/3g.png" className="mobileIMG"/></span><span className="mobileIMGHolderActive"><img src="images/devImgs/3g_ro.png" className="ActivemobileIMG"/></span>
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
                */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        supportedMobiles: state.supportedMobiles.supportedMobilesList
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData, showHideModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDeviceHolder);
