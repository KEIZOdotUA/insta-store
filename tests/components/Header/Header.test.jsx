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

vi.mock('@components/Cart/Icon/CartIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      CartIcon
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
const mockWishListToggler = vi.fn();

describe('Header', () => {
  it('default', () => {
    render(
      <Header
        purchaseToggler={() => {}}
        menuToggler={() => {}}
        wishListToggler={() => {}}
      />,
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('CartIcon')).toBeInTheDocument();
    expect(screen.getByText('WishListIcon')).toBeInTheDocument();
  });

  it('purchaseToggler', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('CartIcon'));

    expect(mockPurchaseToggler).toHaveBeenCalledTimes(1);
  });

  it('menuToggler', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('MenuIcon'));

    expect(mockMenuToggler).toHaveBeenCalledTimes(1);
  });

  it('wishListToggler', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        purchaseToggler={mockPurchaseToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('WishListIcon'));

    expect(mockWishListToggler).toHaveBeenCalledTimes(1);
  });
});
