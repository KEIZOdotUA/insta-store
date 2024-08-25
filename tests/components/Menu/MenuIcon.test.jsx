import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import MenuIcon from '@components/Menu/Icon/MenuIcon';

vi.mock('@assets/menu.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>menu</span>),
}));

describe('MenuIcon', () => {
  it('default', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<MenuIcon onClick={mockOnClick} />);

    const menuIcon = getByText('menu');
    expect(menuIcon).toBeInTheDocument();
  });

  it('onClick', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<MenuIcon onClick={mockOnClick} />);

    const button = getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<MenuIcon onClick={mockOnClick} />);

    const button = getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
