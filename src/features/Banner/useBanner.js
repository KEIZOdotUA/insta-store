import { useState, useEffect } from 'react';
import useAppContext from '@context/useAppContext';

export default function useBanner() {
  const [banner, setBanner] = useState(null);
  const { whitelabel } = useAppContext();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await fetch(whitelabel.bannerUrl);
        const bannerData = await response.json();

        return bannerData;
      } catch (error) {
        return null;
      }
    };
    const fetchBannerData = async () => {
      const bannerData = await fetchBanner();
      setBanner(bannerData);
    };

    fetchBannerData();
  }, [whitelabel]);

  return banner;
}
