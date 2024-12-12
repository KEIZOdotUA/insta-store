import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResultsItem from '@features/Search/Results/Item/SearchResultsItem';

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

describe('SearchResultsItem', () => {
  const mockItem = {
    id: 123,
    name: 'Test Product',
    price: 299,
  };

  it('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <SearchResultsItem item={mockItem} />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/123');
    expect(screen.getByTestId('product-image')).toHaveAttribute('alt', 'Test Product');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Арт.: 123')).toBeInTheDocument();
    expect(screen.getByText('299 грн')).toBeInTheDocument();
  });
});
