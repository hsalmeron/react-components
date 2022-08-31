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
    Alert,
    ActivityIndicator,
    NativeModules,
    Vibration
}
    from 'react-native';

import {connect} from 'react-redux';
import Camera from 'react-native-camera';

const { height, width } = Dimensions.get('window');
const NavBar_Height = Platform.OS === 'ios' ? 64 : 54

class BarcodeScan extends Component{
    static navigatorButtons = {
        leftButtons: [
            {
                icon: require('../images/back.png'),
                id: 'back',
            },
        ]
    };

    constructor(props) {
		super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {
            barcode: '',
            cameraType: 'back',
            text: 'Your Barcode',
            torchMode: 'off',
            type: '',
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
                this.props.navigator.dismissModal();
            }
        }
    }

    barcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) 
            console.log("barcode scanning failed");
    
        this.setState({
            barcode: e.data,
            text: `${e.data} (${e.type})`,
            type: e.type,
        });
    }

    render() {
        let {barcode, text, type} = this.state
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    torchMode={this.state.torchMode}>
                </Camera>
                <View style={styles.bottomView}>
                    <Text style={styles.nameText}>
                        {barcode} {text} {type}
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        width: width,
        height: height-200-NavBar_Height
    },
    bottomView: {
        width: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center'
    }
});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(BarcodeScan);