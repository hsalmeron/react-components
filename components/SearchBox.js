// We need to add the connectSearchBox to our import
import {
	connectInfiniteHits,
	connectSearchBox,
} from 'react-instantsearch/connectors';
// We need to add the TextInput to our import
import {
	StyleSheet,
	View,
	FlatList,
	Image,
	Text,
	TextInput,
} from 'react-native';

// [...]

const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {
	const styles = {
		height: 60,
		borderWidth: 1,
		padding: 10,
		margin: 10,
		flex: 1,
	};
	return (
		<TextInput
			style={styles}
			onChangeText={text => refine(text)}
			value={currentRefinement}
			placeholder={'Search a product...'}
			clearButtonMode={'always'}
			spellCheck={false}
			autoCorrect={false}
			autoCapitalize={'none'}
		/>
	);
});

