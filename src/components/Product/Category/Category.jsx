import './Category.css';
import PropTypes from 'prop-types';

function Category({ name, onClick }) {
  return (
    <div className="category-name" onClick={onClick} role="button" tabIndex={0} onKeyDown={onClick}>
      {name}
    </div>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Category;
