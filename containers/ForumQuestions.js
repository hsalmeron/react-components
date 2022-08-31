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
    TextInput,
    ScrollView
}
    from 'react-native';
import {connect} from 'react-redux';
import { createAnimatableComponent } from 'react-native-animatable';
import moment from 'moment';
import Modal from 'react-native-modalbox';

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { createAnswer } from '../actions/forumActions';

import {
  fetchOneForumSelector,
  fetchOneForumPendingSelector
} from '../selectors/forumSelectors';

import {
  fetchMeSelector
} from '../selectors/profileSelectors';

const { height, width } = Dimensions.get('window');
const Answer_Icon =  require('../images/answer.png');
const Calendar_Icon =  require('../images/blue_calendar.png');
const User2_Icon =  require('../images/user2.png');
const User3_Icon =  require('../images/user3.png');

class ForumQuestions extends Component {
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
            answerViewVisible: false,
            replyModalVisible: false,
            selectedIndex: 0,
            answerJSON: {
                userid: '',
                useravatar: '',
                username: '',
                answerText: '',
                replyArray: []
            },
            replyJSON: {
                userid: '',
                useravatar: '',
                username: '',
                replyText: ''
            }
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

    onChangeAnswerText(value) {
        let {detailInfo} = this.props
        this.setState({
            answerJSON: {
                userid: detailInfo.id,
                useravatar: detailInfo.avatar,
                username: detailInfo.username,
                answerText: value,
                replyArray: []
            }
        })
    }

    goAnswer() {
        this.setState({
            answerViewVisible: true
        })
        this.refs.answermodal.open()
    }

    answerModalClosed() {
        this.setState({
            answerViewVisible: false
        })
    }

    onSubmitAnswer() {
        let {answerText} = this.state.answerJSON
        let {dispatch, detail} = this.props
        if (answerText == '') {
            
        }else {
            let temp = detail.answers == null? [] : detail.answers.slice()
            temp.push(JSON.stringify(this.state.answerJSON))
            dispatch(createAnswer.request(detail.id, temp));
            this.setState({
                answerViewVisible: false
            })
        }
    }

    onReply(index) {
        this.setState({
            replyModalVisible: true,
            selectedIndex: index
        })
        this.refs.replymodal.open()
    }

    replyModalClosed() {
        this.setState({
            replyModalVisible: false
        })
    }

    onChangeReplyText(value) {
        let {detailInfo} = this.props
        this.setState({
            replyJSON: {
                userid: detailInfo.id,
                useravatar: detailInfo.avatar,
                username: detailInfo.username,
                replyText: value
            }
        })
    }

    onCreateReply() {
        let {replyText} = this.state.replyJSON
        let {selectedIndex} = this.state
        let {dispatch, detail, detailInfo} = this.props
        if (replyText == '') {
            
        }else {
            let temp = JSON.parse(detail.answers[selectedIndex]).replyArray
            temp.push(JSON.stringify(this.state.replyJSON))            
            let finalAnswer = detail.answers
            detail.answers[selectedIndex].replyArray = JSON.stringify(this.state.replyJSON)
        }
    }

