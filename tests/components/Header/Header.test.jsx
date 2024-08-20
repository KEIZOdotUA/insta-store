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

const mockPurchaseToggler = vi.fn();
const mockMenuToggler = vi.fn();

describe('Header', () => {
  it('default', () => {
    render(<Header purchaseToggler={() => {}} />);

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('CartIcon')).toBeInTheDocument();
  });

  it('purchaseToggler', () => {
    render(<Header purchaseToggler={mockPurchaseToggler} menuToggler={mockMenuToggler} />);

    fireEvent.click(screen.getByText('CartIcon'));

    expect(mockPurchaseToggler).toHaveBeenCalledTimes(1);
  });

  it('menuToggler', () => {
    render(<Header menuToggler={mockMenuToggler} purchaseToggler={mockPurchaseToggler} />);

    fireEvent.click(screen.getByText('MenuIcon'));

    expect(mockMenuToggler).toHaveBeenCalledTimes(1);
  });
});
