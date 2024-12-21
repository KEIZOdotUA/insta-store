import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WishListItem from '@features/WishList/Item/WishListItem';

vi.mock('@features/Product/Image/ProductImage', () => ({
  __esModule: true,
  default: ({ name }) => <img alt={name} data-testid="product-image" />,
}));

vi.mock('@hooks/useProductNavigation', () => ({
  __esModule: true,
  default: () => ({
    getProductLink: (id) => `/product/${id}`,
  }),
}));

const mockRemoveWishListItem = vi.fn();

vi.mock('@store/useWishListStore', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    removeItem: mockRemoveWishListItem,
  })),
}));

describe('WishListItem', () => {
  const mockItem = {
    id: 123,
    name: 'Test Product',
    price: 299,
  };

  it('renders product details and image correctly', () => {
    render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/product/123');
    expect(links[1]).toHaveAttribute('href', '/product/123');
    expect(screen.getByTestId('product-image')).toHaveAttribute('alt', 'Test Product');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('299 грн')).toBeInTheDocument();
  });

  it('calls removeWishListItem when delete button is clicked', () => {
    render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    const deleteButton = screen.getByText('видалити');
    fireEvent.click(deleteButton);

    expect(mockRemoveWishListItem).toHaveBeenCalledWith(mockItem.id);
  });
});
