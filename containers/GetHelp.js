import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet
}
    from 'react-native';

import {connect} from 'react-redux';

import { dynamicSize, getFontSize } from '../utils/DynamicSize'

const { height, width } = Dimensions.get('window');

class GetHelp extends Component{
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

    takePicture() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.contactText}>
                    Please email to contact@atmosfit.com for get any help.
                </Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contactText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(16), 
        color: '#000000',
        marginTop: dynamicSize(10),
        marginLeft: dynamicSize(10)
    }
});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(GetHelp);