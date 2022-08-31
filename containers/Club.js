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
    ListView
}
from 'react-native';
import {connect} from 'react-redux';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'

const {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;

const ClubBG =  require('../images/club_bg.png');
const UserIcon =  require('../images/defaultuser.png');
const LocationIcon =  require('../images/locationmark.png');
const ClockIcon =  require('../images/clock.png');
const PhoneIcon =  require('../images/phoneicon.png');

class Club extends Component {

    constructor(props) {
		super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
            dataSource: ds.cloneWithRows(this.props.trainerInfo),
		};
	}

    componentDidMount() {
        
    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }

    renderRow(data, sectionID, rowID) {
		return (
            <TouchableOpacity
                style={styles.listItemView}
            >
                <View style={styles.userPhotoView}>
                    <Image source={data.uri} style={styles.userImageView}/>
                </View>
                <View style={styles.listContentView}>
                    <Text style={styles.companyNameText}>
                        {data.name}
                    </Text>
                </View>
                <View style={styles.chevronView}>
                    <Text style={styles.roleText}>
                        {data.role}
                    </Text>
                </View>
            </TouchableOpacity>
        );
	}

  _renderSeparator(sectionID, rowID) {
		return (
			<View key={`${sectionID}-${rowID}`}>
				<Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
			</View>
		);
	}

    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <Image source={ClubBG} style={styles.headBG}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            Club
                        </Text>
                    </View>
                    <View style={styles.titleFooter}>
                        <Text style={styles.nameText}>
                            Fitness Group
                        </Text>
                        <View style={styles.ownerView}>
                            <Image source={UserIcon} style={styles.usericon}/>
                            <Text style={styles.ownerText}>
                                John Doe
                            </Text>
                        </View>
                    </View>
                </Image>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={LocationIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.dateRightView}>
                            <Text style={styles.dateText}>
                                Address Location
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={PhoneIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.dateRightView}>
                            <Text style={styles.dateText}>
                                +123 456 7890
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>                    
                    <View style={styles.dateView}>
                        <View style={styles.dateLeftView}>
                            <Image source={ClockIcon} style={styles.calendar}/>
                        </View>
                        <View style={styles.hourView}>
                           <View style={styles.contentLeft}>
                                <Text style={styles.dateText}>
                                    Open Hours:
                                </Text>
                            </View>
                            <View style={styles.contentRight}>
                                <Text style={styles.dateText}>
                                    09:30 - 21:30
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.paddingView}>
                        <TouchableOpacity style={styles.signupbutton}>
                            <Text style={styles.signupText}>
                                REFER A FRIEND
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionTitle}>
                            EMPLOYEES AND TRAINERS
                        </Text>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSeparator={this._renderSeparator.bind(this)} />
                    <View style={styles.paddingView}/>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
    },
    headBG: {
        width: width,
        height: dynamicSize(270),
        resizeMode: 'cover'
    },
    scrollView: {
        width: width,
    },
    titleView: {
        width: width,
        height: dynamicSize(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    titleText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(20), 
        color: '#FFFFFF'
    },
    titleFooter: {
        width: width,
        height: dynamicSize(150),
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
        width: dynamicSize(30),
        height: dynamicSize(30),
        resizeMode: 'contain'
    },
    ownerText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(16), 
        color: '#FFFFFF',
        marginLeft: dynamicSize(5)
    },    
    dateView: {
        width: width - dynamicSize(20),
        height: dynamicSize(50),
        marginLeft: dynamicSize(10),
        flexDirection: 'row'
    },
    dateLeftView: {
        width: dynamicSize(30),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateRightView: {
        width: width - dynamicSize(50),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    calendar: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        resizeMode: 'contain',
    },
    dateText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(13), 
        color: '#000000',
    },
    hourView: {
        width: width - dynamicSize(50),
        height: dynamicSize(50),
        flexDirection: 'row'
    },
    contentLeft: {
        width: (width - dynamicSize(50)) / 2,
        height: dynamicSize(50),
        justifyContent: 'center'
    },
    contentRight: {
        width: (width - dynamicSize(50)) / 2,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    paddingView: {
        width: width,
        height: dynamicSize(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupbutton: {
        width: width / 1.5,
        height: dynamicSize(40),
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
    descriptionView: {
        width: width - dynamicSize(40),
        marginLeft: dynamicSize(20),
    },
    descriptionTitle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(16), 
        color: '#000000',
        marginTop: dynamicSize(10)
    },
    listItemView: {
        width: width-dynamicSize(40),
        marginLeft: dynamicSize(20),
        height: dynamicSize(60),
        marginTop: dynamicSize(10),
        flexDirection: 'row'
    },
    userPhotoView: {
        width: dynamicSize(50),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageView: {
        width: dynamicSize(44),
        height: dynamicSize(44),
        resizeMode: 'cover',
        borderRadius: dynamicSize(22)
    },
    listContentView: {
        width: width - dynamicSize(200),
        height: dynamicSize(60),
        justifyContent: 'center'
    },
    chevronView: {
        width: dynamicSize(110),
        height: dynamicSize(60),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    companyNameText: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(14), 
        color: '#000000',
        paddingLeft: dynamicSize(5)
    },
    roleText: {
        fontFamily: 'Roboto-Light', 
        fontSize: getFontSize(14), 
        color: '#000000'
    },
});

Club.navigatorStyle = {
  navBarHidden: true,
  statusBarBlur: true,
}

Club.defaultProps = {
  trainerInfo: [
    {
      uri: require('../images/defaultuser.png'),
      name: 'James K',
      role: 'Trainer'
    },
    {
      uri: require('../images/avatar.png'),
      name: 'Jane L',
      role: 'Employee'
    },
    {
      uri: require('../images/user1.png'),
      name: 'Kevin S',
      role: 'Trainer'
    },
  ]
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Club);