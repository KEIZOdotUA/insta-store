import { useState, useEffect } from 'react';
import './ProductsList.css';
import Product from './Product/Product';
import Modal from './Modal/Modal';
import useWhitelabelContext from '../../context/useWhitelabelContext';

function ProductsList() {
  const whitelabel = useWhitelabelContext();
  const itemsPerPage = 15;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${whitelabel.blobStorageUrl}products.json`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, [whitelabel.blobStorageUrl]);

  const [visibleProducts, setVisibleProducts] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadMore = () => {
    setIsLoading(true);
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + itemsPerPage);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight
        || isLoading) {
        return;
      }
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const openModal = (productId) => {
    const selected = products.find((p) => p.id === productId);
    setSelectedProduct(selected);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div id="products-list">
      {products.slice(0, visibleProducts).map((p) => (
        <Product key={p.id} productId={p.id} productName={p.name} onClick={() => openModal(p.id)} />
      ))}
      {isLoading && <p>Loading...</p>}
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProductsList;
