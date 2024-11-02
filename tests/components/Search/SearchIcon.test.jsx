import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SearchIcon from '@components/Search/Icon/SearchIcon';

vi.mock('@assets/search.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>search</span>),
}));

describe('SearchIcon', () => {
  it('default', () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(<SearchIcon onClick={mockOnClick} />);

    const searchIcon = getByText('search');
    expect(searchIcon).toBeInTheDocument();
  });

  it('onClick', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<SearchIcon onClick={mockOnClick} />);

    const button = getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const mockOnClick = vi.fn();
    const { getByRole } = render(<SearchIcon onClick={mockOnClick} />);

    const button = getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
