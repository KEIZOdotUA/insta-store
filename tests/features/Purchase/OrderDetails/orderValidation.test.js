import { describe, it, expect } from 'vitest';
import { validateField, validateAllFields, hasErrors } from '@features/Purchase/OrderDetails/orderValidation';

describe('Validation Functions', () => {
  describe('validateField', () => {
    const errorMessage = 'Перевірте правильність введених даних';

    it('returns an empty string for fields that skip validation', () => {
      expect(validateField('any value', 'comment')).toBe('');
      expect(validateField('any value', 'doNotCallBack')).toBe('');
    });

    it('returns an empty string for "department" field with any non-empty value', () => {
      expect(validateField('HR', 'department')).toBe('');
    });

    it('returns an error message for "phoneNumber" field with invalid length', () => {
      expect(validateField('12345678', 'phoneNumber')).toBe(errorMessage); // 8 digits
      expect(validateField('1234567890', 'phoneNumber')).toBe(errorMessage); // 10 digits
    });

    it('returns an empty string for "phoneNumber" field with valid length', () => {
      expect(validateField('123456789', 'phoneNumber')).toBe('');
    });

    it('returns an empty string for fields with a value length greater than 2', () => {
      expect(validateField('abc', 'anyField')).toBe('');
    });

    it('returns an error message for fields with a value length of 2 or less', () => {
      expect(validateField('ab', 'anyField')).toBe(errorMessage);
      expect(validateField('', 'anyField')).toBe(errorMessage);
    });
  });

  describe('validateAllFields', () => {
    it('validates all fields in the data object', () => {
      const dataObject = {
        comment: 'This is a comment',
        doNotCallBack: 'yes',
        department: 'Sales',
        phoneNumber: '12345678',
        name: 'Jo',
      };

      const result = validateAllFields(dataObject);

      expect(result).toEqual({
        comment: '',
        doNotCallBack: '',
        department: '',
        phoneNumber: 'Перевірте правильність введених даних',
        name: 'Перевірте правильність введених даних',
      });
    });

    it('returns an empty string for all fields with valid values', () => {
      const dataObject = {
        comment: 'Valid comment',
        doNotCallBack: 'Valid value',
        department: 'IT',
        phoneNumber: '123456789',
        name: 'John',
      };

      const result = validateAllFields(dataObject);

      expect(result).toEqual({
        comment: '',
        doNotCallBack: '',
        department: '',
        phoneNumber: '',
        name: '',
      });
    });
  });

  describe('hasErrors', () => {
    it('returns true if any field has an error message', () => {
      const validationResult = {
        field1: '',
        field2: 'Error',
        field3: '',
      };

      expect(hasErrors(validationResult)).toBe(true);
    });

    it('returns false if no field has an error message', () => {
      const validationResult = {
        field1: '',
        field2: '',
        field3: '',
      };

      expect(hasErrors(validationResult)).toBe(false);
    });

    it('handles an empty object gracefully', () => {
      expect(hasErrors({})).toBe(false);
    });
  });
});
