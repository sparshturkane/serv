import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData } from '../actions/index';


class ChooseDeviceHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMobileName: '',
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
    }

    handleProductClick(ProductIDArray, ProductName, SupportedModes, ProductData) {
        this.props.getRewardsList(ProductIDArray);
        this.props.setMobileName(ProductName);
        this.props.setSupportedModes(SupportedModes);
        console.log("active all mobile product data" + ProductData);
        this.props.setActiveProductData(ProductData);
        this.setState({
            activeMobileName : ProductName
        });
    }

    renderSupportedMobiles(){
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
                <div className="row">
                    <div className="col-sm-12">
                        <div className="greenRewordContentHolder">
                            <div className="centerAllIMGHolder">
                                <div className="col-sm-12">
                                    <div className="greenRewordContentHolder">
                                        <div className="centerAllIMGHolder">
                                            <ul className="centerAllIMGUL">
                                                {this.renderSupportedMobiles()}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
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
    return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseDeviceHolder);
