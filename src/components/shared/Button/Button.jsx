import './Button.css';
import PropTypes from 'prop-types';

function Button({
  children,
  onClick,
  dark,
  light,
  disabled,
  className,
  submit,
}) {
  return (
    <button
      className={`${className} ${dark ? 'dark-button' : ''} ${light ? 'light-button' : ''} ${disabled ? 'disabled-button' : ''}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClick: () => {},
  className: '',
  submit: false,
  dark: false,
  light: false,
  disabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  submit: PropTypes.bool,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
