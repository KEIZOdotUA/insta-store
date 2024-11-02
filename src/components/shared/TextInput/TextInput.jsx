import './TextInput.css';
import PropTypes from 'prop-types';

function TextInput({
  id,
  className,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
}) {
  return (
    <div className={`text-input ${className}`}>
      {label && <label htmlFor={id}>{`${label}${required ? '*' : ''}`}</label>}
      <input
        type="text"
        className={error ? 'error' : ''}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

TextInput.defaultProps = {
  label: '',
  className: '',
  required: false,
  value: '',
  placeholder: '',
  error: '',
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default TextInput;
