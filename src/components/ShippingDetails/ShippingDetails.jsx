import './ShippingDetails.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useCartContext from '@contexts/Cart/useCartContext';
import TextInput from '@components/shared/TextInput/TextInput';
import PhoneInput from '@components/shared/PhoneInput/PhoneInput';
import Button from '@components/shared/Button/Button';

function ShippingDetails({ onOrder }) {
  const { clearCart } = useCartContext();

  const [shippingDetails, setShippingDetails] = useState({
    city: '',
    department: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
  });

  const [errors, setErrors] = useState({
    city: '',
    department: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
  });

  const validateField = (value, field) => {
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

    setShippingDetails({ ...shippingDetails, [field]: value });
    setErrors({ ...errors, [field]: validateField(value, field) });
  };

  const validateAllFields = () => (
    setErrors(Object.keys(shippingDetails).reduce((validationErrors, field) => (
      { ...validationErrors, [field]: validateField(shippingDetails[field], field) }
    ), {}))
  );

  const hasErrors = () => (
    Object.values(errors).some((errorMessage) => Boolean(errorMessage.length)));

  const createOrder = () => {
    validateAllFields();
    if (hasErrors()) {
      return;
    }

    clearCart();
    onOrder();
  };

  return (
    <>
      <div id="shipping-title">Доставка</div>
      <TextInput
        label="Населений пункт"
        value={shippingDetails.city}
        error={errors.city}
        onChange={onChange('city')}
        required
      />
      <TextInput
        label={'Точка видачі "Нова Пошта"'}
        value={shippingDetails.department}
        error={errors.department}
        onChange={onChange('department')}
        required
      />
      <PhoneInput
        label="Номер телефону одержувача"
        value={shippingDetails.phoneNumber}
        error={errors.phoneNumber}
        onChange={onChange('phoneNumber')}
        required
      />
      <TextInput
        label="Прізвище"
        value={shippingDetails.lastName}
        error={errors.lastName}
        onChange={onChange('lastName')}
        required
      />
      <TextInput
        label="Ім'я"
        value={shippingDetails.firstName}
        error={errors.firstName}
        onChange={onChange('firstName')}
        required
      />
      <Button className="order-btn" onClick={createOrder} dark>
        замовити
      </Button>
    </>
  );
}

ShippingDetails.propTypes = {
  onOrder: PropTypes.func.isRequired,
};

export default ShippingDetails;
