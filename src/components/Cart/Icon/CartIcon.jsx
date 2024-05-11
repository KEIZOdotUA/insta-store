import './CartIcon.css';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';

function CartIcon({ onClick }) {
  const { getItems } = useCartContext();
  const cartCount = getItems().length;

  return (
    <div id="cart-icon" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      <img src="./cart.svg" alt="cart" />
      <div id="cart-count">{cartCount}</div>
    </div>
  );
}

CartIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CartIcon;
