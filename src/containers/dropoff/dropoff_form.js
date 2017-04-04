import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive, showHideModal, sessionStorageDropOffTimeSlot } from '../../actions/index';
import HeaderDiv from '../common/header'
import LocationSearch from '../location_search';
import OtpPage from '../otp_page';

class DropOffForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ServiceTypeID : 13, //dropoff ServiceTypeID
            userName : '',
            userMobileNo : '',
            date : '',
            userEmail : '',
            displayOtpModal : 0,
            firstDate: '',
            lastDate: '',
            activeButtonName: '',
            slot1BtnClass: 'activeBtnTime dropOffBTN',
            slot2BtnClass: 'dropOffBTN',
            slot3BtnClass: 'dropOffBTN',
            ScheduledDateTimeDisplay: '',
            slots: [],
            activeButtonNameFrom : '',
            activeButtonNameTo : '',
        };
        this.handleInputFieldsChange = this.handleInputFieldsChange.bind(this);
        this.handleOnSubmitPickUpForm = this.handleOnSubmitPickUpForm.bind(this);
    }

    componentWillMount(){
        this.calenderDatesDisplay();
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
                // disabledDatesArray.push(disabledDayArray[i]+"/"+month+"/"+date.getFullYear());
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
        // "}); })");

        "})"+
        ".on('changeDate', function(ev){"+
            "var dateData = date_input.val();"+
            ""+
            "localStorage.setItem('dropOffDate', JSON.stringify(dateData));"+
        "}); })");
        script.appendChild(t);
        document.body.appendChild(script);

    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }

    format(inputDate) {
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            var day = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();
            // Months use 0 index.

            return (month[1] ? month : '0' + month[0]) + '/' +
            (day[1] ? day : '0' + day[0]) + '/' +
            date.getFullYear();
        }
    }

    handleInputFieldsChange(event){

        // limiting mobile number to 10 digits
        if ([event.target.name] == 'userMobileNo') {
            // console.log('mobile input');
            if(event.target.value.length < 11){
                this.setState({
                    userMobileNo : event.target.value,
                })
            }
        } else {
            this.setState(
                {
                    [event.target.name]: event.target.value,
                    // userName: event.target.value
                }
            );
        }

    }

    handleOnSubmitPickUpForm(event){
        // activeButtonNameFrom
        // activeButtonNameTo
        if((this.state.activeButtonNameFrom !== '') && (this.state.activeButtonNameTo !== '')){
            event.preventDefault();
            // making confirmation page active
            const pageDataConfirmation = {
                pageName : 'confirmation',
                status : '1'
            }
            this.props.makePagesActive(pageDataConfirmation);

            // storing the date of activeTimeSlotsButtons selected by user
            var timeSlotsData = {};
            if(this.state.activeButtonNameFrom!=='' && this.state.activeButtonNameTo!==''){
                timeSlotsData={
                    fromTime: this.state.activeButtonNameFrom,
                    toTime: this.state.activeButtonNameTo,
                }
            } else {
                timeSlotsData={
                    fromTime: "10:00:00",
                    toTime: "19:00:00",
                }
            }
            this.props.sessionStorageDropOffTimeSlot(timeSlotsData)

            const userDataRequest= {
                userName : this.state.userName,
                userMobileNo : this.state.userMobileNo,
                date : event.target.date.value,
                // dateNew : event.target.dateNew.value,
                userEmail : this.state.userEmail,
                ServiceTypeID : this.state.ServiceTypeID,
            }

            console.log("userDataRequest");
            console.log(userDataRequest);
            this.props.sessionStorageUserData(userDataRequest);

            const getOTPRequestData = {
                TempConsumerID : 0,// we will have to change it in revisions
                MobileNo : this.state.userMobileNo,
            }

            this.getOTPRequest(getOTPRequestData, userDataRequest);
        }else{
            event.preventDefault();
            alert("select time slot");
        }

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
                Zipcode : this.props.geoLocationData.pincode,
                Lat : this.props.geoLocationData.latitude,
                Lng : this.props.geoLocationData.longitude,
                Landmark : this.props.storedUserData.LocationData.Landmark,
            },
            isNew : SignUpData.data.isNew ? true : false,
            ConsumerID :SignUpData.data.ConsumerID
        }



        console.log(updateProfileData);
        this.props.consumerUpdateProfile(updateProfileData).then( () => {
            browserHistory.push('/confirmation');
        })

    }

    handleKeyPress(event){
        console.log(event.target.value.length);
        if(event.target.value.length>9){
            console.log(false);
            return false;
        }else{
            this.setState({
                userMobileNo : event.target.value,
            })
        }
    }

    setLocationDataSearchBar(){
        // storedUserData : state.SessionStorage

        if (this.props.storedUserData !== undefined && this.props.storedUserData.LocationData !== undefined) {
            return this.props.storedUserData.LocationData.Landmark;
        } else {
            return '';
        }
    }

    // activeButtons(buttonName){
    //     switch (buttonName) {
    //         case "slot1":
    //             console.log('slot1 clicked');
    //             this.setState({
    //                 activeButtonName : 'slot1',
    //                 slot1BtnClass: 'activeBtnTime dropOffBTN',
    //                 slot2BtnClass: 'dropOffBTN',
    //                 slot3BtnClass: 'dropOffBTN',
    //             })
    //         break;
    //
    //         case "slot2":
    //             console.log('slot2 clicked');
    //             this.setState({
    //                 activeButtonName : 'slot2',
    //                 slot1BtnClass: 'dropOffBTN',
    //                 slot2BtnClass: 'activeBtnTime dropOffBTN',
    //                 slot3BtnClass: 'dropOffBTN',
    //             })
    //         break;
    //
    //         case "slot3":
    //             console.log('slot3 clicked');
    //             this.setState({
    //                 activeButtonName : 'slot3',
    //                 slot1BtnClass: 'dropOffBTN',
    //                 slot2BtnClass: 'dropOffBTN',
    //                 slot3BtnClass: 'activeBtnTime dropOffBTN',
    //             })
    //         break;
    //
    //         default:
    //
    //     }
    // }

    activeButtons(buttonName, StartTimeVal, EndTimeVal ){
        switch (buttonName) {
            case "slot1":
                console.log('slot1 clicked');
                $("#slot1").addClass("activeBtnTime");
                $("#slot2").removeClass("activeBtnTime");
                $("#slot3").removeClass("activeBtnTime");
                // console.log(buttonName);
                this.setState({

                    activeButtonNameFrom : StartTimeVal,
                    activeButtonNameTo : EndTimeVal,
                    // slotBtnClass1: 'activeBtnTime dropOffBTN',
                    // slotBtnClass2: 'dropOffBTN',
                    // slotBtnClass3: 'dropOffBTN',
                })
            break;

            case "slot2":
                console.log('slot2 clicked');
                $("#slot1").removeClass("activeBtnTime");
                $("#slot2").addClass("activeBtnTime");
                $("#slot3").removeClass("activeBtnTime");
                this.setState({
                    activeButtonNameFrom : StartTimeVal,
                    activeButtonNameTo : EndTimeVal,
                    // slotBtnClass1: 'dropOffBTN',
                    // slotBtnClass2: 'activeBtnTime dropOffBTN',
                    // slotBtnClass3: 'dropOffBTN',
                })
            break;

            case "slot3":
                console.log('slot3 clicked');
                $("#slot1").removeClass("activeBtnTime");
                $("#slot2").removeClass("activeBtnTime");
                $("#slot3").addClass("activeBtnTime");
                this.setState({
                    activeButtonNameFrom : StartTimeVal,
                    activeButtonNameTo : EndTimeVal,
                    // slotBtnClass1: 'dropOffBTN',
                    // slotBtnClass2: 'dropOffBTN',
                    // slotBtnClass3: 'activeBtnTime dropOffBTN',
                })
            break;

            default:

        }
    }

    componentDidMount() {
        // storing date in localStorage
        localStorage.setItem('dropOffDate', JSON.stringify(this.state.ScheduledDateTimeDisplay));
        // console.log(this.refs.date);

        // calling interval to get localStorage data
        this.loadInterval = setInterval(
            () => {

                // console.log(pickUpDate);
                this.setActiveSlots();
            },
            1000
        );


        // this.props.rescheduleDropoffData.ScheduledDateTime
        // $(this.refs.date).datepicker()
        // .on('changeDate', (e) => {
        //     //  e here contains the extra attributes
        //     this.handleChange(e);
        // });

        // we will now have to store these slots data in array and then
        // var enabledDates = [];

    }

    componentWillUnmount () {
        // alert('component unmounted');
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
    }

    setActiveSlots(){
        const dropOffDate = JSON.parse(localStorage.getItem('dropOffDate'));

        // refreashing time slots if dates are not selected
        if(this.state.ScheduledDateTimeDisplay !== dropOffDate){
            this.setState({
                activeButtonNameFrom : '',
                activeButtonNameTo : '',
            });

            $("#slot1").removeClass("activeBtnTime");
            $("#slot2").removeClass("activeBtnTime");
            $("#slot3").removeClass("activeBtnTime");
        }

        this.setState({
            ScheduledDateTimeDisplay : dropOffDate
        });



        if(this.props.getSlotsData.getSlot !== undefined){
            // console.log(this.props.getSlotsData.getSlot.data);
            this.props.getSlotsData.getSlot.data.map((value) => {
                // console.log(value.date);
                // value.slots.map((slots) => {
                //     if(slots.IsActive==true){
                //         enabledDates.push(value.date);
                //     }
                // });

                // if(value.date)
                var slotsDate = new Date(value.date).toISOString().slice(0,10);
                var slotsDateFormated = slotsDate.split("-").reverse().join("/");
                // console.log(myFormated);
                // console.log(slotsDateFormated + " == " +this.state.ScheduledDateTimeDisplay);
                if(slotsDateFormated === this.state.ScheduledDateTimeDisplay){
                    this.setState({
                        slots: value.slots
                    })
                }
            });
        }
    }

    renderSlots(){
        if(this.state.slots !== undefined){
            // console.log("state changed");
            var i = 1;
            return this.state.slots.map((value) => {
                var buttonName = 'slot'+i;
                // var buttonClassName = 'slot'+i+'BtnClass';
                // var className=this.state.{buttonClassName};
                i = i + 1;
                // var buttonClassName = "this.state.ScheduledDateTimeDisplay";
                // // console.log(eval("this.state.Name"));
                // var NameEcho = eval("this.state.Name");
                // console.log(NameEcho);
                // console.log(this.state.Name);
                if(value.IsActive === true){
                    return(
                        <span className="dropOffBTNHolder" key={value.StartTime}>
                            <button key={buttonName} type="button"
                                className={"dropOffBTN"}
                                ref={buttonName}
                                id={buttonName}
                                onClick={this.activeButtons.bind(this,buttonName,value.StartTimeVal,value.EndTimeVal)}>
                                {value.StartTime} - {value.EndTime}
                            </button>
                        </span>

                    );
                } else if(value.IsActive === false){
                    return(
                        <span className="dropOffBTNHolder" key={value.StartTime}>
                            <button key={buttonName} type="button"
                                className={"dropOffBTN"}
                                ref={buttonName}
                                id={buttonName}
                                disabled
                                style={{color: "grey", backgroundColor: "lightgrey", cursor: "not-allowed"}}
                                onClick={this.activeButtons.bind(this,buttonName,value.StartTimeVal,value.EndTimeVal)}>
                                {value.StartTime} - {value.EndTime}
                            </button>
                        </span>


                    );

                }

            });
        }
    }

    render(){
        return(
            <div>
                {this.props.storedUserData.displayOtpModal == 1 &&
                    <OtpPage ServiceTypeID={this.state.ServiceTypeID}/>
                }
                <HeaderDiv productData={this.props.productData} ProductName={this.props.productData.ProductName}/>
                <LocationSearch ServiceTypeID={this.state.ServiceTypeID} setLandmark={this.setLocationDataSearchBar()}/>
                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        <Link to={'/pickup-dropoff'} className="pickUplabel PickUpHref">Pick Up</Link>
                        <Link to={'/dropoff'} className="dropofflabel PickUpHref active pickUpMenuActive">Drop Off Locations</Link>
                    </div>
                </div>

                <div className="detailsHolder ">
                    <div className="row">
                        <form onSubmit={this.handleOnSubmitPickUpForm}>
                            <div className="col-sm-4">
                                <div className="detailsContent">
                                    <label className="labelDetails">Name*</label><br />
                                    <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputFieldsChange} placeholder="Name" className="inputdetails" required/>
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="detailsContent">
                                    <label className="labelDetails">Mobile Number*</label><br />
                                    <input type="number" name="userMobileNo" value={this.state.userMobileNo} onChange={this.handleInputFieldsChange} placeholder="Mobile Number" className="inputdetails" required/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="detailsContent">
                                    <label className="labelDetails">Email*</label><br />
                                    <input type="email" name="userEmail" value={this.state.userEmail} onChange={this.handleInputFieldsChange} placeholder="Email" className="inputdetails" required />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="detailsContent" >
                                    <label className="labelDetails">Choose Date*</label><br />
                                    <input className="inputdetails"
                                        name="date"
                                        id="date"
                                        placeholder="DD/MM/YYYY"
                                        type="text"
                                        value={this.state.ScheduledDateTimeDisplay}
                                        readOnly
                                        required />
                                    <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar" /></span>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="detailsContent">
                                    <label className="labelDetails">Choose Time Slot</label><br />
                                    <div className="dropoffBTNHolder">
                                        {this.renderSlots()}
                                        {this.state.slots.length === 0 &&
                                            <span className="dropOffBTNHolder" >
                                                <button type="button"
                                                    className={"dropOffBTN"}
                                                    disabled
                                                    style={{color: "grey", backgroundColor: "lightgrey", cursor: "not-allowed"}}>
                                                    00 AM - 00 AM
                                                </button>
                                            </span>
                                        }
                                    </div>
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

                <div className="separators"></div>

            </div>
        );
    }
}

// export default DropOffForm;
function mapStateToProps(state) {
    return {
        // supportedMobiles: state.supportedMobiles.supportedMobilesList,
        productData: state.productData.ActiveProductData,
        geoLocationData: state.GeoLocationData,
        makePagesActive: state.MakePagesActive,
        storedUserData : state.SessionStorage,
        getSlotsData: state.ConsumerServicerequest,
        // DropOffServiceLocations: state.PickUpDropOffServiceLocationData.DropOffServiceLocations
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ sessionStorageUserData, tempConsumerGetOTP, consumerUpdateProfile, makePagesActive, showHideModal, sessionStorageDropOffTimeSlot }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DropOffForm);
