import './SearchIcon.css';
import PropTypes from 'prop-types';
import SearchSvg from '@assets/search.svg';
import Button from '@components/Button/Button';

function SearchIcon({ onClick }) {
  return (
    <Button className="search-icon" onClick={onClick}>
      <SearchSvg />
    </Button>
  );
}

SearchIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchIcon;
