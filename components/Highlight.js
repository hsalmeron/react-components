// We need to import the connectHighlight to our import
import {
  connectInfiniteHits,
  connectSearchBox,
  connectHighlight,
} from 'react-instantsearch/connectors';

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
