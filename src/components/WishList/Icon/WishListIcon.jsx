import './WishListIcon.css';
import PropTypes from 'prop-types';
import HeartSvg from '@assets/heart.svg';

function WishListIcon({ onClick }) {
  return (
    <div id="wishlist-icon" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      <HeartSvg />
    </div>
  );
}

WishListIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WishListIcon;
