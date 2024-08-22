import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ProductsList from '@components/Product/List/ProductsList';
import { useParams } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@contexts/App/useAppContext');
vi.mock('react-router-dom');
vi.mock('@components/shared/Transition/Transition', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <div>{children}</div>),
}));
vi.mock('@components/Product/Card/ProductCard', () => ({
  __esModule: true,
  default: vi.fn(({ product, onClick }) => (
    <div role="button" onClick={onClick} tabIndex={0} onKeyDown={onClick}>
      {product.name}
    </div>
  )),
}));
vi.mock('@components/Product/Modal/ProductModal', () => ({
  __esModule: true,
  default: vi.fn(({ product, onClose }) => (
    <div>
      <button type="button" onClick={onClose}>Modal</button>
      {product.name}
    </div>
  )),
}));
vi.mock('@helpers/dispatchTrackingEvent');
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
  const mockAppContext = {
    whitelabel: {
      categoriesSrc: '/mock-categories',
      productsSrc: '/mock-products',
      blobStorageUrl: 'http://mock-blob-storage',
    },
    categories: [
      { id: 1, name: 'Category 1', slug: 'Category1' },
      { id: 2, name: 'Category 2', slug: 'Category2' },
    ],
  };

  beforeEach(() => {
    useAppContext.mockReturnValue(mockAppContext);

    global.fetch = vi.fn((url) => {
      if (url === mockAppContext.whitelabel.productsSrc) {
        return Promise.resolve({
          json: () => Promise.resolve([
            {
              id: 1,
              name: 'Product 1',
              price: 100,
              available: true,
              category: 1,
            },
            {
              id: 2,
              name: 'Product 2',
              price: 200,
              available: true,
              category: 2,
            },
            {
              id: 3,
              name: 'Product 3',
              price: 300,
              available: false,
              category: 1,
            },
          ]),
        });
      }

      return Promise.reject(new Error('not found'));
    });

    useParams.mockReturnValue({ categorySlug: '' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('default', async () => {
    const { findByText } = render(<ProductsList />);

    expect(await findByText('Product 1')).toBeTruthy();
    expect(await findByText('Product 2')).toBeTruthy();
  });

  it('filters products by category', async () => {
    useParams.mockReturnValue({ categorySlug: 'Category2' });

    const { findByText, queryByText } = render(<ProductsList />);

    expect(await findByText('Product 2')).toBeTruthy();
    expect(queryByText('Product 1')).toBeNull();
  });

  it('on product click', async () => {
    const { findByText } = render(<ProductsList />);

    const product1 = await findByText('Product 1');
    fireEvent.click(product1);

    expect(await findByText('Modal')).toBeTruthy();
  });

  it('tracks view_item_list event', async () => {
    render(<ProductsList />);

    await waitFor(() => {
      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_item_list',
        ecommerce: {
          items: [
            {
              item_id: 1,
              item_name: 'Product 1',
              index: 0,
              price: 100,
            },
            {
              item_id: 2,
              item_name: 'Product 2',
              index: 1,
              price: 200,
            },
          ],
        },
      });
    });
  });

  it('tracks view_item event', async () => {
    const { findByText } = render(<ProductsList />);

    const product1 = await findByText('Product 1');
    fireEvent.click(product1);

    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'view_item',
      ecommerce: {
        currency: 'UAH',
        value: 100,
        items: [
          {
            item_id: 1,
            item_name: 'Product 1',
            index: 0,
            price: 100,
            quantity: 1,
          },
        ],
      },
    });
  });
});
