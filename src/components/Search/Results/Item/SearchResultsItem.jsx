import './SearchResultsItem.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductImage from '@features/Product/Image/ProductImage';
import useProductNavigation from '@hooks/useProductNavigation';

function SearchResultsItem({ item }) {
  const { getProductLink } = useProductNavigation();
  return (
    <li className="search-results-item">
      <Link to={getProductLink(item.id)}>
        <div className="search-results-item__img-container">
          <ProductImage
            id={item.id}
            name={item.name}
            size="s"
            className="search-results-item__img"
          />
        </div>
        <div className="search-results-item__txt-container">
          <span className="search-results-item__title">{item.name}</span>
          <span className="search-results-item__art">{`Арт.: ${item.id}`}</span>
          <span className="search-results-item__price">{`${item.price} грн`}</span>
        </div>
      </Link>
    </li>
  );
}

SearchResultsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default SearchResultsItem;
