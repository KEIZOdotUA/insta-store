import {
  vi,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Modal from '@components/Modal/Modal';
import Transition from '@components/Transition/Transition';
import Button from '@components/Button/Button';

vi.mock('@components//Transition/Transition');
vi.mock('@components//Button/Button');
vi.mock('@assets/close.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <p>close</p>),
}));
vi.mock('@helpers/constValues', () => ({
  __esModule: true,
  animationDuration: 1,
}));

describe('Modal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    Transition.mockImplementation(({ children }) => <div>{children}</div>);
    Button.mockImplementation(({ children, onClick }) => (
      <button onClick={onClick} type="button">{children}</button>
    ));
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = 'auto';
  });

  it('default', async () => {
    const { getByText, getByRole } = render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(getByText('Modal Content')).toBeInTheDocument();

    const closeButton = getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('sets body overflow', () => {
    render(
      <Modal onClose={mockOnClose} hiddenOverflow>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('resets body overflow', () => {
    const { unmount } = render(
      <Modal onClose={mockOnClose} hiddenOverflow>
        <div>Modal Content</div>
      </Modal>,
    );

    unmount();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('triggers visibility change after a delay', async () => {
    render(
      <Modal onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await waitFor(() => {
      expect(Transition).toHaveBeenCalledWith(
        expect.objectContaining({ visible: true }),
        expect.anything(),
      );
    });
  });
});
