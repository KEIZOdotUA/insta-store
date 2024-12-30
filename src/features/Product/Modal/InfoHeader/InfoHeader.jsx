import './InfoHeader.css';
import PropTypes from 'prop-types';
import useAppContext from '@context/useAppContext';
import LikeButton from '@components/LikeButton/LikeButton';
import ShareButton from '@components/ShareButton/ShareButton';
import useWishListStore from '@store/useWishListStore';
import { trackAddToWishListEvent, trackShareEvent } from '@helpers/googleAnalyticsGA4';

function InfoHeader({ product }) {
  const { whitelabel, features } = useAppContext();

  const {
    findItem: findWishListItem,
    addItem: addToWishList,
    removeItem: removeFromWishList,
  } = useWishListStore();

  const feature = features.find((item) => item.id === product.feature);
  const itemInWIshList = product && findWishListItem(product.id);

  const toggleLike = (item) => {
    if (itemInWIshList) {
      removeFromWishList(item.id);

      return;
    }

    addToWishList(item);
    trackAddToWishListEvent(item);
  };

  return (
    <div className="product-modal__header">
      <div className="product-modal__info">
        {feature && (
          <div className="product-modal__featured">
            <span>{feature.name}</span>
          </div>
        )}
        {product.name}
        <span>{`${product.price} грн`}</span>
      </div>
      <div className="product-modal__buttons">
        <LikeButton liked={Boolean(itemInWIshList)} onLike={() => toggleLike(product)} />
        <ShareButton
          title={whitelabel.shop.name}
          text={product.name}
          url={window.location.href}
          onShare={() => trackShareEvent(product.id)}
        />
      </div>
    </div>
  );
}

InfoHeader.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    feature: PropTypes.number,
  }).isRequired,
};

export default InfoHeader;
