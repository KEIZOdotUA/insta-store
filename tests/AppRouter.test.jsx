import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import AppRouter from '../src/AppRouter';

vi.mock('@components/Home/Home', () => ({
  __esModule: true,
  default: () => <div>Home Page</div>,
}));

vi.mock('@components/About/About', () => ({
  __esModule: true,
  default: () => <div>About Page</div>,
}));

vi.mock('@components/Product/List/ProductsList', () => ({
  __esModule: true,
  default: () => <div>Products List Page</div>,
}));

vi.mock('@components/Layout/Layout', () => ({
  __esModule: true,
  default: () => (
    <div>
      Layout
      <Outlet />
    </div>
  ),
}));

describe('AppRouter', () => {
  it('default', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('/about', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('About Page')).toBeInTheDocument();
  });

  it('/category-slug', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/category-slug']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Products List Page')).toBeInTheDocument();
  });
});
