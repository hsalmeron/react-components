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
	ListView,
	TextInput,
	FlatList,
	ScrollView
}
	from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';
import { createAnimatableComponent } from 'react-native-animatable';
import moment from 'moment';
import { InstantSearch } from 'react-instantsearch/native';
import {
	connectInfiniteHits,
	connectSearchBox,
	connectHighlight
} from 'react-instantsearch/connectors';

import { Dark_Blue, Teal_Color } from '../colors';
import screens from '../constants/Screens'
import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from './Separator'

const { height, width } = Dimensions.get('window');
const Class_Icon =  require('../images/class.png');
const Black_Icon =  require('../images/filter_black.png');
const Green_Icon =  require('../images/filter_green.png');

const SECTIONS = [
	{
		title: 'First',
		content: 'Lorem ipsum...',
	}
];

const AnimatableListView = createAnimatableComponent(ListView);

class DetailView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterEnable: false ,
			newestSelected: false,
			difficultySelected: false,
			categorySelected: false,
			sortKey: ''
		};
		this.newestSelected = this.newestSelected.bind(this);
		this.difficultySelected = this.difficultySelected.bind(this);
		this.categorySelected = this.categorySelected.bind(this);
	}

	componentWillMount () {

	}

	componentDidMount() {
		
	}

	componentWillUnmount () {

	}

	goDetail(id) {
		const { navigator } = this.props
		navigator.showModal({
	        screen: screens.CLASSDETAIL,
	        navigatorStyle: {
	            navBarHidden: true
	        },
	        passProps: {
	        	id: id
	        }
	    })
	}

	onFilterClicked() {
		this.setState({ filterEnable: !this.state.filterEnable });
	}

	newestSelected() {
		this.setState({
			newestSelected: true,
			difficultySelected: false,
			categorySelected: false,
			sortKey: 'newest'
		})
	}

	difficultySelected() {
		this.setState({
			newestSelected: false,
			difficultySelected: true,
			categorySelected: false,
			sortKey: 'difficulty'
		})
	}

	categorySelected() {
		this.setState({
			newestSelected: false,
			difficultySelected: false,
			categorySelected: true,
			sortKey: 'category'
		})
	}

	getDifficultValue(text) {
		let value = 0
 		switch(text) {
		    case 'Easy':
		    	value = 0
		        break;
		    case 'Intermediate':
		    	value = 1
		        break;
		    case 'Advanced':
		    	value = 2
		        break;
		    default:
		    	break
		}
		return value
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
		let {newestSelected, difficultySelected, categorySelected} = this.state
		return (
			<View>
				<View style={styles.optionView}>
					{newestSelected ? 
						<TouchableOpacity 
							style={styles.targetButton}
							onPress={this.newestSelected}
						>
							<Text style={styles.buttonText}>
								Newest
							</Text>
						</TouchableOpacity>
					:
						<TouchableOpacity 
							style={styles.unselecttargetButton}
							onPress={this.newestSelected}
						>
							<Text style={styles.unselectbuttonText}>
								Newest
							</Text>
						</TouchableOpacity>
					}
					{difficultySelected ?
						<TouchableOpacity 
							style={styles.targetButton}
							onPress={this.difficultySelected}
						>
							<Text style={styles.buttonText}>
								Difficulty
							</Text>
						</TouchableOpacity>
					:
						<TouchableOpacity 
							style={styles.unselecttargetButton}
							onPress={this.difficultySelected}
						>
							<Text style={styles.unselectbuttonText}>
								Difficulty
							</Text>
						</TouchableOpacity>
					}
					{categorySelected ?
						<TouchableOpacity 
							style={styles.targetButton}
							onPress={this.categorySelected}
						>
							<Text style={styles.buttonText}>
								Categories
							</Text>
						</TouchableOpacity>
					:
						<TouchableOpacity 
							style={styles.unselecttargetButton}
							onPress={this.categorySelected}
						>
							<Text style={styles.unselectbuttonText}>
								Categories
							</Text>
						</TouchableOpacity>
					}
				</View>
			</View>
		);
	}

	render() {
		let {sortKey} = this.state
		const that = this
		const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {
			const onEndReached = function() {
				if (hasMore) {
					refine();
				}
			};
			if (sortKey === 'newest') {
				hits.sort(function(a, b){
					let aDate = new Date(a.date)
					let bDate = new Date(b.date)
					return bDate.getTime() - aDate.getTime()
				});	
			}
			if (sortKey === 'difficulty') {
				hits.sort(function(a, b){
					let aDifficulty = that.getDifficultValue(a.difficulty)
					let bDifficulty = that.getDifficultValue(b.difficulty)
					return aDifficulty - bDifficulty
				});
			}
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
										onPress={()=>this.goDetail(item.id)}
									>
										<View style={styles.userPhotoView}>
											{
												item.picture == '' ?
												<Image 
													source={Class_Icon} 
													style={styles.userImageView}/>
												:
												<Image 
													source={{uri: item.picture}} 
													style={styles.userImageView}/>
											}
										</View>
										<View style={styles.listContentView}>
											<View style={styles.rowView}>
												<View style={styles.left}>
													<View style={styles.rowView}>
														<Text style={styles.nameText}>
															<Highlight attributeName="title" hit={item} />
														</Text>
														{item.playMode ? 
															<Text style={styles.modeoneText}>
																Live
															</Text>
															: 
															<Text style={styles.modetwoText}>
																VOD
															</Text>
														}
													</View>
												</View>
												<View style={styles.right}>
													<Text style={styles.addressText}>
														{moment(item.date, 'dddd, MMM D, YYYY').format('M/D/YYYY')}
													</Text>
													<Text style={styles.locationText}>
														{item.difficulty}
													</Text>
												</View>
											</View>
											<View style={styles.wholeView}>
												<Text style={styles.locationText}>
													<Highlight attributeName="description" hit={item} />
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
				<View style={styles.searchView}>
					<InstantSearch
						appId="ZSAIUWZKT2"
						apiKey="101aee8dfc9912844c6b8694c673ea4f"
						indexName="QXBwOjk0NjM5NDhlLTczMDQtNDI5OS05NjYxLTczNDEyNGJiNzU1Yw==.Class"
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
				<View style={styles.paddingView}/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	searchView: {
		width: width,
		height: height
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
		height: dynamicSize(30),
		marginLeft: dynamicSize(20),
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: dynamicSize(30),
	},
	targetButton: {
		width: dynamicSize(85),
		height: dynamicSize(25),
		borderRadius: dynamicSize(20),
		backgroundColor: Dark_Blue,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: dynamicSize(2)
	},
	unselecttargetButton: {
		width: dynamicSize(85),
		height: dynamicSize(25),
		borderRadius: dynamicSize(20),
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: dynamicSize(2)
	},
	buttonText: {
		fontFamily: 'Roboto-Light',
		fontSize: getFontSize(12),
		color: 'white'
	},
	unselectbuttonText: {
		fontFamily: 'Roboto-Light',
		fontSize: getFontSize(12),
		color: '#000000'
	},
	subjectView: {
		width: width,
		height: dynamicSize(35),
		marginLeft: dynamicSize(10),
		marginTop: dynamicSize(10),
		flexDirection: 'row'
	},
	subjectunselecttargetButton: {
		width: dynamicSize(70),
		height: dynamicSize(25),
		borderRadius: dynamicSize(20),
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: dynamicSize(2)
	},
	subjecttargetButton: {
		width: dynamicSize(70),
		height: dynamicSize(25),
		borderRadius: dynamicSize(20),
		backgroundColor: Teal_Color,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: dynamicSize(2)
	},
	listItemView: {
		width: width-dynamicSize(20),
		marginLeft: dynamicSize(10),
		height: dynamicSize(85),
		flexDirection: 'row'
	},
	userPhotoView: {
		width: dynamicSize(80),
		height: dynamicSize(85),
		justifyContent: 'center',
		alignItems: 'center'
	},
	userImageView: {
		width: dynamicSize(70),
		height: dynamicSize(70),
		resizeMode: 'cover',
	},
	listContentView: {
		width: width - dynamicSize(100),
		height: dynamicSize(80),
		justifyContent: 'center',
		marginLeft: dynamicSize(10)
	},
	rowView: {
		flexDirection: 'row',
	},
	left: {
		width: width - dynamicSize(110) - dynamicSize(80),
		height: dynamicSize(30),
		justifyContent: 'center',
	},
	right: {
		width: dynamicSize(80),
		height: dynamicSize(30),
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	nameText: {
		fontFamily: 'Roboto-Regular', 
		fontSize: getFontSize(16), 
		color: '#000000',
	},
	addressText: {
		fontFamily: 'Roboto-Light', 
		fontSize: getFontSize(12), 
		color: Teal_Color,
		paddingLeft: dynamicSize(10)
	},
	locationText: {
		fontFamily: 'Roboto-Light', 
		fontSize: getFontSize(13), 
		color: '#000000',
	},
	liststyle: {
		marginTop: dynamicSize(20),
		height: height - dynamicSize(220)
	},
	wholeView: {
		width: width - dynamicSize(100),
	},
	modeoneText: {
		fontFamily: 'Roboto-Bold', 
		fontSize: getFontSize(13), 
		color: '#5db85d',
		marginLeft: dynamicSize(5),
		marginTop: dynamicSize(1)
	},
	modetwoText: {
		fontFamily: 'Roboto-Bold', 
		fontSize: getFontSize(13), 
		color: '#d29f32',
		marginLeft: dynamicSize(5),
		marginTop: dynamicSize(1)
	},
	paddingView: {
		width: width,
		height: dynamicSize(160),
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterIcon: {
		width: dynamicSize(20),
		height: dynamicSize(18),
		resizeMode: 'contain',
		marginTop: dynamicSize(15)
	}
});

DetailView.defaultProps = {
	 
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(DetailView);