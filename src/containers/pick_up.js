import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import DateTimeField from 'react-datetime';
import { Link } from 'react-router';
// import { reduxForm } from 'redux-form';
import HeaderDiv from './common/header'
import LocationSearch from './location_search';
import OtpPage from './otp_page';
import imeiInfo from '../images/imeiInfo.png';
import { pickUpPageFormSubmit, fetchPickUpLocations, setActiveProductData, sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive, showHideModal, consumerFavoriteLocationAddLocation  } from '../actions/index';

class PickUpPage extends React.Component {
    constructor(props) {
        super(props);
        // ServiceTypeID = 9 for PickUp
        // ServiceTypeID = 13 for Dropoff
        this.handleInputFieldsChange = this.handleInputFieldsChange.bind(this);
        this.handleOnSubmitPickUpForm = this.handleOnSubmitPickUpForm.bind(this);
        this.state = {
            ServiceTypeID : 9,
            userName : '',
            userMobileNo : '',
            date : '',
            dateNew:'',
            userEmail : '',
            userAlternateNo : '',
            userIMEINumber : '',
            userCompleteAddress : '',
            displayOtpModal : 0,
            firstDate: '',
            lastDate: '',
            homeBtnClass: 'btn mySmallbtn activeBtn',
            officeBtnClass: 'btn mySmallbtn',
            otherBtnClass: 'btn mySmallbtn',
            activeButtonName: 'Home',
        }
    }

    componentWillMount(){

        this.setState({
            userCompleteAddress : this.props.storedUserData.storeCurrentAddress.userCompleteAddress,
            activeButtonName : this.props.storedUserData.storeCurrentAddress.userCompleteAddress,
        })
    }

