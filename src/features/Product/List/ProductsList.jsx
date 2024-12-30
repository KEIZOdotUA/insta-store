import PropTypes from 'prop-types';
import FullList from '@features/Product/List/Full/FullList';
import ShortList from '@features/Product/List/Short/ShortList';
import useFilteredShortList from '@features/Product/List/Short/useFilteredShortList';
import useNonFilteredShortList from '@features/Product/List/Short/useNonFilteredShortList';

function ProductsList({ short, filtered }) {
  const {
    active: activeFilteredList,
    title: filteredListTitle,
    items: filteredListItems,
    linkToAllItems: linkToAllFilteredItems,
  } = useFilteredShortList();

  const { items: nonFilteredListItems } = useNonFilteredShortList();

  if (!short) {
    return <FullList />;
  }

  if (filtered && activeFilteredList) {
    return (
      <ShortList
        title={filteredListTitle}
        items={filteredListItems}
        linkToAllItems={linkToAllFilteredItems}
      />
    );
  }

  return (
    <ShortList
      title="Всі прикраси"
      items={nonFilteredListItems}
      linkToAllItems="/products"
    />
  );
}

ProductsList.defaultProps = {
  short: false,
  filtered: false,
};

ProductsList.propTypes = {
  short: PropTypes.bool,
  filtered: PropTypes.bool,
};

export default ProductsList;
