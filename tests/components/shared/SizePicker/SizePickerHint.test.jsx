import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SizePickerHint from '@components/shared/SizePicker/Hint/SizePickerHint';

vi.mock('@components/shared/Modal/Modal', () => ({
  __esModule: true,
  default: ({ children, onClose }) => (
    <div>
      <button type="button" onClick={onClose}>Close</button>
      {children}
    </div>
  ),
}));

describe('SizePickerHint', () => {
  it('default', () => {
    const { getByText } = render(<SizePickerHint hint="<p>Size Guide Content</p>" />);
    expect(getByText('Як визначити розмір')).toBeTruthy();
  });

  it('opens modal', () => {
    const { getByText } = render(<SizePickerHint hint="<p>Size Guide Content</p>" />);
    fireEvent.click(getByText('Як визначити розмір'));
    expect(getByText('Size Guide Content')).toBeTruthy();
  });

  it('closes modal', async () => {
    const { getByText, queryByText } = render(<SizePickerHint hint="<p>Size Guide Content</p>" />);
    fireEvent.click(getByText('Як визначити розмір'));
    fireEvent.click(getByText('Close'));

    await waitFor(() => {
      expect(queryByText('Size Guide Content')).not.toBeInTheDocument();
    });
  });

  it('onKeyDown', () => {
    const hint = 'This is a hint';
    const { getByRole, getByText, queryByText } = render(
      <SizePickerHint hint={hint} />,
    );

    expect(queryByText(hint)).toBeNull();

    const hintElement = getByRole('button');
    fireEvent.keyDown(hintElement, { key: 'Enter', code: 'Enter' });
    expect(getByText(hint)).toBeTruthy();
  });
});