    calenderDatesDisplay(){
        // if(this.props.makePagesActive.dropOff === undefined){
        //     browserHistory.push('/');
        // }else if (this.props.makePagesActive.dropOff.status === '0') {
        //     browserHistory.push('/');
        // }
        var firstDate;
        var lastDate;
        var enabledDates = [];

        // getting dates which have IsActive == true
        if(this.props.getSlotsData.getSlot !== undefined){
            // console.log(this.props.getSlotsData.getSlot.data);
            this.props.getSlotsData.getSlot.data.map((value) => {
                console.log(value.date);
                value.slots.map((slots) => {
                    if(slots.IsActive==true){
                        enabledDates.push(value.date);
                    }
                });

            });

        }


        //making array unique
        var uniqueEnabledDates = enabledDates.filter((v, i, a) => a.indexOf(v) === i);
        console.log(uniqueEnabledDates);
        // we will have to add another loop to change date fromat

        // dd/mm/yyyy conversion function
        function format(entryFormated) {
            var date = new Date(entryFormated);
            if (!isNaN(date.getTime())) {
                var day = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                // Months use 0 index.

                // return (month[1] ? month : '0' + month[0]) + '/' +
                // (day[1] ? day : '0' + day[0]) + '/' +
                return (day[1] ? day : '0' + day[0]) + '/' +
                (month[1] ? month : '0' + month[0]) + '/' +
                date.getFullYear();
            }
        };

        function getDay(entryFormated) {
            var date = new Date(entryFormated);
            if (!isNaN(date.getTime())) {
                var day = date.getDate().toString();
                var month = (date.getMonth() + 1).toString();
                // Months use 0 index.

                // return (month[1] ? month : '0' + month[0]) + '/' +
                // (day[1] ? day : '0' + day[0]) + '/' +
                return (day[1] ? day : '0' + day[0]);
            }
        };

        // looping through enabledDates and converting them to dd/mm/yyyy using function format
        var uniqueEnabledDatesFormated = [];
        var uniqueEnabledDatesFormatedToDay = [];
        uniqueEnabledDates.forEach(function(entry) {
            var entryFormated = new Date(entry).toISOString().slice(0,10)
            var entryFormatedToDay = new Date(entry).toISOString().slice(0,10)
            entryFormated = format(entryFormated);
            uniqueEnabledDatesFormated.push(entryFormated);

            entryFormatedToDay = getDay(entryFormatedToDay);
            uniqueEnabledDatesFormatedToDay.push(entryFormatedToDay);
        });

        // getting first and last dates
        console.log(uniqueEnabledDatesFormated);
        console.log(uniqueEnabledDatesFormatedToDay);
        var startCalenderDate = uniqueEnabledDatesFormated[0];
        console.log(startCalenderDate);
        var endCalenderDate = uniqueEnabledDatesFormated[uniqueEnabledDatesFormated.length - 1]
        console.log(endCalenderDate);


        // var d = new Date( startCalenderDate );
        console.log('month');
        // console.log(formatGetMonth(startCalenderDate));
        console.log('date');
        // console.log(d.getFullYear());

        // adding quotes to first and last dates
        var startQuotes = '"';
        var endQuotes = '"';
        startCalenderDate = startQuotes+startCalenderDate+endQuotes;
        endCalenderDate = startQuotes+endCalenderDate+endQuotes;

        // now we will have to hide dates which are not present in those array
        var disabledDayArray = [];
        for(var i = 1; i < uniqueEnabledDatesFormatedToDay.length; i++) {
            console.log(uniqueEnabledDatesFormatedToDay[i]);
            if(uniqueEnabledDatesFormatedToDay[i] - uniqueEnabledDatesFormatedToDay[i-1] != 1) {
                //Not consecutive sequence, here you can break or do whatever you want

                disabledDayArray.push(uniqueEnabledDatesFormatedToDay[i]-1);
            }
        }


        console.log(disabledDayArray);
        // var disabledDayArray = ['14','15'];
        var disabledDatesArray = [];
        if(disabledDayArray.length !== 0){
            console.log('we will have to disable dates');
            for(var i = 0; i < disabledDayArray.length; i++) {

                var date = new Date();
                var month = (date.getMonth() + 1).toString();
                month = (month[1] ? month : '0' + month[0])

                if(disabledDayArray[i] !== 0){
                    disabledDatesArray.push(disabledDayArray[i]+"/"+month+"/"+date.getFullYear());
                    var nextMonth = parseInt(month);
                    nextMonth = nextMonth + 1;
                    disabledDatesArray.push(disabledDayArray[i]+"/"+(nextMonth)+"/"+date.getFullYear());
                }

                // console.log(uniqueEnabledDatesFormatedToDay[i]);
                // if(uniqueEnabledDatesFormatedToDay[i] - uniqueEnabledDatesFormatedToDay[i-1] != 1) {
                //     //Not consecutive sequence, here you can break or do whatever you want
                //     disabledDayArray.push(uniqueEnabledDatesFormatedToDay[i]);
                // }
            }

        }

        console.log(disabledDatesArray);
        // disabledDatesArray = ['15/03/2017','16/03/2017'];


        var disabledDatesString = '';
        var finalDisabledDates = '00/00/0000';
        if(disabledDatesArray.length !== 0){

            finalDisabledDates = '';
            disabledDatesArray.forEach(function(entry) {
                disabledDatesString = disabledDatesString + ",'"+entry+"'";
            });
            var startBracket = "[";
            var endBracket = "]";
            finalDisabledDates = startBracket+disabledDatesString+endBracket;
            var index = 1;
            console.log(finalDisabledDates);
            finalDisabledDates = finalDisabledDates.substr(0, index) + '' + finalDisabledDates.substr(index + 1);
            console.log(finalDisabledDates);
        }


        // if((this.props.geoLocationData !== undefined) && (startCalenderDate !== undefined)){
        if(this.props.getSlotsData.getSlot !== undefined){
            const script = document.createElement("script");
            var t = document.createTextNode("$(document).ready(function() { var date_input=$('input[name="+"date"+"]');"+
            "var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : 'body';"+
            "date_input.datepicker({"+
            "format: 'dd/mm/yyyy',"+
            "orientation: 'top',"+
            "container: container,"+
            "todayHighlight: false,"+
            "autoclose: true,"+
            "weekStart: 1,"+
            "startDate: "+startCalenderDate+","+
            "endDate: "+endCalenderDate+","+
            // "datesDisabled: ['23/02/2017','24/02/2017'],"+
            "datesDisabled: "+finalDisabledDates+","+

            "}); })");
            script.appendChild(t);
            document.body.appendChild(script);
        }


    }

