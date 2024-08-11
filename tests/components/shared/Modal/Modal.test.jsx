import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Modal from '@components/shared/Modal/Modal';

describe('Modal', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Modal onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('calls onClose', () => {
    const handleClose = vi.fn();
    const { getByRole } = render(
      <Modal onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );
    fireEvent.click(getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('adds & removes overflow', () => {
    const { unmount } = render(
      <Modal onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });
});
