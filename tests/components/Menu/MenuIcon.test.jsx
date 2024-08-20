import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import MenuIcon from '@components/Menu/Icon/MenuIcon';

describe('MenuIcon', () => {
  it('default', () => {
    const mockOnClick = vi.fn();
    const { getByAltText } = render(<MenuIcon onClick={mockOnClick} />);

    const menuIcon = getByAltText('menu');
    expect(menuIcon).toBeInTheDocument();
    expect(menuIcon.src).toContain('menu.svg');
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
