import './App.css';
import { useState } from 'react';
import Header from '@components/Header/Header';
import Bio from '@components/Bio/Bio';
import ProductsList from '@components/Product/List/ProductsList';
import Sidebar from '@components/Sidebar/Sidebar';
import WhitelabelContextProvider from '@contexts/Whitelabel/WhitelabelContextProvider';
import CartContextProvider from '@contexts/Cart/CartContextProvider';

function App() {
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  return (
    <WhitelabelContextProvider>
      <CartContextProvider>
        <Header sidebarToggler={() => setVisibleSidebar(!visibleSidebar)} />
        <Bio />
        <ProductsList />
        <Sidebar
          visible={visibleSidebar}
          sidebarToggler={() => setVisibleSidebar(!visibleSidebar)}
        />
      </CartContextProvider>
    </WhitelabelContextProvider>
  );
}

export default App;
