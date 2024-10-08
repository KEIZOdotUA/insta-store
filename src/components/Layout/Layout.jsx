import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import Menu from '@components/Menu/Menu';
import Purchase from '@components/Purchase/Purchase';
import ProductModal from '@components/Product/Modal/ProductModal';
import WishList from '@components/WishList/WishList';

function Layout() {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visiblePurchase, setVisiblePurchase] = useState(false);
  const [visibleWishList, setVisibleWishList] = useState(false);

  return (
    <>
      <Header
        menuToggler={() => setVisibleMenu(!visibleMenu)}
        purchaseToggler={() => setVisiblePurchase(!visiblePurchase)}
        wishListToggler={() => setVisibleWishList(!visibleWishList)}
      />
      <Menu
        visible={visibleMenu}
        menuToggler={() => setVisibleMenu(!visibleMenu)}
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
