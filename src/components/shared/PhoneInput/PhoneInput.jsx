import './PhoneInput.css';
import PropTypes from 'prop-types';

function PhoneInput({
  label,
  value,
  onChange,
  error,
  required,
}) {
  const handleChange = (event) => {
    const val = event.target.value;

    if (!/^\d*$/g.test(val)) {
      return;
    }

    onChange(event);
  };

  return (
    <div className="phone-input">
      <div>{`${label}${required ? '*' : ''}`}</div>
      <input type="text" className="country-code" disabled value="+380" />
      <input type="text" className={`phone-number ${error ? 'error' : ''}`} value={value} onChange={handleChange} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

PhoneInput.defaultProps = {
  required: false,
  value: '',
  error: '',
};

PhoneInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default PhoneInput;
