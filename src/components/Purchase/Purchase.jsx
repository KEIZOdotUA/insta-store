import './Purchase.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import Cart from '@components/Cart/Cart';
import OrderDetails from '@components/OrderDetails/OrderDetails';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';
import CloseSvg from '@assets/close.svg';
import useHiddenOverflow from '@helpers/useHiddenOverflow';
import PurchaseStepName from '@components/Purchase/StepName/PurchaseStepName';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';

function Purchase({ visible, purchaseToggler }) {
  const { getCartId } = useShoppingContext();

  const [orderStep, setOrderStep] = useState(0);

  useHiddenOverflow({ active: visible });

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
    purchaseToggler();
    setTimeout(() => setOrderStep(0), animationDuration);
  };

  return (
    <div id="purchase__placeholder">
      <Transition
        key="Purchase"
        transitionType="transform"
        transitionDirection="right"
        visible={visible}
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

Purchase.propTypes = {
  visible: PropTypes.bool.isRequired,
  purchaseToggler: PropTypes.func.isRequired,
};

export default Purchase;
