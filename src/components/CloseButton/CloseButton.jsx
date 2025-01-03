import './CloseButton.css';
import Button from '@components/Button/Button';
import CloseSvg from '@assets/close.svg';
import PropTypes from 'prop-types';

function CloseButton({ className, onClick }) {
  return (
    <Button className={`close-button ${className}`} onClick={onClick} ariaLabel="Close">
      <CloseSvg />
    </Button>
  );
}

CloseButton.defaultProps = {
  className: '',
};

CloseButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
