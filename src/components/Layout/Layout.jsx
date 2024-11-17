import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import Search from '@components/Search/Search';
import Menu from '@components/Menu/Menu';
import PurchasePanel from '@components/Purchase/Panel/PurchasePanel';
import ProductModal from '@components/Product/Modal/ProductModal';
import WishList from '@components/WishList/WishList';

function Layout() {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleWishList, setVisibleWishList] = useState(false);

  return (
    <>
      <Header
        menuToggler={() => setVisibleMenu(!visibleMenu)}
        searchToggler={() => setVisibleSearch(!visibleSearch)}
        wishListToggler={() => setVisibleWishList(!visibleWishList)}
      />
      <Search
        visible={visibleSearch}
        searchToggler={() => setVisibleSearch(!visibleSearch)}
      />
      <main>
        <Outlet />
        <WishList
          visible={visibleWishList}
          onClose={() => setVisibleWishList(!visibleWishList)}
        />
        <ProductModal />
      </main>
      <Menu
        visible={visibleMenu}
        menuToggler={() => setVisibleMenu(!visibleMenu)}
      />
      <PurchasePanel />
    </>
  );
}

export default Layout;
