
'use strict';
import {connect} from 'react-redux';
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
    TextInput,
    Alert,
    AsyncStorage
}
    from 'react-native';

const { height, width } = Dimensions.get('window');
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import screens from '../constants/Screens'
import { createAnimatableComponent } from 'react-native-animatable';

import { createForum } from '../actions/forumActions';

import { fetchMe } from '../actions/profileActions';
import {
  fetchMeSelector,
  fetchMePendingSelector
} from '../selectors/profileSelectors';

import {
  createForumPendingSelector
} from '../selectors/forumSelectors';

import { signUpFormSelector } from '../selectors/userSelectors';

const Mark_Icon =  require('../images/graychevron.png');

class CreateQuestion extends Component {
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
            question: {
                category: '',
                subcategory: '',
                title: '',
                message: '',
                tags: '',
                username: ''
            },
            questionCreated: false
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

    onNavigatorEvent(event) {
        const that = this;
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'back') {
                this.props.navigator.dismissModal();
            }
        }
    }

    onChangeCategory(value) {
        let {question} = this.state
        let {detailInfo} = this.props
        let username = detailInfo.username
        this.setState({
            question: {
                category: value,
                subcategory: question.subcategory,
                title: question.title,
                message: question.message,
                tags: question.tags,
                username: username
            }
        })
    }

    onChangeSubCategory(value) {
        let {question} = this.state
        let {detailInfo} = this.props
        let username = detailInfo.username
        this.setState({
            question: {
                category: question.category,
                subcategory: value,
                title: question.title,
                message: question.message,
                tags: question.tags,
                username: username
            }
        })
    } 

    onChangeTitle(value) {
        let {question} = this.state
        let {detailInfo} = this.props
        let username = detailInfo.username
        this.setState({
            question: {
                category: question.category,
                subcategory: question.subcategory,
                title: value,
                message: question.message,
                tags: question.tags,
                username: username
            }
        })
    } 

    onChangeContent(value) {
        let {question} = this.state
        let {detailInfo} = this.props
        let username = detailInfo.username
        this.setState({
            question: {
                category: question.category,
                subcategory: question.subcategory,
                title: question.title,
                message: value,
                tags: question.tags,
                username: username
            }
        })
    } 

    onChangeTags(value) {
        let {question} = this.state
        let {detailInfo} = this.props
        let username = detailInfo.username
        this.setState({
            question: {
                category: question.category,
                subcategory: question.subcategory,
                title: question.title,
                message: question.message,
                tags: value,
                username: username
            }
        })
    } 

    onCreateQuestion() {
        let { dispatch, detailInfo } = this.props
        let { question } = this.state
        let username = detailInfo.username
        this.setState({
            question: {
                category: question.category,
                subcategory: question.subcategory,
                title: question.title,
                message: question.message,
                tags: question.tags,
                username: username
            }
        })
        let success = question.category && question.subcategory && question.title && question.message && question.tags
        if(success) {
            this.setState({
                questionCreated: true
            })
            if (!this.state.questionCreated) {
                dispatch(createForum.request(question))    
            }
        }else{
            Alert.alert('Error','Please complete all fields.',
                    [{text: 'Ok', onPress: () => {}}]
            );
        }
        
    }

    render() {
        const {pending} = this.props
        const {questionCreated} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.category}
                        placeholder="Category of question" 
                        placeholderTextColor="#A9A9A9"
                        size={14}
                        autoCapitalize="none"
                        value={this.state.question.category}
                        ref='category'
                        returnKeyType='next'
                        onChangeText={text => this.onChangeCategory(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.category}
                        placeholder="Sub category of question" 
                        placeholderTextColor="#A9A9A9"
                        size={14}
                        autoCapitalize="none"
                        value={this.state.question.subcategory}
                        ref='subcategory'
                        returnKeyType='next'
                        onChangeText={text => this.onChangeSubCategory(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.category}
                        placeholder="Title of question" 
                        placeholderTextColor="#A9A9A9"
                        size={14}
                        autoCapitalize="none"
                        value={this.state.question.title}
                        ref='title'
                        returnKeyType='next'
                        onChangeText={text => this.onChangeTitle(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.category}
                        placeholder="Question" 
                        placeholderTextColor="#A9A9A9"
                        size={14}
                        autoCapitalize="none"
                        value={this.state.question.message}
                        ref='message'
                        returnKeyType='next'
                        onChangeText={text => this.onChangeContent(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.category}
                        placeholder="Tags" 
                        placeholderTextColor="#A9A9A9"
                        size={14}
                        autoCapitalize="none"
                        value={this.state.question.tags}
                        ref='tags'
                        returnKeyType='next'
                        onChangeText={text => this.onChangeTags(text)}
                    />
                </View>
                <View style={styles.fullView}>
                    {questionCreated ?
                        <View style={styles.answerButton}>
                            <Text style={styles.buttonText}>
                                You've already create the question
                            </Text>
                        </View>
                    : 
                        <TouchableOpacity style={styles.answerButton} onPress={()=> this.onCreateQuestion()}>
                            <Text style={styles.buttonText}>
                                CREATE A QUESTION
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
};

CreateQuestion.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

CreateQuestion.defaultProps = {
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    inputView: {
        width: width - dynamicSize(20),
        marginLeft: dynamicSize(10),
        marginTop: dynamicSize(10)
    },
    category: {
        width: width - dynamicSize(20),
        height: dynamicSize(40),
        borderWidth: 1,
        borderColor: '#f2f2f2', 
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        paddingLeft: dynamicSize(10)
    },
    fullView: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: dynamicSize(10),
    },
    answerButton: {
        width: dynamicSize(240),
        height: dynamicSize(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#41ead5',
        borderRadius: dynamicSize(5),
        marginTop: dynamicSize(10)
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(15),
        color: '#ffffff',
    }
});

const mapStateToProps = state => ({
    form: signUpFormSelector(state),
    detailInfo: fetchMeSelector(state),
    pending: createForumPendingSelector(state)
})

export default connect(mapStateToProps)(CreateQuestion);