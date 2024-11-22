export const validateField = (value, field) => {
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

export const validateAllFields = (dataObject) => Object.keys(dataObject).reduce(
  (validationErrors, field) => ({
    ...validationErrors,
    [field]: validateField(dataObject[field], field),
  }),
  {},
);

export const hasErrors = (validationResult) => (
  Object.values(validationResult).some((errorMessage) => Boolean(errorMessage.length))
);
