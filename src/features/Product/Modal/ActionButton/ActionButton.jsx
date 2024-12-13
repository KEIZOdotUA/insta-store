import './ActionButton.css';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import Button from '@components/Button/Button';
import { trackAddToCartEvent } from '@helpers/googleAnalyticsGA4';

function ActionButton({ product, selectedSize }) {
  const {
    showPurchase,
    findCartItem,
    addCartItem,
  } = usePurchaseContext();

  const inCart = product && findCartItem(product.id, selectedSize);

  const onAddProductToCart = (item) => {
    addCartItem(item);
    showPurchase();
    trackAddToCartEvent(item);
  };

  return (
    <>
      {!product.available && (
        <Button className="product-modal__action" onClick={() => {}} disabled>
          немає в наявності
        </Button>
      )}
      {product.available && !inCart && (
        <Button
          className="product-modal__action"
          onClick={() => onAddProductToCart({ ...product, selectedSize })}
          dark
        >
          додати в кошик
        </Button>
      )}
      {inCart && (
        <Button
          className="product-modal__action"
          onClick={() => onAddProductToCart({ ...product, selectedSize })}
          light
        >
          додано в кошик
        </Button>
      )}
    </>
  );
}

ActionButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
  }).isRequired,
  selectedSize: PropTypes.number.isRequired,
};

export default ActionButton;
