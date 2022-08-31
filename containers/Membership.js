import React, {Component} from 'react'
import {
    View,
    Text,
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TextInput
}
from 'react-native'
import {connect} from 'react-redux'

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'

const {height, width} = Dimensions.get('window');

class Membership extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back',
            },
        ]
    }

    constructor(props) {
		super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
		this.state = {

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
            if (event.id == 'back') {
                this.props.navigator.dismissModal()
            }
        }
    }

    closeModal() {
        this.props.navigator.dismissModal()
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
                                Member Barcode
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Text style={styles.subText}>
                                1234
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <View style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                Membership Status
                            </Text>
                        </View>
                        <View style={styles.second}>
                            <Text style={styles.regularText}>
                                Active
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                {/*
                    <View style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                Monthly Fee
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <View style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                Payment Method
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <View style={styles.twoView}>
                        <View style={styles.whole}>
                            <Text style={styles.mainText}>
                                Everyone listed on that account
                            </Text>
                        </View>
                    </View>
                    <Separator color={"#f0f0f0"} width={width - dynamicSize(20)} height={1}/>
                    <View style={styles.twoView}>
                        <View style={styles.first}>
                            <Text style={styles.mainText}>
                                Payment Method Modal
                            </Text>
                        </View>
                    </View>
                    <View style={styles.twoView}>
                        <View style={styles.whole}>
                            <TextInput 
                                style={styles.mainTextInput}
                                placeholder="Current Payment Method" 
                                size={14}
                            />
                        </View>
                    </View>
                */}                    
                    <View style={styles.twoView}>
                        <TouchableOpacity style={styles.save} onPress={()=>this.closeModal()}>
                            <Text style={styles.closeText}>
                                SAVE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.close} onPress={()=>this.closeModal()}>
                            <Text style={styles.closeText}>
                                CLOSE
                            </Text>
                        </TouchableOpacity>
                    </View>
                
                </View>
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
    entireView: {
        width: width-dynamicSize(20),
        marginLeft: dynamicSize(10)
    },
    twoView: {
        flexDirection: 'row'
    },
    first: {
        width: (width-dynamicSize(20))/2,
        height: dynamicSize(50),
        justifyContent: 'center',
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
    regularText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: '#5deedd'
    },
    whole: {
        width: width-dynamicSize(20),
        height: dynamicSize(50),
        justifyContent: 'center',
    },
    mainTextInput: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(14),
        color: 'black',
        width: width-dynamicSize(20),
        height: dynamicSize(50),
        justifyContent: 'center',
        padding: dynamicSize(10),
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    save: {
        width: (width-dynamicSize(40))/2,
        height: dynamicSize(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: dynamicSize(5),
        backgroundColor: '#4DB564',
        marginTop: dynamicSize(20)
    },
    close: {
        width: (width-dynamicSize(40))/2,
        height: dynamicSize(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: dynamicSize(5),
        backgroundColor: '#C24545',
        marginTop: dynamicSize(20),
        marginLeft: dynamicSize(20)
    },
    closeText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(16),
        color: '#FFFFFF'
    },
})

Membership.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

Membership.defaultProps = {
  
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Membership)