import './PurchaseStep.css';
import PropTypes from 'prop-types';
import Cart from '@features/Purchase/Cart/Cart';
import OrderDetails from '@features/Purchase/OrderDetails/OrderDetails';
import OrderConfirmed from '@features/Purchase/OrderConfirmed/OrderConfirmed';
import useCartStore from '@store/useCartStore';

function PurchaseStep({ step, updateStep }) {
  const { id: cartId } = useCartStore();

  const steps = [
    { name: 'Кошик', component: <Cart onOrder={() => updateStep(1)} /> },
    { name: 'Замовлення', component: <OrderDetails onOrder={() => updateStep(2)} /> },
    { name: `Ми прийняли Ваше замовлення № ${cartId}`, component: <OrderConfirmed /> },
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
