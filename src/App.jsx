import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@contexts/App/AppContextProvider';
import ShoppingContextProvider from '@contexts/Shopping/ShoppingContextProvider';
import AppRouter from './AppRouter';

function App() {
  return (
    <AppContextProvider>
      <ShoppingContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ShoppingContextProvider>
    </AppContextProvider>
  );
}

export default App;
