import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from '@context/AppContext';

function AppContextProvider({ children }) {
  const [whitelabel, setWhitelabel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [packaging, setPackaging] = useState(null);

  useEffect(() => {
    const fetchWhitelabel = async () => {
      try {
        const response = await fetch('/whitelabel.json');
        const whitelabelData = await response.json();

        return whitelabelData;
      } catch (error) {
        return null;
      }
    };

    const fetchWhitelabelData = async () => {
      const whitelabelData = await fetchWhitelabel();
      setWhitelabel(whitelabelData);
    };

    fetchWhitelabelData();
  }, []);

  useEffect(() => {
    const fetchCategoriesData = async (categoriesSrc) => {
      try {
        const categoriesResponse = await fetch(categoriesSrc);
        const categoriesData = await categoriesResponse.json();
        return categoriesData;
      } catch (error) {
        return [];
      }
    };

    const fetchFeaturesData = async (featuresSrc) => {
      try {
        const featuresResponse = await fetch(featuresSrc);
        const featuresData = await featuresResponse.json();
        return featuresData;
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
      if (!whitelabel) {
        return;
      }

      const [
        categoriesData,
        featuresData,
        packagingData,
        productsData,
      ] = await Promise.all([
        fetchCategoriesData(whitelabel.categoriesSrc),
        fetchFeaturesData(whitelabel.featuresSrc),
        fetchPackagingData(whitelabel.packagingSrc),
        fetchProductsData(whitelabel.productsSrc),
      ]);

      setCategories(categoriesData);
      setFeatures(featuresData);
      setPackaging(packagingData);
      setProducts(packagingData ? [...productsData, packagingData] : productsData);
    };

    fetchData();
  }, [whitelabel]);

  const appData = useMemo(
    () => ({
      whitelabel,
      categories,
      features,
      products,
      packaging,
    }),
    [
      whitelabel,
      categories,
      features,
      products,
      packaging,
    ],
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
