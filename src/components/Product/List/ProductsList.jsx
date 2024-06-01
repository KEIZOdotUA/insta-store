import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import Product from '@components/Product/Product';
import Modal from '@components/Product//Modal/ProductModal';

function ProductsList() {
  const whitelabel = useWhitelabelContext();
  const itemsPerPage = 9;
  const animationDuration = 250;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(whitelabel.productsSrc);
        const data = await response.json();
        setProducts(data.filter((product) => product.available));
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, [whitelabel.storageUrl, whitelabel.productsSrc]);

  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

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
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
    setTimeout(() => setSelectedProductId(0), animationDuration * 2);
  };

  return (
    <div id="products-list">
      {products.slice(0, numberOfVisibleProducts).map((p) => (
        <Product key={p.id} product={p} onClick={() => openModal(p.id)} />
      ))}
      {products.length <= numberOfVisibleProducts && (
        <div id="more-products">
          <Button onClick={moreProducts} dark>
            Дивитись інші товари в instagram профілі
          </Button>
        </div>
      )}
      <div ref={observerTarget} />
      {isLoading && <p>Loading...</p>}
      <Transition transitionType="opacity" visible={isVisibleModal} duration={animationDuration}>
        {selectedProductId !== 0 && (
          <Modal product={products.find((p) => p.id === selectedProductId)} onClose={closeModal} />
        )}
      </Transition>
    </div>
  );
}

export default ProductsList;
