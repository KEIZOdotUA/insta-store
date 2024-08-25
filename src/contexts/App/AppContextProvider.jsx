import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppContextProvider({ children }) {
  const [whitelabel, setWhitelabel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [packaging, setPackaging] = useState(null);

  useEffect(() => {
    const fetchWhitelabelData = async () => {
      try {
        const response = await fetch('/whitelabel.json');
        const whitelabelData = await response.json();

        return whitelabelData;
      } catch (error) {
        return null;
      }
    };

    const fetchCategoriesData = async (categoriesSrc) => {
      try {
        const categoriesResponse = await fetch(categoriesSrc);
        const categoriesData = await categoriesResponse.json();
        return categoriesData;
      } catch (error) {
        return [];
      }
    };

    const fetchPackagingData = async (packagingSrc) => {
      try {
        const packagingResponse = await fetch(packagingSrc);
        const packagingData = await packagingResponse.json();
        return packagingData;
      } catch (error) {
        return null;
      }
    };

    const fetchProductsData = async (productsSrc) => {
      try {
        const productsResponse = await fetch(productsSrc);
        const productsData = (await productsResponse.json()).map((product) => ({
          ...product,
          sizes: product.sizes ? product.sizes.split(',').map((size) => parseInt(size, 10)) : [],
        }));
        return productsData;
      } catch (error) {
        return [];
      }
    };

    const fetchData = async () => {
      const whitelabelData = await fetchWhitelabelData();
      setWhitelabel(whitelabelData);

      const categoriesData = await fetchCategoriesData(whitelabelData.categoriesSrc);
      setCategories(categoriesData);

      const packagingData = await fetchPackagingData(whitelabelData.packagingSrc);
      setPackaging(packagingData);

      const productsData = await fetchProductsData(whitelabelData.productsSrc);
      setProducts(packagingData ? [...productsData, packagingData] : productsData);
    };

    fetchData();
  }, []);

  const appData = useMemo(
    () => ({
      whitelabel,
      categories,
      products,
      packaging,
    }),
    [whitelabel, categories, products, packaging],
  );

  if (!whitelabel) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider value={appData}>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
