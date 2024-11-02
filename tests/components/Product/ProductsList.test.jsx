import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render } from '@testing-library/react';
import {
  MemoryRouter,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import ProductsList from '@components/Product/List/ProductsList';
import useAppContext from '@contexts/App/useAppContext';
import ProductCard from '@components/Product/Card/ProductCard';
import filterProductsByQuery from '@helpers/filterProductsByQuery';

vi.mock('@contexts/App/useAppContext');
vi.mock('@components/Product/Card/ProductCard');
vi.mock('@helpers/dispatchTrackingEvent');
vi.mock('@helpers/filterProductsByQuery');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    this.callback([{ isIntersecting: true }]);
  }

  unobserve() {} // eslint-disable-line
  disconnect() {} // eslint-disable-line
}

global.IntersectionObserver = IntersectionObserver;

describe('ProductsList', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      available: true,
      price: 100,
      category: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      available: true,
      price: 150,
      category: 2,
    },
  ];

  const mockCategories = [
    { id: 1, name: 'Category 1', slug: 'category-1' },
    { id: 2, name: 'Category 2', slug: 'category-2' },
  ];

  const mockNavigate = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({ categories: mockCategories, products: mockProducts });
    useParams.mockReturnValue({ categorySlug: 'category-1' });
    useNavigate.mockReturnValue(mockNavigate);
    useSearchParams.mockReturnValue([{ get: vi.fn() }]);

    ProductCard.mockImplementation(({ product, link }) => (
      <div role="link" data-testid="product-card" data-link={link}>
        {product.name}
      </div>
    ));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders product list for a category', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>,
    );

    expect(getByText('CATEGORY 1')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('filters products by search query', () => {
    useParams.mockReturnValue({ categorySlug: 'search' });
    useSearchParams.mockReturnValue([{ get: () => 'test' }]);
    filterProductsByQuery.mockReturnValue([mockProducts[1]]);

    const { getByText, queryByText } = render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>,
    );

    expect(getByText('РЕЗУЛЬТАТИ ПОШУКУ "test"')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('loads more products when the observer triggers', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>,
    );

    expect(getByTestId('product-card').dataset.link).toBe('/category-1/1');
  });
});
