import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import ProductsPage from '@pages/Products/ProductsPage';

vi.mock('@features/Product/List/ProductsList', () => ({
  __esModule: true,
  default: () => <div>ProductsList</div>,
}));

describe('Products Page', () => {
  it('default', async () => {
    const { getByText } = render(<ProductsPage />);

    expect(getByText('ProductsList')).toBeInTheDocument();
  });
});
