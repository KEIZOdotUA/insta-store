import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import Home from '@components/Home/Home';

vi.mock('@components/Bio/Bio', () => ({
  __esModule: true,
  default: () => <div>Bio</div>,
}));

vi.mock('@components/Product/List/ProductsList', () => ({
  __esModule: true,
  default: () => <div>ProductsList</div>,
}));

describe('Home', () => {
  it('default', async () => {
    const { getByText } = render(<Home />);

    expect(getByText('Bio')).toBeInTheDocument();
    expect(getByText('ProductsList')).toBeInTheDocument();
  });
});
