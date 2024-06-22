import './CartIcon.css';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function CartIcon({ onClick }) {
  const { getItems, getTotal } = useCartContext();
  const cartCount = getItems().length;

  const onViewCart = () => {
    onClick();

    const items = getItems();
    const total = getTotal();

    dispatchTrackingEvent({
      event: 'view_cart',
      ecommerce: {
        currency: 'UAH',
        value: total,
        items: items.map((item, index) => ({
          item_id: item.id,
          item_name: item.name,
          index,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
  };

  return (
    <div id="cart-icon" onClick={onViewCart} role="button" tabIndex={0} onKeyDown={onClick}>
      <img src="./cart.svg" alt="cart" />
      <div id="cart-count">{cartCount}</div>
    </div>
  );
}

CartIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CartIcon;
