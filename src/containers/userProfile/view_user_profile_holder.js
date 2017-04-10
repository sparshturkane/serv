import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { consumerGetProfile, consumerUpdateProfile, storeActivePageData, getFileUploadUrl, consumerUpdateProfileImage, getConsumerAppConfig } from '../../actions/index';
import user from '../../images/userFill.png';
import edit from '../../images/edit.png';
import userProfileError from '../../images/userProfile.png';
import ReactS3Uploader from 'react-s3-uploader';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class ViewUserProfileHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                ConsumerID: '',
                Name: '',
                MobileNo: '',
                AlternateMobileNo: '',
                EmailID: '',
                ProfileImage: '',
            },
            rawFileUploadUrl: '',
            ContentType:'',
            AWSAccessKeyId:'',
            Expires:'',
            Signature:'',
            xamzacl:'',
            uniqueKey: '',
            userProfileImage: '',



        };
    }

    componentWillMount(){
        const SignUpData = JSON.parse(localStorage.getItem('SignUpData'));
        console.log("signupdata" +SignUpData);

        if (SignUpData !== null) {
            const consumerID = {ConsumerID : SignUpData.data.ConsumerID}
            this.props.consumerGetProfile(consumerID).then(()=>{
                this.setState({
                    userData: this.props.userData.data,
                    userProfileImage : this.props.userData.data.ProfileImage
                })
            });

            this.props.getConsumerAppConfig();
        }

    }

    handleEditProfileClick(){
        const storeActivePageDataObj = {
            viewProfileActive : 0,
            editProfileActive : 1,
        }
        this.props.storeActivePageData(storeActivePageDataObj);
    }

    titleCase() {
        var str = "sparsh turkane"
        var words = str.toLowerCase().split(' ');

        for(var i = 0; i < words.length; i++) {
            var letters = words[i].split('');
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join('');
        }
        return words.join(' ');
        console.log(words.join(' '));
    }

    generateUUID () { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    uploadImage(files){
        // this.props.fileUploadUrl.FileUploadUrl.data
        var file = files[0];
        console.log("uploadImage clicked");
        console.log(file);
        if(file === undefined){
            return '';
        }
        var uniqueKey = this.generateUUID();
        this.setState({
            uniqueKey:uniqueKey,
        })
        const fileUploadUrlObj = {
            Key: uniqueKey,
            Type: "image/jpeg"
        }
        this.props.getFileUploadUrl(fileUploadUrlObj).then(()=>{
            // console.log(this.props.fileUploadUrl.FileUploadUrl.data);
            this.setState({
                rawFileUploadUrl : this.props.fileUploadUrl.FileUploadUrl.data
            });
            console.log(this.state.rawFileUploadUrl);
            // var Signature = this.getParameterByName('Signature',this.state.rawFileUploadUrl);
            // console.log(Signature);
            this.setState({
                ContentType: this.getParameterByName('Content-Type',this.state.rawFileUploadUrl),
                AWSAccessKeyId: this.getParameterByName('AWSAccessKeyId',this.state.rawFileUploadUrl),
                Expires: this.getParameterByName('Expires',this.state.rawFileUploadUrl),
                Signature: this.getParameterByName('Signature',this.state.rawFileUploadUrl),
                xamzacl: this.getParameterByName('x-amz-acl',this.state.rawFileUploadUrl),
            });

            var options = {
                headers: {
                    'Content-Type': this.state.ContentType,
                    'AWSAccessKeyId': this.state.AWSAccessKeyId,
                    'Expires' :  this.state.Expires,
                    'Signature': this.state.Signature,
                    'x-amz-acl' : this.state.xamzacl

                }
            };

            axios.put(this.state.rawFileUploadUrl, file, options).then(()=>{
                var updateProfileImageObj = {
                    ConsumerID : this.state.userData.ConsumerID,
                    ProfileImage : this.props.appConfig.data.S3baseUrl+this.props.appConfig.data.uploadBucket+'/'+this.state.uniqueKey,
                }
                this.props.consumerUpdateProfileImage(updateProfileImageObj).then(()=>{
                    // const consumerID = {ConsumerID : this.state.userData.ConsumerID}
                    this.props.consumerGetProfile({ConsumerID:this.state.userData.ConsumerID}).then(()=>{
                        this.setState({
                            userData: this.props.userData.data,
                            userProfileImage : this.props.userData.data.ProfileImage,
                        })
                    });
                })
            })



        })
    }

    getParameterByName(name, url) {
        // if (!url) {
        //     url = window.location.href;
        // }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    getSignedUrl(file,callback){
        console.log("get signed url");
        return('https://s-upload.s3.amazonaws.com/1009111?AWSAccessKeyId=AKIAJS52OVQVTK7Z3DDQ&Content-Type=image%2Fjpeg&Expires=1491655179&Signature=aysB33%2Ffd%2Ffk%2Fra9GNXoF1yMZPQ%3D&x-amz-acl=public-read');
    }

    uploadFile(files){
        console.log("upload file: clicked");
        const image = files[0];
        console.log(image);
    }

    renderProfileImageError(){
        console.log(userProfileError);
        // this.src = userProfileError;
        // return this.src = userProfileError
        // this.state.userData.ProfileImage
        this.setState({
            userProfileImage:userProfileError,
        });
    }

    render(){
        var dropzoneStyle = {
            width: '84px',
            height: '84px',
            borderWidth: '2px',
            borderColor: 'rgb(255, 255, 255)',
            borderStyle: 'none',
            borderRadius: '100px',
            cursor: 'pointer',
        }
        return(
            <div className="profileHolder">
                <div className="profileImgHolder">
                    <div className="profileIMGContent">
                        {/* <input type="file" name="fileToUpload" id="fileToUpload"/> */}

                            <Dropzone onDrop={this.uploadImage.bind(this)} accept="image/*"  style={dropzoneStyle}>
                                <img src={this.state.userProfileImage} label='upload images' onError={this.renderProfileImageError.bind(this)} alt="profilePIC" className="profilePIC" onClick={this.uploadImage.bind(this)}/>
                            </Dropzone>

                    </div>



                    <div className="profileIMGContentRight">

                        <label className="profileName">
                            {this.state.userData.Name !== '' &&
                                this.titleCase(this.state.userData.Name)
                            }
                        </label>
                        <div className="ProfiledetailsHolder">
                            <form>
                                <div className="row">
                                    <div className="col-lg-2 col-sm-12">
                                        <div className="profiledetailsContent">
                                            <label className="profileDetails">Mobile Number</label><br/>
                                            <label className="profileDetailsLabel">{this.state.userData.MobileNo}</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-12">
                                        <div className="profiledetailsContent">
                                            <label className="profileDetails">Email ID</label><br/>
                                            <label className="profileDetailsLabel">{this.state.userData.EmailID}</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-sm-12">
                                        <div className="profiledetailsContent">
                                            <label className="profileDetails">Alternate Number</label><br/>
                                            <label className="profileDetailsLabel">{this.state.userData.AlternateMobileNo }</label>
                                        </div>
                                    </div>
                                    <span className="rightNewPageHolder" onClick={this.handleEditProfileClick.bind(this)}>
                                        <img src={edit} className="editImg" />
                                        <label className="editLabel" style={{cursor: "pointer"}} onClick={this.handleEditProfileClick.bind(this)} >
                                            edit
                                        </label>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default ViewUserProfileHolder;

// export default EditUserProfile;
function mapStateToProps(state) {
    return {
        productData : state.productData.ActiveProductData,
        // userData : state.SessionStorage.UserData,
        userData : state.Consumer.GetConsumerDetail,
        fileUploadUrl : state.FileUpload,
        appConfig : state.Consumer.AppConfig,

    };
}
//
//
function mapDispatchToProps(dispatch) {
    return bindActionCreators({consumerGetProfile, consumerUpdateProfile, storeActivePageData, getFileUploadUrl, consumerUpdateProfileImage, getConsumerAppConfig }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserProfileHolder);
