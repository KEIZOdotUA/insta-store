import './Sidebar.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import Cart from '@components/Cart/Cart';
import OrderDetails from '@components/OrderDetails/OrderDetails';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';

function Sidebar({ visible, sidebarToggler }) {
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
    sidebarToggler();
    setTimeout(() => setOrderStep(0), animationDuration);
  };

  return (
    <div id="sidebar-placeholder">
      <Transition transitionType="transform" visible={visible} duration={animationDuration}>
        <div id="sidebar-content">
          <Button className="sidebar-open-close" onClick={onClose}>
            <img src="./close.svg" alt="close" />
          </Button>
          {getSteppedComponent()}
          <Button className="sidebar-close" onClick={onClose} light>
            продовжити покупки
          </Button>
        </div>
      </Transition>
    </div>
  );
}

Sidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  sidebarToggler: PropTypes.func.isRequired,
};

export default Sidebar;
