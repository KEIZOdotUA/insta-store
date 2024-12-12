import './Header.css';
import PropTypes from 'prop-types';
import Logo from '@features/Logo/Logo';
import MenuIcon from '@features/Menu/Icon/MenuIcon';
import SearchIcon from '@features/Search/Icon/SearchIcon';
import WishListIcon from '@components/WishList/Icon/WishListIcon';
import PurchaseIcon from '@features/Purchase/Icon/PurchaseIcon';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

function Header({
  menuToggler,
  searchToggler,
  wishListToggler,
}) {
  const { visiblePurchase, showPurchase, hidePurchase } = usePurchaseContext();
  return (
    <header>
      <div className="grouped-buttons">
        <MenuIcon onClick={menuToggler} />
        <SearchIcon onClick={searchToggler} />
      </div>
      <Logo />
      <div className="grouped-buttons">
        <WishListIcon onClick={wishListToggler} />
        <PurchaseIcon onClick={visiblePurchase ? hidePurchase : showPurchase} />
      </div>
    </header>
  );
}

Header.propTypes = {
  menuToggler: PropTypes.func.isRequired,
  searchToggler: PropTypes.func.isRequired,
  wishListToggler: PropTypes.func.isRequired,
};

export default Header;
