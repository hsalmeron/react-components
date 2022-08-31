import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity
}
    from 'react-native';
import {connect} from 'react-redux';

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'

const {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const Mark_Icon =  require('../images/graychevron.png');

class Notifications extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back',
            },
        ]
    };

    constructor(props) {
		super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {

		};
	}

    componentDidMount() {

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

    onNewClassesPosted() {
        
    }

    onUpcomingRegisteredClass() {

    }

    onNewFriendRequest() {

    }

    onNewFriend() {

    }

    onNewMessage() {

    }

    onNewDeals() {

    }

    onNewNews() {

    }

    onNewArticles() {

    }

    onNewSocialMedia() {

    }
    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <View style={styles.entireView}>
                    <TouchableOpacity style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                All Notifications
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Image source={Mark_Icon} style={styles.headBG}/>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewClassesPosted()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New classes posted 
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onUpcomingRegisteredClass()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                Upcoming registered class
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewFriendRequest()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New Friend Request
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewFriend()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New Friend
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewMessage()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New Message
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewDeals()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New Deals
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewNews()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New News
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewArticles()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New Articles
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <TouchableOpacity style={styles.twoView} onPress={()=>this.onNewSocialMedia()}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                New Social Media posts
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#FFFFFF'
    },
    entireView: {
        width: width-dynamicSize(20),
        marginLeft: dynamicSize(10)
    },
    twoView: {
        flexDirection: 'row'
    },
    first: {
        width: (width-dynamicSize(20))/2,
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    second: {
        width: (width-dynamicSize(20))/2,
        height: dynamicSize(50),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black'
    },
    subText: {
        fontFamily: 'Roboto-Bold',
        fontSize: getFontSize(14),
        color: '#5deedd'
    },
    regularText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: '#5deedd'
    },
    whole: {
        width: width-dynamicSize(20),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    headBG: {
        width: dynamicSize(10),
        height: dynamicSize(19),
        resizeMode: 'contain'
    }
});

Notifications.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

Notifications.defaultProps = {
  
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Notifications);