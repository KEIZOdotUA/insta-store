import { useSearchParams, useParams } from 'react-router-dom';

export default function useProductNavigation() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const getProductLink = (productId, size) => {
    const queryParam = searchParams.get('q');
    const params = new URLSearchParams();

    if (queryParam) params.set('q', queryParam);
    if (size) params.set('size', size);

    const paramString = params.toString() ? `?${params.toString()}` : '';

    return `/${categorySlug || 'products'}/${productId}${paramString}`;
  };

  const getProductListLink = () => {
    const searchParam = searchParams.get('q');
    const param = searchParam
      ? `?q=${searchParam}`
      : '';

    return `/${categorySlug || 'products'}${param}`;
  };

  return { getProductLink, getProductListLink };
}
