import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header/Header';
import Menu from '@components/Menu/Menu';
import Purchase from '@components/Purchase/Purchase';
import ProductModal from '@components/Product/Modal/ProductModal';

function Layout() {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visiblePurchase, setVisiblePurchase] = useState(false);

  return (
    <>
      <Header
        menuToggler={() => setVisibleMenu(!visibleMenu)}
        purchaseToggler={() => setVisiblePurchase(!visiblePurchase)}
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
      <ProductModal />
    </>
  );
}

export default Layout;
