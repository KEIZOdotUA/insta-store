import './Button.css';
import PropTypes from 'prop-types';

function Button({
  children,
  onClick,
  dark,
  light,
  disabled,
  className,
}) {
  return (
    <button
      className={`${className} ${dark ? 'dark-button' : ''} ${light ? 'light-button' : ''} ${disabled ? 'disabled-button' : ''}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  dark: false,
  light: false,
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
