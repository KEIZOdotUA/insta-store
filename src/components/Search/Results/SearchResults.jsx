import './SearchResults.css';
import PropTypes from 'prop-types';
import SearchResultsItem from './Item/SearchResultsItem';

function SearchResults({ items }) {
  return (
    <ul className="search-results">
      {items.map((item) => <SearchResultsItem item={item} key={item.id} />)}
    </ul>
  );
}

SearchResults.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default SearchResults;
