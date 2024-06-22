import './CartItem.css';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import QuantityInput from '@components/shared/QuantityInput/QuantityInput';
import ProductImage from '@components/Product/Image/ProductImage';

function CartItem({ item }) {
  const { removeItem, incrementItemQuantity, decrementItemQuantity } = useCartContext();

  return (
    <div className="cart-item">
      <div className="cart-item-img-container">
        <ProductImage id={item.id} name={item.name} size="s" className="cart-img" />
      </div>
      <div className="cart-item-description-container">
        <div className="cart-item-title">
          {item.name}
          {item.selectedSize && `, ${item.selectedSize} розмір`}
        </div>
        <div className="cart-item-price">{`${item.price} ₴`}</div>
        <div
          className="cart-item-delete"
          role="button"
          tabIndex={0}
          onClick={() => removeItem(item.id)}
          onKeyDown={() => removeItem(item.id)}
        >
          видалити
        </div>
        <div className="cart-item-quantity">
          <QuantityInput
            quantity={item.quantity}
            onIncrement={() => incrementItemQuantity(item.id)}
            onDecrement={() => decrementItemQuantity(item.id)}
          />
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    category: PropTypes.number.isRequired,
    selectedSize: PropTypes.number,
  }).isRequired,
};

export default CartItem;
