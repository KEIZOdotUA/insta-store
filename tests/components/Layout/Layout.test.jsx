import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Layout from '@components/Layout/Layout';

vi.mock('@components/Header/Header', () => ({
  __esModule: true,
  default: vi.fn(({
    menuToggler,
    searchToggler,
    wishListToggler,
  }) => (
    <div>
      <div
        role="button"
        onClick={menuToggler}
        onKeyDown={menuToggler}
        tabIndex={0}
      >
        Mock Header
      </div>
      <div
        role="button"
        onClick={searchToggler}
        onKeyDown={searchToggler}
        tabIndex={0}
      >
        Mock Search Toggler
      </div>
      <div
        role="button"
        onClick={wishListToggler}
        onKeyDown={wishListToggler}
        tabIndex={0}
      >
        Mock WishList Toggler
      </div>
    </div>
  )),
}));

vi.mock('@components/Menu/Menu', () => ({
  __esModule: true,
  default: vi.fn(({ visible, menuToggler }) => (
    <div role="button" onClick={menuToggler} onKeyDown={menuToggler} tabIndex={0}>
      {visible ? 'Mock Menu Visible' : 'Mock Menu Hidden'}
    </div>
  )),
}));

vi.mock('@components/Search/Search', () => ({
  __esModule: true,
  default: vi.fn(({ visible, searchToggler }) => (
    <div role="button" onClick={searchToggler} onKeyDown={searchToggler} tabIndex={0}>
      {visible ? 'Mock Search Visible' : 'Mock Search Hidden'}
    </div>
  )),
}));

vi.mock('@components/Purchase/Purchase', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mock Purchase</div>),
}));

vi.mock('@components/WishList/WishList', () => ({
  __esModule: true,
  default: vi.fn(({ visible, onClose }) => (
    <div role="button" onClick={onClose} onKeyDown={onClose} tabIndex={0}>
      {visible ? 'Mock WishList Visible' : 'Mock WishList Hidden'}
    </div>
  )),
}));

vi.mock('@components/Product/Modal/ProductModal', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mock Product Modal</div>),
}));

vi.mock('react-router-dom', () => ({
  __esModule: true,
  Outlet: vi.fn(() => <div>Mock Outlet</div>),
}));

describe('Layout', () => {
  it('renders the default layout with all components hidden', () => {
    const { getByText } = render(<Layout />);

    expect(getByText('Mock Header')).toBeInTheDocument();
    expect(getByText('Mock Menu Hidden')).toBeInTheDocument();
    expect(getByText('Mock Search Hidden')).toBeInTheDocument();
    expect(getByText('Mock WishList Hidden')).toBeInTheDocument();
    expect(getByText('Mock Product Modal')).toBeInTheDocument();
    expect(getByText('Mock Purchase')).toBeInTheDocument();
    expect(getByText('Mock Outlet')).toBeInTheDocument();
  });

  it('toggles menu visibility when menuToggler is clicked', () => {
    const { getByText } = render(<Layout />);

    fireEvent.click(getByText('Mock Menu Hidden'));
    expect(getByText('Mock Menu Visible')).toBeInTheDocument();
  });

  it('toggles search visibility when searchToggler is clicked', () => {
    const { getByText } = render(<Layout />);

    fireEvent.click(getByText('Mock Search Toggler'));
    expect(getByText('Mock Search Visible')).toBeInTheDocument();
  });

  it('toggles wishlist visibility when wishListToggler is clicked', () => {
    const { getByText } = render(<Layout />);

    fireEvent.click(getByText('Mock WishList Hidden'));
    expect(getByText('Mock WishList Visible')).toBeInTheDocument();
  });
});
