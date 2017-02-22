import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeoLocation } from '../actions/index';

class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Landmark:'',

        }
        this.handleLocationFormSubmit = this.handleLocationFormSubmit.bind(this);
    }

    handleLocationFormSubmit(event){
        event.preventDefault();
        this.props.fetchGeoLocation(this.state.Landmark);

    }

    handleOnChange(event){
        this.setState({
            Landmark : event.target.value
        })
    }

    render(){
        return(
            <div className="locationHolder">
                <div className="locationContent ">
                    <div className="row">
                        <form onSubmit={this.handleLocationFormSubmit}>
                            <div className="col-sm-4 pickuppagelocation">
                                <label className="locationLabel">Enter your location</label>
                            </div>

                            <div className="col-sm-8">
                                <input type="text" value={this.state.Landmark} onChange={this.handleOnChange.bind(this)} placeholder="Andheri West" className="inputLocation" />
                                <img src="images/location.png" className="locationimg" alt="Location" />
                                <span className="loadIconHolder"><img src="images/loadIcon.png" className="loadIcon" alt="loadIcon" /></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


// function mapStateToProps(state) {
//   return { posts: state.posts.all };
// }

// function mapStateToProps(state) {
//     return {
//         supportedMobiles: state.supportedMobiles.supportedMobilesList
//     };
// }


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchGeoLocation }, dispatch);
}

export default connect(null, mapDispatchToProps)(LocationSearch);
