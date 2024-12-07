import { useEffect } from 'react';

const mobileMenuWidth = 450;

export default function useHiddenOverflow({ active = false, forceUsage = false }) {
  useEffect(() => {
    const hiddenOverflow = forceUsage || (active && window.innerWidth < mobileMenuWidth);

    if (hiddenOverflow) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (hiddenOverflow) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [active, forceUsage]);
}
