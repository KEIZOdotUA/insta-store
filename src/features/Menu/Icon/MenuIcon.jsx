import './MenuIcon.css';
import PropTypes from 'prop-types';
import MenuSvg from '@assets/menu.svg';
import Button from '@components/Button/Button';

function MenuIcon({ onClick }) {
  return (
    <Button className="menu-icon" onClick={onClick}>
      <MenuSvg />
    </Button>
  );
}

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MenuIcon;
