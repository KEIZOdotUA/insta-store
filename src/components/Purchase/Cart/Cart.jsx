import './Cart.css';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import CartItem from '@components/Purchase/Cart/Item/CartItem';
import AdditionalPackaging from '@components/Purchase/Cart/AdditionalPackaging/AdditionalPackaging';
import Button from '@components/shared/Button/Button';
import { trackBeginCheckoutEvent } from '@helpers/googleAnalyticsGA4';

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
