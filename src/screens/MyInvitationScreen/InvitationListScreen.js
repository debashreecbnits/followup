import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Alert, } from 'react-native';
import { connect } from "react-redux";
import Api from '../../Api/Api';
import styles from './style';
import Config from '../../Api/config';
class InvitationListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitationList: [],
            accpet: false,
            showLoading: false
        }
    }

    componentDidMount() {
        this.getConnectionList()
    }

    getConnectionList() {
        this.setState({ showLoading: true })
        Api.getApi('request', this.props.data.token).then(inmvitationListRes => {
            if (inmvitationListRes.ack === true) {
                this.setState({ showLoading: false, invitationList: inmvitationListRes.data })
            } else {
                this.setState({ showLoading: false, invitationList: [] })
            }

        }).catch(err =>
            this.setState({ showLoading: false }),
        )
    }

    acceptRequest = (userid, requestType, index) => {
        this.setState({ showLoading: true })
        let data = {
            id: userid,
            status: requestType
        }
        Api.putApi('request', data, this.props.data.token).then(sendRequestRes => {
            if (sendRequestRes.ack == true) {
                this.setState({ showLoading: false })
                Alert.alert(sendRequestRes.details)
                this.getConnectionList();
            } else {
                this.setState({ showLoading: false })
            }
        }).catch(err => console.log('err', err))
    }

    render() {
        return (
            <React.Fragment>
                {this.state.showLoading ?
                    <Animated.View style={styles.overScreenLoding}>
                        <ActivityIndicator animating={true} size={50} color="#74B9FF" />
                    </Animated.View> : null
                }
                <View style={this.props.orientation == 'landscape' ? styles.menuLandscape : styles.menuPotrait}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="menu" size={40} style={styles.hamburger} />
                    </TouchableOpacity>
                    <View style={{ width: this.props.orientation == 'landscape' ? '85%' : "70%", alignItems: 'center' }}>
                        <Text style={{
                            color: "#74B9FF",
                            fontSize: 20,
                            fontWeight: "800",
                            marginHorizontal: 20
                        }}>Invitation List</Text>
                    </View>
                </View>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    {this.state.invitationList.length > 0 ?
                        this.state.invitationList.map((res, index) => {
                            console.log('res', res)
                            return (
                                <View style={styles.container}>

                                    <View style={styles.card}>
                                        <TouchableOpacity
                                            style={styles.profileImage}
                                            onPress={() => {
                                                this.props.navigation.navigate('UserProfile', { "userId": res.sendUserId._id })
                                            }}
                                        >
                                            <Image
                                                style={{ width: undefined, flex: 1 }}
                                                source={
                                                    res.sendUserId.profile_picture && res.sendUserId.profile_picture ?
                                                        { uri: `${Config.profileImageUrl}${res.sendUserId.profile_picture}` }
                                                        :
                                                        require('../../assets/images/profilepic.png')
                                                }
                                                resizeMode="cover" />
                                        </TouchableOpacity>

                                        <View style={styles.userAction}>
                                            <Text style={styles.userName}>{res.sendUserId.first_name} {res.sendUserId.last_name}</Text>
                                            <View style={styles.workInfo}>
                                                
                                            </View>
                                            <View style={styles.button}>
                                                <TouchableOpacity onPress={() => this.acceptRequest(res._id, "A", index)}><Text style={styles.accpetBtn}>Accept</Text></TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.acceptRequest(res._id, "D", index)}><Text style={styles.declineBtn}>Decline</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                        :
                        <View
                            style={{ alignSelf: 'center', paddingTop: 20 }}
                        >
                            <Text style={{ fontSize: 18 }}>
                                No Result Found
                            </Text>
                        </View>
                    }
                </ScrollView>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        data: state.login.strogedetails,
        orientation: state.login.orientation
    }
}
export default connect(mapStateToProps, null)(InvitationListScreen)