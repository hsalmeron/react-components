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
}
    from 'react-native';
import {connect} from 'react-redux';
import { SearchBar } from 'react-native-elements'

import screens from '../constants/Screens'
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { Dark_Blue } from '../colors';

const {height, width} = Dimensions.get('window');

class Messages extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back',
            },
        ],
        rightButtons: [
            {
                icon: require('../images/writeicon.png'),
                id: 'write',
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
            if (event.id == 'write') {
                this.props.navigator.dismissModal();
            }
        }
    }

    goConversation() {
        const { navigator } = this.props
        navigator.showModal({
            screen: screens.CONVERSATION,
            navigatorStyle: {
                navBarHidden: true
            }
        })
    }

    renderRow(data, sectionID, rowID) {
		return (
            <TouchableOpacity
                    style={styles.listItemView}
                    onPress={()=>this.goConversation()}
            >
                <View style={styles.userPhotoView}>
                    <Image source={data.uri} style={styles.userImageView}/>
                </View>
                <View style={styles.listContentView}>
                    <View style={styles.rowView}>
                        <View style={styles.left}>
                            <Text style={styles.nameText}>
                                {data.name}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.addressText}>
                                {data.delay}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.wholeView}>
                        <Text style={styles.locationText}>
                            {data.lastMessage}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
	}

  _renderSeparator(sectionID, rowID) {
		return (
			<View key={`${sectionID}-${rowID}`}>
				<Separator color={"#e6e6e6"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
			</View>
		);
	}

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let dataSource = ds.cloneWithRows(this.props.trainerInfo)
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <SearchBar
                    lightTheme
                    placeholder='Search member'
                    containerStyle={styles.searchBarContainer}
                    inputStyle={styles.searchInput}
                    icon={{ color: '#313131' }}
                />
                <View style={styles.optionView}>
                    <TouchableOpacity style={styles.targetButton}>
                        <Text style={styles.buttonText}>
                            Most Recent
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.unselecttargetButton}>
                        <Text style={styles.unselectbuttonText}>
                            Oldest
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.unselecttargetButton}>
                        <Text style={styles.unselectbuttonText}>
                            Unread
                        </Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)} />
                <View style={styles.paddingView}/>
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
    searchBarContainer: {
        width: width,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0
    },
    searchInput: {
        textAlign: 'left',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.7,
        borderColor: '#f1f1f1',
        color: '#313131',
        fontSize: getFontSize(14),
        fontFamily: 'Roboto-Regular'
    },
    optionView: {
        width: width-dynamicSize(40),
        height: dynamicSize(40),
        marginLeft: dynamicSize(20),
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: dynamicSize(10),
    },
    targetButton: {
        width: dynamicSize(90),
        height: dynamicSize(30),
        borderRadius: dynamicSize(20),
        backgroundColor: Dark_Blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: dynamicSize(10)
    },
    unselecttargetButton: {
        width: dynamicSize(90),
        height: dynamicSize(30),
        borderRadius: dynamicSize(20),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: dynamicSize(10)
    },
    buttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(12),
        color: 'white'
    },
    unselectbuttonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(12),
        color: '#a4a4a4'
    },
    paddingView: {
        width: width,
        height: dynamicSize(70),
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemView: {
        width: width-dynamicSize(20),
        marginLeft: dynamicSize(10),
        height: dynamicSize(60),
        marginTop: dynamicSize(10),
        flexDirection: 'row'
    },
    userPhotoView: {
        width: dynamicSize(50),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImageView: {
        width: dynamicSize(44),
        height: dynamicSize(44),
        resizeMode: 'cover',
        borderRadius: dynamicSize(22)
    },
    listContentView: {
        width: width - dynamicSize(70),
        height: dynamicSize(80),
    },
    left: {
        width: (width - dynamicSize(80))/2,
        height: dynamicSize(30),
        justifyContent: 'center',
    },
    right: {
        width: (width - dynamicSize(80))/2,
        height: dynamicSize(30),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    nameText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(14), 
        color: '#000000',
    },
    addressText: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(12), 
        color: '#000000',
        paddingLeft: dynamicSize(10)
    },
    locationText: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(11), 
        color: '#000000',
    },
    rowView: {
        flexDirection: 'row',
    },
    markicon: {
        width: dynamicSize(8),
        height: dynamicSize(11),
        resizeMode: 'contain',
        marginLeft: dynamicSize(10)
    },
    wholeView: {
        width: width - dynamicSize(70),
    }
});

Messages.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

Messages.defaultProps = {
    trainerInfo: [
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      delay: '10min ago',
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing  and typesetting industry'
    },
  ]
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Messages);