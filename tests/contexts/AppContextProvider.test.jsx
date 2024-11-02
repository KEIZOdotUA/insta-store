import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import {
  render,
  waitFor,
  act,
} from '@testing-library/react';
import AppContextProvider from '@contexts/App/AppContextProvider';
import AppContext from '@contexts/App/AppContext';

const mockWhitelabelData = {
  categoriesSrc: '/categories.json',
  productsSrc: '/products.json',
  packagingSrc: '/packaging.json',
};

const mockCategoriesData = [{ id: 1, name: 'Category 1' }];
const mockProductsData = [
  { id: 1, name: 'Product 1', sizes: '1,2,3' },
  { id: 2, name: 'Product 2', sizes: '4,5' },
];
const mockPackagingData = { id: 3, name: 'Packaging', sizes: '6,7' };

vi.mock('./AppContext', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('AppContextProvider', () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      switch (url) {
        case '/whitelabel.json':
          return Promise.resolve({
            json: () => Promise.resolve(mockWhitelabelData),
          });
        case '/categories.json':
          return Promise.resolve({
            json: () => Promise.resolve(mockCategoriesData),
          });
        case '/products.json':
          return Promise.resolve({
            json: () => Promise.resolve(mockProductsData),
          });
        case '/packaging.json':
          return Promise.resolve({
            json: () => Promise.resolve(mockPackagingData),
          });
        default:
          return Promise.reject(new Error('Unknown URL'));
      }
    });
  });

  it('provides the correct context values', async () => {
    let receivedContext;

    await act(async () => {
      render(
        <AppContextProvider>
          <AppContext.Consumer>
            {(context) => {
              receivedContext = context;
              return null;
            }}
          </AppContext.Consumer>
        </AppContextProvider>,
      );
    });

    await waitFor(() => {
      expect(receivedContext.whitelabel).toEqual(mockWhitelabelData);
      expect(receivedContext.categories).toEqual(mockCategoriesData);
      expect(receivedContext.products).toEqual([
        ...mockProductsData.map((product) => ({
          ...product,
          sizes: product.sizes.split(',').map((size) => parseInt(size, 10)),
        })),
        {
          ...mockPackagingData,
        },
      ]);
      expect(receivedContext.packaging).toEqual(mockPackagingData);
    });
  });
});