    // componentDidUpdate(){
    //     // if(this.props.getSlotsData.getSlot !== undefined){
    //     //     console.log(this.props.getSlotsData.getSlot.data.length);
    //     //     var firstDateObj = this.props.getSlotsData.getSlot.data[0];
    //     //     var lastDateObj = this.props.getSlotsData.getSlot.data[this.props.getSlotsData.getSlot.data.length - 1];
    //     //
    //     //     console.log(new Date(firstDateObj.date).toISOString().slice(0,10));
    //     //
    //     //     console.log(new Date(lastDateObj.date).toISOString().slice(0,10));
    //     //
    //     //     this.setState(
    //     //         {
    //     //             firstDate : new Date(firstDateObj.date).toISOString().slice(0,10),
    //     //             lastDateObj : new Date(lastDateObj.date).toISOString().slice(0,10)
    //     //         }
    //     //     )
    //     // }
    //
    // }

    supportedModesPickup(){
        return this.props.productData.SupportedModes.map((value) => {
            switch (value) {
                case 9: //pickup
                return (
                    <Link key={value} to={'/pickup-dropoff'} className="pickUplabel  PickUpHref active pickUpMenuActive">Pick Up</Link>
                );

                // case 13:
                // return (
                //     <p key={value}>dropoff</p>
                // );
                default:
            }

        });
    }

    supportedModesDropOff(){
        return this.props.productData.SupportedModes.map((value) => {
            switch (value) {
                // case 9:
                // return (
                //     <p key={value}>pickup</p>
                // );

                case 13://dropoff
                return (
                    <Link key={value} to={'/dropoff'} className="dropofflabel PickUpHref ">Drop Off Locations</Link>
                );
                default:
            }

        });
    }

    handleOnSubmitPickUpForm(event){

        event.preventDefault();

        if(this.props.storedUserData.LocationData == undefined){
            alert('Please Enter Location First');
            return false;
        }
        // making confirmation page active
        const pageDataConfirmation = {
            pageName : 'confirmation',
            status : '1'
        }
        this.props.makePagesActive(pageDataConfirmation);
        //
        /**
        * if user is registered then
        1. schedule recycle request (if imeiNumber then also give to srr)
        2. add device (can be called after slots ignore what is written brackets)
        */

        /**
        * if user is new / TempConsumer
        1. otp
        2. signup
        3. updateProfile
        4. schedule recycle request ( if imeiNumber then give to srr)
        5. add device (can be called after slots ignore what is written brackets)
        */

        //
        /**
        * currently assuming that every user is new user
        1. store userData in SessionStorage
        2. user call otp service
        3. if status is successfull then open otp page hidden conditional rendering
        4.
        */
        const userDataRequest= {
            userName : this.state.userName,
            userMobileNo : this.state.userMobileNo,
            date : event.target.date.value,
            // dateNew : event.target.dateNew.value,
            userEmail : this.state.userEmail,
            userAlternateNo : this.state.userAlternateNo,
            userIMEINumber : this.state.userIMEINumber,
            userCompleteAddress : this.state.userCompleteAddress,
            ServiceTypeID : this.state.ServiceTypeID,
            AddressType: this.state.activeButtonName,
        }

        console.log(userDataRequest);
        this.props.sessionStorageUserData(userDataRequest);

        const getOTPRequestData = {
            TempConsumerID : 0,// we will have to change it in revisions
            MobileNo : this.state.userMobileNo,
        }

        this.getOTPRequest(getOTPRequestData, userDataRequest);

    }

    getOTPRequest(getOTPRequestData, userDataRequest){

        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
        if( SignUpData !== null){

            if(SignUpData.data.ConsumerID){
                // will have to remove this and push "/confirmation"
                // this.setState({
                //     displayOtpModal : 1,
                // })

                // call update user profile
                this.updateUserProfile();

            }
        } else {
            this.props.tempConsumerGetOTP(getOTPRequestData).then(()=>{
                this.props.sessionStorageUserData(userDataRequest);
                this.props.showHideModal('1');
                this.setState({
                    displayOtpModal : 1,
                })
            });

        }

    }

    updateUserProfile(){
        // in this case we have consumer id from localStorage
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);
        const updateProfileData = {
            updateObj : {
                EmailID : this.state.userEmail,
                Name : this.state.userName,
                FirstRegisteredFrom : "Consumer-Web",
                AlternateMobileNo : this.state.userAlternateNo,
                Zipcode : this.props.geoLocationData.pincode,
                Lat : this.props.geoLocationData.latitude,
                Lng : this.props.geoLocationData.longitude,
                Landmark : this.props.storedUserData.LocationData.Landmark,
                Address : this.state.userCompleteAddress,
                AddressType : this.state.activeButtonName,
            },
            isNew : SignUpData.data.isNew ? true : false,
            ConsumerID :SignUpData.data.ConsumerID
        }

