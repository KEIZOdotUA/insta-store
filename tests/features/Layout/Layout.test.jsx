import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Layout from '@features/Layout/Layout';

vi.mock('@features/Header/Header', () => ({
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
        Mock Menu Toggler
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

vi.mock('@features/Menu/Menu', () => ({
  __esModule: true,
  default: vi.fn(({ visible, menuToggler }) => (
    <div role="button" onClick={menuToggler} onKeyDown={menuToggler} tabIndex={0}>
      {visible ? 'Mock Menu Visible' : 'Mock Menu Hidden'}
    </div>
  )),
}));

vi.mock('@components/WishList/WishList', () => ({
  __esModule: true,
  default: vi.fn(({ visible, onClose }) => (
    <div role="button" onClick={onClose} onKeyDown={onClose} tabIndex={0}>
      {visible ? 'Mock WishList Visible' : 'Mock WishList Hidden'}
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

vi.mock('@components/Purchase/Panel/PurchasePanel', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mock Purchase</div>),
}));

vi.mock('@features/Product/Modal/ProductModal', () => ({
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

    expect(getByText('Mock Menu Hidden')).toBeInTheDocument();
    expect(getByText('Mock WishList Hidden')).toBeInTheDocument();
    expect(getByText('Mock Search Hidden')).toBeInTheDocument();
  });

  it('toggles menu visibility using menuToggler from Header and Menu', () => {
    const { getByText } = render(<Layout />);

    const menuToggler = getByText('Mock Menu Toggler');
    fireEvent.click(menuToggler);
    expect(getByText('Mock Menu Visible')).toBeInTheDocument();

    fireEvent.click(getByText('Mock Menu Visible'));
    expect(getByText('Mock Menu Hidden')).toBeInTheDocument();
  });

  it('toggles wishlist visibility using wishListToggler from Header and onClose from WishList', () => {
    const { getByText } = render(<Layout />);

    const wishListToggler = getByText('Mock WishList Toggler');
    fireEvent.click(wishListToggler);
    expect(getByText('Mock WishList Visible')).toBeInTheDocument();

    fireEvent.click(getByText('Mock WishList Visible'));
    expect(getByText('Mock WishList Hidden')).toBeInTheDocument();
  });

  it('toggles search visibility using searchToggler from Header and Search', () => {
    const { getByText } = render(<Layout />);

    const searchToggler = getByText('Mock Search Toggler');
    fireEvent.click(searchToggler);
    expect(getByText('Mock Search Visible')).toBeInTheDocument();

    fireEvent.click(getByText('Mock Search Visible'));
    expect(getByText('Mock Search Hidden')).toBeInTheDocument();
  });
});
