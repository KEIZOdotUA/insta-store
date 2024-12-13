import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SizeButton from '@components/SizePicker/SizeButton/SizeButton';

describe('SizeButton', () => {
  it('default', () => {
    const { getByText } = render(
      <SizeButton value={42} onSetSize={() => {}} selected={false} disabled={false} />,
    );
    expect(getByText('42')).toBeTruthy();
  });

  it('calls onSetSize', () => {
    const handleSetSize = vi.fn();
    const { getByText } = render(
      <SizeButton value={42} onSetSize={handleSetSize} selected={false} disabled={false} />,
    );
    fireEvent.click(getByText('42'));
    expect(handleSetSize).toHaveBeenCalledTimes(1);
  });

  it('selected', () => {
    const { getByText } = render(
      <SizeButton value={42} onSetSize={() => {}} selected disabled={false} />,
    );
    const button = getByText('42');
    expect(button).toHaveClass('selected');
  });

  it('disabled', () => {
    const { getByText } = render(
      <SizeButton value={42} onSetSize={() => {}} selected disabled />,
    );
    const button = getByText('42');
    expect(button).toHaveClass('disabled');
  });
});
