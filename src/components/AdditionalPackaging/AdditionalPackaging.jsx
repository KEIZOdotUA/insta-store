import './AdditionalPackaging.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';
import useCartContext from '@contexts/Cart/useCartContext';
import { useState, useEffect } from 'react';
import Transition from '@components/shared/Transition/Transition';
import Modal from '@components/Product/Modal/ProductModal';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

const defaultPackaging = { id: 0 };

function AdditionalPackaging() {
  const whitelabel = useWhitelabelContext();
  const {
    findCartItem,
    addItem: addPackagingToCart,
    removeItem: removePackagingFromCart,
  } = useCartContext();

  const [packaging, setPackaging] = useState(defaultPackaging);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const animationDuration = 250;
  const itemInCart = findCartItem(packaging.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagingResponse = await fetch(whitelabel.packagingSrc);
        const packagingData = await packagingResponse.json();
        setPackaging(packagingData);
      } catch (error) {
        setPackaging(defaultPackaging);
      }
    };

    fetchData();
  }, [whitelabel.packagingSrc]);

  const openModal = () => {
    setShowModal(true);
    setIsVisibleModal(true);

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
  };

  const closeModal = () => {
    setIsVisibleModal(false);
    setTimeout(() => setShowModal(false), animationDuration * 2);
  };

  return (
    packaging.id !== 0 && (
      <>
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
        <Transition transitionType="opacity" visible={isVisibleModal} duration={animationDuration}>
          {showModal && <Modal product={packaging} onClose={closeModal} />}
        </Transition>
      </>
    )
  );
}

export default AdditionalPackaging;
