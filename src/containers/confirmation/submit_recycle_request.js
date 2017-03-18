import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { consumerProductAddDevice, consumerScheduleRecycleRequest, makePagesActive } from '../../actions/index';

class SubmitRecycleRequestButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = {
            ProductRewardIDArray : []
        }
    }

    componentDidMount(){
        //rewardsList;
        var ProductRewardIDArray = [];
        this.props.rewardsList.map((value) => {

            ProductRewardIDArray.push(value.ProductRewardID);
            // console.log(value.date);
            // value.slots.map((slots) => {
            //     if(slots.IsActive==true){
            //         ProductRewardIDArray.push(value.date);
            //     }
            // });
        });
        this.setState({
            ProductRewardIDArray
        })
        console.log(ProductRewardIDArray);
    }

    componentWillMount(){
        const addDeviceRequest = {
            BrandID : this.props.productData.BrandID,
            ConsumerID : this.props.consumerDetail.data.ConsumerID,
            // ConsumerProductID:0,
            // CurrentDateTime:"2016-06-10 14:36:49",
            ProductID:this.props.productData.ProductID,
            ProductSubCategoryID : this.props.productData.ProductSubCategoryID,
        }

        // {
        //     "BrandID":4,
        //     "ProductSubCategoryID":12,
        //     "ConsumerID" : 825,
        //     "ProductID":7
        // }

        this.props.consumerProductAddDevice(addDeviceRequest);
    }

    handleOnClick(){

        var scheduleRecycleRequestData
        if ( this.props.userData.ServiceTypeID == 9 ) {
            scheduleRecycleRequestData = {
                BrandID : this.props.productData.BrandID,
                ConsumerID : this.props.consumerDetail.data.ConsumerID,
                ConsumerProductID : this.props.consumerProductDeviceData.AddDevice.data.ConsumerProductID, //addDevic service
                ConsumerServiceRequestID : 0, //s
                IsNonPartner : 0,//s
                IsUrgent : 0,//s..
                Landmark : this.props.geoLocationData.Landmark,
                Lat : this.props.geoLocationData.latitude,
                Lng : this.props.geoLocationData.longitude,
                PartnerID : this.props.pickUpServiceLocation.PartnerID,
                PartnerServiceLocationID : this.props.pickUpServiceLocation.PartnerServiceLocationID,
                // ProductRewardID : [
                //     1,
                //     4
                // ],
                ProductRewardID : this.state.ProductRewardIDArray,
                ProductSubCategoryID : this.props.productData.ProductSubCategoryID,
                // this.props.userData.date
                ScheduledDateTime : this.props.userData.date.split("/").reverse().join("-")+'T00:00:00.000+0530', //slots
                ScheduledFromTime : "10:00:00", //static
                ScheduledToTime : "19:00:00", //static
                ServiceTypeID : this.props.userData.ServiceTypeID, //vari
                claimRequestFlow : 0, //s
                ProductUniqueID : '', //optional IMEI no if Imei given then call api  ConsumerServicerequest/validateSerialNumber

            }
        } else if(  this.props.userData.ServiceTypeID == 13 ){
            scheduleRecycleRequestData = {
                BrandID : this.props.productData.BrandID,
                ConsumerID : this.props.consumerDetail.data.ConsumerID,
                ConsumerProductID : this.props.consumerProductDeviceData.AddDevice.data.ConsumerProductID, //addDevic service
                ConsumerServiceRequestID : 0, //s
                IsNonPartner : 0,//s
                IsUrgent : 0,//s..
                Landmark : this.props.geoLocationData.Landmark,
                Lat : this.props.geoLocationData.latitude,
                Lng : this.props.geoLocationData.longitude,
                PartnerID : this.props.ActiveDropOffServiceLocation.PartnerID,
                PartnerServiceLocationID : this.props.ActiveDropOffServiceLocation.PartnerServiceLocationID,
                // ProductRewardID : [
                //     1,
                //     4
                // ],
                ProductRewardID : this.state.ProductRewardIDArray,
                ProductSubCategoryID : this.props.productData.ProductSubCategoryID,
                // this.props.userData.date
                ScheduledDateTime : this.props.userData.date.split("/").reverse().join("-")+'T00:00:00.000+0530', //slots
                ScheduledFromTime : "10:00:00", //static
                ScheduledToTime : "19:00:00", //static
                ServiceTypeID : this.props.userData.ServiceTypeID, //vari
                claimRequestFlow : 0, //s
                ProductUniqueID : '', //optional IMEI no if Imei given then call api  ConsumerServicerequest/validateSerialNumber

            }
        }


        const pageDataAwesome = {
            pageName : 'awesome',
            status : '1'
        }
        this.props.makePagesActive(pageDataAwesome);

        this.props.consumerScheduleRecycleRequest(scheduleRecycleRequestData).then(()=>{
            browserHistory.push('/awesome');
        })
        console.log(scheduleRecycleRequestData);
        // console.log(this.props.consumerDetail.data);
    }

    render(){
        return(
            <div className="row submitButton">
                <div className="col-sm-4">
                    <button type="button" className="pickUPlargebutton" onClick={this.handleOnClick}>Submit</button>
                </div>
                <div className="col-sm-8"></div>
            </div>
        );
    }
}

// export default SubmitRecycleRequestButton;

function mapStateToProps(state) {
    return {
        productData: state.productData.ActiveProductData,
        consumerDetail: state.Consumer.ConsumerDetail,
        userData: state.SessionStorage.UserData,
        geoLocationData: state.GeoLocationData,
        pickUpServiceLocation: state.PickUpDropOffServiceLocationData.PickUpServiceLocations,
        ActiveDropOffServiceLocation : state.PickUpDropOffServiceLocationData.ActiveDropOffServiceLocation,
        consumerProductDeviceData: state.ConsumerProduct,
        rewardsList: state.rewardsList.rewardsListData,


    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ consumerProductAddDevice, consumerScheduleRecycleRequest, makePagesActive }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitRecycleRequestButton);
