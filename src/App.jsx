import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@contexts/App/AppContextProvider';
import PurchaseContextProvider from '@contexts/Purchase/PurchaseContextProvider';
import AppRouter from '@features/Router/Router';

function App() {
  return (
    <AppContextProvider>
      <PurchaseContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PurchaseContextProvider>
    </AppContextProvider>
  );
}

export default App;
