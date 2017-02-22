import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import HeaderDiv from './header'
import LocationSearch from './location_search';
import { pickUpPageFormSubmit, fetchPickUpLocations, setActiveProductData } from '../actions/index';

class PickUpPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount(){
        // since this is pickup.js page so we will call pickup service here
    }

    supportedModesDisplay(){
        return this.props.ProductData.SupportedModes.map((value) => {
            switch (value) {
                case 9:
                return (
                    <p key={value}>pickup</p>
                );

                case 13:
                return (
                    <p key={value}>dropoff</p>
                );
                default:
            }

        });
    }

    render(){
        //
        //
        /**
        * General ES6 syntax notes
        * const handleSubmit = this.props.handleSubmit;
        * const { handleSubmit } = this.props;
        * const title = this.props.fields.title;
        */
        // const { fields:{ userName, MobileNo, email, alternateNumber, imeiNumber, pickUpDate, userAddress }, handleSubmit } = this.props;
        // const { fields:{ MobileNo,TempConsumerID }, handleSubmit } = this.props;
        // console.log(MobileNo);
        return(
            <div>
                <HeaderDiv />
                <LocationSearch />

                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        <label className="pickUplabel active pickUpMenuActive"><a data-toggle="tab" className="PickUpHref" href="#home" >Pick Up</a>
                        </label>
                        {/*<label className="dropofflabel"><a data-toggle="tab" className="PickUpHref" href="#menu1" >Drop Off Locations</a>
                        </label>*/}
                    </div>
                </div>
                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label>
                                            <br />
                                            <input type="text"  placeholder="Name" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label>
                                            <br />
                                            <input type="number"  placeholder="Mobile No" className="inputdetails" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label>
                                            <br />
                                            <input type="email"  placeholder="Email" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Alternate Number</label>
                                            <br />
                                            <input type="text"  placeholder="Number" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">IMEI Number of Device For Recycle</label>
                                            <br />
                                            <input type="text" className="inputdetails" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Pickup Date*</label>
                                            <br />
                                            <input className="inputdetails" name="date" id="date" placeholder="DD/MM/YYYY" type="text" required />
                                            <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar" /></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Complete Address*</label>
                                            <br />
                                            <input type="text"  placeholder="Flat, Building Name, Street, City" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContentbutton">
                                            <button type="button" className="btn  activeBtn mySmallbtn">Home</button>
                                            <button type="button" className="btn mySmallbtn">Office</button>
                                            <button type="button" className="btn mySmallbtn">Other</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="detailsContentlargeButton ">
                                            <button type="submit" className="pickUPlargebutton">Submit</button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/*<div id="menu1" className="tab-pane fade">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label>
                                            <br />
                                            <input type="text" name="userName" placeholder="Name" className="inputdetails" required />
                                        </div>

                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label>
                                            <br />
                                            <input type="number" name="MobileNo" placeholder="MobileNo" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label>
                                            <br />
                                            <input type="email" name="email" placeholder="Email" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Alternate Number</label>
                                            <br />
                                            <input type="number" name="alternateNumber" placeholder="Number" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">IMEI Number of Device For Recycle</label>
                                            <br />
                                            <input type="number" name="imeiNumber" className="inputdetails" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>*/}
                </div>
                {/*<!-- footer start here - -->*/}
                <div className="separators"></div>
            </div>
        );
    }
}

// export default PickUpPage;
function mapStateToProps(state) {
    return {
        supportedMobiles: state.supportedMobiles.supportedMobilesList,
        productData: state.productData,
    };
}

// {
//     "Lat": "19.1122275845444",//GeoLocationData
//     "Lng": "72.8611849227308", //GeoLocationData
//     "Zipcode": 400099, //GeoLocationData
//     "ServiceTypeID" : 9, //9 Pickup
//     "ProductID" : 4 // Selected in first service
// }


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setActiveProductData }, dispatch);
}
//
export default connect(mapStateToProps, mapDispatchToProps)(PickUpPage);

// function validate(values) {
//     const errors = {};
//     if (!values.MobileNo) {
//         errors.MobileNo = 'Enter a mobileNo';
//     }
//
//     if (!values.TempConsumerID) {
//         errors.TempConsumerID = 'TempConsumerID cannot be empty';
//     }
//     return errors;
// }

// export default connect(mapStateToProps)(PickUpPage);
// fields: [
//     'userName',
//     'MobileNo',
//     'email',
//     'alternateNumber',
//     'imeiNumber',
//     'pickUpDate',
//     'userAddress'
// ]
// export default reduxForm({
//     form: 'PickUpFrom',
//     fields: [
//         'MobileNo',
//         'TempConsumerID'
//     ],
//     validate
// }, null, { pickUpPageFormSubmit })(PickUpPage)
