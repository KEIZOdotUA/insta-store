import { useState, useCallback, useEffect } from 'react';
import useAppContext from '@context/useAppContext';
import {
  maxMobileWidthView,
  mobileShortListLength,
  desktopShortListLength,
} from '@helpers/constValues';

export default function useFilteredShortList() {
  const [items, setItems] = useState([]);
  const [linkToAllItems, setLinkToAllItems] = useState('/');

  const {
    whitelabel,
    products,
    categories,
    features,
  } = useAppContext();

  const filterProducts = useCallback(() => {
    const filterProductsByCategory = (categoryId) => (
      products.filter((product) => product.available && product.category === categoryId)
    );

    const filterProductsByFeature = (featureId) => (
      products.filter((product) => product.available && product.feature === featureId)
    );

    if (!products) {
      return;
    }

    const numItemsToShow = window.innerWidth > maxMobileWidthView
      ? desktopShortListLength
      : mobileShortListLength;

    if (whitelabel.shop.shortList.type === 'category') {
      setItems(filterProductsByCategory(whitelabel.shop.shortList.listId).slice(0, numItemsToShow));
      setLinkToAllItems(`/${categories.find((c) => c.id === whitelabel.shop.shortList.listId)?.slug}`);
      return;
    }

    setItems(filterProductsByFeature(whitelabel.shop.shortList.listId).slice(0, numItemsToShow));
    setLinkToAllItems(`/${features.find((f) => f.id === whitelabel.shop.shortList.listId)?.slug}`);
  }, [
    products,
    whitelabel.shop.shortList.listId,
    whitelabel.shop.shortList.type,
    categories,
    features,
  ]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  useEffect(() => {
    window.addEventListener('resize', filterProducts, false);
  }, [filterProducts]);

  const active = whitelabel?.shop?.shortList?.active;
  const title = whitelabel?.shop?.shortList?.title;

  return {
    active,
    title,
    items,
    linkToAllItems,
  };
}
