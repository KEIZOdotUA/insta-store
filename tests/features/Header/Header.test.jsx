import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@features/Header/Header';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

vi.mock('@features/Logo/Logo', () => ({
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

vi.mock('@features/Menu/Icon/MenuIcon', () => ({
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

vi.mock('@contexts/Purchase/usePurchaseContext');

const mockPurchaseContext = {
  visiblePurchase: false,
  showPurchase: vi.fn(),
  hidePurchase: vi.fn(),
};

const mockMenuToggler = vi.fn();
const mockSearchToggler = vi.fn();
const mockWishListToggler = vi.fn();

describe('Header', () => {
  beforeEach(() => {
    usePurchaseContext.mockReturnValue(mockPurchaseContext);
    vi.clearAllMocks();
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
    mockPurchaseContext.visiblePurchase = false;
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('PurchaseIcon'));
    expect(mockPurchaseContext.showPurchase).toHaveBeenCalledTimes(1);
    expect(mockPurchaseContext.hidePurchase).not.toHaveBeenCalled();
  });

  it('calls hidePurchase on PurchaseIcon click when visiblePurchase is true', () => {
    mockPurchaseContext.visiblePurchase = true;
    render(
      <Header
        menuToggler={mockMenuToggler}
        searchToggler={mockSearchToggler}
        wishListToggler={mockWishListToggler}
      />,
    );

    fireEvent.click(screen.getByText('PurchaseIcon'));
    expect(mockPurchaseContext.hidePurchase).toHaveBeenCalledTimes(1);
    expect(mockPurchaseContext.showPurchase).not.toHaveBeenCalled();
  });
});
