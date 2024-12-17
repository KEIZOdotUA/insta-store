import './SizePicker.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import SizeButton from '@components/SizePicker/SizeButton/SizeButton';
import Hint from '@components/SizePicker/Hint/SizePickerHint';

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
        {sizeHint.length > 0 && <Hint hint={sizeHint} />}
      </div>
      <div className="size-picker">
        <ol>
          {sizes.map((size) => (
            <li key={size}>
              <SizeButton
                value={size}
                onSetSize={() => onSetSize(size)}
                selected={size === selectedSize}
                disabled={disabled}
              />
            </li>
          ))}
        </ol>
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
