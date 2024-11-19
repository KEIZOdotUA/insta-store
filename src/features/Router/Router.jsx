import { Routes, Route } from 'react-router-dom';
import AboutPage from '@pages/About/AboutPage';
import HomePage from '@pages/Home/HomePage';
import Layout from '@features/Layout/Layout';
import ProductsList from '@components/Product/List/ProductsList';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/:categorySlug" element={<ProductsList />} />
        <Route path="/products/:productId" element={<HomePage />} />
        <Route path="/:categorySlug/:productId" element={<ProductsList />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
