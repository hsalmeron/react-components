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
    ListView
}
from 'react-native';
import {connect} from 'react-redux';
import { createAnimatableComponent } from 'react-native-animatable';
import moment from 'moment';

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import screens from '../constants/Screens'
import { fetchAllForums, fetchOneForum } from '../actions/forumActions';
import {
  newForumListSelector,
  newForumPendingSelector
} from '../selectors/forumSelectors';
import { Dark_Blue } from '../colors';

const { height, width } = Dimensions.get('window');
const Mark_Icon =  require('../images/graychevron.png');
const Group_Icon =  require('../images/black_group_icon.png');
const Answer_Icon =  require('../images/answer.png');
const Calendar_Icon =  require('../images/blue_calendar.png');
const AnimatableListView = createAnimatableComponent(ListView);

class ForumView extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back'
            },
        ],
        rightButtons: [
            {
                icon: require('../images/writeicon.png'),
                id: 'plus'
            },
        ]
    };

    constructor(props) {
		super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {
            
		};
	}

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchAllForums.request(0));
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
            if (event.id == 'plus') {
                this.props.navigator.showModal({
                    title: "Create a Question",
                    screen: screens.CREATEQUESTION,
                    navigatorStyle: {
                        navBarTextColor: '#ffffff',
                        navBarBackgroundColor: Dark_Blue,
                        navBarButtonColor: '#ffffff', 
                    },
                    animationType: 'none'
                })
            }
        }
    }

    gotoQuestions(id) {
        const { navigator,dispatch } = this.props
        dispatch(fetchOneForum.request(id, this.props.navigator));
    }

    renderRow(data, sectionID, rowID) {
        return (
            <TouchableOpacity
                style={styles.listViewContainer}
                onPress={()=> this.gotoQuestions(data.id)}
            >
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        {data.title}
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
                        <Image source={{uri: data.avatar}} style={styles.usericon}/>
                    </View>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>
                            {data.username}
                        </Text>
                        <Text style={styles.messageText}>
                            {data.message}
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.answerView}>
                        <Image source={Answer_Icon} style={styles.answericon}/>
                        <Text style={styles.answerText}>
                            {data.answers == null ? 0 : data.answers.length} answers
                        </Text>
                    </View>
                    <View style={styles.dateView}>
                        <Image source={Calendar_Icon} style={styles.answericon}/>
                        <Text style={styles.answerText}>
                            Posted {moment(data.createdAt, 'YYYY-MM-D').format('M/D/YYYY')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderSeparator(sectionID, rowID) {
        return (
            <View key={`${sectionID}-${rowID}`}>
                
            </View>
        );
    }

    render() {
        const {pending} = this.props
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let dataSource = ds.cloneWithRows(this.props.list)
        return (
            <View style={styles.container}>
            {!pending && (
                <AnimatableListView
                    animation="bounceInUp" /*bounceInUp*/
                    duration={500}
                    delay={500}
                    removeClippedSubviews={false}
                    dataSource={dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    style={styles.liststyle}
                    enableEmptySections={true}
                />
            )}
            </View>
        );
    }
};

ForumView.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

ForumView.defaultProps = {
    
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
        marginLeft: dynamicSize(5),
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
        width: width - dynamicSize(30) - dynamicSize(50),
        marginLeft: dynamicSize(10)
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
});

const mapStateToProps = state => ({
    list: newForumListSelector(state),
    pending: newForumPendingSelector(state)
})

export default connect(mapStateToProps)(ForumView);