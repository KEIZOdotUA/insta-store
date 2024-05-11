import './Header.css';
import PropTypes from 'prop-types';
import Logo from '@components/Logo/Logo';
import CartIcon from '@components/Cart/Icon/CartIcon';

function Header({ sidebarToggler }) {
  return (
    <div id="header">
      <Logo />
      <CartIcon onClick={sidebarToggler} />
    </div>
  );
}

Header.propTypes = {
  sidebarToggler: PropTypes.func.isRequired,
};

export default Header;
