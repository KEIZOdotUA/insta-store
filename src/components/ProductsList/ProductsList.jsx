import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import useWhitelabelContext from '@context/useWhitelabelContext';
import Product from './Product/Product';
import Modal from './Modal/Modal';

function ProductsList() {
  const whitelabel = useWhitelabelContext();
  const itemsPerPage = 9;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(whitelabel.productsSrc);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, [whitelabel.blobStorageUrl, whitelabel.productsSrc]);

  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);

  const loadMore = () => {
    setIsLoading(true);
    setNumberOfVisibleProducts((prevNum) => prevNum + itemsPerPage);
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

  const moreProducts = () => {
    window.open(whitelabel.instagramProfile.url, '_blank');
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
  };

  const closeModal = () => {
    setSelectedProductId(0);
  };

  return (
    <div id="products-list">
      {products.slice(0, numberOfVisibleProducts).map((p) => (
        <Product key={p.id} product={p} onClick={() => openModal(p.id)} />
      ))}
      {products.length <= numberOfVisibleProducts && (
        <div id="more-products">
          <button className="filled-button" onClick={moreProducts} type="button">
            Дивитись інші товари в instagram профілі
          </button>
        </div>
      )}
      <div ref={observerTarget} />
      {isLoading && <p>Loading...</p>}
      {selectedProductId !== 0 && (
        <Modal product={products.find((p) => p.id === selectedProductId)} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProductsList;
