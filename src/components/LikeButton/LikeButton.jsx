import './LikeButton.css';
import PropTypes from 'prop-types';
import Button from '@components/Button/Button';
import HeartSvg from '@assets/heart.svg';
import HeartFillSvg from '@assets/heart-fill.svg';

function LikeButton({ liked, onLike }) {
  return <Button onClick={onLike} className="like-button">{liked ? <HeartFillSvg /> : <HeartSvg />}</Button>;
}

LikeButton.propTypes = {
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default LikeButton;
