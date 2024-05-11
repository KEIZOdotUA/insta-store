import { useEffect } from 'react';
import './ProductModal.css';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';
import Button from '@components/shared/Button/Button';
import useCartContext from '@contexts/Cart/useCartContext';

function ProductModal({ product, onClose }) {
  const { findCartItem, addItem: addProductToCart } = useCartContext();
  const isProductInCart = findCartItem(product.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Button className="modal-close" onClick={onClose}>
          <img src="./close.svg" alt="close" />
        </Button>
        <ProductImage id={product.id} name={product.name} size="l" className="modal-img" />
        <h2>{product.name}</h2>
        <h2>{`${product.price} ₴`}</h2>
        <p>{product.description}</p>
        {isProductInCart ? (
          <Button className="modal-btn" onClick={() => {}} disabled>
            додано в кошик
          </Button>
        ) : (
          <Button className="modal-btn" onClick={() => addProductToCart(product)} dark>
            додати в кошик
          </Button>
        )}
        <Button className="modal-btn" onClick={onClose} light>
          продовжити покупки
        </Button>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductModal;
