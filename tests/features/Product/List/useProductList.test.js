import { renderHook, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useProductList from '@features/Product/List/useProductList';
import useAppContext from '@contexts/App/useAppContext';
import filterProductsByQuery from '@helpers/filterProductsByQuery';
import {
  vi,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from 'vitest';

vi.mock('@contexts/App/useAppContext');
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

describe('useProductList', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      available: true,
      category: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      available: true,
      category: 2,
    },
    {
      id: 3,
      name: 'Product 3',
      available: false,
      category: 1,
    },
  ];

  const mockCategories = [
    { id: 1, name: 'Category 1', slug: 'category-1' },
    { id: 2, name: 'Category 2', slug: 'category-2' },
  ];

  const mockNavigate = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({ products: mockProducts, categories: mockCategories });
    useParams.mockReturnValue({ categorySlug: 'category-1' });
    useNavigate.mockReturnValue(mockNavigate);
    useSearchParams.mockReturnValue([{ get: vi.fn() }]);
    filterProductsByQuery.mockImplementation((products, query) => (
      products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    ));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns available products by default', async () => {
    useParams.mockReturnValue({ categorySlug: '' });

    const { result } = renderHook(() => useProductList(), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => expect(result.current.items).toEqual(
      mockProducts.filter((product) => product.available),
    ));
  });

  it('filters products by category', async () => {
    useParams.mockReturnValue({ categorySlug: 'category-1' });

    const { result } = renderHook(() => useProductList(), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => result.current.items.length > 0);

    expect(result.current.name).toBe('CATEGORY 1');
    expect(result.current.items).toEqual(
      mockProducts.filter((product) => product.available && product.category === 1),
    );
  });

  it('filters products by search query', async () => {
    useParams.mockReturnValue({ categorySlug: 'search' });
    useSearchParams.mockReturnValue([{ get: () => 'product 2' }]);

    const { result } = renderHook(() => useProductList(), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => result.current.items.length > 0);

    expect(result.current.name).toBe('РЕЗУЛЬТАТИ ПОШУКУ "product 2"');
    expect(result.current.items).toEqual([mockProducts[1]]);
  });

  it('navigates to the homepage if category does not exist', async () => {
    useParams.mockReturnValue({ categorySlug: 'non-existent-category' });

    renderHook(() => useProductList(), { wrapper: MemoryRouter });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
