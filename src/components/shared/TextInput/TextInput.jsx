import './TextInput.css';
import PropTypes from 'prop-types';

function TextInput({
  label,
  value,
  onChange,
  error,
  required,
}) {
  return (
    <div className="text-input">
      <div>{`${label}${required ? '*' : ''}`}</div>
      <input type="text" className={error ? 'error' : ''} value={value} onChange={onChange} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

TextInput.defaultProps = {
  required: false,
  value: '',
  error: '',
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default TextInput;
