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

vi.mock('@pages/DeliveryAndPayment/DeliveryAndPaymentPage', () => ({
  __esModule: true,
  default: () => <div>Delivery And Payment Page</div>,
}));

vi.mock('@pages/Returns/ReturnsPage', () => ({
  __esModule: true,
  default: () => <div>Returns Page</div>,
}));

describe('Router', () => {
  it('root', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('/home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Home Page')).toBeInTheDocument();
  });

  it('/home/:productId', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home/123']}>
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
    expect(getByText('Products Page')).toBeInTheDocument();
  });

  it('/:products/:productId', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/products/123']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Products Page')).toBeInTheDocument();
  });

  it('/delivery-and-payment', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/delivery-and-payment']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Delivery And Payment Page')).toBeInTheDocument();
  });

  it('/returns', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/returns']}>
        <Router />
      </MemoryRouter>,
    );

    expect(getByText('Layout')).toBeInTheDocument();
    expect(getByText('Returns Page')).toBeInTheDocument();
  });
});
