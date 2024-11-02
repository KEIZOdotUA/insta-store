import './Search.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAppContext from '@contexts/App/useAppContext';
import TextInput from '@components/shared/TextInput/TextInput';
import Button from '@components/shared/Button/Button';
import Transition from '@components/shared/Transition/Transition';
import CloseSvg from '@assets/close.svg';
import useHiddenOverflow from '@helpers/useHiddenOverflow';
import filterProductsByQuery from '@helpers/filterProductsByQuery';
import SearchResults from '@components/Search/Results/SearchResults';

function Search({ visible, searchToggler }) {
  const animationDuration = 250;
  const { products } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useHiddenOverflow({ forceUsage: visible });

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);

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
    <>
      <Transition
        key="Search_Overlay"
        transitionType="opacity"
        visible={visible}
        duration={animationDuration}
      >
        {visible && <div className="search__overlay" />}
      </Transition>
      <div className="search__placeholder">
        <Transition
          key="Search"
          transitionType="transform"
          transitionDirection="bottom"
          visible={visible}
          duration={animationDuration}
        >
          <div className="search">
            <TextInput
              id="search-input"
              className="search__input"
              placeholder="пошук"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button className="search__close" onClick={onClose}>
              <CloseSvg />
            </Button>
          </div>
          <SearchResults items={searchResults} />
          {searchResults.length > 0 && (
            <div className="search__link">
              <center>
                <Link to={`/search?q=${encodeURIComponent(searchQuery)}`} onClick={onClose}>
                  ВСІ РЕЗУЛЬТАТИ ПОШУКУ
                </Link>
              </center>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
}

Search.propTypes = {
  visible: PropTypes.bool.isRequired,
  searchToggler: PropTypes.func.isRequired,
};

export default Search;
