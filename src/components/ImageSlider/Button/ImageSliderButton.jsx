import './ImageSliderButton.css';
import PropTypes from 'prop-types';

function ImageSliderButton({
  active,
  onClick,
  animationDuration,
  animationDelay,
}) {
  return (
    <button className="image-slider__button" onClick={onClick} type="button">
      <div className="progress-bar__background">
        <div
          className={`progress-bar ${active ? 'filling' : ''}`}
          style={{
            animationDuration: active ? `${animationDuration - animationDelay}ms` : '0s',
            animationName: active ? 'fill' : 'none',
            animationDelay: active ? `${animationDelay}ms` : '0s',
          }}
        />
      </div>
    </button>
  );
}

ImageSliderButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  animationDuration: PropTypes.number.isRequired,
  animationDelay: PropTypes.number.isRequired,
};

export default ImageSliderButton;
