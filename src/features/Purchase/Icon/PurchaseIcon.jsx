import './PurchaseIcon.css';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import { trackViewCartEvent } from '@helpers/googleAnalyticsGA4';
import CartSvgIcon from '@assets/cart.svg';
import Button from '@components/shared/Button/Button';

function PurchaseIcon({ onClick }) {
  const { getCartItems, getCartTotal } = usePurchaseContext();
  const cartItems = getCartItems();

  const onViewCart = () => {
    trackViewCartEvent(getCartTotal(), cartItems);
    onClick();
  };

  return (
    <Button className="purchase__icon" onClick={onViewCart}>
      <CartSvgIcon />
      <div className="purchase__count">{cartItems.length}</div>
    </Button>
  );
}

PurchaseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PurchaseIcon;
