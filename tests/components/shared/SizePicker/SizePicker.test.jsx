import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SizePicker from '@components/shared/SizePicker/SizePicker';

describe('SizePicker', () => {
  it('default', () => {
    const sizes = [38, 40, 42];
    const { getAllByRole } = render(
      <SizePicker sizes={sizes} setSize={() => {}} selectedSize={40} disabled={false} sizeHint="" />,
    );
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(sizes.length);
  });

  it('calls setSize', () => {
    const sizes = [38, 40, 42];
    const handleSetSize = vi.fn();
    const { getByText } = render(
      <SizePicker sizes={sizes} setSize={handleSetSize} selectedSize={40} disabled={false} sizeHint="" />,
    );
    fireEvent.click(getByText('38'));
    expect(handleSetSize).toHaveBeenCalledWith(38);
  });

  it('does not call setSize', () => {
    const sizes = [38, 40, 42];
    const handleSetSize = vi.fn();
    const { getByText } = render(
      <SizePicker sizes={sizes} setSize={handleSetSize} selectedSize={40} disabled sizeHint="" />,
    );
    fireEvent.click(getByText('38'));
    expect(handleSetSize).not.toHaveBeenCalled();
  });

  it('initial size', () => {
    const sizes = [38, 40, 42];
    const handleSetSize = vi.fn();
    render(
      <SizePicker sizes={sizes} setSize={handleSetSize} selectedSize={0} disabled={false} sizeHint="" />,
    );
    expect(handleSetSize).toHaveBeenCalledWith(38);
  });

  it('hint', () => {
    const sizes = [38, 40, 42];
    const { getByText } = render(
      <SizePicker sizes={sizes} setSize={() => {}} selectedSize={40} disabled={false} sizeHint="<p>Size hint</p>" />,
    );
    expect(getByText('Як визначити розмір')).toBeTruthy();
  });

  it('no hint', () => {
    const sizes = [38, 40, 42];
    const { queryByText } = render(
      <SizePicker sizes={sizes} setSize={() => {}} selectedSize={40} disabled={false} sizeHint="" />,
    );
    expect(queryByText('Як визначити розмір')).toBeNull();
  });
});
