import './ShortList.css';
import PropTypes from 'prop-types';
import useProductNavigation from '@hooks/useProductNavigation';
import ProductCard from '@features/Product/List/Item/ProductListItem';
import { Link } from 'react-router-dom';

function ShortList({ title, items, linkToAllItems }) {
  const { getProductLink } = useProductNavigation();

  return (
    <>
      <span className="short-list__title">{title}</span>
      <div className="short-list">
        {items.map((p) => (
          <ProductCard product={p} link={getProductLink(p.id)} key={p.id} />
        ))}
        <div className="show-more">
          <Link to={linkToAllItems}>
            <div>показати більше &gt;</div>
          </Link>
        </div>
      </div>
    </>
  );
}

ShortList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  linkToAllItems: PropTypes.string.isRequired,
};

export default ShortList;
