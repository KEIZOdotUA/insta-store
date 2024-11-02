import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import SearchResultsItem from '@components/Search/Results/Item/SearchResultsItem';

vi.mock('@components/Product/Image/ProductImage', () => ({
  __esModule: true,
  default: ({
    id,
    name,
    size,
    className,
  }) => (
    <img src={`image-${id}`} alt={name} className={className} data-size={size} />
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('SearchResultsItem', () => {
  const mockItem = {
    id: 1,
    name: 'Test Product',
    price: 100,
  };

  beforeEach(() => {
    useParams.mockReturnValue({ categorySlug: 'test-category' });
  });

  it('renders item details correctly', () => {
    render(
      <MemoryRouter>
        <SearchResultsItem item={mockItem} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Арт.: 1')).toBeInTheDocument();
    expect(screen.getByText('100 грн')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('renders the correct link based on categorySlug from useParams', () => {
    render(
      <MemoryRouter>
        <SearchResultsItem item={mockItem} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: /test product/i });
    expect(linkElement).toHaveAttribute('href', '/test-category/1');
  });

  it('renders the default link if no categorySlug is provided', () => {
    useParams.mockReturnValue({});
    render(
      <MemoryRouter>
        <SearchResultsItem item={mockItem} />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: /test product/i });
    expect(linkElement).toHaveAttribute('href', '/products/1');
  });

  it('renders the ProductImage component with correct props', () => {
    render(
      <MemoryRouter>
        <SearchResultsItem item={mockItem} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', 'image-1');
    expect(image).toHaveAttribute('data-size', 's');
    expect(image).toHaveClass('searchresults-item__img');
  });
});
