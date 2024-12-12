import './SearchResults.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchResultsItem from '@features/Search/Results/Item/SearchResultsItem';

function SearchResults({ items, query, onClose }) {
  return (
    <>
      <ul className="search-results">
        {items.map((item) => (
          <SearchResultsItem item={item} key={item.id} />
        ))}
      </ul>
      {items.length === 0 && query.length > 0 && (
        <div className="search__not-found">
          <center>нічого не знайдено</center>
        </div>
      )}
      {items.length > 0 && (
        <div className="search__link">
          <center>
            <Link to={`/search?q=${encodeURIComponent(query)}`} onClick={onClose}>
              ВСІ РЕЗУЛЬТАТИ ПОШУКУ
            </Link>
          </center>
        </div>
      )}
    </>
  );
}

SearchResults.defaultProps = {
  query: '',
};

SearchResults.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  query: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default SearchResults;
