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
    ListView
}
    from 'react-native';
import { connect } from 'react-redux';
import Calendar from 'react-native-calendar'

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from './Separator'

const { height, width } = Dimensions.get('window');
const Mark_Icon =  require('../images/groupicon.png');
const customDayHeadings = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const customMonthNames = ['January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class CalendarView extends Component {
    constructor(props) {
		super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
            dataSource: ds.cloneWithRows(this.props.scheduleInfo)
		};
	}

    componentDidMount() {

    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }

    renderRow(data, sectionID, rowID) {
		return (
            <TouchableOpacity
                    style={styles.listItemView}
            >
                <View style={styles.userPhotoView}>
                    <Text style={styles.nameText}>
                        {data.time}
                    </Text>
                </View>
                <View style={styles.listContentView}>
                    <Text style={styles.timeText}>
                        {data.name}
                    </Text>
                    <Text style={styles.addressText}>
                        {data.instructorname}
                    </Text>
                </View>
                <View style={styles.rowView}>
                    <Image source={Mark_Icon} style={styles.markicon}/>
                    <Text style={styles.locationText}>
                        {data.users}
                    </Text>
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
        const customStyle = {
            calendarContainer: {
                backgroundColor: 'white',
                marginTop: dynamicSize(10)
            },
            eventIndicatorFiller: {
                backgroundColor: 'blue',
                width: 10,
                height: 10,
            },
        }
        return (
            <View style={styles.container}>
                <Calendar 
                    ref="calendar"
                    scrollEnabled
                    showControls
                    customStyle={customStyle}
                    dayHeadings={customDayHeadings}
                    monthNames={customMonthNames}
                    weekStart={7}
                />
                <Separator color={"#d6d6d6"} width={width} height={1} style={{}}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)} />
                <View style={styles.paddingView}/>
            </View>
        );
    }
};

//calendar reference
/*
    <Calendar
        customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
        dayHeadings={Array}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        eventDates={['2015-07-01']}       // Optional array of moment() parseable dates that will show an event indicator
        events={[{date:'2015-07-01', ..}]}// Optional array of event objects with a date property and custom styles for the event indicator
        monthNames={Array}                // Defaults to english names of months
        nextButtonText={'Next'}           // Text for next button. Default: 'Next'
        onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
        onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
        onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
        onTouchNext={this.onTouchNext}    // Callback for next touch event
        onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
        prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
        scrollEnabled={true}              // False disables swiping. Default: False
        selectedDate={'2015-08-15'}       // Day to be selected
        showControls={true}               // False hides prev/next buttons. Default: False
        showEventIndicators={true}        // False hides event indicators. Default:False
        startDate={'2015-08-01'}          // The first month that will display. Default: current month
        titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
        today={'2016-16-05'}              // Defaults to today
        weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
    />
*/

CalendarView.defaultProps = {
    scheduleInfo: [
        {
            name: 'Yoga',
            instructorname: 'James Smith',
            time: '09:00',
            users: '7'
        },
        {
            name: 'Kickboxing',
            instructorname: 'John Doe',
            time: '10:00',
            users: '10'
        },
        {
            name: 'Palates',
            instructorname: 'Kevin Smith',
            time: '02:00',
            users: '200'
        },
        {
            name: 'Yoga',
            instructorname: 'Michael Jackson',
            time: '04:00',
            users: '7'
        },
        {
            name: 'Body Bump',
            instructorname: 'James Smith',
            time: '09:00',
            users: '7'
        },
        {
            name: 'Kickboxing',
            instructorname: 'John Doe',
            time: '10:00',
            users: '10'
        },
        {
            name: 'Yoga',
            instructorname: 'Kevin Smith',
            time: '02:00',
            users: '200'
        },
        {
            name: 'Palates',
            instructorname: 'Michael Jackson',
            time: '04:00',
            users: '7'
        },
    ]      
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    listItemView: {
        width: width,
        height: dynamicSize(60),
        flexDirection: 'row',
        marginLeft: dynamicSize(10)
    },
    userPhotoView: {
        width: dynamicSize(50),
        height: dynamicSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContentView: {
        width: width - dynamicSize(130),
        height: dynamicSize(60),
        justifyContent: 'center'
    },
    nameText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(14), 
        color: '#7f7f7f',
        paddingLeft: dynamicSize(10)
    },
    timeText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(16), 
        color: '#2e343b',
        paddingLeft: dynamicSize(10)
    },
    addressText: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(13), 
        color: '#2e343b',
        paddingLeft: dynamicSize(10)
    },
    locationText: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(11), 
        color: '#000000',
        paddingLeft: dynamicSize(5)
    },
    markicon: {
        width: dynamicSize(13),
        height: dynamicSize(12),
        resizeMode: 'contain',
        marginLeft: dynamicSize(10)
    },
    paddingView: {
        width: width,
        height: dynamicSize(150),
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowView: {
        width: dynamicSize(70),
        height: dynamicSize(60),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(CalendarView);