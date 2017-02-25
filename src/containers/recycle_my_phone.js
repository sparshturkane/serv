import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { makePagesActive } from '../actions/index';
import { browserHistory } from 'react-router';

class RecycleMyPhone extends React.Component {
    constructor(props) {
        super(props);
        this.handleRecyclMyPhoneClick = this.handleRecyclMyPhoneClick.bind(this)
    }

    handleRecyclMyPhoneClick(event){
        event.preventDefault();
        console.log("recycle my phone clicked");
        const pageData = {
            pageName : 'pickUp',
            status : '1'
        }
        console.log(pageData);
        this.props.makePagesActive(pageData);
        browserHistory.push('/pickup-dropoff');

    }

    render(){
        return(
            <div className="row landingSubmitButton">
                <div className="col-sm-12">
                    <button type="button" onClick={this.handleRecyclMyPhoneClick} className="landingLargeButton ">Recycle My {this.props.ProductName}</button>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ makePagesActive }, dispatch);
}

export default connect(null, mapDispatchToProps)(RecycleMyPhone);
