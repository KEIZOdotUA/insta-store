import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useParams, useNavigate } from 'react-router-dom';
import ProductsList from '@components/Product/List/ProductsList';
import useAppContext from '@contexts/App/useAppContext';
import ProductCard from '@components/Product/Card/ProductCard';

vi.mock('@contexts/App/useAppContext');
vi.mock('@components/Product/Card/ProductCard');
vi.mock('@helpers/dispatchTrackingEvent');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {
    this.callback([{ isIntersecting: true }]);
  }

  unobserve() { } // eslint-disable-line

  disconnect() { } // eslint-disable-line
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
    {
      id: 1,
      name: 'Category 1',
      slug: 'category-1',
    },
    {
      id: 2,
      name: 'Category 2',
      slug: 'category-2',
    },
  ];

  const mockNavigate = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      categories: mockCategories,
      products: mockProducts,
    });

    useParams.mockReturnValue({ categorySlug: 'category-1' });
    useNavigate.mockReturnValue(mockNavigate);

    ProductCard.mockImplementation(({ product, onClick }) => (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(product.id)}
        onKeyDown={() => onClick(product.id)}
      >
        {product.name}
      </div>
    ));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>,
    );

    const product = getByText('Product 1');
    expect(product).toBeInTheDocument();

    fireEvent.click(product);
    expect(mockNavigate).toHaveBeenCalledWith('/category-1/1');
  });

  it('filters ', () => {
    useParams.mockReturnValue({ categorySlug: 'category-2' });

    const { getByText } = render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>,
    );

    expect(getByText('Product 2')).toBeInTheDocument();
    expect(() => getByText('Product 1')).toThrow();
  });

  it('loads more', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>,
    );

    expect(getByText('Product 1')).toBeInTheDocument();
  });
});
