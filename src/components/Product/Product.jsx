import './Product.css';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';

function Product({ product, onClick }) {
  return (
    <div className="product" onClick={onClick} onKeyDown={onClick} role="button" tabIndex="0">
      <ProductImage id={product.id} name={product.name} size="m" className="product-img" />
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;
