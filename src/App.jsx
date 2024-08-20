import './App.css';
import { BrowserRouter } from 'react-router-dom';
import WhitelabelContextProvider from '@contexts/Whitelabel/WhitelabelContextProvider';
import CartContextProvider from '@contexts/Cart/CartContextProvider';
import AppRouter from './AppRouter';

function App() {
  return (
    <WhitelabelContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CartContextProvider>
    </WhitelabelContextProvider>
  );
}

export default App;
