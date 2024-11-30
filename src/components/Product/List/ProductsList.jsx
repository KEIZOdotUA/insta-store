import './ProductsList.css';
import { useEffect } from 'react';
import ScrollPaginator from '@components/shared/ScrollPaginator/ScrollPaginator';
import ProductCard from '@components/Product/List/Item/ProductListItem';
import useProductList from '@helpers/useProductList';
import useProductNavigation from '@helpers/useProductNavigation';
import { trackViewItemListEvent } from '@helpers/googleAnalyticsGA4';

function ProductsList() {
  const { name, items } = useProductList();

  useEffect(() => {
    if (name) {
      trackViewItemListEvent(name, items);
    }
  }, [name, items]);

  const getProductLink = useProductNavigation();

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
