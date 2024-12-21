import './WishList.css';
import Modal from '@components/Modal/Modal';
import PropTypes from 'prop-types';
import WishListItem from '@features/WishList/Item/WishListItem';
import useWishListStore from '@store/useWishListStore';

function WishList({ visible, onClose }) {
  const { items } = useWishListStore();

  return (
    visible && (
      <Modal onClose={onClose} hiddenOverflow>
        <div className="wishlist">
          <div className="wishlist__title">Вподобане</div>
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
