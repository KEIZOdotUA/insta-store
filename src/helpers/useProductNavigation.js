import { useSearchParams, useParams } from 'react-router-dom';

export default function useProductNavigation() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const getProductLink = (productId) => {
    const searchParam = searchParams.get('q');
    const param = searchParam
      ? `?q=${searchParam}`
      : '';

    return `/${categorySlug || 'products'}/${productId}${param}`;
  };

  return getProductLink;
}
