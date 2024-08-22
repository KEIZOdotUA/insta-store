import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import { useParams } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import Transition from '@components/shared/Transition/Transition';
import ProductCard from '@components/Product/Card/ProductCard';
import Modal from '@components/Product/Modal/ProductModal';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function ProductsList() {
  const { whitelabel, categories } = useAppContext();

  const itemsPerPage = 9;
  const animationDuration = 250;

  const [availableProducts, setAvailableProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);
  const [selectedProductId, setSelectedProductId] = useState(0);

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const pushGA4ViewTtemList = (products) => {
    dispatchTrackingEvent({
      event: 'view_item_list',
      ecommerce: {
        items: products.map((product, index) => ({
          item_id: product.id,
          item_name: product.name,
          index,
          price: product.price,
        })),
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch(whitelabel.productsSrc);
        const productsData = (await productsResponse.json()).map((product) => (
          {
            ...product,
            sizes: product.sizes
              ? product.sizes.split(',').map((size) => parseInt(size, 10))
              : [],
          }));
        setAvailableProducts(productsData.filter((product) => product.available));
        setFilteredProducts(productsData.filter((product) => product.available));
        pushGA4ViewTtemList(productsData.filter((product) => product.available));
      } catch (error) {
        setAvailableProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchData();
  }, [whitelabel.blobStorageUrl, whitelabel.productsSrc]);

  const { categorySlug } = useParams();
  useEffect(() => {
    const filterProductsByCategory = (categoryId) => {
      setNumberOfVisibleProducts(itemsPerPage * 2);
      setFilteredProducts(availableProducts.filter((product) => product.category === categoryId));
      pushGA4ViewTtemList(availableProducts.filter((product) => product.category === categoryId));
    };

    if (categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        filterProductsByCategory(category.id);
      }
    }
  }, [categorySlug, availableProducts, categories]);

  const loadMore = () => {
    setNumberOfVisibleProducts((prevNum) => prevNum + itemsPerPage);
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

  const openModal = (product) => {
    setSelectedProductId(product.id);
    setIsVisibleModal(true);

    dispatchTrackingEvent({
      event: 'view_item',
      ecommerce: {
        currency: 'UAH',
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            index: 0,
            price: product.price,
            quantity: 1,
          },
        ],
      },
    });
  };

  const closeModal = () => {
    setIsVisibleModal(false);
    setTimeout(() => setSelectedProductId(0), animationDuration * 2);
  };

  return (
    <div id="products-list">
      {filteredProducts.slice(0, numberOfVisibleProducts).map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => openModal(p)} />
      ))}
      <div ref={observerTarget} style={{ width: '100%' }} />
      <Transition transitionType="opacity" visible={isVisibleModal} duration={animationDuration}>
        {selectedProductId !== 0 && (
          <Modal
            product={availableProducts.find((p) => p.id === selectedProductId)}
            onClose={closeModal}
          />
        )}
      </Transition>
    </div>
  );
}

export default ProductsList;
