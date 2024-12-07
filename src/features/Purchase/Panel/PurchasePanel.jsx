import './PurchasePanel.css';
import { useState } from 'react';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import CloseSvg from '@assets/close.svg';
import useHiddenOverflow from '@hooks/useHiddenOverflow';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import animationDuration from '@helpers/constValues';
import PurchaseStep from '@features/Purchase/Panel/PurchaseStep/PurchaseStep';

function PurchasePanel() {
  const { visiblePurchase, hidePurchase } = usePurchaseContext();

  const [orderStep, setOrderStep] = useState(0);

  useHiddenOverflow({ active: visiblePurchase });
  const onClose = () => {
    hidePurchase();
    setTimeout(() => setOrderStep(0), animationDuration);
  };

  return (
    <div className="purchase-panel__placeholder">
      <Transition
        key="Purchase"
        transitionType="transform"
        transitionDirection="right"
        visible={visiblePurchase}
        duration={animationDuration}
      >
        <div className="purchase-panel">
          <Button className="purchase-panel__close" onClick={onClose}>
            <CloseSvg />
          </Button>
          <PurchaseStep step={orderStep} updateStep={setOrderStep} />
          <Button className="purchase-panel__continue" onClick={onClose} light>
            продовжити покупки
          </Button>
        </div>
      </Transition>
    </div>
  );
}

export default PurchasePanel;
