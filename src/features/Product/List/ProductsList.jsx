import './ProductsList.css';
import { useEffect } from 'react';
import ScrollPaginator from '@components/ScrollPaginator/ScrollPaginator';
import ProductCard from '@features/Product/List/Item/ProductListItem';
import useProductList from '@features/Product/List/useProductList';
import useProductNavigation from '@hooks/useProductNavigation';
import { trackViewItemListEvent } from '@helpers/googleAnalyticsGA4';

function ProductsList() {
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
        <div className="products-list__name">
          {` ${name} `}
          <sup className="products-list__count">{items.length}</sup>
        </div>
      )}
      <div className="products-list">
        <ScrollPaginator
          items={items.map((p) => (
            <ProductCard product={p} link={getProductLink(p.id)} key={p.id} />
          ))}
        />
      </div>
    </>
  );
}

export default ProductsList;
