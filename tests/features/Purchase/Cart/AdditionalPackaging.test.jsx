import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartAdditionalPackaging from '@features/Purchase/Cart/AdditionalPackaging/AdditionalPackaging';
import useAppContext from '@context/useAppContext';
import useCartStore from '@store/useCartStore';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';
import { trackViewItemEvent } from '@helpers/googleAnalyticsGA4';
import useProductNavigation from '@hooks/useProductNavigation';

vi.mock('@context/useAppContext');
vi.mock('@store/useCartStore');
vi.mock('@store/usePurchasePanelStateStore');
vi.mock('@helpers/googleAnalyticsGA4');
vi.mock('@hooks/useProductNavigation');

vi.mock('@components//Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick, className }) => (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )),
}));

describe('AdditionalPackaging', () => {
  const mockPackaging = {
    id: '1',
    name: 'Gift Box',
    price: 100,
  };

  const mockFindCartItem = vi.fn();
  const mockAddCartItem = vi.fn();
  const mockRemoveCartItem = vi.fn();
  const mockGetProductLink = vi.fn();
  const mockTrackViewItemEvent = vi.fn();
  const mockHidePurchase = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      packaging: mockPackaging,
    });

    useCartStore.mockReturnValue({
      findItem: mockFindCartItem,
      addItem: mockAddCartItem,
      removeItem: mockRemoveCartItem,
    });
    usePurchasePanelStateStore.mockReturnValue({
      hide: mockHidePurchase,
    });

    useProductNavigation.mockReturnValue({ getProductLink: mockGetProductLink });
    trackViewItemEvent.mockImplementation(mockTrackViewItemEvent);
    mockGetProductLink.mockReturnValue(`/products/${mockPackaging.id}`);
  });

  it('renders packaging name and price', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CartAdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('Gift Box (100 грн)')).toBeInTheDocument();
  });

  it('tracks view item event and hides purchase on link click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CartAdditionalPackaging />
      </MemoryRouter>,
    );

    const packagingLink = getByText('Gift Box (100 грн)');
    fireEvent.click(packagingLink);

    expect(mockTrackViewItemEvent).toHaveBeenCalledWith(mockPackaging);
    expect(mockHidePurchase).toHaveBeenCalled();
  });

  it('adds packaging to the cart with selectedSize', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CartAdditionalPackaging />
      </MemoryRouter>,
    );

    const addButton = getByText('так');
    fireEvent.click(addButton);

    expect(mockAddCartItem).toHaveBeenCalledWith({ ...mockPackaging, selectedSize: 0 });
  });

  it('removes packaging from the cart with selectedSize', () => {
    const { getByText } = render(
      <MemoryRouter>
        <CartAdditionalPackaging />
      </MemoryRouter>,
    );

    const removeButton = getByText('ні');
    fireEvent.click(removeButton);

    expect(mockRemoveCartItem).toHaveBeenCalledWith(mockPackaging.id, 0);
  });

  it('displays "так" button as selected when item is in the cart', () => {
    mockFindCartItem.mockReturnValue(true);

    const { getByText } = render(
      <MemoryRouter>
        <CartAdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('так')).toHaveClass('selected-action');
  });

  it('displays "ні" button as selected when item is not in the cart', () => {
    mockFindCartItem.mockReturnValue(false);

    const { getByText } = render(
      <MemoryRouter>
        <CartAdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('ні')).toHaveClass('selected-action');
  });
});
