import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdditionalPackaging from '@features/Purchase/Cart/AdditionalPackaging/AdditionalPackaging';
import useAppContext from '@context/useAppContext';
import useCartStore from '@store/useCartStore';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';
import { trackRemoveFromCartEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@context/useAppContext');
vi.mock('@store/useCartStore');
vi.mock('@store/usePurchasePanelStateStore');
vi.mock('@helpers/googleAnalyticsGA4');

vi.mock('@components/Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick, className }) => (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )),
}));

describe('AdditionalPackaging', () => {
  const mockPackaging = [
    {
      id: '1',
      name: 'Gift Box',
      category: 'packaging',
      available: true,
    },
  ];

  const mockCartItems = [
    {
      id: '1',
      category: 'packaging',
      name: 'Gift Box',
      price: 100,
    },
  ];

  const mockRemoveCartItem = vi.fn();
  const mockHidePurchase = vi.fn();
  const mockTrackRemoveFromCartEvent = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      packaging: mockPackaging,
    });

    useCartStore.mockReturnValue({
      items: mockCartItems,
      removeItem: mockRemoveCartItem,
    });

    usePurchasePanelStateStore.mockReturnValue({
      hide: mockHidePurchase,
    });

    trackRemoveFromCartEvent.mockImplementation(mockTrackRemoveFromCartEvent);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the prompt for additional packaging if available', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('Потрібне додаткове подарункове упакування?')).toBeInTheDocument();
  });

  it('hides the purchase panel when "так" link is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const yesLink = getByText('так');
    fireEvent.click(yesLink);

    expect(mockHidePurchase).toHaveBeenCalled();
  });

  it('removes packaging from the cart when "ні" button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const noButton = getByText('ні');
    fireEvent.click(noButton);

    expect(mockRemoveCartItem).toHaveBeenCalledWith('1', 0);
    expect(mockTrackRemoveFromCartEvent).toHaveBeenCalledWith(mockCartItems[0]);
  });

  it('does not call remove functions if packaging is not in the cart', () => {
    useCartStore.mockReturnValue({
      items: [],
      removeItem: mockRemoveCartItem,
    });

    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const noButton = getByText('ні');
    fireEvent.click(noButton);

    expect(mockRemoveCartItem).not.toHaveBeenCalled();
    expect(mockTrackRemoveFromCartEvent).not.toHaveBeenCalled();
  });

  it('marks the "так" link as selected if packaging is in the cart', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const yesLink = getByText('так');
    expect(yesLink).toHaveClass('selected-action');
  });

  it('marks the "ні" button as selected if packaging is not in the cart', () => {
    useCartStore.mockReturnValue({
      items: [],
      removeItem: mockRemoveCartItem,
    });

    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const noButton = getByText('ні');
    expect(noButton).toHaveClass('selected-action');
  });
});
