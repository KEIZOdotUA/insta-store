import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdditionalPackaging from '@components/AdditionalPackaging/AdditionalPackaging';
import useAppContext from '@contexts/App/useAppContext';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import { trackViewItemEvent } from '@helpers/googleAnalyticsGA4';
import useProductNavigation from '@helpers/useProductNavigation';

vi.mock('@contexts/App/useAppContext');
vi.mock('@contexts/Shopping/useShoppingContext');
vi.mock('@helpers/googleAnalyticsGA4');
vi.mock('@helpers/useProductNavigation');

vi.mock('@components/shared/Button/Button', () => ({
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

  beforeEach(() => {
    useAppContext.mockReturnValue({
      packaging: mockPackaging,
    });

    useShoppingContext.mockReturnValue({
      findCartItem: mockFindCartItem,
      addCartItem: mockAddCartItem,
      removeCartItem: mockRemoveCartItem,
    });

    useProductNavigation.mockReturnValue(mockGetProductLink);
    trackViewItemEvent.mockImplementation(mockTrackViewItemEvent);
    mockGetProductLink.mockReturnValue(`/products/${mockPackaging.id}`);
  });

  it('default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('Gift Box (100 грн)')).toBeInTheDocument();
  });

  it('tracks view item event on link click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const packagingLink = getByText('Gift Box (100 грн)');
    fireEvent.click(packagingLink);

    expect(mockTrackViewItemEvent).toHaveBeenCalledWith(mockPackaging);
  });

  it('adds packaging', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const addButton = getByText('так');
    fireEvent.click(addButton);

    expect(mockAddCartItem).toHaveBeenCalledWith(mockPackaging);
  });

  it('removes packaging', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    const removeButton = getByText('ні');
    fireEvent.click(removeButton);

    expect(mockRemoveCartItem).toHaveBeenCalledWith(mockPackaging.id);
  });

  it('packaging is in the cart', () => {
    mockFindCartItem.mockReturnValue(true);

    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('так')).toHaveClass('selected-action');
  });

  it('packaging is not in the cart', () => {
    mockFindCartItem.mockReturnValue(false);

    const { getByText } = render(
      <MemoryRouter>
        <AdditionalPackaging />
      </MemoryRouter>,
    );

    expect(getByText('ні')).toHaveClass('selected-action');
  });
});
