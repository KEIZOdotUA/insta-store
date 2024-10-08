import './AdditionalPackaging.css';
import { useParams, useNavigate } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function AdditionalPackaging() {
  const { packaging } = useAppContext();
  const {
    findCartItem,
    addCartItem: addPackagingToCart,
    removeCartItem: removePackagingFromCart,
  } = useShoppingContext();
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const itemInCart = packaging && findCartItem(packaging.id);

  const openModal = () => {
    dispatchTrackingEvent({
      event: 'view_item',
      ecommerce: {
        currency: 'UAH',
        value: packaging.price,
        items: [
          {
            item_id: packaging.id,
            item_name: packaging.name,
            index: 0,
            price: packaging.price,
            quantity: 1,
          },
        ],
      },
    });

    navigate(`/${categorySlug || 'products'}/${packaging.id}`);
  };

  return (
    packaging && (
      <div id="additional-packaging">
        <div id="additional-packaging__option">
          {'+ '}
          <span
            onClick={() => openModal(packaging)}
            role="button"
            tabIndex={0}
            onKeyDown={() => openModal(packaging)}
          >
            {`${packaging.name}`}
          </span>
          {` (${packaging.price} грн)`}
        </div>
        <div id="additional-packaging__action">
          <div
            className={itemInCart ? 'selected-action' : ''}
            role="button"
            tabIndex={0}
            onClick={() => addPackagingToCart(packaging)}
            onKeyDown={() => addPackagingToCart(packaging)}
          >
            так
          </div>
          <div
            className={!itemInCart ? 'selected-action' : ''}
            role="button"
            tabIndex={0}
            onClick={() => removePackagingFromCart(packaging.id)}
            onKeyDown={() => removePackagingFromCart(packaging.id)}
          >
            ні
          </div>
        </div>
      </div>
    )
  );
}

export default AdditionalPackaging;
