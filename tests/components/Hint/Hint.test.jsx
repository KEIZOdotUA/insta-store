import {
  vi,
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Hint from '@components/Hint/Hint';
import Transition from '@components/Transition/Transition';
import Button from '@components/Button/Button';

vi.mock('@components/Transition/Transition');
vi.mock('@components/Button/Button');
vi.mock('@assets/close.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="close-svg" />,
}));

vi.mock('@helpers/constValues', () => ({
  __esModule: true,
  animationDuration: 1,
}));

describe('Hint', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    Transition.mockImplementation(({ children }) => <div>{children}</div>);
    Button.mockImplementation(({ className, onClick, children }) => (
      <button className={className} onClick={onClick} type="button">
        {children}
      </button>
    ));
    mockOnClose.mockClear();
  });

  it('renders with content', async () => {
    const { getByText } = render(
      <Hint content="Hint content" onClose={mockOnClose} />,
    );
    expect(getByText('Hint content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const { getByRole } = render(<Hint content="Hint content" onClose={mockOnClose} />);

    const closeButton = getByRole('button');
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
