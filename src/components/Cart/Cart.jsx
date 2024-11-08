import './Cart.css';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import AdditionalPackaging from '@components/Cart/AdditionalPackaging/AdditionalPackaging';
import Button from '@components/shared/Button/Button';
import { trackBeginCheckoutEvent } from '@helpers/googleAnalyticsGA4';
import CartItem from './Item/CartItem';

function Cart({ onOrder }) {
  const { getCartItems, getCartTotal } = useShoppingContext();

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
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      {total > 0 && <AdditionalPackaging />}
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
