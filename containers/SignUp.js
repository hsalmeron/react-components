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
import { createUser} from '../actions/userActions';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { Dark_Blue } from '../colors';

const { height, width } = Dimensions.get('window');
const AvatarBG =  "http://kodeinfo.com/admin_assets/assets/img/avatars/default-avatar.jpg";

class SignUp extends Component {
    constructor(props) {
		super(props)
		this.state = {
            signupUser: {
                email: '',
                avatar : AvatarBG,
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                homeClub: '',
                goals: [],
                pictures: [],
                location: '',
                tags: [],
                friends: [],
                isRegistered: true,
                role: 'member',
                navigator: this.props.navigator
            },
            confirmpassword: ''
		}
	}

    componentDidMount() {

    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }
   
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    goSignIn() {
        this.props.dispatch(changeAppRoot(navStates.NAV_ROOT_SIGNIN))
    }

    onSignUp() {
        let {email, password} = this.state.signupUser
        let {confirmpassword} = this.state
        
        let success = email && password && confirmpassword
        if(success) {
            let emailValid = this.validateEmail(email)
            let passwordMatch = false
            if (password === confirmpassword) {
                passwordMatch = true   
            }
            if (emailValid && passwordMatch) {
                const { dispatch } = this.props
                dispatch(createUser.request(this.state.signupUser))
            }else {
                Alert.alert('Error','Validation Error is occured.',
                    [{text: 'Ok', onPress: () => {}}]
                );
            }
        }else{
            Alert.alert('Error','Please complete all fields.',
                    [{text: 'Ok', onPress: () => {}}]
            );
        }
    }

    render() {
        let {firstName, lastName, avatar, username, email, password, homeClub, goals, pictures, location, tags, friends, isRegistered} = this.state.signupUser
        let {confirmpassword} = this.state
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <StatusBar 
                        barStyle="light-content"
                        hidden={Platform.OS == 'ios'? false: true}/>
                    <View style={styles.nameView}>
                        <TextInput 
                            style={styles.usernameTextInput}
                            placeholder="Email" 
                            size={14}
                            autoCapitalize="none"
                            value={email}
                            ref='email'
                            returnKeyType='next'
                            onSubmitEditing={(event) => {
                                this.refs.password.focus();
                            }}
                            onChangeText={text => this.setState(
                                {
                                    signupUser:
                                    {
                                        email: text,
                                        avatar : avatar,
                                        firstName: firstName, 
                                        lastName: lastName, 
                                        username: text,
                                        password: password,
                                        homeClub: homeClub,
                                        goals: goals,
                                        friends : friends,
                                        pictures : pictures,
                                        location: location,
                                        tags: tags,
                                        isRegistered: true,
                                        role: 'member',
                                        navigator: this.props.navigator                                 
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
                            onSubmitEditing={(event) => {
                                this.refs.confirmpassword.focus();
                            }}
                            onChangeText={text => this.setState(
                                {
                                    signupUser:
                                    {
                                        email: email,
                                        avatar : avatar,
                                        firstName: firstName, 
                                        lastName: lastName, 
                                        username: username,
                                        password: text,
                                        homeClub: homeClub,
                                        goals: goals,
                                        friends : friends,
                                        pictures : pictures,
                                        location: location,
                                        tags: tags,
                                        isRegistered: true,
                                        role: 'member',
                                        navigator: this.props.navigator                                   
                                    }
                                })}
                        />
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.nameView}>
                        <TextInput 
                            style={styles.usernameTextInput}
                            placeholder="Confirm Password" 
                            size={14}
                            autoCapitalize="none"
                            value={confirmpassword}
                            ref='confirmpassword'
                            returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={text => this.setState(
                                {
                                    confirmpassword: text
                                })}
                        />
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.signbtnView}>
                        <TouchableOpacity style={styles.signupbutton} onPress={()=> this.onSignUp()}>
                            <Text style={styles.signupText}>
                                SIGN UP
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.signupNav}>
                            <Text style={styles.linkText}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity style={styles.linkView} onPress={()=> this.goSignIn()}>
                                <Text style={styles.confirmText}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
};

SignUp.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

SignUp.defaultProps = {
    
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

export default connect(mapStateToProps)(SignUp);