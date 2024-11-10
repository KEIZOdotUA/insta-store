import './Header.css';
import PropTypes from 'prop-types';
import Logo from '@components/Logo/Logo';
import MenuIcon from '@components/Menu/Icon/MenuIcon';
import SearchIcon from '@components/Search/Icon/SearchIcon';
import WishListIcon from '@components/WishList/Icon/WishListIcon';
import PurchaseIcon from '@components/Purchase/Icon/PurchaseIcon';

function Header({
  menuToggler,
  searchToggler,
  wishListToggler,
  purchaseToggler,
}) {
  return (
    <div id="header">
      <div className="grouped-buttons">
        <MenuIcon onClick={menuToggler} />
        <SearchIcon onClick={searchToggler} />
      </div>
      <Logo />
      <div className="grouped-buttons">
        <WishListIcon onClick={wishListToggler} />
        <PurchaseIcon onClick={purchaseToggler} />
      </div>
    </div>
  );
}

Header.propTypes = {
  menuToggler: PropTypes.func.isRequired,
  searchToggler: PropTypes.func.isRequired,
  wishListToggler: PropTypes.func.isRequired,
  purchaseToggler: PropTypes.func.isRequired,
};

export default Header;
