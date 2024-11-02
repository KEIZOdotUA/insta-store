import { useState, useEffect, useRef } from 'react';
import './ProductsList.css';
import {
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import ProductCard from '@components/Product/Card/ProductCard';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';
import filterProductsByQuery from '@helpers/filterProductsByQuery';

function ProductsList() {
  const { categories, products } = useAppContext();

  const itemsPerPage = 9;

  const [availableProducts, setAvailableProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);
  const [productListName, setProductListName] = useState('');

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('q');
  useEffect(() => {
    const filterProductsByCategory = (categoryId) => {
      setNumberOfVisibleProducts(itemsPerPage * 2);
      setFilteredProducts(availableProducts.filter((product) => product.category === categoryId));
      pushGA4ViewTtemList(availableProducts.filter((product) => product.category === categoryId));
    };

    const filterProductsBySearch = (searchQuery) => {
      setNumberOfVisibleProducts(itemsPerPage * 2);
      const searchResults = filterProductsByQuery(availableProducts, searchQuery);
      setFilteredProducts(searchResults);
      pushGA4ViewTtemList(searchResults);
    };

    if (categorySlug === 'search' && searchParam) {
      const searchQuery = decodeURIComponent(searchParam);
      setProductListName(`РЕЗУЛЬТАТИ ПОШУКУ "${searchQuery}"`);
      filterProductsBySearch(searchQuery);

      return;
    }

    if (categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        setProductListName(category.name.toUpperCase());
        filterProductsByCategory(category.id);

        return;
      }

      navigate('/');
    }
  }, [categorySlug, availableProducts, categories, navigate, searchParam]);

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

  const getProductLink = (productId) => {
    const category = categorySlug || 'products';
    const param = searchParam
      ? `?q=${searchParam}`
      : '';

    return `/${category}/${productId}${param}`;
  };

  return (
    <>
      {productListName && <center><h1>{productListName}</h1></center>}
      <div id="products-list">
        {filteredProducts.slice(0, numberOfVisibleProducts).map((p) => (
          <ProductCard
            product={p}
            link={getProductLink(p.id)}
            key={p.id}
          />
        ))}
        <div ref={observerTarget} style={{ width: '100%' }} />
      </div>
    </>
  );
}

export default ProductsList;
