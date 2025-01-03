import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import OrderDetails from '@features/Purchase/OrderDetails/OrderDetails';
import useCartStore from '@store/useCartStore';
import useApiCall from '@hooks/useApiCall';
import { trackPurchaseEvent } from '@helpers/googleAnalyticsGA4';
import {
  validateField,
  validateAllFields,
  hasErrors,
} from '@features/Purchase/OrderDetails/orderValidation';
import useProductNavigation from '@hooks/useProductNavigation';
import { useNavigate } from 'react-router-dom';

vi.mock('@store/useCartStore');
vi.mock('@hooks/useApiCall');
vi.mock('@helpers/googleAnalyticsGA4', () => ({
  trackPurchaseEvent: vi.fn(),
}));
vi.mock('@features/Purchase/OrderDetails/orderValidation', () => ({
  validateField: vi.fn(),
  validateAllFields: vi.fn(),
  hasErrors: vi.fn(),
}));
vi.mock('@components//TextInput/TextInput', () => ({
  __esModule: true,
  default: vi.fn(({
    label,
    value,
    onChange,
    error,
  }) => (
    <div>
      <label htmlFor={label}>
        {label}
        <input value={value} id={label} onChange={onChange} />
        {error && <div>{error}</div>}
      </label>
    </div>
  )),
}));
vi.mock('@components//PhoneInput/PhoneInput', () => ({
  __esModule: true,
  default: vi.fn(({ label, value, onChange }) => (
    <div>
      <label htmlFor={label}>
        {label}
        <input value={value} id={label} onChange={onChange} />
      </label>
    </div>
  )),
}));
vi.mock('@components//TextArea/TextArea', () => ({
  __esModule: true,
  default: vi.fn(({ label, value, onChange }) => (
    <div>
      <label htmlFor={label}>
        {label}
        <textarea value={value} id={label} onChange={onChange} />
      </label>
    </div>
  )),
}));
vi.mock('@components//Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick, submit }) => (
    <button type={submit ? 'submit' : 'button'} onClick={onClick}>
      {children}
    </button>
  )),
}));
vi.mock('@components//Checkbox/Checkbox', () => ({
  __esModule: true,
  default: vi.fn(({ label, value, onChange }) => (
    <div>
      <label htmlFor={label}>
        {label}
        <input type="checkbox" id={label} checked={value} onChange={onChange} />
      </label>
    </div>
  )),
}));
vi.mock('@hooks/useProductNavigation', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: vi.fn(),
}));

describe('OrderDetails', () => {
  const mockGetCartItems = [
    {
      id: 1,
      name: 'Item 1',
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Item 2',
      price: 200,
      quantity: 2,
    },
  ];
  const mockOnOrder = vi.fn();
  const mockClearCart = vi.fn();
  const mockGetCartTotal = vi.fn();
  const mockGetCartId = 1;
  const mockApiCall = vi.fn();
  const mockNavigate = vi.fn();
  const mockGetProductListLink = vi.fn(() => '/products');

  beforeEach(() => {
    mockGetCartTotal.mockReturnValue(500);
    useCartStore.mockReturnValue({
      id: mockGetCartId,
      items: mockGetCartItems,
      clearItems: mockClearCart,
      getTotalCost: mockGetCartTotal,
    });
    useApiCall.mockReturnValue(mockApiCall);
    validateField.mockImplementation((value) => (value ? '' : 'Error'));
    validateAllFields.mockImplementation((details) => {
      const errors = {};
      Object.keys(details).forEach((key) => {
        errors[key] = validateField(details[key], key);
      });
      return errors;
    });
    hasErrors.mockImplementation((errors) => Object.values(errors).some((error) => error));
    useNavigate.mockReturnValue(mockNavigate);
    useProductNavigation.mockReturnValue({
      getProductListLink: mockGetProductListLink,
    });
  });

  it('renders all input fields', () => {
    const { getByLabelText } = render(<OrderDetails onOrder={mockOnOrder} />);

    expect(getByLabelText('Населений пункт')).toBeTruthy();
    expect(getByLabelText('Точка видачі "Нова Пошта"')).toBeTruthy();
    expect(getByLabelText('Номер телефону одержувача')).toBeTruthy();
    expect(getByLabelText('Прізвище')).toBeTruthy();
    expect(getByLabelText('Ім\'я')).toBeTruthy();
    expect(getByLabelText('Мені не потрібно телефонувати')).toBeTruthy();
    expect(getByLabelText('Коментар')).toBeTruthy();
  });

  it('shows validation errors when fields are empty', () => {
    const { getByText, findAllByText } = render(<OrderDetails onOrder={mockOnOrder} />);

    const orderButton = getByText('замовити');
    fireEvent.click(orderButton);

    expect(validateAllFields).toHaveBeenCalled();
    expect(hasErrors).toHaveBeenCalled();
    expect(findAllByText('Error')).toBeTruthy();
  });

  it('creates an order when fields are valid', () => {
    const { getByLabelText, getByText } = render(<OrderDetails onOrder={mockOnOrder} />);

    fireEvent.change(getByLabelText('Населений пункт'), { target: { value: 'Kyiv' } });
    fireEvent.change(getByLabelText('Точка видачі "Нова Пошта"'), { target: { value: 'Department 1' } });
    fireEvent.change(getByLabelText('Номер телефону одержувача'), { target: { value: '123456789' } });
    fireEvent.change(getByLabelText('Прізвище'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Ім\'я'), { target: { value: 'John' } });
    fireEvent.click(getByLabelText('Мені не потрібно телефонувати'));
    fireEvent.change(getByLabelText('Коментар'), { target: { value: 'some text' } });

    const orderButton = getByText('замовити');
    fireEvent.click(orderButton);

    expect(mockApiCall).toHaveBeenCalledWith(
      mockGetCartId,
      mockGetCartItems,
      {
        city: 'Kyiv',
        department: 'Department 1',
        phoneNumber: '123456789',
        lastName: 'Doe',
        firstName: 'John',
        doNotCallBack: true,
        comment: 'some text',
      },
    );

    expect(trackPurchaseEvent).toHaveBeenCalledWith(
      mockGetCartId,
      mockGetCartTotal(),
      mockGetCartItems,
    );

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(mockGetProductListLink());
    expect(mockOnOrder).toHaveBeenCalled();
  });
});
