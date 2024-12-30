import { useState, useCallback, useEffect } from 'react';
import useAppContext from '@context/useAppContext';
import {
  maxMobileWidthView,
  mobileShortListLength,
  desktopShortListLength,
} from '@helpers/constValues';

export default function useNonFilteredShortList() {
  const [items, setItems] = useState([]);
  const { products } = useAppContext();

  const filterProducts = useCallback(() => {
    if (!products) {
      return;
    }

    const numItemsToShow = window.innerWidth > maxMobileWidthView
      ? desktopShortListLength
      : mobileShortListLength;

    setItems(products.slice(0, numItemsToShow));
  }, [products]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  useEffect(() => {
    window.addEventListener('resize', filterProducts, false);
  }, [filterProducts]);

  return { items };
}