    renderAnswers() {
        const { detail } = this.props;
        let answers = detail.answers == null? [] : detail.answers
        return (
            answers.map((answer, index) => {
                return (
                    <View key={index}>
                        <View style={styles.centerView} >
                            <View style={styles.photoView}>
                                <Image source={{uri: JSON.parse(answer).useravatar}} style={styles.usericon}/>
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.nameText}>
                                    {JSON.parse(answer).username}
                                </Text>
                                <Text style={styles.messageText}>
                                    {JSON.parse(answer).answerText}
                                </Text>
                            </View>
                            <View style={styles.replyView}>
                                <TouchableOpacity style={styles.replyButton} onPress={()=>this.onReply(index)}>
                                    <Text style={styles.replyText}>
                                        Reply
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Separator 
                            color={"#f2f2f2"} 
                            width={width - dynamicSize(30)} 
                            height={1} 
                            style={{
                                marginLeft: dynamicSize(15), 
                                marginTop: dynamicSize(5)
                            }}
                        />
                        {this.renderReply(answer, index)}
                    </View>
                );
            })
        );
    }

    renderReply(answer, index) {
        // let replies = JSON.parse(answer[index]).replyArray
        // console.log(replies)
        // return (
        //     replies.map((reply, index) => {
        //         return (
        //             <View key={index}>
        //                 <View style={styles.replyContainer}>
        //                     <View>
        //                         <Image source={{uri: JSON.parse(reply).useravatar}} style={styles.usericon}/>
        //                     </View>
        //                     <View style={styles.replyNameView}>
        //                         <Text style={styles.nameText}>
        //                             {JSON.parse(reply).username}
        //                         </Text>
        //                         <Text style={styles.messageText}>
        //                             {JSON.parse(reply).replyText}
        //                         </Text>
        //                     </View>
        //                 </View>
        //             </View>
        //         );
        //     })
        // );
    }

    render() {
        let { title, avatar, username, message, answers, createdAt} = this.props.detail
        let { pending } = this.props
        let {answerViewVisible, replyModalVisible} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.listViewContainer}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>
                            {title}
                        </Text>
                    </View>
                    <Separator 
                        color={"#f2f2f2"} 
                        width={width - dynamicSize(30)} 
                        height={1} 
                        style={{
                            marginLeft: dynamicSize(5), 
                            marginTop: dynamicSize(5)
                        }}
                    />
                    <View style={styles.centerView}>
                        <View style={styles.photoView}>
                            <Image source={{uri: avatar}} style={styles.usericon}/>
                        </View>
                        <View style={styles.nameView}>
                            <Text style={styles.nameText}>
                                {username}
                            </Text>
                            <Text style={styles.messageText}>
                                {message}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.answerView}>
                            <Image source={Answer_Icon} style={styles.answericon}/>
                            <Text style={styles.answerText}>
                                {answers == null ? 0 : answers.length} answers
                            </Text>
                        </View>
                        <View style={styles.dateView}>
                            <Image source={Calendar_Icon} style={styles.answericon}/>
                            <Text style={styles.answerText}>
                                Posted {moment(createdAt, 'YYYY-MM-D').format('M/D/YYYY')}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.answerSeparator}>
                    <View style={styles.firstView}>
                        <Text style={styles.nameText}>
                            ANSWERS
                        </Text>    
                    </View>
                    <View style={styles.secondView}>
                        <Text style={styles.nameText}>
                            ({answers == null ? 0 : answers.length})
                        </Text>
                    </View>
                </View>
                <View style={styles.answerlist}>
                    <ScrollView contentContainerStyle={styles.answerScroll}>
                        {this.renderAnswers()}
                    </ScrollView>
                </View>
                <View style={styles.fullButtonView}>
                    {!answerViewVisible && (
                        <TouchableOpacity style={styles.answerButtonFixPosition} onPress={()=>this.goAnswer()}>
                            <Text style={styles.buttonText}>
                                ANSWER
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Modal style={styles.custommodal} position={"bottom"} ref={"answermodal"} onClosed={this.answerModalClosed.bind(this)} isOpen={answerViewVisible}>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.answerTextBox}
                            placeholder="Type your answer..." 
                            placeholderTextColor="#A9A9A9"
                            size={14}
                            autoCapitalize="none"
                            ref='answer'
                            returnKeyType='next'
                            onChangeText={text => this.onChangeAnswerText(text)}
                            multiline={true}
                        />
                        <View style={styles.submitView}>
                            <TouchableOpacity style={styles.answerButton} onPress={()=>this.onSubmitAnswer()}>
                                <Text style={styles.buttonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal style={styles.custommodal} position={"bottom"} ref={"replymodal"} onClosed={this.replyModalClosed.bind(this)} isOpen={replyModalVisible}>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.answerTextBox}
                            placeholder="Create Your Reply..." 
                            placeholderTextColor="#A9A9A9"
                            size={14}
                            autoCapitalize="none"
                            ref='answer'
                            returnKeyType='next'
                            onChangeText={text => this.onChangeReplyText(text)}
                            multiline={true}
                        />
                        <View style={styles.submitView}>
                            <TouchableOpacity style={styles.answerButton} onPress={()=>this.onCreateReply()}>
                                <Text style={styles.buttonText}>
                                    Reply
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
};

