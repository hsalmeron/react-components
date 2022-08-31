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
    ListView
} from 'react-native';
import {connect} from 'react-redux';

import * as _ from 'lodash'
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat'
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import CustomActions from '../components/CustomActions';
import { Dark_Blue } from '../colors';

const {height, width} = Dimensions.get('window');
const Back_Icon =  require('../images/back.png');
const User_Icon =  require('../images/defaultuser.png');

class Conversation extends Component {

    constructor(props) {
		super(props);
		this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
		}
	}

    componentDidMount() {

    }

    componentWillMount () {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello. Nice to meet you',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Atmosfit Admin',
                        avatar: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAeuAAAAJDRiOGIwYzE0LTNkOGItNDY1Yi1hMmFkLThmMjNkZTk1NzUyYg.png',
                    },
                },
            ],
        })
    }

    componentWillUnmount () {
    
    }

    onBack() {
        const { navigator } = this.props
        navigator.dismissModal()
    }

    renderFooter (props) {
        if (this.state.typingText) {
          return (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                {this.state.typingText}
              </Text>
            </View>
          );
        }
        return null;
    }

    renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: '#f0f0f0',
              }
            }}
          />
        );
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
          return (
            <CustomActions
              {...props}
            />
          );
        }
        const options = {
          'Action 1': (props) => {
            alert('option 1');
          },
          'Action 2': (props) => {
            alert('option 2');
          },
          'Cancel': () => {},
        };
        return (
          <Actions
            {...props}
            options={options}
          />
        );
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
          if ((messages[0].image || messages[0].location) || !this._isAlright) {
            this.setState((previousState) => {
              return {
                typingText: 'React Native is typing'
              };
            });
          }
        }

        setTimeout(() => {
          if (this._isMounted === true) {
            if (messages.length > 0) {
              if (messages[0].image) {
                this.onReceive('Nice picture!');
              } else if (messages[0].location) {
                this.onReceive('My favorite place');
              } else {
                if (!this._isAlright) {
                  this._isAlright = true;
                  this.onReceive('Alright');
                }
              }
            }
          }

          this.setState((previousState) => {
            return {
              typingText: null,
            };
          });
        }, 1000);
    }

    onLoadEarlier() {
        this.setState((previousState) => {
          return {
            isLoadingEarlier: true,
          };
        });

        setTimeout(() => {
          if (this._isMounted === true) {
            this.setState((previousState) => {
              return {
                messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
                loadEarlier: false,
                isLoadingEarlier: false,
              };
            });
          }
        }, 1000); // simulating network
    }

    // renderSend(props) {
    //     return (
    //         <View/>
    //     );
    // }
   
    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <View style={styles.navView}>
                    <View style={styles.leftView}>
                        <TouchableOpacity style={styles.touchView} onPress={()=>this.onBack()}>
                            <Image source={Back_Icon} style={styles.backicon}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerView}>
                        <Image source={User_Icon} style={styles.userImageView}/>
                        <Text style={styles.username}>
                            James Smith
                        </Text>
                    </View>
                    <View style={styles.rightView}>
                    </View>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend.bind(this)}
                    loadEarlier
                    renderBubble={this.renderBubble.bind(this)}
                    onLoadEarlier={this.onLoadEarlier.bind(this)}
                    isLoadingEarlier={this.state.isLoadingEarlier}
                    renderFooter={this.renderFooter.bind(this)}
                    renderActions={this.renderCustomActions.bind(this)}
                    // renderSend={this.renderSend.bind(this)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#FFFFFF'
    },
    navView: {
        width: width,
        height: dynamicSize(70),
        flexDirection: 'row',
        backgroundColor: Dark_Blue
    },
    leftView: {
        width: dynamicSize(50),
        height: dynamicSize(70),
        justifyContent: 'center'
    },
    centerView: {
        width: width - dynamicSize(100),
        height: dynamicSize(70),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: dynamicSize(20)
    },
    rightView: {
        width: dynamicSize(50),
        height: dynamicSize(70),
    },
    backicon: {
        width: dynamicSize(10),
        height: dynamicSize(19),
        resizeMode: 'contain',
    },
    touchView: {
        paddingLeft: dynamicSize(10),
        paddingTop: dynamicSize(20)
    },
    userImageView: {
        width: dynamicSize(30),
        height: dynamicSize(30),
        resizeMode: 'cover',
        borderRadius: dynamicSize(15),
    },
    username: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(16),
        color: 'white',
        paddingLeft: dynamicSize(5)
    },
    typingMessage: {
        fontSize: getFontSize(12),
        color: '#000000',
        marginLeft: 5
    },
});

Conversation.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

Conversation.defaultProps = {

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Conversation);