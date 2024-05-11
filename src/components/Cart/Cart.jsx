import './Cart.css';
import useCartContext from '@contexts/Cart/useCartContext';
import Button from '@components/shared/Button/Button';
import CartItem from './Item/CartItem';

function Cart() {
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
      <Button className="order-btn" onClick={() => {}} dark>
        оформити замовлення
      </Button>
    </>
  );
}

export default Cart;
