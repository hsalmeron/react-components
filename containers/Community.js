import React, { Component } from 'react';
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
    ListView
}
from 'react-native';
import {connect} from 'react-redux';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import screens from '../constants/Screens'
import { Dark_Blue } from '../colors';

const { height, width } = Dimensions.get('window');
const Mark_Icon =  require('../images/graychevron.png');
const Group_Icon =  require('../images/black_group_icon.png');
const Forum_Icon =  require('../images/forum.png');
const leftButtons = { icon: require('../images/menu.png'), id: 'sideMenu' };

class Community extends Component {
    static navigatorButtons = {
        leftButtons: [
            Platform.OS == 'ios' ? leftButtons : leftButtons
        ]
    };

    constructor(props) {
		super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {
            filterEnable: false
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
            if (event.id == 'sideMenu') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'missing'
                })
            }
        }
    }

    gotoMembers() {
        this.props.navigator.showModal({
            title: "Members",
            screen: screens.MEMBERS,
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarButtonColor: '#ffffff', 
            },
            animationType: 'slide-up'
        })
    }

    gotoForumView() {
        this.props.navigator.showModal({
            title: "Forum Listview",
            screen: screens.FORUMVIEW,
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarButtonColor: '#ffffff', 
            },
            animationType: 'slide-up'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.entireView}>
                    <TouchableOpacity style={styles.twoView} onPress={()=> this.gotoMembers()}>
                        <View style={styles.first}>
                            <Image source={Group_Icon} style={styles.groupicon}/>
                            <Text style={styles.mainText}>
                                Meet the members
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Image source={Mark_Icon} style={styles.headBG}/>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width} height={1}/>
                </View>
                <View style={styles.entireView}>
                    <TouchableOpacity style={styles.twoView} onPress={()=> this.gotoForumView()}>
                        <View style={styles.first}>
                            <Image source={Forum_Icon} style={styles.groupicon}/>
                            <Text style={styles.mainText}>
                                Community Forum
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Image source={Mark_Icon} style={styles.headBG}/>
                        </View>
                    </TouchableOpacity>
                    <Separator color={"#f0f0f0"} width={width} height={1}/>
                </View>
            </View>
        );
    }
};

Community.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

Community.defaultProps = {

}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
    },
    entireView: {
        backgroundColor: '#fbfbfb'
    },
    twoView: {
        flexDirection: 'row'
    },
    first: {
        width: (width-dynamicSize(10))/2,
        height: dynamicSize(50),
        flexDirection: 'row',
        alignItems: 'center'
    },
    second: {
        width: (width-dynamicSize(10))/2,
        height: dynamicSize(50),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        marginLeft: dynamicSize(10)
    },
    headBG: {
        width: dynamicSize(10),
        height: dynamicSize(19),
        resizeMode: 'contain'
    },
    groupicon: {
        width: dynamicSize(20),
        height: dynamicSize(19),
        resizeMode: 'contain',
        marginLeft: dynamicSize(10)
    }
});

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(Community);