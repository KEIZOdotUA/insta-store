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
  ariaLabel,
}) {
  return (
    <button
      className={`${className}${dark ? ' dark-button' : ''}${light ? ' light-button' : ''}${disabled ? ' disabled-button' : ''}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      aria-label={ariaLabel}
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
  ariaLabel: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  submit: PropTypes.bool,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default Button;
