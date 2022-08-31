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
    ListView,
    FlatList
}
    from 'react-native';
import {connect} from 'react-redux';
import { InstantSearch } from 'react-instantsearch/native';
import {
    connectInfiniteHits,
    connectSearchBox,
    connectHighlight
} from 'react-instantsearch/connectors';
import { SearchBar } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';

import screens from '../constants/Screens'
import { Dark_Blue } from '../colors';
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from '../components/Separator'
import { fetchAllUsers } from '../actions/userActions';
import {
  fetchAllUsersSelector
} from '../selectors/userSelectors';

const { height, width } = Dimensions.get('window');
const Mark_Icon =  require('../images/smallmark.png');
const Black_Icon =  require('../images/filter_black.png');
const Green_Icon =  require('../images/filter_green.png');
const defaultuser =  require('../images/defaultavatar.png');

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  }
];

class Members extends Component {
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
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		this.state = {
            filterEnable: false,
            distanceSelected: false,
            homeSelected: false,
            clubSelected: false,
            friendsSelected: false,
            goalsSelected: false,
            sortKey: ''
		};
        this.distanceSelected = this.distanceSelected.bind(this)
        this.homeSelected = this.homeSelected.bind(this)
        this.clubSelected = this.clubSelected.bind(this)
        this.friendsSelected = this.friendsSelected.bind(this)
        this.goalsSelected = this.goalsSelected.bind(this)
	}

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchAllUsers.request(0));
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
    
    onFilterClicked() {
        this.setState({ filterEnable: !this.state.filterEnable });
    }

    onMemberSelected(id) {
        const { navigator } = this.props
        navigator.showModal({
            screen: screens.MEMBERPROFILE,
            title: 'Profile',
            navigatorStyle: {
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: Dark_Blue,
                navBarTitleTextCentered: true,
                navBarButtonColor: '#ffffff'
            },
            passProps: {
                id: id
            }
        })
    }

    distanceSelected() {
        this.setState({
            distanceSelected: true,
            homeSelected: false,
            clubSelected: false,
            friendsSelected: false,
            goalsSelected: false,
            sortKey: 'distance'
        })
    }

    homeSelected() {
        this.setState({
            distanceSelected: false,
            homeSelected: true,
            clubSelected: false,
            friendsSelected: false,
            goalsSelected: false,
            sortKey: 'home'
        })
    }

    clubSelected() {
        this.setState({
            distanceSelected: false,
            homeSelected: false,
            clubSelected: true,
            friendsSelected: false,
            goalsSelected: false,
            sortKey: 'club'
        })
    }

    friendsSelected() {
        this.setState({
            distanceSelected: false,
            homeSelected: false,
            clubSelected: false,
            friendsSelected: true,
            goalsSelected: false,
            sortKey: 'friends'
        })
    }

    goalsSelected() {
        this.setState({
            distanceSelected: false,
            homeSelected: false,
            clubSelected: false,
            friendsSelected: false,
            goalsSelected: true,
            sortKey: 'goals'
        })
    }

    homeSelected() {
        this.setState({
            distanceSelected: false,
            homeSelected: true,
            clubSelected: false,
            friendsSelected: false,
            goalsSelected: false,
            sortKey: 'home'
        })
    }

    _renderHeader(section, i, isActive=true) {
        const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
            return (
                <View style={styles.filterView}>
                    <SearchBar
                        lightTheme
                        placeholder='Search'
                        onChangeText={text => refine(text)}
                        value={currentRefinement}
                        containerStyle={styles.searchBarContainer}
                        inputStyle={styles.searchInput}
                        icon={{ color: '#313131' }}
                    />
                    <View>
                        {this.state.filterEnable ?
                            <View>
                                <Image 
                                    source={Green_Icon} 
                                    style={styles.filterIcon} />
                            </View>
                            :
                            <View>
                                <Image 
                                    source={Black_Icon} 
                                    style={styles.filterIcon} />
                            </View>
                        }
                    </View>
                </View>
            );
        });

        return (
            <View>
                <SearchBox />
            </View>
        );
    }

    _renderContent() {
        let {distanceSelected, homeSelected, clubSelected, friendsSelected, goalsSelected} = this.state
        return (
            <View style={styles.optionView}>
                {distanceSelected ?
                    <TouchableOpacity 
                        style={styles.targetButton}
                        onPress={this.distanceSelected}
                    >
                        <Text style={styles.buttonText}>
                            Distance
                        </Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity 
                        style={styles.unselecttargetButton}
                        onPress={this.distanceSelected}
                    >
                        <Text style={styles.unselectbuttonText}>
                            Distance
                        </Text>
                    </TouchableOpacity>
                }
                {homeSelected ?
                    <TouchableOpacity 
                        style={styles.targetButton}
                        onPress={this.homeSelected}
                    >
                        <Text style={styles.buttonText}>
                            Home
                        </Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity 
                        style={styles.unselecttargetButton}
                        onPress={this.homeSelected}
                    >
                        <Text style={styles.unselectbuttonText}>
                            Home
                        </Text>
                    </TouchableOpacity>
                }
                {clubSelected ?
                    <TouchableOpacity 
                        style={styles.targetButton}
                        onPress={this.clubSelected}
                    >
                        <Text style={styles.buttonText}>
                            Club
                        </Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity 
                        style={styles.unselecttargetButton}
                        onPress={this.clubSelected}
                    >
                        <Text style={styles.unselectbuttonText}>
                            Club
                        </Text>
                    </TouchableOpacity>    
                }
                {friendsSelected ?
                    <TouchableOpacity 
                        style={styles.targetButton}
                        onPress={this.friendsSelected}
                    >
                        <Text style={styles.buttonText}>
                            Friends
                        </Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity 
                        style={styles.unselecttargetButton}
                        onPress={this.friendsSelected}
                    >
                        <Text style={styles.unselectbuttonText}>
                            Friends
                        </Text>
                    </TouchableOpacity>    
                }
                {goalsSelected ?
                    <TouchableOpacity 
                        style={styles.targetButton}
                        onPress={this.goalsSelected}
                    >
                        <Text style={styles.buttonText}>
                            Goals
                        </Text>
                    </TouchableOpacity>    
                    :
                    <TouchableOpacity 
                        style={styles.unselecttargetButton}
                        onPress={this.goalsSelected}
                    >
                        <Text style={styles.unselectbuttonText}>
                            Goals
                        </Text>
                    </TouchableOpacity>    
                }
            </View>
        );
    }

    render() {
        const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {
            const onEndReached = function() {
                if (hasMore) {
                    refine();
                }
            };
            return (
                <View>
                    <FlatList
                        data={hits}
                        onEndReached={onEndReached}
                        keyExtractor={(item, index) => item.objectID}
                        style={styles.liststyle}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        style={styles.listItemView}
                                        onPress={()=> this.onMemberSelected(item.id)}
                                    >
                                        <View style={styles.userPhotoView}>
                                            {
                                                item.avatar == ''?
                                                <Image source={defaultuser} style={styles.userImageView}/>
                                                :
                                                <Image source={{uri: item.avatar}} style={styles.userImageView}/>
                                            }
                                        </View>
                                        <View style={styles.listContentView}>
                                            <Text style={styles.nameText}>
                                                <Highlight attributeName="firstName" hit={item} /> <Highlight attributeName="lastName" hit={item} />
                                            </Text>
                                            <Text style={styles.nameText}>
                                                <Highlight attributeName="homeClub" hit={item} />
                                            </Text>
                                            <View style={styles.rowView}>
                                                <Image source={Mark_Icon} style={styles.markicon}/>
                                                <Text style={styles.locationText}>
                                                    <Highlight attributeName="location" hit={item} />
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <Separator 
                                        color={"#e6e6e6"} 
                                        width={width - dynamicSize(20)} 
                                        height={1} 
                                        style={{marginLeft: dynamicSize(10)}} />
                                </View>
                            );
                        }}
                    />
                    <View style={styles.paddingView}/>
                </View>
            );
        });

        const Highlight = connectHighlight(
            ({ highlight, attributeName, hit, highlightProperty }) => {
            const parsedHit = highlight({
                attributeName,
                hit,
                highlightProperty: '_highlightResult',
            });
            const highlightedHit = parsedHit.map((part, idx) => {
                if (part.isHighlighted)
                return (
                    <Text key={idx} style={{ backgroundColor: '#ffff99' }}>
                    {part.value}
                    </Text>
                );
                return part.value;
            });
            return <Text>{highlightedHit}</Text>;
            }
        );

        return (
            <View style={styles.container}>
                <InstantSearch
                    appId="ZSAIUWZKT2"
                    apiKey="101aee8dfc9912844c6b8694c673ea4f"
                    indexName="QXBwOjk0NjM5NDhlLTczMDQtNDI5OS05NjYxLTczNDEyNGJiNzU1Yw==.User"
                >
                    <Accordion
                        sections={SECTIONS}
                        renderHeader={this._renderHeader.bind(this)}
                        renderContent={this._renderContent.bind(this)}
                        duration={400}
                        underlayColor="transparent"
                        onChange={this.onFilterClicked.bind(this)}
                    />
                    <Hits/>
                </InstantSearch>
            </View>
        );
    }
};

