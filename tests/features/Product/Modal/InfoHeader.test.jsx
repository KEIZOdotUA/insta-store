import {
  vi,
  describe,
  it,
  beforeEach,
  expect,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import InfoHeader from '@features/Product/Modal/InfoHeader/InfoHeader';
import useAppContext from '@context/useAppContext';
import useWishListStore from '@store/useWishListStore';
import { trackAddToWishListEvent, trackShareEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@context/useAppContext');
vi.mock('@store/useWishListStore');
vi.mock('@helpers/googleAnalyticsGA4', () => ({
  trackAddToWishListEvent: vi.fn(),
  trackShareEvent: vi.fn(),
}));

vi.mock('@components/LikeButton/LikeButton', () => ({
  __esModule: true,
  default: ({ liked, onLike }) => (
    <button type="button" onClick={onLike} aria-label={liked ? 'Unlike' : 'Like'}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  ),
}));

vi.mock('@components/ShareButton/ShareButton', () => ({
  __esModule: true,
  default: ({
    title,
    text,
    url,
    onShare,
  }) => (
    <button type="button" aria-label="Share" onClick={onShare}>
      {`share ${title} - ${text} (${url})`}
    </button>
  ),
}));

describe('InfoHeader', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    feature: 'Sale',
  };

  let mockFindWishListItem;
  let mockAddWishListItem;
  let mockRemoveWishListItem;

  beforeEach(() => {
    mockFindWishListItem = vi.fn();
    mockAddWishListItem = vi.fn();
    mockRemoveWishListItem = vi.fn();

    useAppContext.mockReturnValue({
      whitelabel: { shop: { name: 'Test Shop' } },
    });
    useWishListStore.mockReturnValue({
      findItem: mockFindWishListItem,
      addItem: mockAddWishListItem,
      removeItem: mockRemoveWishListItem,
    });
  });

  it('renders product info correctly', () => {
    const { getByText } = render(<InfoHeader product={mockProduct} />);
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('100 грн')).toBeInTheDocument();
    expect(getByText('Sale')).toBeInTheDocument();
  });

  it('calls addWishListItem when the product is not in the wishlist and LikeButton is clicked', () => {
    mockFindWishListItem.mockReturnValue(null);

    const { getByRole } = render(<InfoHeader product={mockProduct} />);
    const likeButton = getByRole('button', { name: /like/i });

    fireEvent.click(likeButton);

    expect(mockAddWishListItem).toHaveBeenCalledWith(mockProduct);
    expect(trackAddToWishListEvent).toHaveBeenCalledWith(mockProduct);
    expect(mockRemoveWishListItem).not.toHaveBeenCalled();
  });

  it('calls removeWishListItem when the product is in the wishlist and LikeButton is clicked', () => {
    mockFindWishListItem.mockReturnValue(mockProduct);

    const { getByRole } = render(<InfoHeader product={mockProduct} />);
    const likeButton = getByRole('button', { name: /like/i });

    fireEvent.click(likeButton);

    expect(mockRemoveWishListItem).toHaveBeenCalledWith(mockProduct.id);
    expect(mockAddWishListItem).not.toHaveBeenCalled();
  });

  it('calls trackShareEvent when ShareButton is clicked', () => {
    const { getByRole } = render(<InfoHeader product={mockProduct} />);
    const shareButton = getByRole('button', { name: /share/i });

    fireEvent.click(shareButton);

    expect(trackShareEvent).toHaveBeenCalledWith(mockProduct.id);
  });
});
