import './ProductCategory.css';
import PropTypes from 'prop-types';

function ProductCategory({ name, onClick }) {
  return (
    <div className="category-name" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      {name}
    </div>
  );
}

ProductCategory.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ProductCategory;
