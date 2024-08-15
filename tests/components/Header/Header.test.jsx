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

describe('Header', () => {
  it('default', () => {
    render(<Header sidebarToggler={() => {}} />);

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('CartIcon')).toBeInTheDocument();
  });

  it('sidebarToggler', () => {
    const mockSidebarToggler = vi.fn();
    render(<Header sidebarToggler={mockSidebarToggler} />);

    fireEvent.click(screen.getByText('CartIcon'));

    expect(mockSidebarToggler).toHaveBeenCalledTimes(1);
  });
});
