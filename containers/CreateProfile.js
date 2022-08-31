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
    Alert,
    AsyncStorage
}
from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import TagInput from 'react-native-tag-input';
import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-loading-spinner-overlay';

import {fetchPendingSelector} from '../selectors/userSelectors';
import { updateUser} from '../actions/userActions';
import { signUpFormSelector } from '../selectors/userSelectors';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import GoalsModal from '../components/GoalsModal'
import { Dark_Blue } from '../colors';

const { height, width } = Dimensions.get('window');
const AvatarBG =  "http://kodeinfo.com/admin_assets/assets/img/avatars/default-avatar.jpg";
const ProfileIcon =  require('../images/profileicon.png');
const PasswordIcon =  require('../images/password.png');
const CameraIcon =  require('../images/cameraicon.png');
const PencilIcon =  require('../images/pencilicon.png');
const NameIcon =  require('../images/nameicon.png');
const ClubIcon =  require('../images/clubicon.png');
const GoalIcon =  require('../images/goal.png');
const LocationIcon =  require('../images/locationmark.png');
const TagIcon =  require('../images/tagicon.png');

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CreateProfile extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back',
            },
        ],
        rightButtons: [
            {
                title: 'Save',
                id: 'save',
            },
        ]
    };

    constructor(props) {
		super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
		this.state = {
            value: {
                id: this.props.form.id,
                avatar : AvatarBG,
				firstName: '',
                lastName: '',
                username: this.props.form.username,
                email: this.props.form.email,
                password: '',
                homeClub: '',
                goals: [],
                pictures: [],
                location: '',
                tags: [],
                friends: [],
                isRegistered: true,
                dispatch: this.props.dispatch
			},
            query: '',
            goalvalues: this.props.goalsPredefinedValues,
            goalsModalVisible: false,
            goalSelected: [],
            goalState: []
		}
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
            if (event.id == 'save') {
                this.checkValidation()
            }
            if (event.id == 'back') {
                this.props.navigator.pop({
                    animated: true,
                    animationType: 'fade'
                });
            }
        }
    }

    selectAvatar() {
        let {id, firstName, lastName, avatar, username, password, email, homeClub, goals, pictures, location, tags, friends, isRegistered} = this.state.value
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                let source = { uri: response.uri }
                this.setState({
                    value: {
                        id: this.props.form.id,
                        avatar: source.uri,
                        goals : goals,
                        friends : friends,
                        pictures : pictures,
                        firstName: firstName, 
                        lastName: lastName, 
                        username: username,
                        password: password,
                        email: email,
                        homeClub: homeClub,
                        location: location,
                        tags: tags,
                        isRegistered: true,
                        dispatch: this.props.dispatch
                    }
                });
            }
        });
    }

    checkValidation() {
        let {id, firstName, lastName, avatar, username, password, email, homeClub, goals, pictures, location, tags, friends, isRegistered} = this.state.value
        let success = firstName && username && homeClub
       
        if(success) {
            const { dispatch } = this.props
            dispatch(updateUser.request(this.state.value, this.props.dispatch))
        }else{
            Alert.alert('Error','Please complete all fields.',
					[{text: 'Ok', onPress: () => {}}]
            );
        }
    }

    findGoalValue(query) {
        if (query === '') {
            return [];
        }

        const { goalvalues } = this.state
        const regex = new RegExp(`${query.trim()}`, 'i')
        return goalvalues.filter(goalvalue => goalvalue.search(regex) >= 0)
    }

    goalSelect() {
        this.setState({goalsModalVisible: true})
    }

    closeModal() {
        let {firstName, lastName, avatar, username, password, email, homeClub, goals, pictures, location, tags, friends, isRegistered} = this.state.value
        this.setState({goalsModalVisible: false})
        const indexArray = this.state.goalSelected
        const valueArray = this.props.goalsPredefinedValues
        const goalState =  []
        return valueArray.map(( _filter, index) => {
            if(indexArray[index]){
                goalState.push(_filter.name)
                this.setState({
                    value: {
                        id: this.props.form.id,
                        goals : goalState,
                        friends : friends,
                        pictures : pictures,
                        avatar : avatar,
                        firstName: firstName, 
                        lastName: lastName, 
                        username: username,
                        email: email,
                        homeClub: homeClub,
                        location: location,
                        tags: tags,
                        isRegistered: true,
                        dispatch: this.props.dispatch
                    }
                })
            }
        })
    }

    onTagChange(tagValues) {
        let {firstName, lastName, avatar, username, password, email, homeClub, goals, pictures, location, friends, isRegistered} = this.state.value
        this.setState({
            value: {
                id: this.props.form.id,
                goals : goals,
                friends : friends,
                pictures : pictures,
                avatar : avatar,
                firstName: firstName, 
                lastName: lastName, 
                username: username,
                email: email,
                homeClub: homeClub,
                location: location,
                tags: tagValues,
                isRegistered: true,
                dispatch: this.props.dispatch
            }
        })
    }

    getGoalCount() {
        let {goalSelected} = this.state
        let initGoalValue = 0
        goalSelected.map((goalValue, index) => {
            if (goalValue) {
                initGoalValue++
            }
        })
        return initGoalValue
    }

    renderGoalValues() {
        const indexArray = this.state.goalSelected
        const valueArray = this.props.goalsPredefinedValues
        return valueArray.map(( _filter, index) => {
            if(indexArray[index]){
                return(
                    <View style={styles.onetext} key={index}>
                        <Text style={styles.commonText}>
                            {_filter.name},
                        </Text>
                    </View>
                );
            }
        })
    }

    _renderSeparator(sectionID, rowID) {
        return (
            <View key={`${sectionID}-${rowID}`}>
                <Separator color={"#e6e6e6"} width={width - dynamicSize(120)} height={1} style={{}}/>
            </View>
        );
    }

    render() {
        let {firstName, lastName, avatar, username, password, email, homeClub, goals, pictures, location, tags, friends, isRegistered} = this.state.value
        const { query, goalSelected } = this.state;
        const goalvalues = this.findGoalValue(query);
        let goalValueCount = this.getGoalCount()
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <StatusBar 
                        barStyle="light-content"
                        hidden={Platform.OS == 'ios'? false: true}/>
                    <View style={styles.imageView}>
                        <TouchableOpacity onPress={()=>this.selectAvatar()}>
                            <Image source={{uri: avatar}} style={styles.avatar}/>
                            <Image source={CameraIcon} style={styles.camera}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameView}>
                        <View style={styles.firstname}>
                            <View style={styles.iconView}>
                                <Image source={ProfileIcon} style={styles.profileicon}/>
                            </View>
                            <TextInput 
                                style={styles.mainTextInput}
                                placeholder="First Name"
                                size={14}
                                autoFocus={true}
                                value={firstName}
                                ref='firstname'
                                returnKeyType='next'
                                onSubmitEditing={(event) => {
                                    this.refs.lastname.focus();
                                }}
                                onChangeText={text => this.setState(
                                    {
                                        value:
                                        {
                                            id: this.props.form.id,
                                            avatar : avatar,
                                            firstName: text, 
                                            lastName: lastName, 
                                            username: username,
                                            email: email,
                                            homeClub: homeClub,
                                            goals: goals,
                                            friends : friends,
                                            pictures : pictures,
                                            location: location,
                                            tags: tags,
                                            isRegistered: true,
                                            dispatch: this.props.dispatch
                                        }
                                    })}
                            />
                        </View>
                        <View style={styles.lastname}>
                            <TextInput 
                                style={styles.mainTextInput}
                                placeholder="Last Name" 
                                size={14}
                                value={lastName}
                                ref='lastname'
                                returnKeyType='next'
                                onSubmitEditing={(event) => {
                                    this.refs.username.focus();
                                }}
                                onChangeText={text => this.setState(
                                    {
                                        value:
                                        {
                                            id: this.props.form.id,
                                            avatar : avatar,
                                            firstName: firstName, 
                                            lastName: text, 
                                            username: username,
                                            email: email,
                                            homeClub: homeClub,
                                            goals: goals,
                                            friends : friends,
                                            pictures : pictures,
                                            location: location,
                                            tags: tags,
                                            isRegistered: true,
                                            dispatch: this.props.dispatch
                                        }
                                    })}
                            />
                            <View style={styles.iconView}>
                                <View>
                                    <Image source={PencilIcon} style={styles.pencilicon}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.nameView}>
                        <View style={styles.iconView}>
                            <Image source={NameIcon} style={styles.usernameicon}/>
                        </View>
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
                                    value:
                                    {
                                        id: this.props.form.id,
                                        avatar : avatar,
                                        firstName: firstName,
                                        lastName: lastName,
                                        username: text, 
                                        email: email,
                                        homeClub: homeClub,
                                        goals: goals,
                                        friends : friends,
                                        pictures : pictures,
                                        location: location,
                                        tags: tags,
                                        isRegistered: true,
                                        dispatch: this.props.dispatch
                                    }
                                })}
                        />
                        <View style={styles.iconView}>
                            <View>
                                <Image source={PencilIcon} style={styles.pencilicon}/>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.nameView}>
                        <View style={styles.iconView}>
                            <Image source={ClubIcon} style={styles.clubicon}/>
                        </View>
                        <TextInput 
                            style={styles.usernameTextInput}
                            placeholder="Home Club" 
                            size={14}
                            autoCapitalize="none"
                            value={homeClub}
                            ref='homeclub'
                            returnKeyType='next'
                            onSubmitEditing={(event) => {
                                this.refs.tags.focus();
                            }}
                            onChangeText={text => this.setState(
                                {
                                    value:
                                    {
                                        id: this.props.form.id,
                                        avatar : avatar,
                                        firstName: firstName,
                                        lastName: lastName, 
                                        username: username, 
                                        email: email,
                                        homeClub: text,
                                        goals: goals,
                                        friends : friends,
                                        pictures : pictures,
                                        location: location,
                                        tags: tags,
                                        isRegistered: true,
                                        dispatch: this.props.dispatch
                                    }
                                })}
                        />
                        <View style={styles.iconView}>
                            <View>
                                <Image source={PencilIcon} style={styles.pencilicon}/>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>          
                    <View style={styles.goalView}>
                        <View style={styles.iconView}>
                            <Image source={GoalIcon} style={styles.goalicon}/>
                        </View>
                         <TouchableOpacity 
                            style={styles.goalTextInput}
                            onPress={()=>this.goalSelect()}
                        >
                            {
                                goalValueCount == 0 ?
                                    <Text style={styles.goalplaceholder}>
                                        Goals
                                    </Text>
                                :
                                    <ScrollView contentContainerStyle={styles.goalContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {this.renderGoalValues()}
                                    </ScrollView>
                            }
                        </TouchableOpacity>
                        <GoalsModal 
                            predefinedGoal = {this.props.goalsPredefinedValues}
                            visible={this.state.goalsModalVisible}
                            closeModal={() => this.closeModal()}
                            goalSelected = {this.state.goalSelected}
                        />
                        <View style={styles.iconView}>
                            {
                                goalValueCount == 0 ?
                                    <TouchableOpacity style={styles.iconView} onPress={()=>this.goalSelect()}>
                                        <View>
                                            <Image source={PencilIcon} style={styles.pencilicon}/>
                                        </View>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={()=>this.goalSelect()} style={styles.goalcountView}>
                                        <Text style={styles.goalcount}>
                                            {goalValueCount}
                                        </Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.locationView}>
                        <View style={styles.locationiconView}>
                            <Image source={LocationIcon} style={styles.locationicon}/>
                        </View>
                        <GooglePlacesAutocomplete
                            placeholder='City and State'
                            minLength={1}
                            autoFocus={false}
                            fetchDetails={false}
                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyCtmbguuMW3q5ihrP-Z5Id1x4OWbm1bswQ',
                                language: 'en',
                                types: '(cities)', // default: 'geocode'
                            }}
                            styles={{
                                textInputContainer: {
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    borderTopWidth: 0,
                                    borderBottomWidth:0,
                                },
                                textInput: {
                                    marginLeft: 0,
                                    marginRight: 0,
                                    height: 30,
                                    color: '#000000',
                                    fontSize: 14
                                },
                                predefinedPlacesDescription: {
                                    color: '#000000'
                                },
                            }}
                            currentLocation={false}
                            value={location}
                            ref='Location'
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                this.setState(
                                {
                                    value:
                                    {
                                        id: this.props.form.id,
                                        avatar : avatar,
                                        firstName: firstName,
                                        lastName: lastName, 
                                        username: username,
                                        email: email,
                                        homeClub: homeClub,
                                        goals: goals,
                                        friends : friends,
                                        pictures : pictures,
                                        location: data.description,
                                        tags: tags,
                                        isRegistered: true,
                                        dispatch: this.props.dispatch
                                    }
                                })
                            }}

                        />
                        <View style={styles.iconView}>
                            <View>
                                <Image source={PencilIcon} style={styles.pencilicon}/>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>     
                    <View style={styles.tagView}>
                        <View style={styles.iconView}>
                            <Image source={TagIcon} style={styles.tagicon}/>
                        </View>
                        <TagInput
                            value={tags}
                            onChange={(tags) => this.onTagChange(tags)} 
                        />
                        <View style={styles.iconView}>
                            <View>
                                <Image source={PencilIcon} style={styles.pencilicon}/>
                            </View>
                        </View>
                    </View>
                    <Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>     
                </View>
                <Spinner 
                    visible={this.props.updatePending} 
                    textContent={"Creating Profile..."} 
                    textStyle={{color: Dark_Blue}} 
                    color={Dark_Blue}
                />
            </KeyboardAwareScrollView>
        );
    }
};

