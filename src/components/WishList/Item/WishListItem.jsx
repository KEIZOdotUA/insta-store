import './WishListItem.css';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import ProductImage from '@components/Product/Image/ProductImage';

function WishListItem({ item }) {
  const { removeWishListItem } = useShoppingContext();

  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const onItemClick = (itemId) => {
    navigate(`/${categorySlug || 'products'}/${itemId}`);
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
        <div
          className="wishlist-item__delete"
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
  }).isRequired,
};

export default WishListItem;
