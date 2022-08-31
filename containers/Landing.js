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
    Alert,
    ActivityIndicator,
    NativeModules,
    AsyncStorage
}
    from 'react-native';
import {connect} from 'react-redux';
import Camera from 'react-native-camera';

import { changeAppRoot } from '../actions/initAC'
import * as navStates from '../constants/NavState'
import * as colors from '../colors';
import screens from '../constants/Screens'
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import { Dark_Blue } from '../colors';

const { height, width } = Dimensions.get('window');
const LoginBG =  require('../images/login_background.png');
const Logo_Icon =  require('../images/logo.png');
const Barcode_Icon =  require('../images/barcode.png');
const Pin_Icon =  require('../images/pin.png');
const Separator_Icon =  require('../images/separator.png');
const Arrow_Icon =  require('../images/rightarrow.png');
const DigitsManager = require("react-native").NativeModules.DigitsManager;

class Landing extends Component{
    constructor(props) {
		super(props)
		this.state = {
            animating: false,
            suitText: ''
		}
        this.onLogin = this.onLogin.bind(this)
	}

    componentDidMount() {
        AsyncStorage.getItem("userId", (error, value) => {
            if (value !== null) {
                this.setState({
                    suitText: "Log In"
                })
            }else {
                this.setState({
                    suitText: "Sign Up"
                })
            }
        })
    }

    onBarcodScan() {
        this.props.navigator.showModal({
            title: "Scan Barcode",
            screen: screens.BARCODESCAN,
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarButtonColor: '#ffffff', 
            },
            animationType: 'slide-up'
        })
    }

    onGetHelp() {
        this.props.navigator.showModal({
            title: "Get Help",
            screen: screens.GETHELP,
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarButtonColor: '#ffffff', 
            },
            animationType: 'slide-up'
        })
    }

    onLogin() {
        AsyncStorage.getItem("userId", (error, value) => {
            if (value !== null) {
                AsyncStorage.getItem("token", (error, returnValue) => {
                    if (returnValue !== null) {
                        this.props.dispatch(changeAppRoot(navStates.NAV_ROOT_MAIN))
                    }else {
                        this.props.dispatch(changeAppRoot(navStates.NAV_ROOT_SIGNIN))
                    }
                })
            }else {
                this.props.dispatch(changeAppRoot(navStates.NAV_ROOT_SIGNUP))
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <Image source={LoginBG} style={styles.backgroundImage}>
                    <View style={styles.upperView}>
                        <View style={styles.logoView}>
                            <Image source={Logo_Icon} style={styles.logoIcon}/>
                        </View>
                        <View style={styles.barcodeView}>
                            <TouchableOpacity style={styles.scanButtonView}
                                              onPress={() => this.onBarcodScan()}
                            >
                                <Image source={Barcode_Icon} style={styles.scanImage}/>
                                <Text style={styles.scanText}>
                                    Scan Barcode
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separatorView}>
                            <Image source={Separator_Icon} style={styles.sepImage}/>
                        </View>
                        <View style={styles.pinView}>
                            <TouchableOpacity style={styles.pinButtonView}
                                            onPress={this.onLogin}
                            >
                                <Image source={Pin_Icon} style={styles.pinImage}/>
                                <Text style={styles.pinText}>
                                    {this.state.suitText}
                                </Text>
                                {this.state.animating ? 
                                    <View style={{marginLeft: 5}}>
                                        <ActivityIndicator
                                            animating={this.state.animating}
                                            style={[styles.centering, {height: dynamicSize(40)}]}
                                            size="small"
                                            color='white'
                                        />
                                    </View>
                                    :
                                    <View></View>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.gethelpView}
                                          onPress={() => this.onGetHelp()}
                        >
                            <Text style={styles.helpText}>
                                    Get Help
                            </Text>
                            <Image source={Arrow_Icon} style={styles.arrowImage}/>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height
    },
    backgroundImage: {
        width: width, 
        height: height, 
        resizeMode: 'cover'
    },
    logoView: {
        width: width, 
        height: height/2, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    logoIcon: {
        width: dynamicSize(120), 
        height: dynamicSize(115), 
        resizeMode: 'contain'
    },
    barcodeView: {
        width: width, 
        height: dynamicSize(80), 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    scanButtonView: {
        width: width-dynamicSize(100), 
        height: dynamicSize(50), 
        borderWidth: 1, 
        borderColor: '#acc0d9',
        borderRadius: 5, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'transparent'
    },
    scanImage: {
        width: dynamicSize(25), 
        height: dynamicSize(18), 
        resizeMode: 'contain'
    },
    scanText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(20), 
        color: '#ffffff', 
        marginLeft: dynamicSize(10)
    },
    pinView: {
        width: width, 
        height: dynamicSize(80), 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    pinButtonView: {
        width: width-dynamicSize(100), 
        height: dynamicSize(50), 
        borderRadius: 5, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#57c385'
    },
    pinImage: {
        width: dynamicSize(20), 
        height: dynamicSize(28), 
        resizeMode: 'contain'
    },
    pinText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(20), 
        color: '#ffffff', 
        marginLeft: dynamicSize(10)
    },
    separatorView: {
        width: width,
        height: dynamicSize(30),
        alignItems: 'center',
        justifyContent: 'center'
    },
    sepImage: {
        width: dynamicSize(250),
        height: dynamicSize(11),
        resizeMode: 'contain'
    },
    upperView: {
        width: width,
        height: height-dynamicSize(60)
    },
    footerView: {
        width: width,
        height: dynamicSize(60),
        justifyContent: 'center',
        alignItems: 'center',
    },
    gethelpView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    helpText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(15), 
        color: '#ffffff', 
        marginLeft: dynamicSize(10)
    },
    arrowImage: {
        width: dynamicSize(13),
        height: dynamicSize(16),
        resizeMode: 'contain',
        marginLeft: dynamicSize(10),
    }
});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Landing);