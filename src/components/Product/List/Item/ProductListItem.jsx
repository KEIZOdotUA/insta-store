import './ProductListItem.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';

function ProductListItem({ product, link }) {
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
        {product.feature && (
          <span className="product-card__featured">
            {product.feature}
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

ProductListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    feature: PropTypes.string,
  }).isRequired,
  link: PropTypes.string.isRequired,
};

export default ProductListItem;
