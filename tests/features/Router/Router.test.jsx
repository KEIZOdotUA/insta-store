import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import Router from '@features/Router/Router';

vi.mock('@pages/Home/HomePage', () => ({
  __esModule: true,
  default: () => <div>Home Page</div>,
}));

vi.mock('@pages/About/AboutPage', () => ({
  __esModule: true,
  default: () => <div>About Page</div>,
}));

vi.mock('@pages/Products/ProductsPage', () => ({
  __esModule: true,
  default: () => <div>Products Page</div>,
}));

vi.mock('@features/Layout/Layout', () => ({
  __esModule: true,
  default: () => (
    <div>
      Layout
      <Outlet />
    </div>
  ),
}));

describe('Router', () => {
  it('default', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('/about', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('About Page')).toBeInTheDocument();
  });

  it('/:categorySlug', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/some-category']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Products Page')).toBeInTheDocument();
  });

  it('/:categorySlug/:productId', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/some-category/123']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Products Page')).toBeInTheDocument();
  });

  it('/products', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/products']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('/:products/:productId', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/products/123']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Home Page')).toBeInTheDocument();
  });
});
