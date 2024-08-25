import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CartIcon from '@components/Cart/Icon/CartIcon';
import useCartContext from '@contexts/Cart/useCartContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@contexts/Cart/useCartContext');
vi.mock('@helpers/dispatchTrackingEvent');
vi.mock('@assets/cart.svg', () => ({
  __esModule: true,
  default: () => <div>cart</div>,
}));

describe('CartIcon', () => {
  const mockOnClick = vi.fn();

  it('default', () => {
    useCartContext.mockReturnValue({
      getItems: () => [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
      getTotal: () => 100,
    });

    const { getByText } = render(<CartIcon onClick={mockOnClick} />);

    expect(getByText('2')).toBeTruthy();
  });

  it('onClick', () => {
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

    useCartContext.mockReturnValue({
      getItems: () => mockItems,
      getTotal: () => mockTotal,
    });

    const { getByText } = render(<CartIcon onClick={mockOnClick} />);
    fireEvent.click(getByText('cart'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'view_cart',
      ecommerce: {
        currency: 'UAH',
        value: mockTotal,
        items: mockItems.map((item, index) => ({
          item_id: item.id,
          item_name: item.name,
          index,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
  });
});
