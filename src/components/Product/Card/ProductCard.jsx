import './ProductCard.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';

function ProductCard({ product, link }) {
  return (
    <div className="product-card">
      <Link to={link}>
        <ProductImage
          id={product.id}
          name={product.name}
          size="m"
          className="product-card__img"
          role="button"
          tabIndex="0"
        />
        <div
          className="product-card__name"
          role="button"
          tabIndex="0"
        >
          {product.name}
        </div>
        <div className="product-card__price">
          {'Ціна: '}
          {product.oldPrice > 0 && product.oldPrice !== product.price && (
            <s>{`${product.oldPrice}`}</s>
          )}
          {` ${product.price} `}
          грн
        </div>
      </Link>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  link: PropTypes.string.isRequired,
};

export default ProductCard;
