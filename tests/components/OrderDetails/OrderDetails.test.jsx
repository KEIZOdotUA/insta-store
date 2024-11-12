import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import OrderDetails from '@components/OrderDetails/OrderDetails';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import sendOrder from '@services/orderService';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@components/shared/TextInput/TextInput', () => ({
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
vi.mock('@components/shared/PhoneInput/PhoneInput', () => ({
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
vi.mock('@components/shared/TextArea/TextArea', () => ({
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
vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )),
}));
vi.mock('@components/shared/Checkbox/Checkbox', () => ({
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
vi.mock('@services/orderService', () => ({
  __esModule: true,
  default: vi.fn(),
}));
// vi.mock('@services/orderService');
vi.mock('@helpers/dispatchTrackingEvent');

describe('OrderDetails', () => {
  const mockOnOrder = vi.fn();
  const mockGetCartItems = vi.fn();
  const mockClearCart = vi.fn();
  const mockGetCartTotal = vi.fn();
  const mockGetCartId = vi.fn(() => 1);

  beforeEach(() => {
    mockGetCartItems.mockReturnValue([
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
    ]);
    mockGetCartTotal.mockReturnValue(500);

    usePurchaseContext.mockReturnValue({
      getCartId: mockGetCartId,
      getCartItems: mockGetCartItems,
      clearCart: mockClearCart,
      getCartTotal: mockGetCartTotal,
    });
  });

  it('default', () => {
    const { getByLabelText } = render(<OrderDetails onOrder={mockOnOrder} />);

    expect(getByLabelText('Населений пункт')).toBeTruthy();
    expect(getByLabelText('Точка видачі "Нова Пошта"')).toBeTruthy();
    expect(getByLabelText('Номер телефону одержувача')).toBeTruthy();
    expect(getByLabelText('Прізвище')).toBeTruthy();
    expect(getByLabelText('Ім\'я')).toBeTruthy();
    expect(getByLabelText('Мені не потрібно телефонувати')).toBeTruthy();
    expect(getByLabelText('Коментар')).toBeTruthy();
  });

  it('validation', async () => {
    const { getByText, findAllByText } = render(<OrderDetails onOrder={mockOnOrder} />);

    const orderButton = getByText('замовити');
    fireEvent.click(orderButton);

    expect(findAllByText('Перевірте правильність введених даних')).toBeTruthy();
  });

  it('createOrder', () => {
    const { getByLabelText, getByText } = render(<OrderDetails onOrder={mockOnOrder} />);

    fireEvent.change(getByLabelText('Населений пункт'), { target: { value: 'Kyiv' } });
    fireEvent.change(getByLabelText('Точка видачі "Нова Пошта"'), { target: { value: 'Department 1' } });
    fireEvent.change(getByLabelText('Номер телефону одержувача'), { target: { value: '123456789' } });
    fireEvent.change(getByLabelText('Прізвище'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Ім\'я'), { target: { value: 'John' } });

    const orderButton = getByText('замовити');
    fireEvent.click(orderButton);

    expect(sendOrder).toHaveBeenCalledWith(
      mockGetCartId(),
      mockGetCartItems(),
      {
        city: 'Kyiv',
        department: 'Department 1',
        phoneNumber: '123456789',
        lastName: 'Doe',
        firstName: 'John',
        doNotCallBack: false,
        comment: '',
      },
    );

    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'purchase',
      ecommerce: {
        transaction_id: expect.any(String),
        value: 500,
        currency: 'UAH',
        items: [
          {
            item_id: 1,
            item_name: 'Item 1',
            index: 0,
            price: 100,
            quantity: 1,
          },
          {
            item_id: 2,
            item_name: 'Item 2',
            index: 1,
            price: 200,
            quantity: 2,
          },
        ],
      },
    });

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockOnOrder).toHaveBeenCalled();
  });
});
