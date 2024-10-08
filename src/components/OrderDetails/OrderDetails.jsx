import './OrderDetails.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import TextInput from '@components/shared/TextInput/TextInput';
import PhoneInput from '@components/shared/PhoneInput/PhoneInput';
import TextArea from '@components/shared/TextArea/TextArea';
import Button from '@components/shared/Button/Button';
import Checkbox from '@components/shared/Checkbox/Checkbox';
import sendOrder from '@services/orderService';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function OrderDetails({ onOrder }) {
  const {
    getCartId,
    getCartItems,
    clearCart,
    getCartTotal,
  } = useShoppingContext();

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

  const validateField = (value, field) => {
    const skipValidationFor = ['comment', 'doNotCallBack'];
    if (skipValidationFor.includes(field)) {
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
    sendOrder(getCartId(), getCartItems(), orderDetails);

    dispatchTrackingEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: new Date().toISOString(),
        value: getCartTotal(),
        currency: 'UAH',
        items: (getCartItems()).map((item, index) => ({
          item_id: item.id,
          item_name: item.name,
          index,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
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
        <Checkbox
          label="Мені не потрібно телефонувати"
          value={orderDetails.doNotCallBack}
          onChange={() => setOrderDetails({
            ...orderDetails,
            doNotCallBack: !orderDetails.doNotCallBack,
          })}
        />
        <TextArea
          label="Коментар"
          value={orderDetails.comment}
          onChange={onChange('comment')}
          placeholder="Промокод чи інші побажання щодо замовлення"
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
