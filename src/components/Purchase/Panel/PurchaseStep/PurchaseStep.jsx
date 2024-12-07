import './PurchaseStep.css';
import PropTypes from 'prop-types';
import Cart from '@components/Purchase/Cart/Cart';
import OrderDetails from '@components/Purchase/OrderDetails/OrderDetails';
import OrderConfirmed from '@components/Purchase/OrderConfirmed/OrderConfirmed';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

function PurchaseStep({ step, updateStep }) {
  const { getCartId } = usePurchaseContext();
  const steps = [
    { name: 'Кошик', component: <Cart onOrder={() => updateStep(1)} /> },
    { name: 'Замовлення', component: <OrderDetails onOrder={() => updateStep(2)} /> },
    { name: `Ми прийняли Ваше замовлення № ${getCartId()}`, component: <OrderConfirmed /> },
  ];

  return (
    <>
      <div className="purchase-step__name">
        {steps[step].name}
      </div>
      {steps[step].component}
    </>
  );
}

PurchaseStep.propTypes = {
  step: PropTypes.oneOf([0, 1, 2]).isRequired,
  updateStep: PropTypes.func.isRequired,
};

export default PurchaseStep;
