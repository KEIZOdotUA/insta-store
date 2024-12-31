import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from '@context/AppContext';

function AppContextProvider({ children }) {
  const [whitelabel, setWhitelabel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [packaging, setPackaging] = useState(null);
  const [appReady, setAppReady] = useState(false);

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
      const whitelabelData = await fetchWhitelabelData();
      setWhitelabel(whitelabelData);

      if (whitelabelData == null) {
        return;
      }

      const [
        categoriesData,
        featuresData,
        packagingData,
        productsData,
      ] = await Promise.all([
        fetchCategoriesData(whitelabelData.categoriesSrc),
        fetchFeaturesData(whitelabelData.featuresSrc),
        fetchPackagingData(whitelabelData.packagingSrc),
        fetchProductsData(whitelabelData.productsSrc),
      ]);

      setCategories(categoriesData);
      setFeatures(featuresData);
      setPackaging(packagingData);
      setProducts(packagingData ? [...productsData, packagingData] : productsData);
      setAppReady(true);
    };

    fetchData();
  }, []);

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

  if (!appReady) {
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
