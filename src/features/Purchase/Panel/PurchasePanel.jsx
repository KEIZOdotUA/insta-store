import './PurchasePanel.css';
import { useState } from 'react';
import Transition from '@components/Transition/Transition';
import Button from '@components/Button/Button';
import CloseSvg from '@assets/close.svg';
import useHiddenOverflow from '@hooks/useHiddenOverflow';
import { animationDuration } from '@helpers/constValues';
import PurchaseStep from '@features/Purchase/Panel/PurchaseStep/PurchaseStep';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

function PurchasePanel() {
  const {
    visible: visiblePurchasePanel,
    hide: hidePurchasePanel,
  } = usePurchasePanelStateStore();

  const [orderStep, setOrderStep] = useState(0);

  useHiddenOverflow({ active: visiblePurchasePanel });
  const onClose = () => {
    hidePurchasePanel();
    setTimeout(() => setOrderStep(0), animationDuration);
  };

  return (
    <div className="purchase-panel__placeholder">
      <Transition
        key="Purchase"
        transitionType="transform"
        transitionDirection="right"
        visible={visiblePurchasePanel}
        duration={animationDuration}
      >
        <div className="purchase-panel">
          <Button className="purchase-panel__close" onClick={onClose} ariaLabel="Close cart">
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
