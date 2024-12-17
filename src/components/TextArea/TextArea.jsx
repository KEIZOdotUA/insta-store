import './TextArea.css';
import PropTypes from 'prop-types';

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="text-area">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} type="text" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

TextArea.defaultProps = {
  value: '',
  placeholder: '',
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextArea;
