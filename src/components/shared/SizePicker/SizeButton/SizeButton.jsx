import './SizeButton.css';
import PropTypes from 'prop-types';

function SizeButton({
  value,
  onSetSize,
  selected,
  disabled,
}) {
  return (
    <button
      className={`size-button ${selected ? 'selected' : ''} ${selected && disabled ? 'disabled' : ''}`}
      onClick={onSetSize}
      type="button"
    >
      {value}
    </button>
  );
}

SizeButton.propTypes = {
  value: PropTypes.number.isRequired,
  onSetSize: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SizeButton;
