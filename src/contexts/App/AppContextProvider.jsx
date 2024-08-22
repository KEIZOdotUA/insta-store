import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppContextProvider({ children }) {
  const [whitelabelData, setWhitelabelData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/whitelabel.json');
        const data = await response.json();

        try {
          const categoriesResponse = await fetch(data.categoriesSrc);
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
        } catch (error) {
          setCategories([[]]);
        }
        setWhitelabelData(data);
      } catch (error) {
        setWhitelabelData(null);
      }
    };

    fetchData();
  }, []);

  const appData = useMemo(
    () => ({ whitelabel: whitelabelData, categories }),
    [whitelabelData, categories],
  );

  if (!whitelabelData) {
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
