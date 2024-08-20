import './MenuIcon.css';
import PropTypes from 'prop-types';

function MenuIcon({ onClick }) {
  return (
    <div id="menu-icon" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      <img src="./menu.svg" alt="menu" />
    </div>
  );
}

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuIcon;
