import './SearchResultsItem.css';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';

function SearchResultsItem({ item }) {
  const { categorySlug } = useParams();
  return (
    <li className="searchresults-item">
      <Link to={`/${categorySlug || 'products'}/${item.id}`}>
        <div className="searchresults-item__img-container">
          <ProductImage
            id={item.id}
            name={item.name}
            size="s"
            className="searchresults-item__img"
          />
        </div>
        <div className="searchresults-item__txt-container">
          <span className="searchresults-item__title">{item.name}</span>
          <span className="searchresults-item__art">{`Арт.: ${item.id}`}</span>
          <span className="searchresults-item__price">{`${item.price} грн`}</span>
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
