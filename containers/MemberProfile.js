import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView
}
from 'react-native';
import {connect} from 'react-redux';

import { signUpFormSelector } from '../selectors/userSelectors';
import { fetchMe } from '../actions/profileActions';
import { getUserById } from '../actions/userActions';
import {
  fetchOneUserSelector
} from '../selectors/userSelectors';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import screens from '../constants/Screens'
import { Dark_Blue } from '../colors';

const {height, width} = Dimensions.get('window');
const LocationMark =  require('../images/whitemark.png');
const DumbellIcon =  require('../images/dumdbell.png');
const SharpIcon =  require('../images/sharp.png');
const PhotoIcon =  require('../images/photoicon.png');
const AboutIcon =  require('../images/abouticon.png');

class MemberProfile extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back'
            },
        ]
    };

    constructor(props) {
		super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {
            selectedValue: 0
		};
	}

    componentDidMount() {
        const { dispatch, id } = this.props
        dispatch(getUserById.request(id));
    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }
    
    onNavigatorEvent(event) {
        const that = this;
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'back') {
                this.props.navigator.dismissModal();
            }
        }
    }

    photoSelected() {
        this.setState({ selectedValue : 0 })
    }

    aboutSelected() {
        this.setState({ selectedValue : 1 })
    }

    gotoConversation() {
        const { navigator } = this.props
        navigator.showModal({
            screen: screens.CONVERSATION,
            navigatorStyle: {
                navBarHidden: true
            }
        })
    }

    renderPhotoView() {
        let { oneMember } = this.props
        let detailInfo = oneMember
        let pictures = detailInfo.pictures
        return (
            <View style={styles.photoview}>
                <Separator color={"#000000"} width={width/2} height={dynamicSize(2)}/>
                <View style={styles.photoList}>
                    { 
                        pictures.length != 0 ?
                            this.renderEveryPhoto()
                            : 
                            <Text style={styles.aboutText}>
                                There is no photos yet
                            </Text>
                    }
                </View>
            </View>
        );
    }

    renderEveryPhoto() {
        let { oneMember } = this.props
        let detailInfo = oneMember
        let pictures = detailInfo.pictures
        return (
            pictures.map((picture, index) => { 
                return(
                    <View key={index} style={styles.photoItem}>
                        <Image source={{uri: picture}} style={styles.photoStyle}/>
                    </View>
                );
            })
        );
    }

    renderAbout() {
        let { oneMember } = this.props
        let detailInfo = oneMember
        let aboutMe = detailInfo.aboutMe
        return (
            <View style={styles.aboutview}>
               <Separator color={"#000000"} width={width/2} height={dynamicSize(2)} style={{marginLeft: width/2}}/>
               <Text style={styles.aboutText}>
                    {aboutMe != null ? aboutMe : "nothing here!"}
               </Text>
            </View>
        );
    }

    render() {
        let { oneMember } = this.props
        let detailInfo = oneMember
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <ScrollView contentContainerStyle={styles.contentScroll}>
                    <View style={styles.imageView}>
                        {detailInfo.avatar != '' && (
                            <Image source={{uri: detailInfo.avatar}} style={styles.avatar}/>
                        )}
                    </View>
                    <View style={styles.fullnameview}>
                        <Text style={styles.fullname}>
                            {detailInfo.firstName} {detailInfo.lastName}
                        </Text>
                        <Text style={styles.userid}>
                            {detailInfo.username}
                        </Text>
                    </View>
                    <View style={styles.infoView}>
                        <View style={styles.partView}>
                            <Image source={LocationMark} style={styles.locationmark}/>
                            <Text style={styles.infoText}>
                                {detailInfo.location}
                            </Text>
                        </View>
                        <Separator color={"#a2acd3"} width={1} height={dynamicSize(20)}/>
                        <View style={styles.partView}>
                            <Image source={DumbellIcon} style={styles.dumbell}/>
                            <Text style={styles.infoText}>
                                {detailInfo.homeClub}
                            </Text>
                        </View>
                        <Separator color={"#a2acd3"} width={1} height={dynamicSize(20)}/>
                        <View style={styles.partView}>
                            <Image source={SharpIcon} style={styles.sharp}/>
                            <Text style={styles.infoText}>
                                {detailInfo.friends.length} Friends
                            </Text>
                        </View>
                    </View>
                    <View style={styles.requestView}>
                        <TouchableOpacity style={styles.sendrequest} onPress={()=> this.gotoConversation()}>
                            <Text style={styles.requestText}>
                                Send Message
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.badgeView}>
                        <View style={styles.goalsView}>
                            <Text style={styles.goalText}>
                                {detailInfo.goals.length}
                            </Text>
                            <Text style={styles.commentText}>
                                Goals
                            </Text>
                        </View>
                        <Separator color={"#a2acd3"} width={1} height={dynamicSize(30)}/>
                        <View style={styles.goalsView}>
                            <Text style={styles.goalText}>
                                {detailInfo.tags.length}
                            </Text>
                            <Text style={styles.commentText}>
                                Tags
                            </Text>
                        </View>
                    </View>
                    <View style={styles.photoHeader}>
                        <TouchableOpacity style={styles.leftheader} onPress={()=> this.photoSelected()}>
                            <Image source={PhotoIcon} style={styles.photo}/>
                            <Text style={styles.photoText}>
                                Photos
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rightheader} onPress={()=> this.aboutSelected()}>
                            <Image source={AboutIcon} style={styles.photo}/>
                            <Text style={styles.photoText}>
                                About me
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.selectedValue === 0 ? this.renderPhotoView() : this.renderAbout()}
                    <View style={styles.spaceView}>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: Dark_Blue
    },
    contentScroll: {
        width: width,
    },
    imageView: {
        width: width,
        height: dynamicSize(120),
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    avatar: {
        width: dynamicSize(100),
        height: dynamicSize(100),
        borderRadius: dynamicSize(50),
        resizeMode: 'contain'
    },
    fullnameview: {
        width: width,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullname: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: 'white'
    },
    userid: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(13),
        color: 'white',
        marginTop: dynamicSize(5)
    },
    infoView: {
        width: width,
        height: dynamicSize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    partView: {
        width: width / 3,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    locationmark: {
        width: dynamicSize(15),
        height: dynamicSize(22),
        resizeMode: 'contain'
    },
    infoText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(12),
        color: 'white',
        textAlign: 'center',
        marginLeft: dynamicSize(10)
    },
    dumbell: {
        width: dynamicSize(25),
        height: dynamicSize(22),
        resizeMode: 'contain'
    },
    sharp: {
        width: dynamicSize(15),
        height: dynamicSize(18),
        resizeMode: 'contain'
    },
    requestView: {
        width: width,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendrequest: {
        width: dynamicSize(150),
        height: dynamicSize(30),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5
    },
    requestText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'white'
    },
    badgeView: {
        width: width,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Dark_Blue
    },
    goalsView: {
        width: width / 2,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalText: {
        fontFamily: 'Roboto-Bold',
        fontSize: getFontSize(15),
        color: 'white'
    },
    commentText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'white'
    },
    photoHeader: {
        width: width,
        height: dynamicSize(50),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    leftheader: {
        width: width/2,
        height: dynamicSize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightheader: {
        width: width/2,
        height: dynamicSize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: dynamicSize(22),
        height: dynamicSize(19),
        resizeMode: 'contain',
        marginLeft: dynamicSize(10)
    },
    photoText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: '#000000',
        marginLeft: dynamicSize(5)
    },
    photoList: {
        width: width,
        height: width / 4,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    photoItem: {
        width: width / 4,
        height: width / 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoStyle: {
        width: width / 4 - dynamicSize (10),
        height: width / 4 - dynamicSize (10),
        resizeMode: 'contain'
    },
    spaceView: {
        width: width,
        height: dynamicSize(120),
        backgroundColor: 'white'
    },
    photoview: {
        width: width,
        backgroundColor: 'white'
    },
    aboutview: {
        width: width,
        height: dynamicSize(400),
        backgroundColor: 'white'
    },
    aboutText: {
        fontFamily: 'Roboto-Light',
        fontSize: getFontSize(15),
        color: '#000000',
        width: width-dynamicSize(20),
        marginLeft: dynamicSize(10),
        marginTop: dynamicSize(10)
    }
});

MemberProfile.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

const mapStateToProps = state => ({
    oneMember: fetchOneUserSelector(state),
})

export default connect(mapStateToProps)(MemberProfile);