import React, { Component, PropTypes } from 'react'
import {
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
	AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import screens from '../constants/Screens'
import { changeAppRoot } from '../actions/initAC'
import * as navStates from '../constants/NavState'

const {height, width} = Dimensions.get('window');
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { Dark_Blue } from '../colors';

// Selectors
import { signUpFormSelector } from '../selectors/userSelectors';
import { fetchMe } from '../actions/profileActions';
import {
	fetchMeSelector,
	fetchMePendingSelector
} from '../selectors/profileSelectors';

const Classes =  require('../images/classes.png');
const MemberShip =  require('../images/membership.png');
const Notification =  require('../images/notification.png');
const Friends =  require('../images/friends.png');
const Message =  require('../images/message.png');
const Logout =  require('../images/logout.png');

class Menu extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		
	}

	componentWillMount () {
		const { dispatch, form } = this.props;
		AsyncStorage.getItem("userId", (error, value) => {
            if (value !== null) {
                dispatch(fetchMe.request(value));
            }
        })
	}

	componentWillUnmount () {
		
	}

	gotoClasses() {
		this._toggleDrawer()
		this.props.navigator.showModal({
			title: "My Classes",
			screen: screens.MYCLASSES,
			navigatorStyle: {
				navBarTextColor: '#ffffff',
				navBarBackgroundColor: Dark_Blue,
				navBarButtonColor: '#ffffff', 
			},
			animationType: 'none'
		})
	}

	gotoMembership() {
		this._toggleDrawer()
		this.props.navigator.showModal({
			title: "Membership",
			screen: screens.MEMBERSHIP,
			navigatorStyle: {
				navBarTextColor: '#ffffff',
				navBarBackgroundColor: Dark_Blue,
				navBarButtonColor: '#ffffff', 
			},
			animationType: 'none'
		})
	}

	gotoNotification() {
		this._toggleDrawer()
		this.props.navigator.showModal({
			title: "Notification Settings",
			screen: screens.NOTIFICATIONS,
			navigatorStyle: {
				navBarTextColor: '#ffffff',
				navBarBackgroundColor: Dark_Blue,
				navBarButtonColor: '#ffffff', 
			},
			animationType: 'none'
		})
	}

	gotoFriends() {
		this._toggleDrawer()
		this.props.navigator.showModal({
			title: "Friends",
			screen: screens.FRIENDS,
			navigatorStyle: {
				navBarTextColor: '#ffffff',
				navBarBackgroundColor: Dark_Blue,
				navBarButtonColor: '#ffffff', 
			},
			animationType: 'none'
		})
	}

	gotoMessages() {
		this._toggleDrawer()
		this.props.navigator.showModal({
			title: "Messages",
			screen: screens.MESSAGES,
			navigatorStyle: {
				navBarTextColor: '#ffffff',
				navBarBackgroundColor: Dark_Blue,
				navBarButtonColor: '#ffffff', 
			},
			animationType: 'none'
		})
	}

	onLogout() {
		AsyncStorage.setItem('token', "");
		this.props.dispatch(changeAppRoot(navStates.NAV_ROOT_LANDING))
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		})
	}

	render() {
		const { detailInfo, pending } = this.props
		return (
			<View style={styles.container}>
				<View style={styles.photoview}>
					{detailInfo.avatar != '' && (
							<Image source={{uri: detailInfo.avatar}} style={styles.photoStyle}/>
					)}
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								{detailInfo.firstName} {detailInfo.lastName}
						</Text>
						<Text style={styles.useridText}>
								{detailInfo.username}
						</Text>
					</View>
				</View>
				<View style={styles.spaceView}>
				</View>
				<TouchableOpacity style={styles.buttonview} onPress={()=> this.gotoClasses()}>
					<Image source={Classes} style={styles.iconStyle}/>
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								My Classes
						</Text>
					</View>
				</TouchableOpacity>
				<Separator color={"#1a2d3e"} width={width} height={1} style={{marginLeft: dynamicSize(40)}}/>
				<TouchableOpacity style={styles.buttonview} onPress={()=> this.gotoMembership()}>
					<Image source={MemberShip} style={styles.iconStyle}/>
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								Membership
						</Text>
					</View>
				</TouchableOpacity> 
				<Separator color={"#1a2d3e"} width={width} height={1} style={{marginLeft: dynamicSize(40)}}/>
				<TouchableOpacity style={styles.buttonview} onPress={()=> this.gotoNotification()}>
					<Image source={Notification} style={styles.iconStyle}/>
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								Notifications
						</Text>
					</View>
				</TouchableOpacity> 
				<Separator color={"#1a2d3e"} width={width} height={1} style={{marginLeft: dynamicSize(40)}}/>       
				<TouchableOpacity style={styles.buttonview} onPress={()=> this.gotoFriends()}>
					<Image source={Friends} style={styles.iconStyle}/>
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								Friends 
						</Text>
					</View>
				</TouchableOpacity> 
				<Separator color={"#1a2d3e"} width={width} height={1} style={{marginLeft: dynamicSize(40)}}/>       
				<TouchableOpacity style={styles.buttonview} onPress={()=> this.gotoMessages()}>
					<Image source={Message} style={styles.iconStyle}/>
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								Messages
						</Text>
					</View>
				</TouchableOpacity> 
				<Separator color={"#1a2d3e"} width={width} height={1} style={{marginLeft: dynamicSize(40)}}/>       
				<TouchableOpacity style={styles.buttonview} onPress={()=> this.onLogout()}>
					<Image source={Logout} style={styles.iconStyle}/>
					<View style={styles.horizontal}>
						<Text style={styles.fullnameText}>
								Logout
						</Text>
					</View>
				</TouchableOpacity> 
				<Separator color={"#1a2d3e"} width={width} height={1} style={{marginLeft: dynamicSize(40)}}/>       
				<View style={styles.largespaceView}>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Dark_Blue,
		justifyContent: 'center'
	},
	photoview: {
		flexDirection: 'row',
		marginLeft: dynamicSize(40),
		alignItems: 'center',
		height: dynamicSize(100),
	},
	buttonview: {
		flexDirection: 'row',
		marginLeft: dynamicSize(40),
		alignItems: 'center',
		height: dynamicSize(50),
	},
	photoStyle: {
		width: dynamicSize(80),
		height: dynamicSize(80),
		borderRadius: dynamicSize(40),
		resizeMode: 'contain'
	},
	iconStyle: {
		width: dynamicSize(16),
		height: dynamicSize(24),
		resizeMode: 'contain',
		marginLeft: dynamicSize(10)
	},
	horizontal: {
		marginLeft: dynamicSize(10)
	},
	fullnameText: {
		fontFamily: 'Roboto-Regular',
		fontSize: getFontSize(15),
		color: 'white'
	},
	useridText: {
		fontFamily: 'Roboto-Regular',
		fontSize: getFontSize(13),
		color: 'white'
	},
	spaceView: {
		width: width,
		height: dynamicSize(20)
	},
	largespaceView: {
		width: width,
		height: dynamicSize(80)
	}
})

Menu.propTypes = {
	dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	form: signUpFormSelector(state),
	detailInfo: fetchMeSelector(state),
	pending: fetchMePendingSelector(state)
})

export default connect(mapStateToProps)(Menu)
