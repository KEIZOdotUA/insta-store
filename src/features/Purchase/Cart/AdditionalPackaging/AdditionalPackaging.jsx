import './AdditionalPackaging.css';
import { Link } from 'react-router-dom';
import Button from '@components/Button/Button';
import useAppContext from '@context/useAppContext';
import { trackViewItemEvent } from '@helpers/googleAnalyticsGA4';
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

  const onLinkClick = () => {
    trackViewItemEvent(packaging);
    hidePurchasePanel();
  };

  return (
    packaging && (
      <div className="additional-packaging">
        <div className="additional-packaging__option">
          {'+ '}
          <Link to={getProductLink(packaging.id)} onClick={onLinkClick}>
            {`${packaging.name} (${packaging.price} грн)`}
          </Link>
        </div>
        <div className="additional-packaging__action">
          <Button
            className={itemInCart ? 'selected-action' : ''}
            onClick={() => addToCart({ ...packaging, selectedSize: 0 })}
          >
            так
          </Button>
          <Button
            className={!itemInCart ? 'selected-action' : ''}
            onClick={() => removeFromCart(packaging.id, 0)}
          >
            ні
          </Button>
        </div>
      </div>
    )
  );
}

export default AdditionalPackaging;
