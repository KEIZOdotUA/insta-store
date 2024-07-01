import './Checkbox.css';
import PropTypes from 'prop-types';

function Checkbox({ label, value, onChange }) {
  return (
    <div className="checkbox">
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
