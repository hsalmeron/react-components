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
    ScrollView,
}
    from 'react-native';

import {connect} from 'react-redux';

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { Teal_Color } from '../colors';
import { updateClass, fetchOneClass } from '../actions/classesActions';
import { signUpFormSelector } from '../selectors/userSelectors';
import {
  fetchOneClassSelector,
  fetchOneClassPendingSelector
} from '../selectors/classesSelectors';

import {
  fetchMeSelector,
} from '../selectors/profileSelectors';

const {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;

const ClassBG =  require('../images/class.png');
const UserIcon =  require('../images/defaultuser.png');
const CalendarIcon =  require('../images/calendar.png');
const SimpleClockIcon =  require('../images/simpleclock.png');
const LevelIcon =  require('../images/level.png');
const GoalIcon =  require('../images/goal.png');
const BackIcon =  require('../images/backbutton.png');

class ClassDetail extends Component {
    constructor(props) {
		super(props);
		this.state = {
            clicked: false
		};
	}

    componentDidMount() {
        const { dispatch, id } = this.props
        dispatch(fetchOneClass.request(id, this.props.navigator));
    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }

    goBack() {
        const { navigator } = this.props
        navigator.dismissModal()
    }

    onSignUptoClass() {
        const { dispatch, classdetail, detailInfo } = this.props
        let temp = classdetail.participants == null? [] : classdetail.participants.slice()
        temp.push(JSON.stringify(detailInfo))
        dispatch(updateClass.request(classdetail.id, temp));
        this.setState({
            clicked: true
        })
    }

    onStartStreaming() {

    }

    renderParticipants() {
        const { classdetail, pending, dispatch } = this.props;
        let participants = classdetail.participants == null? [] : classdetail.participants
        return (
            participants.map((user, index) => {
                return (
                    <View style={styles.imageView} key={index}>
                        <Image source={{uri: JSON.parse(user).avatar}} style={styles.usericon}/>
                    </View>
                );
            })
        );
    }

    renderSignUpButton() {
        const { detailInfo, classdetail } = this.props
        let participants = classdetail.participants == null ? [] : classdetail.participants
        let isRegistered = false
        participants.map((user, index) => {
            if (JSON.parse(user).id == detailInfo.id) {
                isRegistered = true
            }
        });
        
        return (
            <View>
                {!isRegistered && participants.length == 0?
                    <View>
                    {!this.state.clicked?
                        <TouchableOpacity style={styles.signupbutton} onPress={()=> this.onSignUptoClass()}>
                            <Text style={styles.signupText}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>    
                        :
                        <View style={styles.signupbuttonregister}>
                            <Text style={styles.signupText}>
                                You already signed it.
                            </Text>
                        </View>        
                    }
                    </View>
                    :
                    <View style={styles.signupbuttonregister}>
                        <Text style={styles.signupText}>
                            You already signed it.
                        </Text>
                    </View>    
                }
            </View>
        );
    }

    render() {
        const { classdetail, pending } = this.props;
		const classDetailInfo = classdetail
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                {
                    classDetailInfo.picture == '' ?
                    <Image source={ClassBG} style={styles.headBG}>
                        <View style={styles.titleView}>
                            <View style={styles.left}>
                                <TouchableOpacity onPress={()=> this.goBack()}>
                                    <Image source={BackIcon} style={styles.backicon}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.titleText}>
                                    Class Details
                                </Text>
                            </View>
                            <View style={styles.right}>
                            </View>
                        </View>
                        <View style={styles.titleFooter}>
                            <Text style={styles.nameText}>
                                {classDetailInfo.title}
                            </Text>
                            <View style={styles.ownerView}>
                                <Image source={UserIcon} style={styles.usericon}/>
                                <Text style={styles.ownerText}>
                                    {classDetailInfo.instructor}
                                </Text>
                            </View>
                        </View>
                    </Image>
                    :
                    <Image source={{uri: classDetailInfo.picture}} style={styles.headBG}>
                        <View style={styles.titleView}>
                            <View style={styles.left}>
                                <TouchableOpacity onPress={()=> this.goBack()}>
                                    <Image source={BackIcon} style={styles.backicon}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.titleText}>
                                    Class Details
                                </Text>
                            </View>
                            <View style={styles.right}>
                            </View>
                        </View>
                        <View style={styles.titleFooter}>
                            <Text style={styles.nameText}>
                                {classDetailInfo.title}
                            </Text>
                            <View style={styles.ownerView}>
                                <Image source={UserIcon} style={styles.usericon}/>
                                <Text style={styles.ownerText}>
                                    {classDetailInfo.instructor}
                                </Text>
                            </View>
                        </View>
                    </Image>
                }
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={CalendarIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.dateRightView}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.dateText}>
                                    {classDetailInfo.date}
                                </Text>
                            </View>
                            <View style={styles.contentRight}>
                                <Text style={styles.dateText}>
                                    {classDetailInfo.time}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(40)} height={1} style={{marginLeft: dynamicSize(20)}}/>
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={SimpleClockIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.dateRightView}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.classText}>
                                    Length of class:
                                </Text>
                            </View>
                            <View style={styles.contentRight}>
                                <Text style={styles.dateText}>
                                    {classDetailInfo.length}min
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(40)} height={1} style={{marginLeft: dynamicSize(20)}}/>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionTitle}>
                            Description:
                        </Text>
                        <Text style={styles.descriptionContent}>
                            {classDetailInfo.description}
                        </Text>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(40)} height={1} style={{marginLeft: dynamicSize(20)}}/>                    
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={LevelIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.dateRightView}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.dateText}>
                                    Difficulty level :
                                </Text>
                            </View>
                            <View style={styles.contentRight}>
                                <Text style={styles.dateText}>
                                    {classDetailInfo.difficulty}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(40)} height={1} style={{marginLeft: dynamicSize(20)}}/>
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={GoalIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.dateRightView}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.dateText}>
                                    Goals :
                                </Text>
                            </View>
                            <View style={styles.contentRight}>
                                <Text style={styles.scoreText}>
                                    5
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(40)} height={1} style={{marginLeft: dynamicSize(20)}}/>
                    <View style={styles.dateView}>
                        {this.renderParticipants()}
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(40)} height={1} style={{marginLeft: dynamicSize(20)}}/>
                    <View style={styles.paddingView}>
                        {this.renderSignUpButton()}
                    </View>
                    <View style={styles.paddingView}>
                        <TouchableOpacity style={styles.signupbutton} onPress={()=> this.onStartStreaming()}>
                            <Text style={styles.signupText}>
                                Start Class
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.spaceview}>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

