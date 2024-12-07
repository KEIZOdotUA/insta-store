import './OrderConfirmed.css';
import ContactUs from '@features/ContactUs/ContactUs';

function OrderConfirmed() {
  return (
    <div className="order-confirmed">
      <p>
        Ваше замовлення буде оброблене найближчим часом. У разі потреби наші менеджери
        зв&apos;яжуться з Вами для підтвердження деталей.
      </p>
      <ContactUs title="Виникли питання?" />
    </div>
  );
}

export default OrderConfirmed;
