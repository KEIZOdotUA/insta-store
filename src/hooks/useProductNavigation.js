import { useSearchParams, useParams, useLocation } from 'react-router-dom';

export default function useProductNavigation() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const homePath = '/home';
  const productsPath = '/products';

  const getProductLink = (productId, size) => {
    const queryParam = searchParams.get('q');
    const params = new URLSearchParams();

    if (queryParam) params.set('q', queryParam);
    if (size) params.set('size', size);

    const paramString = params.toString() ? `?${params.toString()}` : '';

    if (location.pathname.startsWith(homePath)) {
      return `${homePath}/${productId}${paramString}`;
    }

    if (location.pathname.startsWith(productsPath)) {
      return `${productsPath}/${productId}${paramString}`;
    }

    return `/${categorySlug || 'home'}/${productId}${paramString}`;
  };

  const getProductListLink = () => {
    const searchParam = searchParams.get('q');
    const param = searchParam
      ? `?q=${searchParam}`
      : '';

    if (location.pathname.startsWith(homePath)) {
      return `${homePath}${param}`;
    }

    if (location.pathname.startsWith(productsPath)) {
      return `${productsPath}${param}`;
    }

    return `/${categorySlug}${param}`;
  };

  return { getProductLink, getProductListLink };
}
