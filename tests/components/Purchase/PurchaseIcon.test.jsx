import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PurchaseIcon from '@components/Purchase/Icon/PurchaseIcon';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import { trackViewCartEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@helpers/googleAnalyticsGA4');
vi.mock('@assets/cart.svg', () => ({
  __esModule: true,
  default: () => <div>cart</div>,
}));

describe('PurchaseIcon', () => {
  const mockOnClick = vi.fn();

  it('renders with correct cart count', () => {
    usePurchaseContext.mockReturnValue({
      getCartItems: () => [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
      getCartTotal: () => 100,
    });

    const { getByText } = render(<PurchaseIcon onClick={mockOnClick} />);

    expect(getByText('2')).toBeTruthy();
  });

  it('calls onClick and tracking event on click', () => {
    const mockItems = [
      {
        id: '1',
        name: 'Item 1',
        price: 50,
        quantity: 1,
      },
      {
        id: '2',
        name: 'Item 2',
        price: 50,
        quantity: 1,
      },
    ];
    const mockTotal = 100;

    usePurchaseContext.mockReturnValue({
      getCartItems: () => mockItems,
      getCartTotal: () => mockTotal,
    });

    const { getByText } = render(<PurchaseIcon onClick={mockOnClick} />);
    fireEvent.click(getByText('cart'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(trackViewCartEvent).toHaveBeenCalledWith(mockTotal, mockItems);
  });
});
