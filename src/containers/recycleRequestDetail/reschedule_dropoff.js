import React from 'react';
import HeaderDiv from '../common/header';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import { consumerServicerequestRescheduleRequest, sessionStorageRescheduleRecycleData } from '../../actions/index';

// import '../../js/jquery-1.11.3.min.js';
// import '../../js/jquery.min.js';
// import '../../js/datePicker';

class RescheduleDropoff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name : '',
            MobileNo : '',
            EmailID: '',
            ScheduledDateTimeDisplay:'',
            //send data
            ConsumerServiceRequestID: '',
            ScheduledDateTime: '',
            ScheduledToTime: '',
            ScheduledFromTime: '',
            slotBtnClass1: 'activeBtnTime dropOffBTN',
            slotBtnClass2: 'dropOffBTN',
            slotBtnClass3: 'dropOffBTN',
            activeButtonNameFrom : '',
            activeButtonNameTo : '',
            currentDateDropOff: '',
            slots: [],
        };
        this.handleRescheduleDropoffForm = this.handleRescheduleDropoffForm.bind(this);
    }

    componentDidMount() {
        // storing date in localStorage
        localStorage.setItem('pickUpDate', JSON.stringify(this.state.ScheduledDateTimeDisplay));
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
        const pickUpDate = JSON.parse(localStorage.getItem('pickUpDate'));

        // refreashing time slots if dates are not selected
        if(this.state.ScheduledDateTimeDisplay !== pickUpDate){
            this.setState({
                activeButtonNameFrom : '',
                activeButtonNameTo : '',
            });

            $("#slot1").removeClass("activeBtnTime");
            $("#slot2").removeClass("activeBtnTime");
            $("#slot3").removeClass("activeBtnTime");
        }

        this.setState({
            ScheduledDateTimeDisplay : pickUpDate
        });

        if(this.props.getSlotsData.ConsumerServiceRequestRescheduleSlots !== undefined){
            // console.log(this.props.getSlotsData.getSlot.data);
            this.props.getSlotsData.ConsumerServiceRequestRescheduleSlots.data.map((value) => {
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
                        <span className="dropOffBTNHolder">
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
                        <span className="dropOffBTNHolder">
                            <button key={buttonName} type="button"
                                className={"dropOffBTN"}
                                ref={buttonName}
                                id={buttonName}
                                disabled
                                onClick={this.activeButtons.bind(this,buttonName,value.StartTimeVal,value.EndTimeVal)}>
                                {value.StartTime} - {value.EndTime}
                            </button>
                        </span>

                    );

                }

            });
        }

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
        if(this.props.getSlotsData.ConsumerServiceRequestRescheduleSlots !== undefined){
            // console.log(this.props.getSlotsData.getSlot.data);
            this.props.getSlotsData.ConsumerServiceRequestRescheduleSlots.data.map((value) => {
                // console.log(value.date);
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


        // if((this.props.geoLocationData !== undefined) && (startCalenderDate !== undefined)){
        if(this.props.getSlotsData.ConsumerServiceRequestRescheduleSlots !== undefined){
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

            "})"+
            ".on('changeDate', function(ev){"+
                "var dateData = date_input.val();"+
                ""+
                "localStorage.setItem('pickUpDate', JSON.stringify(dateData));"+
            "}); })");
            script.appendChild(t);
            document.body.appendChild(script);
        }


    }

    componentWillMount(){
        this.calenderDatesDisplay()

        // // if(this.props.getSlotsData.getSlot !== undefined){
        //     const script = document.createElement("script");
        //     var t = document.createTextNode("$(document).ready(function() { var date_input=$('input[name="+"date"+"]');"+
        //     "var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : 'body';"+
        //     "date_input.datepicker({"+
        //     "format: 'dd/mm/yyyy',"+
        //     "orientation: 'top',"+
        //     "container: container,"+
        //     "todayHighlight: false,"+
        //     "autoclose: true,"+
        //     "weekStart: 1,"+
        //     // "startDate: "+startCalenderDate+","+
        //     // "endDate: "+endCalenderDate+","+
        //     // "datesDisabled: ['23/02/2017','24/02/2017'],"+
        //     // "datesDisabled: "+finalDisabledDates+","+
        //
        //     "}); })");
        //     script.appendChild(t);
        //     document.body.appendChild(script);
        // // }


        // name...............// local or user data
        // moblieNumber.......// user data
        // email--------------// user data
        // alternate number...// user data
        // imei number........// we will see this later
        // pickup Date........// pickup date {ScheduledDateTime
        // complete address...// i didnot saved this will {Address

        // ScheduledDateTime : this.props.userData.date.split("/").reverse().join("-")+'T00:00:00.000+0530', //slots
        // console.log(this.props.rescheduleDropoffData);
        if(this.props.userData !== undefined){
            var date = new Date(this.props.rescheduleDropoffData.ScheduledDateTime).toISOString().slice(0,10);
            this.setState({
                Name : this.props.userData.data.Name,
                MobileNo : this.props.userData.data.MobileNo,
                EmailID: this.props.userData.data.EmailID,
                ScheduledDateTimeDisplay: date.split("-").reverse().join("/"),
                ConsumerServiceRequestID: this.props.recycleDetail.ConsumerServiceRequestID

            })
        }


    }

    handleRescheduleDropoffForm(event){
        event.preventDefault();

        var d = new Date();
        // d is "Sun Oct 13 2013 20:32:01 GMT+0530 (India Standard Time)"
        var datetext = d.toTimeString();
        // datestring is "20:32:01 GMT+0530 (India Standard Time)"
        // Split with ' ' and we get: ["20:32:01", "GMT+0530", "(India", "Standard", "Time)"]
        // Take the first value from array :)
        datetext = datetext.split(' ')[0];


        var rescheduleRequestObj = {
            ConsumerServiceRequestID: this.state.ConsumerServiceRequestID,
            ScheduledDateTime: event.target.date.value.split("/").reverse().join("-")+'T'+datetext+'.000+05:30',
            ScheduledFromTime:this.state.activeButtonNameFrom, // this will not be static
            ScheduledToTime: this.state.activeButtonNameTo, // this will not be static
            Remarks: ""
        }

        console.log(rescheduleRequestObj);

        // we will not make recycleRequest here we will make it in confirmation page
        // so passing data to session and then confirmation page
        this.props.sessionStorageRescheduleRecycleData(rescheduleRequestObj);
        browserHistory.push(`/reschedule-confirmation/${this.state.ConsumerServiceRequestID}`);

        // this.props.consumerServicerequestRescheduleRequest(rescheduleRequestObj).then(()=>{
        //     browserHistory.push('/dashboard')
        // })
    }

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

    // handleDateChange(event){
    //     console.log('date changed to  '+ event.target.value);
    //     this.setState({
    //         ScheduledDateTimeDisplay: event.target.value
    //     })
    // }

    render(){
        return(
            <div>
                <HeaderDiv ProductName={this.props.activePhoneName} />
                <div className="locationHolder">
                    <div className="locationContent ">
                        <div className="row">
                            <div className="col-sm-4 pickuppagelocation">
                                <label className="locationLabel">Enter your location</label>
                            </div>
                            <div className="col-sm-7">
                                <input type="text" name="location" className="inputLocation" />
                                <img src="images/location.png" className="locationimg" alt="Location" />
                                <span className="loadIconHolder"><img src="images/loadIcon.png" className="loadIcon" alt="loadIcon" /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        <label className="pickUplabel active pickUpMenuActive" ><a data-toggle="tab" className="PickUpHref" href="#home" >Drop Off</a></label>
                    </div>
                </div>

                <div className="tab-content">
                    <div id="menu1" className="tab-pane fade in active">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form onSubmit={this.handleRescheduleDropoffForm}>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label><br/>
                                            <input type="text" name="Name" value={this.state.Name} placeholder="Name" className="inputdetails" required readOnly/>
                                        </div>

                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label><br/>
                                            <input type="number" name="MobileNo" value={this.state.MobileNo} placeholder="Mobile Number" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label><br/>
                                            <input type="email" name="EmailID" value={this.state.EmailID} placeholder="Email" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent" >
                                            <label className="labelDetails">Choose Date*</label><br/>
                                            <input
                                                className="inputdetails"
                                                value={this.state.ScheduledDateTimeDisplay}
                                                name="date"
                                                ref="date"
                                                id="date"
                                                placeholder="DD/MM/YYYY"
                                                type="text"
                                                required
                                            />
                                            <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar"/></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Choose Time Slot</label><br/>
                                            <div className="dropoffBTNHolder">
                                                {this.renderSlots()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="detailsContentlargeButton ">
                                            <button type="Submit" className="pickUPlargebutton">Submit</button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>
            </div>
        );
    }
}

// export default RescheduleDropoff;
function mapStateToProps(state) {
    return {
        rescheduleDropoffData: state.RescheduleData.RescheduleDropoffData,
        userData : state.Consumer.GetConsumerDetail,
        getSlotsData : state.ConsumerServicerequest,
        recycleDetail: state.ConsumerServicerequest.ConsumerServiceRequestRecycleDetail.data,
        activePhoneName : state.SessionStorage.activePhoneName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ consumerServicerequestRescheduleRequest, sessionStorageRescheduleRecycleData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RescheduleDropoff);
