import React from 'react';
import HeaderDiv from '../containers/common/header';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

class AwesomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        // if(this.props.makePagesActive.awesome === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.awesome.status === '0') {
        //     browserHistory.push('/');
        // }
    }

    render(){
        return(
            <div>
                <HeaderDiv productData={this.props.productData} userData={this.props.userData} />
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
                            <Link to={`/dashboard/`} type="button" className="pickUPlargebutton">Continue</Link>
                        </div>
                        <div className="col-sm-2 col-md-3"></div>
                    </div>
                </div>

                <div className="separators"></div>
            </div>
        );
    }
}

// export default AwesomePage;

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        userData: state.SessionStorage.UserData,
        makePagesActive: state.MakePagesActive,

    };
}


// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({getProductBasedOnSupportedModes, getRewardsList, setMobileName, setSupportedModes, setActiveProductData }, dispatch);
// }

export default connect(mapStateToProps, null)(AwesomePage);
