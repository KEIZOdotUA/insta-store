import './Cart.css';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import Button from '@components/shared/Button/Button';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';
import CartItem from './Item/CartItem';

function Cart({ onOrder }) {
  const { getItems, getTotal } = useCartContext();

  const items = getItems();
  const total = getTotal();

  const beginCheckout = () => {
    dispatchTrackingEvent({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'UAH',
        value: getTotal(),
        items: (getItems()).map((item, index) => ({
          item_id: item.id,
          item_name: item.name,
          index,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });

    onOrder();
  };

  return (
    <>
      <div id="cart-title">Кошик</div>
      <div id="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
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
