import './AdditionalPackaging.css';
import { Link } from 'react-router-dom';
import Button from '@components/shared/Button/Button';
import useAppContext from '@contexts/App/useAppContext';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import { trackViewItemEvent } from '@helpers/googleAnalyticsGA4';
import useProductNavigation from '@helpers/useProductNavigation';

function AdditionalPackaging() {
  const { packaging } = useAppContext();
  const {
    findCartItem,
    addCartItem: addPackagingToCart,
    removeCartItem: removePackagingFromCart,
  } = useShoppingContext();
  const getProductLink = useProductNavigation();

  const itemInCart = packaging && findCartItem(packaging.id);

  return (
    packaging && (
      <div className="additional-packaging">
        <div className="additional-packaging__option">
          {'+ '}
          <Link to={getProductLink(packaging.id)} onClick={trackViewItemEvent(packaging)}>
            {`${packaging.name} (${packaging.price} грн)`}
          </Link>
        </div>
        <div className="additional-packaging__action">
          <Button
            className={itemInCart ? 'selected-action' : ''}
            onClick={() => addPackagingToCart(packaging)}
          >
            так
          </Button>
          <Button
            className={!itemInCart ? 'selected-action' : ''}
            onClick={() => removePackagingFromCart(packaging.id)}
          >
            ні
          </Button>
        </div>
      </div>
    )
  );
}

export default AdditionalPackaging;
