import { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import filterProductsByQuery from '@helpers/filterProductsByQuery';

export default function useProductList() {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  const { categories, products } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      setItems(products.filter((product) => product.available));
    };

    fetchData();
  }, [products]);

  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('q');
  useEffect(() => {
    const filterProductsByCategory = (categoryId) => {
      setItems(
        products.filter((product) => product.available && product.category === categoryId),
      );
    };

    const filterProductsBySearch = (searchQuery) => {
      const searchResults = filterProductsByQuery(products, searchQuery);
      setItems(searchResults);
    };

    if (categorySlug === 'search' && searchParam) {
      const searchQuery = decodeURIComponent(searchParam);
      setName(`РЕЗУЛЬТАТИ ПОШУКУ "${searchQuery}"`);
      filterProductsBySearch(searchQuery);

      return;
    }

    if (categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        setName(category.name.toUpperCase());
        filterProductsByCategory(category.id);

        return;
      }

      navigate('/');
    }
  }, [categorySlug, products, categories, navigate, searchParam]);

  return { name, items };
}
