import './ProductListItem.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAppContext from '@context/useAppContext';
import ProductImage from '@features/Product/Image/ProductImage';

function ProductListItem({ product, link, showFeature }) {
  const { features } = useAppContext();

  const feature = features.find((item) => item.id === product.feature);

  const discounted = product.oldPrice > 0 && product.oldPrice !== product.price;

  return (
    <div className="product-card">
      <Link to={link}>
        <ProductImage
          id={product.id}
          name={product.name}
          size="m"
          className="product-card__img"
        />
        {showFeature && feature && (
          <span className="product-card__featured">
            {feature.name}
          </span>
        )}
        <div className="product-card__name">
          {product.name}
        </div>
        <span className={`product-card__price${discounted ? ' discounted' : ''}`}>
          {` ${product.price} грн `}
        </span>
        <span className="product-card__price">
          {discounted && (
            <s>{`${product.oldPrice} грн`}</s>
          )}
        </span>
      </Link>
    </div>
  );
}

ProductListItem.defaultProps = {
  showFeature: false,
};

ProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    feature: PropTypes.number,
  }).isRequired,
  link: PropTypes.string.isRequired,
  showFeature: PropTypes.bool,
};

export default ProductListItem;
