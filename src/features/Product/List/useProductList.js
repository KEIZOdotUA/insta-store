import { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useAppContext from '@context/useAppContext';
import filterProductsByQuery from '@helpers/filterProductsByQuery';

export default function useProductList() {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  const {
    categories,
    features,
    products,
  } = useAppContext();
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

    const filterProductsByFeature = (featureId) => {
      setItems(
        products.filter((product) => product.available && product.feature === featureId),
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

    if (categorySlug && (categories.length > 0 || features.length > 0)) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        setName(category.name.toUpperCase());
        filterProductsByCategory(category.id);

        return;
      }

      const feature = features.find((feat) => feat.slug === categorySlug);
      if (feature) {
        setName(feature.name.toUpperCase());
        filterProductsByFeature(feature.id);

        return;
      }

      navigate('/');
    }
  }, [categorySlug, products, categories, features, navigate, searchParam]);

  return { name, items };
}
