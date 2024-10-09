import './WishListIcon.css';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import HeartSvg from '@assets/heart.svg';
import HeartFillSvg from '@assets/heart-fill.svg';

function WishListIcon({ onClick }) {
  const { getWishList } = useShoppingContext();

  const items = getWishList();

  return (
    <div id="wishlist-icon" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      {items.length ? <HeartFillSvg /> : <HeartSvg />}
    </div>
  );
}

WishListIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WishListIcon;
