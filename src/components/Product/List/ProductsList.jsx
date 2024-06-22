import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';
import Transition from '@components/shared/Transition/Transition';
import Category from '@components/Product/Category/Category';
import Product from '@components/Product/Product';
import Modal from '@components/Product/Modal/ProductModal';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function ProductsList() {
  const whitelabel = useWhitelabelContext();

  const itemsPerPage = 9;
  const animationDuration = 250;

  const [availableProducts, setAvailableProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);
  const [selectedProductId, setSelectedProductId] = useState(0);

  const [categories, setCategories] = useState([]);

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
      const defaultCategory = { id: 0, name: 'Всі' };

      try {
        const categoriesResponse = await fetch(whitelabel.categoriesSrc);
        const categoriesData = await categoriesResponse.json();
        setCategories(
          [
            defaultCategory,
            ...categoriesData.filter((category) => category.available),
          ],
        );
      } catch (error) {
        setCategories([defaultCategory]);
      }

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
  }, [whitelabel.blobStorageUrl, whitelabel.productsSrc, whitelabel.categoriesSrc]);

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

  const filterProductsByCategory = (categoryId) => {
    setNumberOfVisibleProducts(itemsPerPage * 2);
    if (categoryId === 0) {
      setFilteredProducts(availableProducts);
      return;
    }

    setFilteredProducts(availableProducts.filter((product) => product.category === categoryId));
    pushGA4ViewTtemList(availableProducts.filter((product) => product.category === categoryId));
  };

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
      <div id="categories-list">
        {categories.map((c) => (
          <Category key={c.id} name={c.name} onClick={() => filterProductsByCategory(c.id)} />
        ))}
      </div>
      {filteredProducts.slice(0, numberOfVisibleProducts).map((p) => (
        <Product key={p.id} product={p} onClick={() => openModal(p)} />
      ))}
      <div ref={observerTarget} />
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
