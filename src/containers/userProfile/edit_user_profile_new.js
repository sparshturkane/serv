import React from 'react';
import HeaderDiv from '../common/header';
import user from '../../images/userFill.png';
import edit from '../../images/edit.png';

class EditUserProfileNew extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <HeaderDiv userLogo={user}/>
                <div className="separators"></div>

                {/* user details edit*/}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="dropOFFHolderContentMargin ">
                            <div className="AddressHolderContentTOP">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="profileHolder">
                                            <div className="profileImgHolder">
                                                <span className="profileIMGContent">SP</span>
                                                <label className="profileName">Sreevathsa Prabhakar</label>
                                            </div>
                                            <div className="ProfiledetailsHolder">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-lg-2 col-sm-12">
                                                            <div className="profiledetailsContent">
                                                                <label className="profileDetails">Mobile Number</label><br/>
                                                                <input type="text" name="mobileNumber"  placeholder="Mobile Number" className="inputdetails" value="+91 9823873579" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3 col-sm-12">
                                                            <div className="profiledetailsContent">
                                                                <label className="profileDetails">Email</label><br/>
                                                                <input type="email" name="email" placeholder="Email" className="inputdetails" value="sreevathsa.prabhakar@servify.in" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-sm-12">
                                                            <div className="profiledetailsContent">
                                                                <label className="profileDetails">Alternate Number</label><br/>
                                                                <input type="text" name="mobileNumber"  placeholder="Mobile Number" className="inputdetails" value="+Add" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <button type="Submit" className="SaveButtonProfile">Save</button>
                                                        </div>

                                                    </div>






                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* toggle saved address and request History */}
                <div className="row">
                    <div className="col-sm-12">
                        <div className="dropOFFHolderContentMargin ">
                            <div className="AddressHolderContentTOP">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="SaveAddress SaveAddressActive">Saved Addresses</label>
                                        <label className="SaveAddress ">Request History</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="separators"></div>

                {/* saved address request History */}
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

                <div className="separators"></div>
            </div>
        );
    }
}

export default EditUserProfileNew;
