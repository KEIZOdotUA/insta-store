import './Cart.css';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import CartAdditionalPackaging from '@components/Cart/AdditionalPackaging/CartAdditionalPackaging';
import Button from '@components/shared/Button/Button';
import { trackBeginCheckoutEvent } from '@helpers/googleAnalyticsGA4';
import CartItem from './Item/CartItem';

function Cart({ onOrder }) {
  const { getCartItems, getCartTotal } = usePurchaseContext();

  const items = getCartItems();
  const total = getCartTotal();

  const beginCheckout = () => {
    trackBeginCheckoutEvent(getCartTotal(), getCartItems());

    onOrder();
  };

  return (
    <>
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={`${item.id}${item.selectedSize}`} item={item} />
        ))}
      </div>
      {total > 0 && <CartAdditionalPackaging />}
      <div className="price">Разом без доставки:</div>
      <div className="price price-number">{`${total} грн`}</div>
      {total > 0 && (
        <Button className="order-btn" onClick={beginCheckout} dark>
          оформити замовлення
        </Button>
      )}
    </>
  );
}

Cart.propTypes = {
  onOrder: PropTypes.func.isRequired,
};

export default Cart;
