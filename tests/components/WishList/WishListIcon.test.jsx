import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import WishListIcon from '@components/WishList/Icon/WishListIcon';

vi.mock('@assets/heart.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="heart-icon" />,
}));

describe('WishListIcon', () => {
  const mockOnClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('default', () => {
    const { getByTestId } = render(<WishListIcon onClick={mockOnClick} />);

    expect(getByTestId('heart-icon')).toBeInTheDocument();
  });

  it('onClick', () => {
    const { getByRole } = render(<WishListIcon onClick={mockOnClick} />);
    const button = getByRole('button');

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const { getByRole } = render(<WishListIcon onClick={mockOnClick} />);
    const button = getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
