import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@components/Header/Header';

vi.mock('@components/Logo/Logo', () => ({
  __esModule: true,
  default: () => <div>Logo</div>,
}));

vi.mock('@components/Purchase/Icon/PurchaseIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      PurchaseIcon
    </div>
  ),
}));

vi.mock('@components/Menu/Icon/MenuIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      MenuIcon
    </div>
  ),
}));

vi.mock('@components/Search/Icon/SearchIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      SearchIcon
    </div>
  ),
}));

vi.mock('@components/WishList/Icon/WishListIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      WishListIcon
    </div>
  ),
}));

const mockPurchaseToggler = vi.fn();
const mockMenuToggler = vi.fn();
const mockSearchToggler = vi.fn();
const mockWishListToggler = vi.fn();

describe('Header', () => {
  it('renders default elements', () => {
    render(
      <Header
        menuToggler={() => {}}
        searchToggler={() => {}}
        wishListToggler={() => {}}
        purchaseToggler={() => {}}
      />,
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('PurchaseIcon')).toBeInTheDocument();
    expect(screen.getByText('WishListIcon')).toBeInTheDocument();
    expect(screen.getByText('MenuIcon')).toBeInTheDocument();
    expect(screen.getByText('SearchIcon')).toBeInTheDocument();
  });

  it('calls purchaseToggler on PurchaseIcon click', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('PurchaseIcon'));

    expect(mockPurchaseToggler).toHaveBeenCalledTimes(1);
  });

  it('calls menuToggler on MenuIcon click', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('MenuIcon'));

    expect(mockMenuToggler).toHaveBeenCalledTimes(1);
  });

  it('calls searchToggler on SearchIcon click', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('SearchIcon'));

    expect(mockSearchToggler).toHaveBeenCalledTimes(1);
  });

  it('calls wishListToggler on WishListIcon click', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('WishListIcon'));

    expect(mockWishListToggler).toHaveBeenCalledTimes(1);
  });
});
