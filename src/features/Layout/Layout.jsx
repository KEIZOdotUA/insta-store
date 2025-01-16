import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Banner from '@features/Banner/Banner';
import Header from '@features/Header/Header';
import Search from '@features/Search/Search';
import Menu from '@features/Menu/Menu';
import PurchasePanel from '@features/Purchase/Panel/PurchasePanel';
import ProductModal from '@features/Product/Modal/ProductModal';
import WishList from '@features/WishList/WishList';
import Footer from '@features/Footer/Footer';

function Layout() {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [visibleWishList, setVisibleWishList] = useState(false);

  return (
    <>
      <Banner />
      <main>
        <Outlet />
      </main>
      <Header
        menuToggler={() => setVisibleMenu(!visibleMenu)}
        searchToggler={() => setVisibleSearch(!visibleSearch)}
        wishListToggler={() => setVisibleWishList(!visibleWishList)}
      />
      <Search visible={visibleSearch} searchToggler={() => setVisibleSearch(!visibleSearch)} />
      <Footer />
      <WishList visible={visibleWishList} onClose={() => setVisibleWishList(!visibleWishList)} />
      <ProductModal />
      <Menu visible={visibleMenu} menuToggler={() => setVisibleMenu(!visibleMenu)} />
      <PurchasePanel />
    </>
  );
}

export default Layout;
