import { Routes, Route } from 'react-router-dom';
import About from '@components/About/About';
import Home from '@components/Home/Home';
import Layout from '@components/Layout/Layout';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
