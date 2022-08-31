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
    ScrollView,
}
from 'react-native';
import {connect} from 'react-redux';

import screens from '../constants/Screens'
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import { Dark_Blue, Teal_Color } from '../colors';
import { fetchNews } from '../actions/newsActions';
import {
  newNewsSelector
} from '../selectors/newsSelectors';

import { fetchDeals } from '../actions/dealsActions';
import {
  newDealsSelector
} from '../selectors/dealsSelectors';

const {height, width} = Dimensions.get('window');
const NAVBAR_PADDING = Platform.OS === 'ios' ? 64 : 54;
const NewsBG =  require('../images/newsbackground.png');
const leftButtons = { icon: require('../images/menu.png'), id: 'sideMenu' };


class Home extends Component {
   
    static navigatorButtons = {
        leftButtons: [
            Platform.OS == 'ios' ? leftButtons : leftButtons
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
        const { dispatch } = this.props;
        dispatch(fetchNews.request(0));
        dispatch(fetchDeals.request(0));
    }

    componentWillUnmount () {

    }

    onNavigatorEvent(event) {
        const that = this;
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'sideMenu') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                })
            }
        }
    }

    openDrawer () {
        // const { navigator } = this.props
        // navigator.push({
        //     screen: screens.MEMBERSHIP,
        //     title: 'Membership',
        //     backButtonTitle: ' ',
        //     navigatorStyle: {
        //         navBarHidden: false
        //     }
        // })
    }

    renderNews() {
        return(
            <ScrollView horizontal={true} contentContainerStyle={{marginTop: dynamicSize(10), height: width/2.1+dynamicSize(10)}} showsHorizontalScrollIndicator={false}>
                {this.renderOneNews()}
            </ScrollView>
        );
    }

    renderOneNews() {
        const { newslist } = this.props.newslist.toJS()
        return (
            newslist.map((list, index) => { 
                return(
                    <TouchableOpacity 
                        key={index}
                        style={styles.newsScrollView}
                        onPress={this.openDrawer.bind(this)}
                    >
                        {list.imageUrl == '' ?
                            <Image source={NewsBG} style={styles.newsItemImg}/>
                            :
                            <Image source={{uri: list.imageUrl}} style={styles.newsItemImg}/>
                        }
                        
                        <View style={styles.textViewHeight}>
                            <Text style={styles.newsTxt}>
                                {list.title}
                            </Text>
                        </View>
                        <View style={styles.commenttextViewHeight}>
                            <Text style={styles.commentTxt}>
                                {list.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })
        );
    }

    renderDeals() {
        return (
            <ScrollView horizontal={true} contentContainerStyle={{marginTop: dynamicSize(10), height: width/2.1+dynamicSize(10)}} showsHorizontalScrollIndicator={false}>
                {this.renderOneDeals()}
            </ScrollView>
        );
    }

    renderOneDeals() {
        const { dealslist } = this.props.dealslist.toJS()
        return (
            dealslist.map((list, index) => { 
                return(
                    <TouchableOpacity 
                        key={index}
                        style={styles.newsScrollView}
                        onPress={this.openDrawer.bind(this)}
                    >
                        {list.imageUrl == '' ?
                            <Image source={NewsBG} style={styles.newsItemImg}/>
                            :
                            <Image source={{uri: list.imageUrl}} style={styles.newsItemImg}/>
                        }
                        
                        <View style={styles.textViewHeight}>
                            <Text style={styles.newsTxt}>
                                {list.title}
                            </Text>
                        </View>
                        <View style={styles.commenttextViewHeight}>
                            <Text style={styles.commentTxt}>
                                {list.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar 
                    barStyle="light-content"
                    hidden={Platform.OS == 'ios'? false: true}/>
                <ScrollView contentContainerStyle={styles.entireScroll}>
                    <View style={styles.categoryName}>
                        <View style={styles.categroyLeftName}>
                            <Text style={styles.categoryLeftText}>
                                News
                            </Text>
                        </View>
                        <View style={styles.categoryRightView}>
                            <TouchableOpacity>
                                <Text style={styles.categoryRightText}>
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.renderNews()}
                    <View style={styles.categoryName}>
                        <View style={styles.categroyLeftName}>
                            <Text style={styles.categoryLeftText}>
                                Deals
                            </Text>
                        </View>
                        <View style={styles.categoryRightView}>
                            <TouchableOpacity>
                                <Text style={styles.categoryRightText}>
                                    See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.renderDeals()}
                </ScrollView>
                <View style={styles.paddingView}>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },
    newsScrollView: {
        width: width/2.1,
        height: width/2.1, 
        marginRight: dynamicSize(10),
    },
    newsItemImg: {
        width: width/2.1, 
        height: width/2.1 - dynamicSize(60), 
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#acc0d8'
    },
    newsTxt: {
        fontFamily: 'Roboto-Medium', 
        fontSize: getFontSize(15), 
        color: '#000000', 
        marginTop: dynamicSize(5)
    },    
    textViewHeight: {
        width: width/2.1,
        height: dynamicSize(20),
    },
    commenttextViewHeight: {
        width: width/2.1,
        height: dynamicSize(30),
    },
    commentTxt: {
        fontFamily: 'Roboto-Thin', 
        fontSize: getFontSize(13), 
        color: '#000000', 
        marginTop: dynamicSize(5)
    },
    paddingView: {
        width: width,
        height: dynamicSize(130),
    },
    entireScroll: {
        width: width - dynamicSize(10), 
        marginLeft: dynamicSize(10)
    },
    categoryName: {
        width: width-dynamicSize(10), 
        height: dynamicSize(50), 
        flexDirection: 'row'
    },
    categroyLeftName: {
        width: (width-dynamicSize(10))/2, 
        height: dynamicSize(50), 
        justifyContent: 'center'
    },
    categoryLeftText: {
        fontFamily: 'Roboto-Bold', 
        fontSize: getFontSize(25), 
        color: '#000000'
    },
    categoryRightView: {
        width: (width-40)/2, 
        height: dynamicSize(50), 
        justifyContent: 'center', 
        alignItems: 'flex-end'
    },
    categoryRightText: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(15), 
        color: Teal_Color
    },
    navTitle: {
        fontFamily: 'Roboto-Regular', 
        fontSize: getFontSize(17), 
        color: '#cecce2'
    }
});

const mapStateToProps = state => ({
    newslist: newNewsSelector(state),
    dealslist: newDealsSelector(state)
})

export default connect(mapStateToProps)(Home);