import './WishList.css';
import Modal from '@components/shared/Modal/Modal';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import WishListItem from './Item/WishListItem';

function WishList({ visible, onClose }) {
  const { getWishList } = useShoppingContext();

  const items = getWishList();
  return (
    visible && (
      <Modal onClose={onClose} hiddenOverflow>
        <div className="wishlist">
          <div className="wishlist__title">Список бажань</div>
          <div className="wishlist__items">
            {!items.length && <span>Поки що тут порожньо</span>}
            {items.map((item) => (
              <WishListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Modal>
    )
  );
}

WishList.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WishList;
