import { useEffect } from 'react';
import './SizePicker.css';
import PropTypes from 'prop-types';
import SizeButton from './SizeButton/SizeButton';
import SizePickerHint from './Hint/SizePickerHint';

function SizePicker({
  sizes,
  setSize,
  selectedSize,
  disabled,
  sizeHint,
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
      <div className="size-picker__title">
        <span>Pозмір</span>
        {sizeHint.length > 0 && <SizePickerHint hint={sizeHint} />}
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

SizePicker.defaultProps = {
  sizeHint: '',
};

SizePicker.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSize: PropTypes.func.isRequired,
  selectedSize: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  sizeHint: PropTypes.string,
};

export default SizePicker;
