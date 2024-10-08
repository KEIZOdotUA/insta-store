import './CartIcon.css';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';
import CartSvgIcon from '@assets/cart.svg';

function CartIcon({ onClick }) {
  const { getCartItems, getCartTotal } = useShoppingContext();
  const cartCount = getCartItems().length;

  const onViewCart = () => {
    onClick();

    const items = getCartItems();
    const total = getCartTotal();

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
      <CartSvgIcon />
      <div id="cart-count">{cartCount}</div>
    </div>
  );
}

CartIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CartIcon;
