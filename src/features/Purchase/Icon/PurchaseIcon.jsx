import './PurchaseIcon.css';
import PropTypes from 'prop-types';
import { trackViewCartEvent } from '@helpers/googleAnalyticsGA4';
import CartSvgIcon from '@assets/cart.svg';
import Button from '@components/Button/Button';
import useCartStore from '@store/useCartStore';

function PurchaseIcon({ onClick }) {
  const { items: cartItems, getTotalCost } = useCartStore();

  const onViewCart = () => {
    trackViewCartEvent(getTotalCost(), cartItems);
    onClick();
  };

  return (
    <Button className="purchase__icon" onClick={onViewCart} ariaLabel="Cart">
      <CartSvgIcon />
      <div className="purchase__count">{cartItems.length}</div>
    </Button>
  );
}

PurchaseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PurchaseIcon;
