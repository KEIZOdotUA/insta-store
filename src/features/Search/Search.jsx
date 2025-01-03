import './Search.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useAppContext from '@context/useAppContext';
import TextInput from '@components/TextInput/TextInput';
import Button from '@components/Button/Button';
import CloseSvg from '@assets/close.svg';
import filterProductsByQuery from '@helpers/filterProductsByQuery';
import Overlay from '@features/Search/Overlay/SearchOverlay';
import Results from '@features/Search/Results/SearchResults';
import { animationDuration } from '@helpers/constValues';
import { trackSearchEvent } from '@helpers/googleAnalyticsGA4';

function Search({ visible, searchToggler }) {
  const { products } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
    trackSearchEvent(searchTerm);

    const filteredProducts = searchTerm
      ? filterProductsByQuery(products, searchTerm).slice(0, 5)
      : [];
    setSearchResults(filteredProducts);
  };

  const onClose = () => {
    searchToggler();
    setTimeout(() => {
      setSearchQuery('');
      setSearchResults([]);
    }, animationDuration);
  };

  return (
    <Overlay visible={visible}>
      <div className="search">
        <TextInput
          id="search-input"
          className="search__input"
          placeholder="пошук"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Button className="search__close" onClick={onClose} ariaLabel="Close">
          <CloseSvg />
        </Button>
      </div>
      <Results
        items={searchResults}
        query={searchQuery}
        onClose={onClose}
      />
    </Overlay>
  );
}

Search.propTypes = {
  visible: PropTypes.bool.isRequired,
  searchToggler: PropTypes.func.isRequired,
};

export default Search;
