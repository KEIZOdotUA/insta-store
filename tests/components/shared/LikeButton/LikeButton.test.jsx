import {
  vi,
  describe,
  it,
  expect,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import LikeButton from '@components/shared/LikeButton/LikeButton';

vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: ({ onClick, children }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('@assets/heart.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="heart-icon" />,
}));

vi.mock('@assets/heart-fill.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="heart-fill-icon" />,
}));

describe('LikeButton', () => {
  const mockOnLike = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('liked is true', () => {
    const { getByTestId } = render(<LikeButton liked onLike={mockOnLike} />);

    expect(getByTestId('heart-fill-icon')).toBeInTheDocument();
  });

  it('liked is false', () => {
    const { getByTestId } = render(<LikeButton liked={false} onLike={mockOnLike} />);

    expect(getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('onLike', () => {
    const { getByRole } = render(<LikeButton liked onLike={mockOnLike} />);

    fireEvent.click(getByRole('button'));

    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });
});
