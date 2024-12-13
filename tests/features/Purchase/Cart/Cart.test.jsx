import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Cart from '@features/Purchase/Cart/Cart';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import CartItem from '@features/Purchase/Cart/Item/CartItem';
import { trackBeginCheckoutEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@features/Purchase/Cart/AdditionalPackaging/AdditionalPackaging', () => ({
  __esModule: true,
  default: vi.fn(() => <div>AdditionalPackaging</div>),
}));
vi.mock('@components//Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )),
}));
vi.mock('@features/Purchase/Cart/Item/CartItem', () => ({
  __esModule: true,
  default: vi.fn(({ item }) => <div>{item.name}</div>),
}));
vi.mock('@helpers/googleAnalyticsGA4', () => ({
  trackBeginCheckoutEvent: vi.fn(),
}));

describe('Cart', () => {
  const mockOnOrder = vi.fn();
  const mockGetCartItems = vi.fn();
  const mockGetCartTotal = vi.fn();

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
      getCartItems: mockGetCartItems,
      getCartTotal: mockGetCartTotal,
    });
  });

  it('default', () => {
    const { getByText } = render(<Cart onOrder={mockOnOrder} />);

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

    expect(trackBeginCheckoutEvent).toHaveBeenCalledWith(500, [
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

    expect(mockOnOrder).toHaveBeenCalled();
  });

  it('no order button', () => {
    mockGetCartTotal.mockReturnValue(0);
    const { queryByText } = render(<Cart onOrder={mockOnOrder} />);

    expect(queryByText('оформити замовлення')).toBeNull();
  });
});
