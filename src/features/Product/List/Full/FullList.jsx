import './FullList.css';
import { useEffect } from 'react';
import ScrollPaginator from '@components/ScrollPaginator/ScrollPaginator';
import ProductCard from '@features/Product/List/Item/ProductListItem';
import useProductList from '@features/Product/List/Full/useFullProductList';
import useProductNavigation from '@hooks/useProductNavigation';
import { trackViewItemListEvent } from '@helpers/googleAnalyticsGA4';

function FullList() {
  const { name, items } = useProductList();

  useEffect(() => {
    if (name) {
      trackViewItemListEvent(name, items);
    }
  }, [name, items]);

  const { getProductLink } = useProductNavigation();

  return (
    <>
      {name && (
        <div className="full-list__name">
          {` ${name} `}
          <sup className="full-list__count">{items.length}</sup>
        </div>
      )}
      <div className="full-list">
        <ScrollPaginator
          items={items.map((p) => (
            <ProductCard product={p} link={getProductLink(p.id)} key={p.id} showFeature />
          ))}
        />
      </div>
    </>
  );
}

export default FullList;
