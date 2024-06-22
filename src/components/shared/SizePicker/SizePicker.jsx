import { useEffect } from 'react';
import './SizePicker.css';
import PropTypes from 'prop-types';
import SizeButton from './SizeButton/SizeButton';

function SizePicker({
  sizes,
  setSize,
  selectedSize,
  disabled,
}) {
  useEffect(() => {
    if (selectedSize === 0) {
      setSize(sizes[0]);
    }
  }, [sizes, setSize, selectedSize]);

  const onSetSize = (size) => {
    if (disabled) {
      return;
    }
    setSize(size);
  };

  return (
    <>
      <div className="title">
        <strong>Оберіть розмір:</strong>
      </div>
      <div>
        {sizes.map((size) => (
          <SizeButton
            key={size}
            value={size}
            onSetSize={() => onSetSize(size)}
            selected={size === selectedSize}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
}

SizePicker.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSize: PropTypes.func.isRequired,
  selectedSize: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SizePicker;
