import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@features/Header/Header';
import usePurchasePanelStateStore from '@store/usePurchasePanelStateStore';

vi.mock('@features/Logo/Logo', () => ({
  __esModule: true,
  default: () => <div>Logo</div>,
}));

vi.mock('@features/Purchase/Icon/PurchaseIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      PurchaseIcon
    </div>
  ),
}));

vi.mock('@features/Menu/Icon/MenuIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      MenuIcon
    </div>
  ),
}));

vi.mock('@features/Search/Icon/SearchIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      SearchIcon
    </div>
  ),
}));

vi.mock('@features/WishList/Icon/WishListIcon', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick}>
      WishListIcon
    </div>
  ),
}));

vi.mock('@store/usePurchasePanelStateStore');

const mockMenuToggler = vi.fn();
const mockSearchToggler = vi.fn();
const mockWishListToggler = vi.fn();

describe('Header', () => {
  beforeEach(() => {
    usePurchasePanelStateStore.mockReturnValue({
      visible: false,
      show: vi.fn(),
      hide: vi.fn(),
    });
  });

  it('renders default elements', () => {
    render(
      <Header
        menuToggler={() => {}}
        searchToggler={() => {}}
        wishListToggler={() => {}}
      />,
    );

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('PurchaseIcon')).toBeInTheDocument();
    expect(screen.getByText('WishListIcon')).toBeInTheDocument();
    expect(screen.getByText('MenuIcon')).toBeInTheDocument();
    expect(screen.getByText('SearchIcon')).toBeInTheDocument();
  });

  it('calls menuToggler on MenuIcon click', () => {
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
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
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('WishListIcon'));
    expect(mockWishListToggler).toHaveBeenCalledTimes(1);
  });

  it('calls showPurchase on PurchaseIcon click when visiblePurchase is false', () => {
    const mockShow = vi.fn();
    const mockHide = vi.fn();
    usePurchasePanelStateStore.mockReturnValue({
      visible: false,
      show: mockShow,
      hide: mockHide,
    });

    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('PurchaseIcon'));
    expect(mockShow).toHaveBeenCalledTimes(1);
    expect(mockHide).not.toHaveBeenCalled();
  });

  it('calls hidePurchase on PurchaseIcon click when visiblePurchase is true', () => {
    const mockShow = vi.fn();
    const mockHide = vi.fn();
    usePurchasePanelStateStore.mockReturnValue({
      visible: true,
      show: mockShow,
      hide: mockHide,
    });

    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('PurchaseIcon'));
    expect(mockHide).toHaveBeenCalledTimes(1);
    expect(mockShow).not.toHaveBeenCalled();
  });
});
