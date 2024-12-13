import {
  vi,
  describe,
  it,
  beforeEach,
  expect,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import InfoHeader from '@features/Product/Modal/InfoHeader/InfoHeader';
import useAppContext from '@contexts/App/useAppContext';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

vi.mock('@contexts/App/useAppContext');
vi.mock('@contexts/Purchase/usePurchaseContext');

vi.mock('@components//LikeButton/LikeButton', () => ({
  __esModule: true,
  default: ({ liked, onLike }) => (
    <button type="button" onClick={onLike} aria-label={liked ? 'Unlike' : 'Like'}>
      {liked ? 'Unlike' : 'Like'}
    </button>
  ),
}));

vi.mock('@components//ShareButton/ShareButton', () => ({
  __esModule: true,
  default: ({ title, text, url }) => (
    <button type="button" aria-label="Share">
      {`Share ${title} - ${text} (${url})`}
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
    usePurchaseContext.mockReturnValue({
      findWishListItem: mockFindWishListItem,
      addWishListItem: mockAddWishListItem,
      removeWishListItem: mockRemoveWishListItem,
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
});
