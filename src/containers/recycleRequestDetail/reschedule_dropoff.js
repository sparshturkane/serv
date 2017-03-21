import React from 'react';
import HeaderDiv from '../common/header';

class RescheduleDropoff extends React.Component {
    constructor(props) {
        super(props);
    }

    setValues(){
        // name
        // moblieNumber
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
                                <form>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Name*</label><br/>
                                            <input type="text" name="name" placeholder="Name" className="inputdetails" required/>
                                        </div>

                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Mobile Number*</label><br/>
                                            <input type="number" name="mobileNumber" placeholder="Mobile Number" className="inputdetails" required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Email*</label><br/>
                                            <input type="email" name="Email" placeholder="Email" className="inputdetails" required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="detailsContent" >
                                            <label className="labelDetails">Choose Date*</label><br/>
                                            <input className="inputdetails" name="date" id="date" placeholder="DD/MM/YYYY" type="text" required/>
                                            <span className="calendarHolder"><img src="images/calIcon.png" className="calendar"  alt="calendar"/></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="detailsContent">
                                            <label className="labelDetails">Choose Time Slot</label><br/>
                                            <div className="dropoffBTNHolder">
                                                <button type="button" className="   dropOffBTN">10am - 12 pm</button>
                                                <button type="button" className="  dropOffBTN">12pm - 2pm</button>
                                                <button type="button" className=" activeBtnTime dropOffBTN">2pm - 4pm</button>
                                            </div>
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

export default RescheduleDropoff;
