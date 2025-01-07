import { useState, useEffect } from 'react';
import useAppContext from '@context/useAppContext';

export default function useSpecialOffers() {
  const [specialOffers, setSpecialOffers] = useState([]);

  const { whitelabel } = useAppContext();

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      try {
        const response = await fetch(whitelabel.specialOffersUrl);
        const specialOffersData = await response.json();

        return specialOffersData;
      } catch (error) {
        return [];
      }
    };
    const fetchSpecialOffersData = async () => {
      const specialOffersData = await fetchSpecialOffers();
      setSpecialOffers(specialOffersData);
    };

    fetchSpecialOffersData();
  }, [whitelabel]);

  return specialOffers;
}
