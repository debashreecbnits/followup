import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ImageBackground,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import styles from "./style";
import { connect } from "react-redux";
import Api from "../../Api/Api";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';

class CreateNewsFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            subject_error: "",
            title: "",
            title_error: "",
            details: "",
            details_error: "",
            newsimage: '',
            newsfeed_image: [],
            interest:'',
            category: ''
        };
    }

    componentDidMount(){
        this.getUserDetails();
        this.getCurrentLocation();
    }

    getUserDetails() {
        Api.getApi('user/' + this.props.data.userId, this.props.data.token).then(userDetailsRes => {
            if (userDetailsRes.ack == true) {
            this.setState({
                userDetails: userDetailsRes.data[0].userDetails[0],
            }, ()=>{
                this.setState({interest : this.state.userDetails.interest ? this.state.userDetails.interest._id: '',
                category : this.state.userDetails.category ? this.state.userDetails.category._id: ''})
            })
            }
        }).catch(err => console.log(err))
    }

    getCurrentLocation() {
    Geolocation.getCurrentPosition(
        (position) => {
        this.setState({
            currentLocation: position,
            currentLatitude: position.coords.latitude,
            currentLongitude: position.coords.longitude,
        })
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
    }

    selectNewsFeedImage = () => {
        Alert.alert(
            'Choose Image',
            '',
            [
                { text: 'Gallery', onPress: () => this.chooseGalleryImage() },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'Camera', onPress: () => this.chooseCameraImage() },
            ],
            { cancelable: false },
        );
    }

    chooseGalleryImage() {

        let images = []
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            const { path } = image
            images.push({ uri: path, type: 'image/jpg', name: 'image.jpg' });
            this.setState({ newsfeed_image: images[0], image_error: '', newsimage: image.path, errImageText: '', errText: '' })
        });
    }

    chooseCameraImage() {
        let images = [];
        ImagePicker.openCamera({
            width: 400,
            height: 300,
            cropping: true,
        }).then(image => {
            const { path } = image
            images.push({ uri: path, type: 'image/jpg', name: 'image.jpg' });
            this.setState({ newsfeed_image: images[0], newsimage: image.path, errImageText: '', errText: '' })
        });
    }

    submitNewsFeed = () => {

        if (this.state.newsfeed_image.length === 0) {
            this.setState({
                image_error:
                    "Please upload a image"
            });
        } else if (this.state.title.length === 0) {
            this.setState({
                title_error: "Please enter title"
            });
        } else if (this.state.subject.length === 0) {
            this.setState({
                subject_error: "Please enter any subject"
            });
        } else if (this.state.details.length === 0) {
            this.setState({
                details_error:
                    "Please enter details",
            });
        } else {
            this.setState({
                image_error: '',
                title_error: '',
                details_error: '',
                subject_error: ''
            })
            let month = new Date().getMonth() + 1
            let getmonth = month > 9 ? month : '0' + month;
            let date = new Date().getDate()
            let getdate = date > 9 ? date : '0' + date;
            let datetime = new Date().getFullYear() + '-' + getmonth + '-' + getdate

            let formData = new FormData();

            formData.append('subject', this.state.subject);
            formData.append('title', this.state.title);
            formData.append('details', this.state.details);
            formData.append('date', datetime);
            formData.append('image', this.state.newsfeed_image)
            formData.append('interest', this.state.interest)
            formData.append('category', this.state.category)
            formData.append('latitude', this.state.currentLatitude)
            formData.append('longitude', this.state.currentLongitude)
            formData.append('userId', this.props.data.userId)
            Api.postFormData("newsFeed", formData, this.props.data.token).then(
                createNewsFeedRes => {
                    if (createNewsFeedRes.ack == true) {
                        alert(createNewsFeedRes.message);
                        this.setState({title:'', subject:'', details:'', newsfeed_image:''})
                        this.props.navigation.navigate("NewsFeed");
                    } else if (createNewsFeedRes.ack == false) {
                        alert(createNewsFeedRes.message);
                    }
                }
            ).catch(err => console.log(err));
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={this.props.orientation == 'landscape'? styles.menuLandscape : styles.menuPotrait}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" size={40} style={styles.hamburger} />
                    </TouchableOpacity>
                    <View style={{ width: this.props.orientation == 'landscape'? '85%':"70%" }}>
                        <Text
                            style={{
                                color: "#74B9FF",
                                fontSize: 20,
                                fontWeight: "800",
                                marginRight: 'auto',
                                marginLeft: 'auto',
                            }}
                        >
                            Create Post
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
                        <View style={styles.inputContainer}>
                            <View style={{
                                backgroundColor: '#fff',
                                shadowColor: 'rgba(51, 154, 240, 0.4)',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                borderColor: 'rgba(51,154,240,0.7)',
                                borderWidth: 1,
                                borderRadius: 5,
                                marginBottom: 30
                            }}>
                                <ImageBackground resizeMode="cover" style={{
                                    width: 200, height: 100,
                                    borderRadius: 5, overflow: 'hidden',
                                    borderWidth: 1, borderColor: 'rgba(51,154,240,0.2)',
                                    paddingTop: 32,
                                }} source={{ uri: this.state.newsimage }} >
                                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }} onPress={() => this.selectNewsFeedImage()}>
                                        <Icon name="camera" size={30} color={'#339af0'} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <Text style={styles.error}>{this.state.image_error}</Text>
                            <View style={styles.inerLineStyle}>
                                <View style={{ width: "90%", }}>
                                    <Text style={{ color: 'rgba(0,0,0,0.5)' }}>Title</Text>
                                </View>
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({ title: text, title_error: '' })}
                                />
                            </View>
                            <Text style={styles.error}>{this.state.title_error}</Text>
                            <View style={styles.inerLineStyle}>
                                <View style={{ width: "90%", }}>
                                    <Text style={{ justifyContent: 'flex-start', color: 'rgba(0,0,0,0.5)' }}>Subject</Text>
                                </View>
                                <TextInput
                                    style={styles.textInputStyle}
                                    onChangeText={(text) => this.setState({ subject: text, subject_error: '' })}
                                />
                            </View>
                            <Text style={styles.error}>{this.state.subject_error}</Text>
                            <View style={styles.inerLineStyle}>
                                <View style={{ width: "90%", }}>
                                    <Text style={{ justifyContent: 'flex-start', color: 'rgba(0,0,0,0.5)' }}>Details</Text>
                                </View>
                                <TextInput
                                    style={styles.textareaInputStyle}
                                    multiline={true}
                                    onChangeText={(text) => this.setState({ details: text, details_error: '' })}
                                />
                            </View>
                            <Text style={styles.error}>{this.state.details_error}</Text>

                            <View style={{ width: "100%", paddingTop: 10, alignItems: "center" }}>
                                <TouchableOpacity
                                    style={styles.SubmitButtonStyle}
                                    activeOpacity={0.5}
                                    onPress={() => this.submitNewsFeed()}
                                >
                                    <Text style={styles.btntext}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }

}
const mapStateToProps = state => {
    return {
        data: state.login.strogedetails,
        orientation:state.login.orientation
    }
}
export default connect(mapStateToProps)(CreateNewsFeed)