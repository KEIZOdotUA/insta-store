import './Cart.css';
import PropTypes from 'prop-types';
import CartItem from '@features/Purchase/Cart/Item/CartItem';
import AdditionalPackaging from '@features/Purchase/Cart/AdditionalPackaging/AdditionalPackaging';
import Button from '@components/Button/Button';
import { trackBeginCheckoutEvent } from '@helpers/googleAnalyticsGA4';
import useCartStore from '@store/useCartStore';

function Cart({ onOrder }) {
  const { items, getTotalCost } = useCartStore();

  const total = getTotalCost();

  const beginCheckout = () => {
    trackBeginCheckoutEvent(getTotalCost(), items);

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
