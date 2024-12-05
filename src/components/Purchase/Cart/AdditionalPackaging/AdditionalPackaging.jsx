import './AdditionalPackaging.css';
import { Link } from 'react-router-dom';
import Button from '@components/shared/Button/Button';
import useAppContext from '@contexts/App/useAppContext';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import { trackViewItemEvent } from '@helpers/googleAnalyticsGA4';
import useProductNavigation from '@helpers/useProductNavigation';

function AdditionalPackaging() {
  const { packaging } = useAppContext();
  const {
    hidePurchase,
    findCartItem,
    addCartItem: addPackagingToCart,
    removeCartItem: removePackagingFromCart,
  } = usePurchaseContext();
  const { getProductLink } = useProductNavigation();

  const itemInCart = packaging && findCartItem(packaging.id, 0);

  const onLinkClick = () => {
    trackViewItemEvent(packaging);
    hidePurchase();
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
            onClick={() => addPackagingToCart({ ...packaging, selectedSize: 0 })}
          >
            так
          </Button>
          <Button
            className={!itemInCart ? 'selected-action' : ''}
            onClick={() => removePackagingFromCart(packaging.id, 0)}
          >
            ні
          </Button>
        </div>
      </div>
    )
  );
}

export default AdditionalPackaging;
