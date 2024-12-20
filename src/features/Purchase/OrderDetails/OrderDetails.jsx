import './OrderDetails.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '@components/TextInput/TextInput';
import PhoneInput from '@components/PhoneInput/PhoneInput';
import TextArea from '@components/TextArea/TextArea';
import Button from '@components/Button/Button';
import Checkbox from '@components/Checkbox/Checkbox';
import useApiCall from '@hooks/useApiCall';
import { trackPurchaseEvent } from '@helpers/googleAnalyticsGA4';
import {
  validateField,
  validateAllFields,
  hasErrors,
} from '@features/Purchase/OrderDetails/orderValidation';
import useProductNavigation from '@hooks/useProductNavigation';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@store/useCartStore';

function OrderDetails({ onOrder }) {
  const {
    id: cartId,
    items: cartItems,
    clearItems: clearCart,
    getTotalCost,
  } = useCartStore();

  const [orderDetails, setOrderDetails] = useState({
    city: '',
    department: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
    doNotCallBack: false,
    comment: '',
  });

  const [errors, setErrors] = useState({
    city: '',
    department: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
    doNotCallBack: '',
    comment: '',
  });

  const onChange = (field) => (event) => {
    const { target: { value } } = event;
    setOrderDetails({ ...orderDetails, [field]: value });
    setErrors({ ...errors, [field]: validateField(value, field) });
  };

  const sendOrder = useApiCall();
  const { getProductListLink } = useProductNavigation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validateAllFields(orderDetails);
    if (hasErrors(validationResult)) {
      setErrors(validationResult);
      return;
    }
    sendOrder(cartId, cartItems, orderDetails);
    trackPurchaseEvent(cartId, getTotalCost(), cartItems);
    clearCart();
    navigate(getProductListLink());
    onOrder();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="order-inputs">
        <TextInput
          id="city"
          className="order-input"
          label="Населений пункт"
          value={orderDetails.city}
          error={errors.city}
          onChange={onChange('city')}
          required
        />
        <TextInput
          id="department"
          className="order-input"
          label={'Точка видачі "Нова Пошта"'}
          value={orderDetails.department}
          error={errors.department}
          onChange={onChange('department')}
          required
        />
        <PhoneInput
          id="phoneNumber"
          label="Номер телефону одержувача"
          value={orderDetails.phoneNumber}
          error={errors.phoneNumber}
          onChange={onChange('phoneNumber')}
          required
        />
        <TextInput
          id="lastName"
          className="order-input"
          label="Прізвище"
          value={orderDetails.lastName}
          error={errors.lastName}
          onChange={onChange('lastName')}
          required
        />
        <TextInput
          id="firstName"
          className="order-input"
          label="Ім'я"
          value={orderDetails.firstName}
          error={errors.firstName}
          onChange={onChange('firstName')}
          required
        />
        <Checkbox
          label="Мені не потрібно телефонувати"
          value={orderDetails.doNotCallBack}
          onChange={() => setOrderDetails({
            ...orderDetails,
            doNotCallBack: !orderDetails.doNotCallBack,
          })}
        />
        <TextArea
          id="comment"
          label="Коментар"
          value={orderDetails.comment}
          onChange={onChange('comment')}
          placeholder="Промокод чи інші побажання щодо замовлення"
        />
      </div>
      <Button className="order-btn" submit dark>
        замовити
      </Button>
    </form>
  );
}

OrderDetails.propTypes = {
  onOrder: PropTypes.func.isRequired,
};

export default OrderDetails;
