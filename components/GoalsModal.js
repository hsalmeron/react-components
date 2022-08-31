import React, { Component } from 'react'
import {
	TouchableOpacity,
	StyleSheet,
	Image,
	View,
	Text,
	ListView,
	Modal,
	StatusBar,
	Dimensions,
	Platform
} from 'react-native'
import { CheckBox } from 'react-native-elements'

import { dynamicSize, getFontSize } from '../utils/DynamicSize'
import Separator from './Separator'

const {height, width} = Dimensions.get('window');
const NavBar_Height = Platform.OS === 'ios' ? 64 : 54

export default class GoalsModal extends Component {

	constructor (props) {
		super(props)

		this.state = {
			goals: []
		}
	}

	componentDidMount () {

	}

	componentWillReceiveProps (nextProps) {

	}

	componentWillUnmount () {

	}

	renderRow(data, sectionID, rowID) {
		return (
			<TouchableOpacity 
					style={styles.listContainer}
					onPress={()=> this.itemSelected(rowID)}
			>
				<View style={styles.nameView}>
					<Text style={styles.namestyle}>
						{data.name}
					</Text>
				</View>
				<CheckBox
					center
					key={rowID}
					checked={this.props.goalSelected[rowID]}
					checkedIcon='check'
					uncheckedIcon='circle-o'
					containerStyle={styles.checkView}
					onPress={()=> this.itemSelected(rowID)}
				/>
			</TouchableOpacity>
		);
	}

	_renderSeparator(sectionID, rowID) {
		return (
			<View key={`${sectionID}-${rowID}`}>
				<Separator color={"#F3F3F3"} width={width} height={1}/>
			</View>
		); 
	}
	
	itemSelected(rowID) {
			goalSelected = this.props.goalSelected
			goalSelected[rowID] = !goalSelected[rowID]
			this.setState({goalSelected: goalSelected})
	}

	render () {
		const { visible, closeModal, goalSelected, predefinedGoal } = this.props;
		const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		const goaldataSource =  ds1.cloneWithRows(this.props.predefinedGoal)
		return (
			<Modal 
				animationType={'none'}
				transparent={true}
				visible={this.props.visible}
				onRequestClose={() => {
					console.log("www");
				}}>
				<View style={styles.container}>
					<TouchableOpacity style={styles.upperView} onPress={()=> closeModal()}>
					</TouchableOpacity>
					<View style={styles.bottomView}>
						<View style={styles.selectView}>
							<TouchableOpacity style={styles.leftview} onPress={()=> closeModal()}>
								<Text style={styles.confirm}>
									Cancel
								</Text>
							</TouchableOpacity>
							<View style={styles.centerview}>
							</View>
							<TouchableOpacity style={styles.rightview} onPress={()=> closeModal()}>
								<Text style={styles.confirm}>
									Select
								</Text>
							</TouchableOpacity>
						</View>
						<Separator color={"#F3F3F3"} width={width} height={1}/>
						<ListView
							dataSource={goaldataSource}
							renderRow={this.renderRow.bind(this)}
							renderSeparator={this._renderSeparator.bind(this)}
							style={styles.list} />
						<View style={styles.paddingView}/>
					</View>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	list: {
		backgroundColor: 'white'
	},
	listContainer: {
		width: width,
		height: dynamicSize(50),
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	upperView: {
		width: width,
		height: NavBar_Height,
	},
	bottomView: {
		width: width,
		height: height-NavBar_Height,
		backgroundColor: 'white'
	},
	selectView: {
		width: width,
		height: dynamicSize(40),
		backgroundColor: 'white',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	leftview: {
		width: dynamicSize(60),
		justifyContent: 'center',
		alignItems: 'center'
	},
	centerview: {
		width: width - dynamicSize(120),
	},
	rightview: {
		width: dynamicSize(60),
		justifyContent: 'center',
		alignItems: 'center'
	},
	confirm: {
		fontSize: getFontSize(14),
		color: 'red'
	},
	nameView: {
		width: width - dynamicSize(50),
		height: dynamicSize(50),
		justifyContent: 'center',
		marginLeft: dynamicSize(20)
	},
	namestyle: {
		marginLeft: dynamicSize(15),
		fontSize: getFontSize(16),
		color: '#000000',
	},
	checkView: {
		width: dynamicSize(50), 
		backgroundColor: 'transparent', 
		borderWidth: 0
	},
    paddingView: {
        width: width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    }
})