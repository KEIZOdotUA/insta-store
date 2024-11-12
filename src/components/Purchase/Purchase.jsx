import './Purchase.css';
import { useState } from 'react';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import Cart from '@components/Cart/Cart';
import OrderDetails from '@components/OrderDetails/OrderDetails';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';
import CloseSvg from '@assets/close.svg';
import useHiddenOverflow from '@helpers/useHiddenOverflow';
import PurchaseStepName from '@components/Purchase/StepName/PurchaseStepName';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

function Purchase() {
  const {
    visiblePurchase,
    hidePurchase,
    getCartId,
  } = usePurchaseContext();

  const [orderStep, setOrderStep] = useState(0);

  useHiddenOverflow({ active: visiblePurchase });

  const getStepName = () => {
    switch (orderStep) {
      case 0: return 'Кошик';
      case 1: return 'Замовлення';
      case 2: return `Ми прийняли Ваше замовлення № ${getCartId()}`;
      default: return null;
    }
  };

  const getSteppedComponent = () => {
    switch (orderStep) {
      case 0: return <Cart onOrder={() => setOrderStep(1)} />;
      case 1: return <OrderDetails onOrder={() => setOrderStep(2)} />;
      case 2: return <ConfirmationNotification />;
      default: return null;
    }
  };

  const animationDuration = 250;

  const onClose = () => {
    hidePurchase();
    setTimeout(() => setOrderStep(0), animationDuration);
  };

  return (
    <div id="purchase__placeholder">
      <Transition
        key="Purchase"
        transitionType="transform"
        transitionDirection="right"
        visible={visiblePurchase}
        duration={animationDuration}
      >
        <div id="purchase__content">
          <Button className="purchase__open-close" onClick={onClose}>
            <CloseSvg />
          </Button>
          <PurchaseStepName>{getStepName()}</PurchaseStepName>
          {getSteppedComponent()}
          <Button className="purchase__close" onClick={onClose} light>
            продовжити покупки
          </Button>
        </div>
      </Transition>
    </div>
  );
}

export default Purchase;
