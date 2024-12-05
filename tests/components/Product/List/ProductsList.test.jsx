import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render } from '@testing-library/react';
import ProductsList from '@features/Product/List/ProductsList';
import ProductCard from '@features/Product/List/Item/ProductListItem';
import useProductList from '@helpers/useProductList';
import useProductNavigation from '@helpers/useProductNavigation';
import { trackViewItemListEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@components/shared/ScrollPaginator/ScrollPaginator', () => ({
  default: vi.fn(({ items }) => <div data-testid="scroll-paginator">{items}</div>),
}));
vi.mock('@features/Product/List/Item/ProductListItem');
vi.mock('@helpers/useProductList');
vi.mock('@helpers/useProductNavigation');
vi.mock('@helpers/googleAnalyticsGA4');

describe('ProductsList', () => {
  const mockProductList = {
    name: 'Category 1',
    items: [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 150 },
    ],
  };

  const mockGetProductLink = (id) => `/products/${id}`;
  const mockTrackViewItemListEvent = vi.fn();

  beforeEach(() => {
    useProductList.mockReturnValue(mockProductList);
    useProductNavigation.mockReturnValue({ getProductLink: mockGetProductLink });
    trackViewItemListEvent.mockImplementation(mockTrackViewItemListEvent);

    ProductCard.mockImplementation(({ product, link }) => (
      <div data-testid="product-card" data-link={link}>
        {product.name}
      </div>
    ));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the product list name and count', () => {
    const { getByText } = render(<ProductsList />);
    expect(getByText('Category 1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
  });

  it('renders product cards inside the ScrollPaginator', () => {
    const { getByTestId } = render(<ProductsList />);

    const paginator = getByTestId('scroll-paginator');
    expect(paginator).toBeInTheDocument();

    expect(ProductCard).toHaveBeenCalledTimes(2);
    expect(ProductCard).toHaveBeenCalledWith(
      expect.objectContaining({
        product: { id: 1, name: 'Product 1', price: 100 },
        link: '/products/1',
      }),
      expect.anything(),
    );
    expect(ProductCard).toHaveBeenCalledWith(
      expect.objectContaining({
        product: { id: 2, name: 'Product 2', price: 150 },
        link: '/products/2',
      }),
      expect.anything(),
    );
  });

  it('calls trackViewItemListEvent with the correct data on mount', () => {
    render(<ProductsList />);
    expect(trackViewItemListEvent).toHaveBeenCalledWith('Category 1', mockProductList.items);
  });

  it('does not call trackViewItemListEvent if name is missing', () => {
    useProductList.mockReturnValue({ name: '', items: mockProductList.items });
    render(<ProductsList />);
    expect(trackViewItemListEvent).not.toHaveBeenCalled();
  });
});
