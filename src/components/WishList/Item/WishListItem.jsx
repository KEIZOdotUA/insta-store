import './WishListItem.css';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import ProductImage from '@features/Product/Image/ProductImage';

function WishListItem({ item }) {
  const { findCartItem, removeWishListItem } = usePurchaseContext();

  const itemInCart = findCartItem(item.id);

  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const onItemClick = (itemId) => {
    const searchParam = searchParams.get('q');
    const param = searchParam
      ? `?q=${searchParam}`
      : '';

    navigate(`/${categorySlug || 'products'}/${itemId}${param}`);
  };

  return (
    <div className="wishlist-item">
      <div
        className="wishlist-item__img-container"
        onClick={() => onItemClick(item.id)}
        onKeyDown={() => onItemClick(item.id)}
        role="link"
        tabIndex={0}
      >
        <ProductImage id={item.id} name={item.name} size="s" className="wishlist-item__img" />
      </div>
      <div className="wishlist-item__txt-container">
        <div
          className="wishlist-item__title"
          onClick={() => onItemClick(item.id)}
          onKeyDown={() => onItemClick(item.id)}
          role="link"
          tabIndex={0}
        >
          {item.name}
        </div>
        <div className="wishlist-item__price">{`${item.price} грн`}</div>
        {!itemInCart && (
          <div
            className="wishlist-item__action"
            role="button"
            tabIndex={0}
            onClick={() => onItemClick(item.id)}
            onKeyDown={() => onItemClick(item.id)}
          >
            додати в кошик
          </div>
        )}
        {itemInCart && (
          <div className="wishlist-item__action wishlist-item__added-to-cart">
            додано в кошик
          </div>
        )}
        <div
          className="wishlist-item__action wishlist-item__delete"
          role="button"
          tabIndex={0}
          onClick={() => removeWishListItem(item.id)}
          onKeyDown={() => removeWishListItem(item.id)}
        >
          видалити
        </div>
      </div>
    </div>
  );
}

WishListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default WishListItem;
