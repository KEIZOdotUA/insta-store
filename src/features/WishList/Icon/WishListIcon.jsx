import './WishListIcon.css';
import PropTypes from 'prop-types';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import HeartSvg from '@assets/heart.svg';
import HeartFillSvg from '@assets/heart-fill.svg';
import Button from '@components/Button/Button';

function WishListIcon({ onClick }) {
  const { getWishList } = usePurchaseContext();

  const items = getWishList();

  return (
    <Button className="wishlist-icon" onClick={onClick}>
      {items.length ? <HeartFillSvg /> : <HeartSvg />}
    </Button>
  );
}

WishListIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WishListIcon;
