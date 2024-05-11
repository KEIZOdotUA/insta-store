import './CartItem.css';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import QuantityInput from '@components/shared/QuantityInput/QuantityInput';
import ProductImage from '@components/Product/Image/ProductImage';

function CartItem({ product }) {
  const { removeItem, incrementItemQuantity, decrementItemQuantity } = useCartContext();

  return (
    <div className="cart-item">
      <div className="cart-item-img-container">
        <ProductImage
          id={product.id}
          name={product.name}
          size="m"
          className="cart-img"
        />
      </div>
      <div className="cart-item-description-container">
        <div className="cart-item-title">{product.name}</div>
        <div className="cart-item-price">{`${product.price} ₴`}</div>
        <div
          className="cart-item-delete"
          role="button"
          tabIndex={0}
          onClick={() => removeItem(product.id)}
          onKeyDown={() => removeItem(product.id)}
        >
          видалити
        </div>
        <div className="cart-item-quantity">
          <QuantityInput
            quantity={product.quantity}
            onIncrement={() => incrementItemQuantity(product.id)}
            onDecrement={() => decrementItemQuantity(product.id)}
          />
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
