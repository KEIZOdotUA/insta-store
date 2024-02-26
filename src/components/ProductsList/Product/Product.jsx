import './Product.css';
import PropTypes from 'prop-types';
import useWhitelabelContext from '../../../context/useWhitelabelContext';

function Product({ productId, productName, onClick }) {
  const whitelabel = useWhitelabelContext();
  return (
    <div className="product" onClick={onClick} onKeyDown={onClick} role="button" tabIndex="0">
      <img className="product-img" src={`${whitelabel.blobStorageUrl}m-${productId}.png`} alt={productName} />
    </div>
  );
}

Product.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;
