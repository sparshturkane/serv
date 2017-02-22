import React from 'react';

class LocationSearch extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render(){
        return(
            <div className="locationHolder">
                <div className="locationContent ">
                    <div className="row">
                        <div className="col-sm-4 pickuppagelocation">
                            <label className="locationLabel">Enter your location</label>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" name="location" value="Andheri West" className="inputLocation" />
                            <img src="images/location.png" className="locationimg" alt="Location" />
                            <span className="loadIconHolder"><img src="images/loadIcon.png" className="loadIcon" alt="loadIcon" /></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationSearch;