ClassDetail.navigatorStyle = {
  navBarHidden: true,
  statusBarBlur: true
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#FFFFFF'
    },
    scrollView: {
        width: width
    },
    headBG: {
        width: width,
        height: height / 2.5,
        resizeMode: 'cover'
    },
    titleView: {
        width: width,
        height: dynamicSize(100),
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    left: {
        width: dynamicSize(30),
        height: dynamicSize(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        width: width - dynamicSize(60),
        height: dynamicSize(100),
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    right: {
        width: dynamicSize(30),
        height: dynamicSize(100),
    },
    titleText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(20), 
        color: '#FFFFFF'
    },
    titleFooter: {
        width: width,
        height: height / 2.5 - dynamicSize(110),
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        marginLeft: dynamicSize(10)
    },
    nameText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(18), 
        color: '#FFFFFF'
    },
    ownerView: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: dynamicSize(10),
        alignItems: 'center'
    },
    usericon: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20),
        resizeMode: 'contain'
    },
    ownerText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(16), 
        color: '#FFFFFF',
        marginLeft: dynamicSize(5)
    },
    dateView: {
        width: width - dynamicSize(40),
        height: dynamicSize(50),
        marginLeft: dynamicSize(20),
        flexDirection: 'row'
    },
    dateLeftView: {
        width: dynamicSize(40),
        height: dynamicSize(50),
        justifyContent: 'center',
        marginLeft: dynamicSize(5)
    },
    dateRightView: {
        width: width - dynamicSize(80),
        height: dynamicSize(50),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    contentLeft: {
        width: width - dynamicSize(170),
        height: dynamicSize(50),
        justifyContent: 'center'
    },
    contentRight: {
        width: dynamicSize(80),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calendar: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        resizeMode: 'contain',
    },
    dateText: {
        fontFamily: 'Roboto-Light', 
        fontSize: getFontSize(14), 
        color: '#000000',
    },
    descriptionTitle: {
        fontFamily: 'Roboto-Light', 
        fontSize: getFontSize(16), 
        color: '#000000',
        marginTop: dynamicSize(10)
    },
    descriptionContent: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(13), 
        color: '#000000',
        marginTop: dynamicSize(10)
    },
    descriptionView: {
        width: width - dynamicSize(40),
        height: dynamicSize(150),
        marginLeft: dynamicSize(20),
    },
    paddingView: {
        width: width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupbutton: {
        width: width / 1.5,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c34646',
        borderRadius: 5,
    },
    signupText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(18), 
        color: '#FFFFFF',
    },
    spaceview: {
        width: width,
        height: 50,
    },
    scoreText: {
        fontFamily: 'Roboto-Light',
        fontSize: getFontSize(14),
        color: '#5cefdd'
    },
    classText: {
        fontFamily: 'Roboto-Light', 
        fontSize: getFontSize(14), 
        color: '#000000',
    },
    backicon: {
        width: dynamicSize(18),
        height: dynamicSize(18),
        resizeMode: 'cover'
    },
    imageView: {
        width: dynamicSize(40),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginLeft: dynamicSize(10)
    },
    signupbuttonregister: {
        width: width / 1.5,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Teal_Color,
        borderRadius: 5,
    }
});

function mapStateToProps(state){
    return {
        classdetail: fetchOneClassSelector(state),
        pending: fetchOneClassPendingSelector(state),
        form: signUpFormSelector(state),
        detailInfo: fetchMeSelector(state),
    }
}


export default connect(mapStateToProps)(ClassDetail);