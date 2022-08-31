import React from 'react';
import {
	Modal,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewPropTypes,
	Text,
	Image,
	Dimensions
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

import { dynamicSize, getFontSize } from '../utils/DynamicSize';
import { Dark_Blue } from '../colors';

const {height, width} = Dimensions.get('window');
const Camera =  require('../images/camera.png');

export default class CustomActions extends React.Component {
	constructor(props) {
		super(props);
		this._images = [];
		this.state = {
			modalVisible: false,
		};
		this.onActionsPress = this.onActionsPress.bind(this);
		this.selectImages = this.selectImages.bind(this);
	}

	setImages(images) {
		this._images = images;
	}

	getImages() {
		return this._images;
	}

	setModalVisible(visible = false) {
		this.setState({modalVisible: visible});
	}

	onActionsPress() {
		const options = ['Choose From Library', 'Cancel'];
		const cancelButtonIndex = options.length - 1;
		this.context.actionSheet().showActionSheetWithOptions({
			options,
			cancelButtonIndex,
		},
		(buttonIndex) => {
			switch (buttonIndex) {
				case 0:
					this.setModalVisible(true);
					break;
				default:
			}
		});
	}

	selectImages(images) {
		this.setImages(images);
	}

	renderNavBar() {
		return (
			<View style={styles.navView}>
                <View style={styles.leftView}>
                    <TouchableOpacity 
                    	onPress={() => {
							this.setModalVisible(false);
						}}
					>
                        <Text style={styles.username}>
	                        Cancel
	                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.centerView}>
                    <Text style={styles.titleText}>
                        Camera Roll
                    </Text>
                </View>
                <View style={styles.rightView}>
                	<TouchableOpacity 
                		onPress={() => {
							this.setModalVisible(false);

							const images = this.getImages().map((image) => {
								return {
									image: image.uri,
								};
							});
							this.props.onSend(images);
							this.setImages([]);
						}}
					>
                        <Text style={styles.username}>
	                        Send
	                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
		);
	}

	renderIcon() {
		if (this.props.icon) {
			return this.props.icon();
		}
		return (
			<Image source={Camera} style={styles.cameraicon}/>
		);
	}

	render() {
		return (
			<TouchableOpacity
				style={[styles.container, this.props.containerStyle]}
				onPress={this.onActionsPress}
			>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.setModalVisible(false);
					}}
				>
					{this.renderNavBar()}
					<CameraRollPicker
						maximum={10}
						imagesPerRow={4}
						callback={this.selectImages}
						selected={[]}
					/>
				</Modal>
				{this.renderIcon()}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: '#b2b2b2',
		borderWidth: 2,
		flex: 1,
	},
	iconText: {
		color: '#b2b2b2',
		fontWeight: 'bold',
		fontSize: 16,
		backgroundColor: 'transparent',
		textAlign: 'center',
	},
	cameraicon: {
		width: 25,
		height: 25,
		resizeMode: 'contain',
		marginLeft: 5,
		marginRight: 10,
		marginBottom: 10,
	},
	navView: {
        width: width,
        height: dynamicSize(70),
        flexDirection: 'row',
        backgroundColor: Dark_Blue
    },
    leftView: {
        width: dynamicSize(100),
        height: dynamicSize(70),
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: dynamicSize(10),
        paddingLeft: dynamicSize(10)
    },
    centerView: {
        width: width - dynamicSize(200),
        height: dynamicSize(70),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: dynamicSize(20)
    },
    rightView: {
        width: dynamicSize(100),
        height: dynamicSize(70),
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: dynamicSize(10),
        paddingRight: dynamicSize(10)
    },
    username: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(16),
        color: 'white',
    },
    titleText: {
    	fontFamily: 'Roboto-Bold',
        fontSize: getFontSize(18),
        color: 'white',
        paddingLeft: dynamicSize(5)	
    }
});

CustomActions.contextTypes = {
	actionSheet: React.PropTypes.func,
};

CustomActions.defaultProps = {
	onSend: () => {},
	options: {},
	icon: null,
	containerStyle: {},
	wrapperStyle: {},
	iconTextStyle: {},
};

CustomActions.propTypes = {
	onSend: React.PropTypes.func,
	options: React.PropTypes.object,
	icon: React.PropTypes.func,
	containerStyle: ViewPropTypes.style,
	wrapperStyle: ViewPropTypes.style,
	iconTextStyle: Text.propTypes.style,
};
