import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity
}
    from 'react-native';
import {connect} from 'react-redux';
import {
  newClassesSelector,
  newClassesPendingSelector
} from '../selectors/classesSelectors';
import { fetchClasses } from '../actions/classesActions';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import DetailView from '../components/DetailView'
import CalendarView from '../components/CalendarView'

const {height, width} = Dimensions.get('window');
const leftButtons = { icon: require('../images/menu.png'), id: 'sideMenu' };

class Classes extends Component {
    static navigatorButtons = {
        leftButtons: [
            Platform.OS == 'ios' ? leftButtons : leftButtons
        ]
    };
    
    constructor(props) {
		super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {
            setSelectedSegment: 0,
		};
	}

    componentDidMount() {

    }

    componentWillMount () {
        const { dispatch } = this.props;
        dispatch(fetchClasses.request(0));
    }

    componentWillUnmount () {

    }

    onNavigatorEvent(event) {
        const that = this;
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'sideMenu') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                })
            }
        }
    }

    detailViewSelected() {
        this.setState({
            setSelectedSegment: 0
        })
    }


    calendarViewSelected() {
        this.setState({
            setSelectedSegment: 1
        })
    }

    renderDetailSegmentView() {
        return (
            <View style={styles.photoHeader}>
                <TouchableOpacity style={ styles.leftheader } onPress={()=> this.detailViewSelected()}>
                    <Text style={styles.detailText}>
                        Details
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.rightheader } onPress={()=> this.calendarViewSelected()}>
                    <Text style={styles.calendarText}>
                        Calendar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderCalendarSegmentView() {
        return (
            <View style={styles.photoHeader}>
                <TouchableOpacity style={ styles.rightheader } onPress={()=> this.detailViewSelected()}>
                    <Text style={styles.calendarText}>
                        Details
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.leftheader } onPress={()=> this.calendarViewSelected()}>
                    <Text style={styles.detailText}>
                        Calendar
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { list, pending } = this.props;
        let classinfo = list.toJS().list;
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <View style={styles.segmentView}>
                    {this.state.setSelectedSegment == 0  ? 
                        this.renderDetailSegmentView()
                        : 
                        this.renderCalendarSegmentView()
                    }
                    {this.state.setSelectedSegment == 0 ? 
                        <DetailView 
                            navigator={this.props.navigator} 
                            classinfo={classinfo}
                            pending={pending}
                        /> 
                        : 
                        <CalendarView 
                            navigator={this.props.navigator}
                        /> 
                    }
                </View>
            </View>
        );
    }
};

Classes.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    segmentView: {
        width: width,
        height: height,
    },
    photoHeader: {
        width: width,
        height: dynamicSize(50),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    leftheader: {
        width: width/2,
        height: dynamicSize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#031427',
        borderBottomWidth: dynamicSize(3)
    },
    rightheader: {
        width: width/2,
        height: dynamicSize(50),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#BCBBBC',
        borderBottomWidth: dynamicSize(1)
    },
    detailText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(16),
        color: '#000000',
        marginLeft: dynamicSize(5)
    },
    calendarText: {
        fontFamily: 'Roboto-Regular',
        fontSize: getFontSize(16),
        color: '#BCBBBC',
        marginLeft: dynamicSize(5)  
    }
});

const mapStateToProps = state => ({
    list: newClassesSelector(state),
	pending: newClassesPendingSelector(state)
})

export default connect(mapStateToProps)(Classes);