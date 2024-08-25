import './MenuIcon.css';
import PropTypes from 'prop-types';
import MenuSvg from '@assets/menu.svg';

function MenuIcon({ onClick }) {
  return (
    <div id="menu-icon" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      <MenuSvg />
    </div>
  );
}

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuIcon;