CreateProfile.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

CreateProfile.defaultProps = {
    goalsPredefinedValues: [
        { name: 'Build Muscle'},
        { name: 'Fat Loss'},
        { name: 'Endurance'},
        { name: 'Strength'},
        { name: 'Flexibility'},
        { name: 'Overall Health'},
        { name: 'Contest Prep'},
        { name: 'Sport Conditioning'}
    ]
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#FFFFFF'
    },
    imageView: {
        width: width,
        height: dynamicSize(120),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    avatar: {
        width: dynamicSize(100),
        height: dynamicSize(100),
        resizeMode: 'cover',
        borderWidth: 2,
        borderRadius: dynamicSize(50),
        borderColor: '#33ebd5'
    },
    camera: {
        width: dynamicSize(25),
        height: dynamicSize(25),
        resizeMode: 'cover',
        position: 'absolute',
        right: dynamicSize(1),
        top: dynamicSize(5),
    },
    nameView: {
        width: width - dynamicSize(20),
        height: dynamicSize(50),
        marginLeft: dynamicSize(10),
        flexDirection: 'row',
        marginTop: dynamicSize(10)
    },
    goalView: {
        width: width - dynamicSize(20),
        marginLeft: dynamicSize(10),
        flexDirection: 'row',
        marginTop: dynamicSize(10),
        zIndex: 1
    },
    locationView: {
        width: width - dynamicSize(20),
        marginLeft: dynamicSize(10),
        flexDirection: 'row',
        marginTop: dynamicSize(10)
    },
    rowView: {
        flexDirection: 'row',
    },
    firstname: {
        width: (width - dynamicSize(20))/2,
        height: dynamicSize(50),
        flexDirection: 'row',
    },
    lastname: {
        width: (width - dynamicSize(20))/2,
        height: dynamicSize(50),
        flexDirection: 'row',
    },
    profileicon: {
        width: dynamicSize(25),
        height: dynamicSize(25),
        resizeMode: 'cover'
    },
    mainTextInput: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        width: (width - dynamicSize(20))/2 - dynamicSize(50),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    pencilicon: {
        width: dynamicSize(13),
        height: dynamicSize(18),
        resizeMode: 'cover'
    },
    iconView: {
        width: dynamicSize(50),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationiconView: {
        width: dynamicSize(30),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: dynamicSize(10),
    },
    usernameTextInput: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        width: width - dynamicSize(120),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    goalTextInput: {
        width: width - dynamicSize(120),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    usernameicon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        resizeMode: 'contain'
    },
    clubicon: {
        width: dynamicSize(25),
        height: dynamicSize(22),
        resizeMode: 'contain'
    },
    goalicon: {
        width: dynamicSize(25),
        height: dynamicSize(22),
        resizeMode: 'contain'
    },
    locationicon: {
        width: dynamicSize(15),
        height: dynamicSize(20),
        resizeMode: 'contain',
    },
    numbericon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        resizeMode: 'contain',
    },
    tagicon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        resizeMode: 'contain'
    },
    itemstyle: {
        height: dynamicSize(40), 
        justifyContent:'center', 
        paddingLeft: dynamicSize(5)
    },
    goalplaceholder: {
        fontSize: getFontSize(14),
        color: '#C9C9CE'
    },
    goalContainer: {
        height: dynamicSize(40),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: dynamicSize(5)
    },
    onetext: {
        height: dynamicSize(30),
        borderRadius: dynamicSize(8),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: dynamicSize(5)
    },
    commonText: {
        fontSize: getFontSize(14),
        color: 'black',
        textAlign: 'center'
    },
    goalcount: {
        fontSize: getFontSize(12),
        color: 'white'
    },
    goalcountView: {
        backgroundColor: '#33ebd5',
        width: dynamicSize(20),
        height: dynamicSize(20),
        borderRadius: dynamicSize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    tagView: {
        width: width - dynamicSize(20),
        marginLeft: dynamicSize(10),
        flexDirection: 'row',
        marginTop: dynamicSize(10)
    }
});

const mapStateToProps = state => ({
    form: signUpFormSelector(state),
    updatePending: fetchPendingSelector(state),
})

export default connect(mapStateToProps)(CreateProfile);