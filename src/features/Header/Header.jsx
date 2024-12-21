import './Header.css';
import PropTypes from 'prop-types';
import Logo from '@features/Logo/Logo';
import MenuIcon from '@features/Menu/Icon/MenuIcon';
import SearchIcon from '@features/Search/Icon/SearchIcon';
import WishListIcon from '@features/WishList/Icon/WishListIcon';
import PurchaseIcon from '@features/Purchase/Icon/PurchaseIcon';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

function Header({
  menuToggler,
  searchToggler,
  wishListToggler,
}) {
  const {
    visible: visiblePurchasePanel,
    show: showPurchasePanel,
    hide: hidePurchasePanel,
  } = usePurchasePanelStateStore();

  return (
    <header>
      <div className="grouped-buttons">
        <MenuIcon onClick={menuToggler} />
        <SearchIcon onClick={searchToggler} />
      </div>
      <Logo />
      <div className="grouped-buttons">
        <WishListIcon onClick={wishListToggler} />
        <PurchaseIcon onClick={visiblePurchasePanel ? hidePurchasePanel : showPurchasePanel} />
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
