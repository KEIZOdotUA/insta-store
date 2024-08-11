import './TextArea.css';
import PropTypes from 'prop-types';

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="text-area">
      <div>{label}</div>
      <textarea type="text" value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

TextArea.defaultProps = {
  value: '',
  placeholder: '',
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextArea;
