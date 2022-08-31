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
    ListView,
    TextInput,
    Alert
}
    from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import screens from '../constants/Screens'
import { changeAppRoot } from '../actions/initAC'
import * as navStates from '../constants/NavState'
import { loginUser} from '../actions/userActions';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { Dark_Blue } from '../colors';

const { height, width } = Dimensions.get('window');
const AvatarBG =  "http://kodeinfo.com/admin_assets/assets/img/avatars/default-avatar.jpg";

class SignIn extends Component {
    constructor(props) {
		super(props)
		this.state = {
            signinUser: {
                username: '',
                password: ''
            },
		}
	}

    componentDidMount() {

    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }
    
    goSignUp() {
        this.props.dispatch(changeAppRoot(navStates.NAV_ROOT_SIGNUP))
    }

    onSignIn() {
        let {username, password} = this.state.signinUser
        
        let success = username && password
        if(success) {
            const { dispatch, navigator } = this.props
            dispatch(loginUser.request(username, password, dispatch))
        }else{
            Alert.alert('Error','Please complete all fields.',
                    [{text: 'Ok', onPress: () => {}}]
            );
        }
    }

    render() {
        let {username, password} = this.state.signinUser
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <StatusBar 
                        barStyle="light-content"
                        hidden={Platform.OS == 'ios'? false: true}/>
                    <View style={styles.nameView}>
                        <TextInput 
                            style={styles.usernameTextInput}
                            placeholder="Username" 
                            size={14}
                            autoCapitalize="none"
                            value={username}
                            ref='username'
                            returnKeyType='next'
                            onSubmitEditing={(event) => {
                                this.refs.password.focus();
                            }}
                            onChangeText={text => this.setState(
                                {
                                    signinUser:
                                    {
                                        username: text,
                                        password: password,
                                    }
                                })}
                        />
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.nameView}>
                        <TextInput 
                            style={styles.usernameTextInput}
                            placeholder="Password" 
                            size={14}
                            autoCapitalize="none"
                            value={password}
                            ref='password'
                            returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={text => this.setState(
                                {
                                    signinUser:
                                    {
                                        username: username,
                                        password: text,
                                    }
                                })}
                        />
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.signbtnView}>
                        <TouchableOpacity style={styles.signupbutton} onPress={()=> this.onSignIn()}>
                            <Text style={styles.signupText}>
                                SIGN IN
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.signupNav}>
                            <Text style={styles.linkText}>
                                Don't have an account?
                            </Text>
                            <TouchableOpacity style={styles.linkView} onPress={()=> this.goSignUp()}>
                                <Text style={styles.confirmText}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
};

SignIn.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

SignIn.defaultProps = {
    
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#FFFFFF'
    },
    nameView: {
        width: width - dynamicSize(20),
        height: dynamicSize(50),
        marginLeft: dynamicSize(10),
        flexDirection: 'row',
        marginTop: dynamicSize(10)
    },
    usernameTextInput: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        width: width - dynamicSize(20),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    signupbutton: {
        width: width / 2,
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
    signbtnView: {
        width: width,
        marginTop: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupNav: {
        flexDirection: 'row',
        marginTop: dynamicSize(30)
    },
    linkText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(14), 
        color: '#000000',  
    },
    linkView: {
        paddingLeft: dynamicSize(5)
    },
    confirmText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(14), 
        color: '#c34646',
        textDecorationLine: 'underline' 
    }
});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(SignIn);
