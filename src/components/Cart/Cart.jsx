import './Cart.css';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import Button from '@components/shared/Button/Button';
import CartItem from './Item/CartItem';

function Cart({ onOrder }) {
  const { getItems, getTotal } = useCartContext();

  const items = getItems();
  const total = getTotal();

  return (
    <>
      <div id="cart-title">Кошик</div>
      <div id="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>
      <div className="price">Разом без доставки:</div>
      <div className="price price-number">{`${total} грн`}</div>
      <Button className="order-btn" onClick={onOrder} dark>
        оформити замовлення
      </Button>
    </>
  );
}

Cart.propTypes = {
  onOrder: PropTypes.func.isRequired,
};

export default Cart;
