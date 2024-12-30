import { Routes, Route } from 'react-router-dom';
import Layout from '@features/Layout/Layout';
import AboutPage from '@pages/About/AboutPage';
import HomePage from '@pages/Home/HomePage';
import ProductsPage from '@pages/Products/ProductsPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:productId" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductsPage />} />
        <Route path="/:categorySlug" element={<ProductsPage />} />
        <Route path="/:categorySlug/:productId" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
