import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Cart from '@components/Cart/Cart';
import useCartContext from '@contexts/Cart/useCartContext';
import CartItem from '@components/Cart/Item/CartItem';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@contexts/Cart/useCartContext');
vi.mock('@components/AdditionalPackaging/AdditionalPackaging', () => ({
  __esModule: true,
  default: vi.fn(() => <div>AdditionalPackaging</div>),
}));
vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )),
}));
vi.mock('@components/Cart/Item/CartItem', () => ({
  __esModule: true,
  default: vi.fn(({ item }) => <div>{item.name}</div>),
}));
vi.mock('@helpers/dispatchTrackingEvent');

describe('Cart', () => {
  const mockOnOrder = vi.fn();
  const mockGetItems = vi.fn();
  const mockGetTotal = vi.fn();

  beforeEach(() => {
    mockGetItems.mockReturnValue([
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
    mockGetTotal.mockReturnValue(500);

    useCartContext.mockReturnValue({
      getItems: mockGetItems,
      getTotal: mockGetTotal,
    });
  });

  it('default', () => {
    const { getByText } = render(<Cart onOrder={mockOnOrder} />);

    expect(getByText('Кошик')).toBeTruthy();
    expect(CartItem).toHaveBeenCalledTimes(2);
    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
  });

  it('additional packaging', () => {
    const { getByText } = render(<Cart onOrder={mockOnOrder} />);

    expect(getByText('AdditionalPackaging')).toBeTruthy();
  });

  it('total price', () => {
    const { getByText } = render(<Cart onOrder={mockOnOrder} />);

    expect(getByText('Разом без доставки:')).toBeTruthy();
    expect(getByText('500 грн')).toBeTruthy();
  });

  it('calls beginCheckout', () => {
    const { getByText } = render(<Cart onOrder={mockOnOrder} />);

    const orderButton = getByText('оформити замовлення');
    fireEvent.click(orderButton);

    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'UAH',
        value: 500,
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

    expect(mockOnOrder).toHaveBeenCalled();
  });

  it('no order button', () => {
    mockGetTotal.mockReturnValue(0);
    const { queryByText } = render(<Cart onOrder={mockOnOrder} />);

    expect(queryByText('оформити замовлення')).toBeNull();
  });
});
