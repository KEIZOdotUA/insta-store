import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AdditionalPackaging from '@components/AdditionalPackaging/AdditionalPackaging';
import useAppContext from '@contexts/App/useAppContext';
import useCartContext from '@contexts/Cart/useCartContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@contexts/App/useAppContext');
vi.mock('@contexts/Cart/useCartContext');
vi.mock('@helpers/dispatchTrackingEvent');
vi.mock('@components/shared/Transition/Transition', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));
vi.mock('@components/Product/Modal/ProductModal', () => ({
  __esModule: true,
  default: ({ onClose }) => (
    <div>
      <div>Modal content</div>
      <button type="button" onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('AdditionalPackaging', () => {
  const mockWhitelabel = {
    whitelabel: {
      packagingSrc: '/mock-packaging-src',
    },
  };

  const mockFindCartItem = vi.fn();
  const mockAddPackagingToCart = vi.fn();
  const mockRemovePackagingFromCart = vi.fn();

  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve(
      { json: () => Promise.resolve({ id: 1, name: 'Mock Packaging', price: 100 }) },
    ));

    useAppContext.mockReturnValue(mockWhitelabel);
    useCartContext.mockReturnValue({
      findCartItem: mockFindCartItem,
      addItem: mockAddPackagingToCart,
      removeItem: mockRemovePackagingFromCart,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('default', async () => {
    const { getByText } = render(<AdditionalPackaging />);

    await waitFor(() => expect(getByText('Mock Packaging')).toBeTruthy());
  });

  it('modal', async () => {
    const { getByText, getByRole } = render(<AdditionalPackaging />);

    await waitFor(() => expect(getByText('Mock Packaging')).toBeTruthy());

    const packagingOption = getByText('Mock Packaging');
    fireEvent.click(packagingOption);

    await waitFor(() => {
      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_item',
        ecommerce: {
          currency: 'UAH',
          value: 100,
          items: [
            {
              item_id: 1,
              item_name: 'Mock Packaging',
              index: 0,
              price: 100,
              quantity: 1,
            },
          ],
        },
      });
      expect(getByText('Mock Packaging')).toBeTruthy();
    });

    const closeButton = getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => expect(getByText('Mock Packaging')).toBeTruthy());
  });

  it('adds packaging to cart', async () => {
    const { getByText } = render(<AdditionalPackaging />);

    await waitFor(() => expect(getByText('так')).toBeTruthy());

    fireEvent.click(getByText('так'));

    await waitFor(() => {
      expect(mockAddPackagingToCart).toHaveBeenCalledWith({
        id: 1,
        name: 'Mock Packaging',
        price: 100,
      });
    });
  });

  it('removes packaging from cart', async () => {
    mockFindCartItem.mockReturnValueOnce({ id: 1 });

    const { getByText } = render(<AdditionalPackaging />);

    await waitFor(() => expect(getByText('ні')).toBeTruthy());

    fireEvent.click(getByText('ні'));

    await waitFor(() => {
      expect(mockRemovePackagingFromCart).toHaveBeenCalledWith(1);
    });
  });

  it('handles fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('API is down')));

    const { queryByText } = render(<AdditionalPackaging />);

    await waitFor(() => expect(queryByText('+ Mock Packaging (100 грн)')).toBeNull());
  });
});