ForumQuestions.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

ForumQuestions.defaultProps = {
    forumInfo: 
    {
        title: 'IN exercise / weightlifting',
        uri: require('../images/defaultuser.png'),
        name: 'John',
        message: 'I need help with a new leg routine',
        answers: 18,
        date: 'May 18th'
    }
    
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#f9f9f9'
    },
    listViewContainer: {
        width: width - dynamicSize(20),
        height: dynamicSize(120),
        marginLeft: dynamicSize(10),
        marginTop: dynamicSize(10),
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    titleView: {

    },
    titleText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(12),
        color: '#000000',
        paddingLeft: dynamicSize(5),
        paddingTop: dynamicSize(5)
    },
    centerView: {
        width: width - dynamicSize(30),
        marginLeft: dynamicSize(15),
        flexDirection: 'row',
        marginTop: dynamicSize(10)
    },
    photoView: {
        width: dynamicSize(40),
    },
    usericon: {
        width: dynamicSize(40),
        height: dynamicSize(40),
        borderRadius: dynamicSize(20)
    },
    nameView: {
        width: width - dynamicSize(100),
        marginLeft: dynamicSize(10)
    },
    contentView: {
        width: width - dynamicSize(130),
        marginLeft: dynamicSize(10)  
    },
    replyView: {
        width: dynamicSize(50)
    },
    nameText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(13),
        color: '#000000',
    },
    messageText: {
        fontFamily: 'Roboto-Thin',
        fontSize: getFontSize(13),
        color: '#000000',
    },
    bottomView: {
        width: width - dynamicSize(30),
        marginLeft: dynamicSize(5),
        flexDirection: 'row',
        marginTop: dynamicSize(20)
    },
    answerView: {
        width: (width - dynamicSize(30)) / 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    answericon: {
        width: dynamicSize(13),
        height: dynamicSize(11),
        resizeMode: 'contain'
    },
    answerText: {
        fontFamily: 'Roboto-Thin',
        fontSize: getFontSize(12),
        color: '#000000',
        paddingLeft: dynamicSize(5)
    },
    dateView: {
        width: (width - dynamicSize(30)) / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    answerSeparator: {
        width: width - dynamicSize(20),
        height: dynamicSize(50),
        marginLeft: dynamicSize(10),
        marginTop: dynamicSize(10),
        flexDirection: 'row',
    },
    firstView: {
        width: (width - dynamicSize(20))/2,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    secondView: {
        width: (width - dynamicSize(20))/2,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    fullView: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: dynamicSize(10),
    },
    commentView: {
        flexDirection: 'row'
    },
    marginView: {
        marginLeft: dynamicSize(10)
    },
    answerButton: {
        width: dynamicSize(180),
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
    },
    custommodal: {
        height: 300
    },
    inputView: {
        marginTop: dynamicSize(20)
    },
    answerTextBox: {
        width: width - dynamicSize(20),
        height: dynamicSize(150),
        marginLeft: dynamicSize(10),
        borderWidth: 1,
        borderColor: '#f2f2f2', 
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        paddingLeft: dynamicSize(10)
    },
    submitView: {
        width: width - dynamicSize(20),
        marginLeft: dynamicSize(10),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    answerScroll: {
        width: width
    },
    answerButtonFixPosition: {
        width: dynamicSize(180),
        height: dynamicSize(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#41ead5',
        borderRadius: dynamicSize(5),
        marginTop: dynamicSize(10)
    },
    answerlist: {
        height: height - dynamicSize(330)
    },
    fullButtonView: {
        width: width,
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: dynamicSize(10),
    },
    replyButton: {
        width: dynamicSize(50),
        height: dynamicSize(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: dynamicSize(2),
    },
    replyText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(12),
        color: '#41ead4',
    },
    replyContainer: {
        flexDirection: 'row',
        marginTop: dynamicSize(10),
        marginLeft: dynamicSize(80)
    },
    replyNameView: {
        marginLeft: dynamicSize(10)
    }
});

const mapStateToProps = state => ({
    detail: fetchOneForumSelector(state),
    pending: fetchOneForumPendingSelector(state),
    detailInfo: fetchMeSelector(state)
})

export default connect(mapStateToProps)(ForumQuestions);