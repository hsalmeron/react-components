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

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'

const {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;

const Number_Icon =  require('../images/number.png');
const Mark_Icon =  require('../images/smallmark.png');

class Friends extends Component {
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
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
            dataSource: ds.cloneWithRows(this.props.trainerInfo)
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

    renderRow(data, sectionID, rowID) {
		return (
            <TouchableOpacity
                    style={styles.listItemView}
            >
                <View style={styles.userPhotoView}>
                    <Image source={data.uri} style={styles.userImageView}/>
                </View>
                <View style={styles.listContentView}>
                    <Text style={styles.nameText}>
                        {data.name}
                    </Text>
                    <Text style={styles.addressText}>
                        {data.address}
                    </Text>
                    <View style={styles.rowView}>
                        <Image source={Mark_Icon} style={styles.markicon}/>
                        <Text style={styles.locationText}>
                            {data.location}
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
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <View style={styles.entireView}>
                    <View style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                New Requests
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Image source={Number_Icon} style={styles.headBG}/>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <View style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                Sent Requests
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Image source={Number_Icon} style={styles.headBG}/>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1} style={{marginLeft: dynamicSize(10)}}/>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSeparator={this._renderSeparator.bind(this)} />
                    <View style={styles.paddingView}/>
                </View>
            </View>
        );
    }
};

Friends.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
        backgroundColor: '#FFFFFF'
    },
    entireView: {
        width: width,
    },
    twoView: {
        flexDirection: 'row'
    },
    first: {
        width: (width-dynamicSize(20))/2,
        height: dynamicSize(50),
        justifyContent: 'center',
        marginLeft: dynamicSize(10)
    },
    second: {
        width: (width-dynamicSize(20))/2,
        height: dynamicSize(50),
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    mainText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black'
    },
    subText: {
        fontFamily: 'Roboto-Bold',
        fontSize: getFontSize(14),
        color: '#5deedd'
    },
    headBG: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        resizeMode: 'contain'
    },
    listItemView: {
        width: width,
        height: dynamicSize(60),
        marginTop: dynamicSize(10),
        flexDirection: 'row',
        marginLeft: dynamicSize(10)
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
        width: width - dynamicSize(200),
        height: dynamicSize(60),
        justifyContent: 'center'
    },
    nameText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(14), 
        color: '#000000',
        paddingLeft: dynamicSize(10)
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
        paddingLeft: dynamicSize(5)
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
    paddingView: {
        width: width,
        height: dynamicSize(70),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

Friends.defaultProps = {
    trainerInfo: [
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/avatar.png'),
      name: 'Jane Laura',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/user1.png'),
      name: 'Kevin Stewart',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/avatar.png'),
      name: 'Jane Laura',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/user1.png'),
      name: 'Kevin Stewart',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/avatar.png'),
      name: 'Jane Laura',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/user1.png'),
      name: 'Kevin Stewart',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/defaultuser.png'),
      name: 'James Smith',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/avatar.png'),
      name: 'Jane Laura',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
    {
      uri: require('../images/user1.png'),
      name: 'Kevin Stewart',
      address: 'New York, USA',
      location: 'Home Club Location'
    },
  ]
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Friends);