        // addingfavorite location
        var addLocationObj =  {
            AddressType: this.state.activeButtonName,
            Landmark: this.props.storedUserData.LocationData.Landmark,
            ConsumerID: SignUpData.data.ConsumerID,
            Address: this.state.userCompleteAddress,
            Lat: this.props.geoLocationData.latitude,
            Lng: this.props.geoLocationData.longitude,
            Zipcode: this.props.geoLocationData.pincode,
        }
        this.props.consumerFavoriteLocationAddLocation(addLocationObj);

        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData).then( () => {
            browserHistory.push('/confirmation');
        })

    }

    handleInputFieldsChange(event){
        // console.log(event.target.name);
        switch (event.target.name) {
            case 'userMobileNo':
            if(event.target.value.length < 11){
                this.setState({
                    userMobileNo : event.target.value,
                })
            }
            break;

            case 'userAlternateNo':
            if(event.target.value.length < 11){
                this.setState({
                    userAlternateNo : event.target.value,
                })
            }
            break;

            default:
            this.setState(
                {
                    [event.target.name]: event.target.value,
                    // userName: event.target.value
                }
            );

        }
    }

    avaliableDates(){
        // this.props.getSlotsData.getSlot.data;

    }



    handleDateTimeSelect(date) {

        const currentDate = DateTimeField.moment();
        date = date < currentDate ? currentDate : date;
        this.setState({ dateNew:date });

    }

    setLocationDataSearchBar(){
        // storedUserData : state.SessionStorage

        if (this.props.storedUserData !== undefined && this.props.storedUserData.LocationData !== undefined) {
            return this.props.storedUserData.LocationData.Landmark;
        } else {
            return '';
        }
    }

    onKeyPressEnterLocation(){
        if(this.props.storedUserData.LocationData == undefined){
            alert('Please Enter Location First');
        }

    }

    activeButtons(buttonName){
        switch (buttonName) {
            case "home":
                console.log('home clicked');
                this.setState({
                    activeButtonName : 'Home',
                    homeBtnClass: 'btn activeBtn mySmallbtn',
                    officeBtnClass: 'btn mySmallbtn',
                    otherBtnClass: 'btn mySmallbtn',
                })
            break;

            case "office":
                console.log('home office');
                this.setState({
                    activeButtonName : 'Office',
                    homeBtnClass: 'btn  mySmallbtn',
                    officeBtnClass: 'btn activeBtn mySmallbtn',
                    otherBtnClass: 'btn mySmallbtn',
                })
            break;

            case "other":
                console.log('home other');
                this.setState({
                    activeButtonName : 'Other',
                    homeBtnClass: 'btn mySmallbtn',
                    officeBtnClass: 'btn mySmallbtn',
                    otherBtnClass: 'btn activeBtn mySmallbtn',
                })
            break;

            default:

        }
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
        var firstDate = '';
        var lastDate = '';
        if(this.props.getSlotsData.getSlot !== undefined){
            // console.log(this.props.getSlotsData.getSlot.data.length);
            var firstDateObj = this.props.getSlotsData.getSlot.data[0];
            var lastDateObj = this.props.getSlotsData.getSlot.data[this.props.getSlotsData.getSlot.data.length - 1];

            // console.log(new Date(firstDateObj.date).toISOString().slice(0,10));
            //
            // console.log(new Date(lastDateObj.date).toISOString().slice(0,10));

            firstDate = new Date(firstDateObj.date).toISOString().slice(0,10);
            lastDate = new Date(lastDateObj.date).toISOString().slice(0,10);

        }

        const inputProps = {
            name: 'date',
            placeholder: 'DD/MM/YYYY',
            className: 'inputdetails'

        }
        var yesterday = DateTimeField.moment().subtract(1, 'day');
        var valid = function( current ){
            // console.log(current.isAfter( yesterday ));
            // return current.isAfter( yesterday );

            return current.isBetween( firstDate, lastDate, null, '[]' ) && current.day() !== 0;
        };


        // calling calenderDatesDisplay function
        this.calenderDatesDisplay();

        return(
            <div>
                {this.props.storedUserData.displayOtpModal == 1 &&
                    <OtpPage ServiceTypeID={this.state.ServiceTypeID}/>
                }
                <HeaderDiv productData={this.props.productData} ProductName={this.props.productData.ProductName}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID} setLandmark={this.setLocationDataSearchBar()}/>

                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">

                        {/* <Link to={'/pickup-dropoff'} className="pickUplabel  PickUpHref active pickUpMenuActive">Pick Up</Link> */}
                        {this.supportedModesPickup()}
                        {/* <Link to={'/dropoff'} className="dropofflabel PickUpHref ">Drop Off Locations</Link> */}
                        {this.supportedModesDropOff()}
                    </div>
                </div>
                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form onSubmit={this.handleOnSubmitPickUpForm}>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label>
                                            <br />
                                            <input type="text" name="userName" onKeyPress={this.onKeyPressEnterLocation.bind(this)} value={this.state.userName} onChange={this.handleInputFieldsChange} placeholder="Name" className="inputdetails" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label>
                                            <br />

                                            <input type="number" name="userMobileNo" pattern="[7-9]{1}[0-9]{9}" onKeyPress={this.onKeyPressEnterLocation.bind(this)} value={this.state.userMobileNo} onChange={this.handleInputFieldsChange} placeholder="Mobile No" className="inputdetails" required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label>
                                            <br />
                                            <input type="email" name="userEmail" onKeyPress={this.onKeyPressEnterLocation.bind(this)} value={this.state.userEmail} onChange={this.handleInputFieldsChange} placeholder="Email" className="inputdetails" required />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Alternate Number</label>
                                            <br />
                                            <input type="number" name="userAlternateNo" pattern="[7-9]{1}[0-9]{9}" title="Enter valid Mobile Number" onKeyPress={this.onKeyPressEnterLocation.bind(this)} value={this.state.userAlternateNo} onChange={this.handleInputFieldsChange} placeholder="Number" className="inputdetails" />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">IMEI Number of Device For Recycle</label>
                                            <br />
                                            <input
                                                type="text"
                                                name="userIMEINumber"
                                                onKeyPress={this.onKeyPressEnterLocation.bind(this)}
                                                value={this.state.userIMEINumber}
                                                onChange={this.handleInputFieldsChange}
                                                className="inputdetails"
                                            />
                                            <br/>
                                            <Link to={'/find-imei'} >
                                                <span className="imeiInfoHolder">
                                                    <img src={imeiInfo} className="imeiInfo"/>
                                                    Where to find IMEI Number?
                                                </span>
                                            </Link>



                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Pickup Date*</label>
                                            <br />
                                            {/* <input className="inputdetails" name="date"  value={this.state.date} onChange={this.handleInputFieldsChange} id="date" placeholder="DD/MM/YYYY" type="text" required /> */}

                                            {/*
                                                <DateTimeField
                                                    timeFormat={false}
                                                    dateFormat="DD/MM/YYYY"
                                                    inputProps={inputProps}
                                                    isValidDate={ valid }
                                                    closeOnSelect={ true }
                                                />
                                            */}

                                            <input className="inputdetails" name="date" id="date" placeholder="DD/MM/YYYY" type="text" readOnly required />

                                            <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar" /></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Complete Address*</label>
                                            <br />
                                            <input type="text" name="userCompleteAddress" onKeyPress={this.onKeyPressEnterLocation.bind(this)} value={this.state.userCompleteAddress} onChange={this.handleInputFieldsChange} placeholder="Flat, Building Name, Street, City" className="inputdetails" required />

                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContentbutton">
                                            <button type="button" className={this.state.homeBtnClass} onClick={this.activeButtons.bind(this,'home')}>Home</button>
                                            <button type="button" className={this.state.officeBtnClass} onClick={this.activeButtons.bind(this,'office')}>Office</button>
                                            <button type="button" className={this.state.otherBtnClass} onClick={this.activeButtons.bind(this,'other')}>Other</button>
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
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        makePagesActive: state.MakePagesActive,
        storedUserData : state.SessionStorage,
        getSlotsData: state.ConsumerServicerequest,
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
    return bindActionCreators({ setActiveProductData, fetchPickUpLocations, sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive, showHideModal, consumerFavoriteLocationAddLocation }, dispatch);
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
