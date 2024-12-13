import './InfoHeader.css';
import PropTypes from 'prop-types';
import useAppContext from '@contexts/App/useAppContext';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import LikeButton from '@components/LikeButton/LikeButton';
import ShareButton from '@components/ShareButton/ShareButton';

function InfoHeader({ product }) {
  const { whitelabel } = useAppContext();
  const {
    findWishListItem,
    addWishListItem,
    removeWishListItem,
  } = usePurchaseContext();

  const itemInWIshList = product && findWishListItem(product.id);

  const toggleLike = (item) => {
    if (itemInWIshList) {
      removeWishListItem(item.id);

      return;
    }

    addWishListItem(item);
  };

  return (
    <div className="product-modal__header">
      <div className="product-modal__info">
        {product.feature && (
          <div className="product-modal__featured">
            <span>{product.feature}</span>
          </div>
        )}
        {product.name}
        <span>{`${product.price} грн`}</span>
      </div>
      <div className="product-modal__buttons">
        <LikeButton liked={Boolean(itemInWIshList)} onLike={() => toggleLike(product)} />
        <ShareButton title={whitelabel.shop.name} text={product.name} url={window.location.href} />
      </div>
    </div>
  );
}

InfoHeader.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    feature: PropTypes.string,
  }).isRequired,
};

export default InfoHeader;
