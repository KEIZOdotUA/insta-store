import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ScrollPaginator({ items }) {
  const itemsPerPage = 9;
  const [numberOfVisibleProducts, setNumberOfVisibleProducts] = useState(itemsPerPage);

  const observerTarget = useRef(null);

  useEffect(() => {
    const loadMore = () => {
      setNumberOfVisibleProducts((prevNum) => prevNum + itemsPerPage);
    };

    let observerRefValue = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
      observerRefValue = observerTarget.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [observerTarget]);

  return (
    <>
      {items.slice(0, numberOfVisibleProducts)}
      <div ref={observerTarget} style={{ width: '100%' }} />
    </>
  );
}

ScrollPaginator.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ScrollPaginator;
