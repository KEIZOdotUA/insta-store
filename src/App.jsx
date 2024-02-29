import './App.css';
import WeAre from '@components/WeAre/WeAre';
import ProductsList from '@components/ProductsList/ProductsList';
import WhitelabelContextProvider from '@context/WhitelabelContextProvider';

function App() {
  return (
    <div id="app-container">
      <WhitelabelContextProvider>
        <WeAre />
        <ProductsList />
      </WhitelabelContextProvider>
    </div>
  );
}

export default App;
