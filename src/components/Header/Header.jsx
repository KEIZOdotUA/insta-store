import './Header.css';
import PropTypes from 'prop-types';
import Logo from '@components/Logo/Logo';
import MenuIcon from '@components/Menu/Icon/MenuIcon';
import WishListIcon from '@components/WishList/Icon/WishListIcon';
import CartIcon from '@components/Cart/Icon/CartIcon';

function Header({
  menuToggler,
  wishListToggler,
  purchaseToggler,
}) {
  return (
    <div id="header">
      <MenuIcon onClick={menuToggler} />
      <Logo />
      <div className="grouped-buttons">
        <WishListIcon onClick={wishListToggler} />
        <CartIcon onClick={purchaseToggler} />
      </div>
    </div>
  );
}

Header.propTypes = {
  menuToggler: PropTypes.func.isRequired,
  wishListToggler: PropTypes.func.isRequired,
  purchaseToggler: PropTypes.func.isRequired,
};

export default Header;
