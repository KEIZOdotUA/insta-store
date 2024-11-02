import './SearchIcon.css';
import PropTypes from 'prop-types';
import SearchSvg from '@assets/search.svg';

function SearchIcon({ onClick }) {
  return (
    <div className="search-icon" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      <SearchSvg />
    </div>
  );
}

SearchIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchIcon;
