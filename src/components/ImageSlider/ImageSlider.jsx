import './ImageSlider.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSliderButton from '@components/ImageSlider/Button/ImageSliderButton';

function ImageSlider({
  items,
  duration,
  transitionDuration,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, duration);

    return () => clearInterval(interval);
  }, [items, duration]);

  return (
    <div className="image-slider">
      <Link to={items[currentIndex]?.link}>
        {items.map((item, index) => (
          <img
            key={item.id}
            className={`slide${index === currentIndex ? ' active' : ''}`}
            src={item.image.src}
            alt={item.image.alt}
            style={{ transitionDuration: `${transitionDuration}ms` }}
          />
        ))}
      </Link>
      {items.length > 1 && (
        <div className="image-slider__paginator">
          {items.map((item, index) => (
            <ImageSliderButton
              key={item.id}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
              animationDuration={duration}
              animationDelay={transitionDuration}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ImageSlider.defaultProps = {
  duration: 4000,
  transitionDuration: 1000,
};

ImageSlider.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
};

export default ImageSlider;
