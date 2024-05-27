import './OrderDetails.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import TextInput from '@components/shared/TextInput/TextInput';
import PhoneInput from '@components/shared/PhoneInput/PhoneInput';
import TextArea from '@components/shared/TextArea/TextArea';
import Button from '@components/shared/Button/Button';
import sendOrder from '@services/orderService';

function OrderDetails({ onOrder }) {
  const { getItems, clearCart } = useCartContext();

  const [orderDetails, setOrderDetails] = useState({
    city: '',
    department: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    city: '',
    department: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
    comment: '',
  });

  const validateField = (value, field) => {
    if (field === 'comment') {
      return '';
    }

    if (field === 'department' && value.length > 0) {
      return '';
    }

    const errorMessage = 'Перевірте правильність введених даних';

    if (field === 'phoneNumber' && value.length !== 9) {
      return errorMessage;
    }

    if (value.length > 2) {
      return '';
    }

    return errorMessage;
  };

  const onChange = (field) => (event) => {
    const { target: { value } } = event;

    setOrderDetails({ ...orderDetails, [field]: value });
    setErrors({ ...errors, [field]: validateField(value, field) });
  };

  const validateAllFields = () => Object.keys(orderDetails).reduce(
    (validationErrors, field) => ({
      ...validationErrors,
      [field]: validateField(orderDetails[field], field),
    }),
    {},
  );

  const checkErrors = (validationResult) => (
    Object.values(validationResult).some((errorMessage) => Boolean(errorMessage.length)));

  const createOrder = () => {
    const validationResult = validateAllFields();
    if (checkErrors(validationResult)) {
      setErrors(validationResult);
      return;
    }
    sendOrder(orderDetails, getItems());

    clearCart();
    onOrder();
  };

  return (
    <>
      <div id="order-title">Замовлення</div>
      <div id="order-form">
        <TextInput
          label="Населений пункт"
          value={orderDetails.city}
          error={errors.city}
          onChange={onChange('city')}
          required
        />
        <TextInput
          label={'Точка видачі "Нова Пошта"'}
          value={orderDetails.department}
          error={errors.department}
          onChange={onChange('department')}
          required
        />
        <PhoneInput
          label="Номер телефону одержувача"
          value={orderDetails.phoneNumber}
          error={errors.phoneNumber}
          onChange={onChange('phoneNumber')}
          required
        />
        <TextInput
          label="Прізвище"
          value={orderDetails.lastName}
          error={errors.lastName}
          onChange={onChange('lastName')}
          required
        />
        <TextInput
          label="Ім'я"
          value={orderDetails.firstName}
          error={errors.firstName}
          onChange={onChange('firstName')}
          required
        />
        <TextArea
          label="Коментар"
          value={orderDetails.comment}
          onChange={onChange('comment')}
          placeholder="Розмір браслета чи інші побажання щодо замовлення"
        />
      </div>
      <Button className="order-btn" onClick={createOrder} dark>
        замовити
      </Button>
    </>
  );
}

OrderDetails.propTypes = {
  onOrder: PropTypes.func.isRequired,
};

export default OrderDetails;
