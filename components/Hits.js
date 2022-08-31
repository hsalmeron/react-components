// First, we need to add the connectInfiniteHits connector to our import
import { connectInfiniteHits } from 'react-instantsearch/connectors';
// We also need to import the FlatList and other React Native component
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';


// [...]

export const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {

	/* if there are still results, you can
	call the refine function to load more */
	const onEndReached = function() {
		if (hasMore) {
			refine();
		}
	};

	return (
		<FlatList
			data={hits}
			onEndReached={onEndReached}
			keyExtractor={(item, index) => item.objectID}
			renderItem={({ item }) => {
				return (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Image
							style={{ height: 100, width: 100 }}
							source={{ uri: item.image }}
						/>
						<View style={{ flex: 1 }}>
							<Text>
								{item.name}
							</Text>
							<Text>
								{item.type}
							</Text>
						</View>
					</View>
				);
			}}
		/>
	);
});
