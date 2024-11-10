import './CartItem.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import QuantityInput from '@components/shared/QuantityInput/QuantityInput';
import ProductImage from '@components/Product/Image/ProductImage';
import useProductNavigation from '@helpers/useProductNavigation';
import Button from '@components/shared/Button/Button';

function CartItem({ item }) {
  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useShoppingContext();

  const getProductLink = useProductNavigation();

  return (
    <div className="cart-item">
      <div className="cart-item__img-container">
        <Link to={getProductLink(item.id)}>
          <ProductImage id={item.id} name={item.name} size="s" className="cart-img" />
        </Link>
      </div>
      <div className="cart-item__description-container">
        <div className="cart-item__title">
          <Link to={getProductLink(item.id)}>
            {`${item.name}${item.selectedSize ? `, ${item.selectedSize} розмір` : ''}`}
          </Link>
        </div>
        <div className="cart-item__price">{`${item.price} грн`}</div>
        <Button className="cart-item__delete" onClick={() => removeCartItem(item.id)}>
          видалити
        </Button>
        <div className="cart-item__quantity">
          <QuantityInput
            quantity={item.quantity}
            onIncrement={() => incrementCartItemQuantity(item.id)}
            onDecrement={() => decrementCartItemQuantity(item.id)}
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
