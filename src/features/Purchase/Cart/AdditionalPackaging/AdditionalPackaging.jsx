import './AdditionalPackaging.css';
import { Link } from 'react-router-dom';
import Button from '@components/Button/Button';
import useAppContext from '@context/useAppContext';
import { trackAddToCartEvent, trackRemoveFromCartEvent } from '@helpers/googleAnalyticsGA4';
import useProductNavigation from '@hooks/useProductNavigation';
import useCartStore from '@store/useCartStore';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

function AdditionalPackaging() {
  const { packaging } = useAppContext();
  const { hide: hidePurchasePanel } = usePurchasePanelStateStore();
  const {
    findItem: findCartItem,
    addItem: addToCart,
    removeItem: removeFromCart,
  } = useCartStore();
  const { getProductLink } = useProductNavigation();

  const itemInCart = packaging && findCartItem(packaging.id, 0);

  const onAddProductToCart = (item) => {
    addToCart(item);
    trackAddToCartEvent(item);
  };

  const onRemoveFromCart = (item) => {
    if (!itemInCart) {
      return;
    }

    removeFromCart(item.id, 0);
    trackRemoveFromCartEvent(item);
  };

  return (
    packaging && (
      <div className="additional-packaging">
        <div className="additional-packaging__option">
          {'+ '}
          <Link to={getProductLink(packaging.id)} onClick={hidePurchasePanel}>
            {`${packaging.name} (${packaging.price} грн)`}
          </Link>
        </div>
        <div className="additional-packaging__action">
          <Button
            className={itemInCart ? 'selected-action' : ''}
            onClick={() => onAddProductToCart({ ...packaging, selectedSize: 0 })}
          >
            так
          </Button>
          <Button
            className={!itemInCart ? 'selected-action' : ''}
            onClick={() => onRemoveFromCart(packaging)}
          >
            ні
          </Button>
        </div>
      </div>
    )
  );
}

export default AdditionalPackaging;
