import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from '@context/AppContextProvider';
import AppRouter from '@features/Router/Router';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
