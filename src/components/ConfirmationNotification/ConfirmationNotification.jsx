import './ConfirmationNotification.css';
import ContactUs from '@components/ContactUs/ContactUs';

function ConfirmationNotification() {
  return (
    <div id="confirmation-notification">
      <p>
        Ваше замовлення буде оброблене найближчим часом. У разі потреби наші менеджери
        зв&apos;яжуться з Вами для підтвердження деталей.
      </p>
      <ContactUs title="Виникли питання?" />
    </div>
  );
}

export default ConfirmationNotification;
