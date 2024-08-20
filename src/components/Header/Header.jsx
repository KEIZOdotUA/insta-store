import './Header.css';
import PropTypes from 'prop-types';
import Logo from '@components/Logo/Logo';
import MenuIcon from '@components/Menu/Icon/MenuIcon';
import CartIcon from '@components/Cart/Icon/CartIcon';

function Header({ menuToggler, purchaseToggler }) {
  return (
    <div id="header">
      <MenuIcon onClick={menuToggler} />
      <Logo />
      <CartIcon onClick={purchaseToggler} />
    </div>
  );
}

Header.propTypes = {
  menuToggler: PropTypes.func.isRequired,
  purchaseToggler: PropTypes.func.isRequired,
};

export default Header;