Members.navigatorStyle = {
  navBarHidden: false,
  statusBarBlur: true
}

Members.defaultProps = {
  
}

const styles = StyleSheet.create({
    container: {
        width: width, 
        height: height,
    },
    searchBarContainer: {
        width: width-dynamicSize(40),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginTop: dynamicSize(2)
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
    filterView: {
        width: width,
        height: dynamicSize(30),
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: dynamicSize(10),
    },
    optionView: {
        width: width-dynamicSize(40),
        height: dynamicSize(50),
        marginLeft: dynamicSize(20),
        flexDirection: 'row',
        marginTop: dynamicSize(10),
        marginBottom: 0
    },
    targetButton: {
        width: dynamicSize(60),
        height: dynamicSize(25),
        borderRadius: dynamicSize(20),
        backgroundColor: Dark_Blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: dynamicSize(10),
        marginTop: dynamicSize(20)
    },
    unselecttargetButton: {
        width: dynamicSize(60),
        height: dynamicSize(25),
        borderRadius: dynamicSize(20),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: dynamicSize(10),
        marginTop: dynamicSize(20)
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
    listItemView: {
        width: width-dynamicSize(40),
        marginLeft: dynamicSize(20),
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
        height: dynamicSize(120),
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        width: dynamicSize(20),
        height: dynamicSize(18),
        resizeMode: 'contain',
        marginTop: dynamicSize(15)
    },
    liststyle: {
        marginTop: dynamicSize(20)
    }
});

const mapStateToProps = state => ({
 //    list: newMemberSelector(state),
	// pending: newMemberPendingSelector(state) 
})

export default connect(mapStateToProps)(Members);