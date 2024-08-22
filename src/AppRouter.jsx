import { Routes, Route } from 'react-router-dom';
import About from '@components/About/About';
import Home from '@components/Home/Home';
import Layout from '@components/Layout/Layout';
import ProductsList from '@components/Product/List/ProductsList';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/:categorySlug" element={<ProductsList />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
