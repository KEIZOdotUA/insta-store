import './AdditionalPackaging.css';
import { Link } from 'react-router-dom';
import Button from '@components/Button/Button';
import useAppContext from '@context/useAppContext';
import { trackRemoveFromCartEvent } from '@helpers/googleAnalyticsGA4';
import useCartStore from '@store/useCartStore';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

function AdditionalPackaging() {
  const { packaging } = useAppContext();
  const { hide: hidePurchasePanel } = usePurchasePanelStateStore();
  const {
    items,
    removeItem: removeFromCart,
  } = useCartStore();

  const isPackagingInCart = packaging.length > 0
    && items.some((cartItem) => cartItem.category === packaging[0].category);

  const onRemoveFromCart = () => {
    if (!isPackagingInCart) {
      return;
    }

    const packagingInCart = items.filter((cartItem) => cartItem.category === packaging[0].category);
    packagingInCart.forEach((item) => {
      removeFromCart(item.id, 0);
      trackRemoveFromCartEvent(item);
    });
  };

  return (
    packaging.some((p) => p.available) && (
      <div className="additional-packaging">
        <div className="additional-packaging__option">
          <Link to="/packaging" onClick={hidePurchasePanel}>
            Потрібне додаткове подарункове упакування?
          </Link>
        </div>
        <div className="additional-packaging__action">
          <Link
            to="/packaging"
            className={isPackagingInCart ? 'selected-action' : ''}
            onClick={hidePurchasePanel}
          >
            так
          </Link>
          <Button
            className={!isPackagingInCart ? 'selected-action' : ''}
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
