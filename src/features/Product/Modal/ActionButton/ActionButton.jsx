import './ActionButton.css';
import PropTypes from 'prop-types';
import Button from '@components/Button/Button';
import { trackAddToCartEvent } from '@helpers/googleAnalyticsGA4';
import useCartStore from '@store/useCartStore';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

function ActionButton({ product, selectedSize }) {
  const { findItem: findCartItem, addItem: addToCart } = useCartStore();
  const { show: showPurchasePanel } = usePurchasePanelStateStore();

  const inCart = product && findCartItem(product.id, selectedSize);

  const onAddProductToCart = (item) => {
    addToCart(item);
    showPurchasePanel();
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
