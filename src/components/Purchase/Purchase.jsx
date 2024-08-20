import './Purchase.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import Cart from '@components/Cart/Cart';
import OrderDetails from '@components/OrderDetails/OrderDetails';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';

function Purchase({ visible, purchaseToggler }) {
  const [orderStep, setOrderStep] = useState(0);

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
      <Transition transitionType="transform" visible={visible} duration={animationDuration}>
        <div id="purchase__content">
          <Button className="purchase__open-close" onClick={onClose}>
            <img src="./close.svg" alt="close" />
          </Button>
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
