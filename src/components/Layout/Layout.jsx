import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import Search from '@components/Search/Search';
import Menu from '@components/Menu/Menu';
import Purchase from '@components/Purchase/Purchase';
import ProductModal from '@components/Product/Modal/ProductModal';
import WishList from '@components/WishList/WishList';

function Layout() {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleWishList, setVisibleWishList] = useState(false);
  const [visiblePurchase, setVisiblePurchase] = useState(false);

  return (
    <>
      <Header
        menuToggler={() => setVisibleMenu(!visibleMenu)}
        searchToggler={() => setVisibleSearch(!visibleSearch)}
        wishListToggler={() => setVisibleWishList(!visibleWishList)}
        purchaseToggler={() => setVisiblePurchase(!visiblePurchase)}
      />
      <Menu
        visible={visibleMenu}
        menuToggler={() => setVisibleMenu(!visibleMenu)}
      />
      <Search
        visible={visibleSearch}
        searchToggler={() => setVisibleSearch(!visibleSearch)}
      />
      <Outlet />
      <Purchase
        visible={visiblePurchase}
        purchaseToggler={() => setVisiblePurchase(!visiblePurchase)}
      />
      <WishList
        visible={visibleWishList}
        onClose={() => setVisibleWishList(!visibleWishList)}
      />
      <ProductModal />
    </>
  );
}

export default Layout;
