import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import { useParams, useNavigate } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import ProductCard from '@components/Product/Card/ProductCard';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function ProductsList() {
  const { categories, products } = useAppContext();

  const itemsPerPage = 9;

  const [availableProducts, setAvailableProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);

  const pushGA4ViewTtemList = (productItems) => {
    dispatchTrackingEvent({
      event: 'view_item_list',
      ecommerce: {
        items: productItems.map((product, index) => ({
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
      setAvailableProducts(products.filter((product) => product.available));
      setFilteredProducts(products.filter((product) => product.available));
      pushGA4ViewTtemList(products.filter((product) => product.available));
    };

    fetchData();
  }, [products]);

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

  const navigate = useNavigate();
  const onProductClick = (productId) => {
    navigate(`/${categorySlug || 'products'}/${productId}`);
  };

  return (
    <div id="products-list">
      {filteredProducts.slice(0, numberOfVisibleProducts).map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => onProductClick(p.id)} />
      ))}
      <div ref={observerTarget} style={{ width: '100%' }} />
    </div>
  );
}

export default ProductsList;
