import React from 'react';
import edit from '../../images/edit.png';

class ProfileSavedAddressHolder extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="dropOFFHolderContentMargin ">
                        <div className="AddressHolderContent">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="leftDropOFF">
                                        <div>

                                            <label className="TechnologyLabel">Home</label>
                                            <p className="TechnologyLabelContent">
                                                7th Floor, Al Tara Building, Nr. Hiranandani Gardens, Cafe Coffee Day - Central Ave, Hiranandani Estate, Thane, Maharashtra, India
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <span className="rightNewPageHolder"><img src={edit} className="editImg" /><label className="editLabel">edit</label></span>
                                <div className="col-sm-4">

                                </div>
                            </div>
                        </div>

                        <div className="AddressHolderContent">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="leftDropOFF">
                                        <div>

                                            <label className="TechnologyLabel">Office</label>
                                            <p className="TechnologyLabelContent">
                                                7th Floor, Al Tara Building, Nr. Hiranandani Gardens, Cafe Coffee Day - Central Ave, Hiranandani Estate, Thane, Maharashtra, India
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <span className="rightNewPageHolder"><img src={edit} className="editImg" /><label className="editLabel">edit</label></span>
                                <div className="col-sm-4">

                                </div>
                            </div>
                        </div>

                        <div className="AddressHolderContent">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="addmoreTab">+ Add New Address </label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileSavedAddressHolder;
