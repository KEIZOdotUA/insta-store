import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShortList from '@features/Product/List/Short/ShortList';
import useProductNavigation from '@hooks/useProductNavigation';
import ProductCard from '@features/Product/List/Item/ProductListItem';

vi.mock('@hooks/useProductNavigation');
vi.mock('@features/Product/List/Item/ProductListItem');

describe('ShortList', () => {
  const mockItems = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
  ];

  const mockGetProductLink = (id) => `/products/${id}`;

  beforeEach(() => {
    useProductNavigation.mockReturnValue({ getProductLink: mockGetProductLink });

    ProductCard.mockImplementation(({ product, link }) => (
      <div data-testid="product-card" data-link={link}>
        {product.name}
      </div>
    ));
  });

  it('renders the title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ShortList title="Test Title" items={mockItems} linkToAllItems="/all-items" />
      </MemoryRouter>,
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('renders product cards', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ShortList title="Test Title" items={mockItems} linkToAllItems="/all-items" />
      </MemoryRouter>,
    );
    expect(getAllByTestId('product-card').length).toBe(5);
  });

  it('renders the "show more" link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ShortList title="Test Title" items={mockItems} linkToAllItems="/all-items" />
      </MemoryRouter>,
    );
    expect(getByText('показати більше >')).toBeInTheDocument();
  });

  it('links to the correct URL for "show more"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ShortList title="Test Title" items={mockItems} linkToAllItems="/all-items" />
      </MemoryRouter>,
    );
    expect(getByText('показати більше >').closest('a')).toHaveAttribute('href', '/all-items');
  });
});
