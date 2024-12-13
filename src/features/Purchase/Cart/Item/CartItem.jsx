import './CartItem.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import QuantityInput from '@components/QuantityInput/QuantityInput';
import ProductImage from '@features/Product/Image/ProductImage';
import useProductNavigation from '@hooks/useProductNavigation';
import Button from '@components/Button/Button';

function CartItem({ item }) {
  const {
    hidePurchase,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = usePurchaseContext();

  const { getProductLink } = useProductNavigation();

  return (
    <div className="cart-item">
      <div className="cart-item__img-container">
        <Link to={getProductLink(item.id, item.selectedSize)} onClick={() => hidePurchase()}>
          <ProductImage id={item.id} name={item.name} size="s" className="cart-img" />
        </Link>
      </div>
      <div className="cart-item__description-container">
        <div className="cart-item__title">
          <Link to={getProductLink(item.id, item.selectedSize)} onClick={() => hidePurchase()}>
            {`${item.name}${item.selectedSize ? `, ${item.selectedSize} розмір` : ''}`}
          </Link>
        </div>
        <div className="cart-item__price">{`${item.price} грн`}</div>
        <Button className="cart-item__delete" onClick={() => removeCartItem(item.id, item.selectedSize)}>
          видалити
        </Button>
        <div className="cart-item__quantity">
          <QuantityInput
            quantity={item.quantity}
            onIncrement={() => incrementCartItemQuantity(item.id, item.selectedSize)}
            onDecrement={() => decrementCartItemQuantity(item.id, item.selectedSize)}
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
