import './WishListItem.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductImage from '@features/Product/Image/ProductImage';
import useProductNavigation from '@hooks/useProductNavigation';
import Button from '@components/Button/Button';
import useWishListStore from '@store/useWishListStore';

function WishListItem({ item }) {
  const { removeItem: removeFromWishList } = useWishListStore();

  const { getProductLink } = useProductNavigation();

  return (
    <div className="wishlist-item">
      <div className="wishlist-item__img-container">
        <Link to={getProductLink(item.id)}>
          <ProductImage id={item.id} name={item.name} size="s" className="wishlist-item__img" />
        </Link>
      </div>
      <div className="wishlist-item__txt-container">
        <div className="wishlist-item__title">
          <Link to={getProductLink(item.id)}>
            {item.name}
          </Link>
        </div>
        <div className="wishlist-item__price">{`${item.price} грн`}</div>
        <Button className="wishlist-item__delete" onClick={() => removeFromWishList(item.id)}>
          видалити
        </Button>
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
