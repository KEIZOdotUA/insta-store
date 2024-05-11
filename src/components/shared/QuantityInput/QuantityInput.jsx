import './QuantityInput.css';
import PropTypes from 'prop-types';
import Button from '@components/shared/Button/Button';

function QuantityInput({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="quantity-input">
      <Button
        className="quantity-input-modifier quantity-input-modifier--left"
        onClick={onDecrement}
      >
        &mdash;
      </Button>
      <input className="quantity-input-screen" type="text" value={quantity} readOnly />
      <Button
        className="quantity-input-modifier quantity-input-modifier--right"
        onClick={onIncrement}
      >
        &#xff0b;
      </Button>
    </div>
  );
}

QuantityInput.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default QuantityInput;
