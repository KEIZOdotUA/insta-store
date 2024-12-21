import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PurchaseIcon from '@features/Purchase/Icon/PurchaseIcon';
import useCartStore from '@store/useCartStore';
import { trackViewCartEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@store/useCartStore');
vi.mock('@helpers/googleAnalyticsGA4');
vi.mock('@assets/cart.svg', () => ({
  __esModule: true,
  default: () => <div>cart</div>,
}));

describe('PurchaseIcon', () => {
  const mockOnClick = vi.fn();

  it('renders with correct cart count', () => {
    useCartStore.mockReturnValue({
      items: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
      getTotalCost: () => 100,
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

    useCartStore.mockReturnValue({
      items: mockItems,
      getTotalCost: () => mockTotal,
    });

    const { getByText } = render(<PurchaseIcon onClick={mockOnClick} />);
    fireEvent.click(getByText('cart'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(trackViewCartEvent).toHaveBeenCalledWith(mockTotal, mockItems);
  });
});
