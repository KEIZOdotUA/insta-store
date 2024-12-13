import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '@components/Checkbox/Checkbox';

describe('Checkbox', () => {
  it('default checkbox', () => {
    const { getByText } = render(<Checkbox label="default" value={false} onChange={() => {}} />);
    expect(getByText('default')).toBeTruthy();
  });

  it('checked', () => {
    const { getByRole } = render(<Checkbox label="checked" value onChange={() => {}} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(true);
  });

  it('unchecked', () => {
    const { getByRole } = render(<Checkbox label="unchecked" value={false} onChange={() => {}} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Checkbox label="onChange" value={false} onChange={handleChange} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
