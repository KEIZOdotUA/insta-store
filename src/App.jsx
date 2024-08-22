import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@contexts/App/AppContextProvider';
import CartContextProvider from '@contexts/Cart/CartContextProvider';
import AppRouter from './AppRouter';

function App() {
  return (
    <AppContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CartContextProvider>
    </AppContextProvider>
  );
}

export default App;
