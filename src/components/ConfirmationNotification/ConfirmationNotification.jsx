import './ConfirmationNotification.css';
import useCartContext from '@contexts/Cart/useCartContext';
import ContactUs from '@components/ContactUs/ContactUs';

function ConfirmationNotification() {
  const { getCartId } = useCartContext();
  return (
    <div id="confirmation-notification">
      <h2>{`Ми прийняли Ваше замовлення №${getCartId()}`}</h2>
      <p>
        Ваше замовлення буде оброблене найближчим часом. В разі потреби наші менеджери
        зв&apos;яжуться з Вами для підтвердження деталей.
      </p>
      <ContactUs title="Виникли питання?" />
    </div>
  );
}

export default ConfirmationNotification;
