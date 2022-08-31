// We need to add the RefinementList to our import
import {
  connectInfiniteHits,
  connectSearchBox,
  connectHighlight,
  connectRefinementList,
} from 'react-instantsearch/connectors';
// We need to add the TouchableHighlight to our import
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

// [...]

const RefinementList = connectRefinementList(({ refine, items }) =>
  <FlatList
    data={items}
    keyExtractor={(item, index) => item.objectID}
    ListHeaderComponent={() =>
      <Text style={{ marginTop: 20, height: 50, alignSelf: 'center' }}>
        Categories
      </Text>}
    renderItem={({ item }) => {
      return (
        <View style={{ height: 30 }}>
          <TouchableHighlight
            onPress={() => {
              refine(item.value);
            }}
          >
            <Text style={item.isRefined ? { fontWeight: 'bold' } : {}}>
              {item.label}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }}
  />
);
