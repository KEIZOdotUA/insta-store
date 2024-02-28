import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WhitelabelContext from './WhitelabelContext';

function WhitelabelContextProvider({ children }) {
  const [whitelabelData, setWhitelabelData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/whitelabel.json');
        const data = await response.json();
        setWhitelabelData(data);
      } catch (error) {
        setWhitelabelData(null);
      }
    };

    fetchData();
  }, []);

  if (!whitelabelData) {
    return <div>Loading...</div>;
  }

  return <WhitelabelContext.Provider value={whitelabelData}>{children}</WhitelabelContext.Provider>;
}

WhitelabelContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WhitelabelContextProvider;
