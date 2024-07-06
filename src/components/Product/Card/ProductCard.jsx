import './ProductCard.css';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={onClick} onKeyDown={onClick} role="button" tabIndex="0">
      <ProductImage
        id={product.id}
        name={product.name}
        size="m"
        className="product-card__img"
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex="0"
      />
      <div
        className="product-card__name"
        onClick={onClick}
        onKeyDown={onClick}
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
  onClick: PropTypes.func.isRequired,
};

export default ProductCard;
