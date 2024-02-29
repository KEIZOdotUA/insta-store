import './Product.css';
import PropTypes from 'prop-types';
import useWhitelabelContext from '@context/useWhitelabelContext';
import getImgSrc from '@utils/getImgSrc';

function Product({ product, onClick }) {
  const whitelabel = useWhitelabelContext();
  return (
    <div className="product" onClick={onClick} onKeyDown={onClick} role="button" tabIndex="0">
      <img
        className="product-img"
        src={getImgSrc(whitelabel.blobStorageUrl, 'm', product.id)}
        alt={product.name}
      />
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
