import './WishListIcon.css';
import PropTypes from 'prop-types';
import HeartSvg from '@assets/heart.svg';
import HeartFillSvg from '@assets/heart-fill.svg';
import Button from '@components/Button/Button';
import useWishListStore from '@store/useWishListStore';

function WishListIcon({ onClick }) {
  const { items } = useWishListStore();

  return (
    <Button className="wishlist-icon" onClick={onClick} ariaLabel="Wishlist">
      {items.length ? <HeartFillSvg /> : <HeartSvg />}
    </Button>
  );
}

WishListIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WishListIcon;
