import React from 'react';
import HeaderDiv from '../common/header';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { consumerServicerequestRescheduleRequest } from '../../actions/index';


class ReschedulePickup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name : '',
            MobileNo : '',
            EmailID: '',
            AlternateMobileNo: '',
            ScheduledDateTimeDisplay:'',
            //send data
            ConsumerServiceRequestID: '',
            ScheduledDateTime: '',
            ScheduledToTime: '',
            ScheduledFromTime: '',

            Address: '',
            AddressType: ''
        };
        this.handleReschedulePickupForm = this.handleReschedulePickupForm.bind(this);
    }

    // handleDate(event){
    //     console.log(event.target.value);
    //     this.setState({
    //         ScheduledDateTimeDisplay: event.target.value,
    //     })
    // }

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
                disabledDatesArray.push(disabledDayArray[i]+"/"+month+"/"+date.getFullYear());
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
        // console.log(this.props.reschedulePickupData);
        if(this.props.userData !== undefined){
            var date = new Date(this.props.reschedulePickupData.ScheduledDateTime).toISOString().slice(0,10);
            this.setState({
                Name : this.props.userData.data.Name,
                MobileNo : this.props.userData.data.MobileNo,
                EmailID: this.props.userData.data.EmailID,
                AlternateMobileNo: this.props.userData.data.AlternateMobileNo,
                ScheduledDateTimeDisplay: date.split("-").reverse().join("/"),
                ConsumerServiceRequestID: this.props.recycleDetail.ConsumerServiceRequestID

            })
        }


    }

    handleReschedulePickupForm(event){
        event.preventDefault();
        var rescheduleRequestObj = {
            ConsumerServiceRequestID: this.state.ConsumerServiceRequestID,
            ScheduledDateTime: event.target.date.value.split("/").reverse().join("-")+'T00:00:00.000+05:30',
            ScheduledToTime: '19:00:00',
            ScheduledFromTime:'10:00:00',
            Remarks: ""
        }

        // console.log(rescheduleRequestObj);
        this.props.consumerServicerequestRescheduleRequest(rescheduleRequestObj).then(()=>{
            browserHistory.push('/dashboard')
        })
    }

    render(){
        return(
            <div>
                <HeaderDiv />
                <div className="locationHolder">
                    <div className="locationContent ">
                        <div className="row">
                            <div className="col-sm-4 pickuppagelocation">
                                <label className="locationLabel">Enter your location</label>
                            </div>
                            <div className="col-sm-7">
                                <input type="text" name="location"  className="inputLocation" />
                                <img src="images/location.png" className="locationimg" alt="Location" />
                                <span className="loadIconHolder"><img src="images/loadIcon.png" className="loadIcon" alt="loadIcon" /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="menuHolder">
                    <div className="menuContent nav nav-tabs">
                        <label className="pickUplabel active pickUpMenuActive" ><a data-toggle="tab" className="PickUpHref" href="#home">Pick Up</a></label>
                    </div>
                </div>

                <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                        <div className="detailsHolder ">
                            <div className="row">
                                <form onSubmit={this.handleReschedulePickupForm}>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label><br/>
                                            <input type="text" name="Name" value={this.state.Name} placeholder="Name" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number1*</label><br/>
                                            <input type="text" name="MobileNo" value={this.state.MobileNo} placeholder="Mobile Number" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label><br/>
                                            <input type="email" name="EmailID" value={this.state.EmailID} placeholder="Email" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Alternate Number</label><br/>
                                            <input type="text" name="AlternateMobileNo" value={this.state.AlternateMobileNo} placeholder="Number" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">IMEI Number of Device For Recycle</label><br/>
                                            <input type="text" name="name" className="inputdetails"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent" >
                                            <label className="labelDetails">Pickup Date*</label><br/>
                                            <input
                                                className="inputdetails"
                                                name="date"
                                                value={this.state.ScheduledDateTimeDisplay}
                                                id="date"
                                                placeholder="DD/MM/YYYY"
                                                type="text"
                                                required
                                                readOnly
                                            />
                                            <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar"/></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Complete Address*</label><br/>
                                            <input type="text" name="Address" value={this.state.Address} placeholder="Flat, Building Name, Street, City" className="inputdetails" required readOnly/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContentbutton">
                                            <span className="contentButtonHolder"><button type="button" className="btn  activeBtn mySmallbtn">Home</button></span>
                                            <span className="contentButtonHolder"><button type="button" className="btn mySmallbtn">Office</button></span>
                                            <span className="contentButtonHolder"><button type="button" className="btn mySmallbtn">Other</button></span>
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

// export default ReschedulePickup;
function mapStateToProps(state) {
    return {
        reschedulePickupData: state.RescheduleData.ReschedulePickupData,
        userData : state.Consumer.GetConsumerDetail,
        getSlotsData : state.ConsumerServicerequest,
        recycleDetail: state.ConsumerServicerequest.ConsumerServiceRequestRecycleDetail.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ consumerServicerequestRescheduleRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReschedulePickup);
