import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import Product from './Product/Product';
import Modal from './Modal/Modal';
import useWhitelabelContext from '../../context/useWhitelabelContext';

function ProductsList() {
  const whitelabel = useWhitelabelContext();
  const itemsPerPage = 9;
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

  const observerTarget = useRef(null);

  useEffect(() => {
    let observerRefValue = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [observerTarget]);

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
      <div ref={observerTarget} />
      {isLoading && <p>Loading...</p>}
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
}

export default ProductsList;
