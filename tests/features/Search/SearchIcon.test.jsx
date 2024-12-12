import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SearchIcon from '@features/Search/Icon/SearchIcon';

vi.mock('@assets/search.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>search</span>),
}));

vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )),
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
});
