import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PhoneInput from '@components/PhoneInput/PhoneInput';

describe('PhoneInput', () => {
  it('default', () => {
    const number = '1234';
    const { getByDisplayValue } = render(
      <PhoneInput label="Phone Number" value={number} onChange={() => {}} />,
    );
    expect(getByDisplayValue('+380')).toBeTruthy();
    expect(getByDisplayValue(number)).toBeTruthy();
  });

  it('required indicator', () => {
    const { getByText } = render(
      <PhoneInput label="Phone Number" value="" onChange={() => {}} required />,
    );
    expect(getByText('Phone Number*')).toBeTruthy();
  });

  it('calls onChange', () => {
    const number = '1234';
    const handleChange = vi.fn();
    const { getByDisplayValue } = render(
      <PhoneInput label="Phone Number" value={number} onChange={handleChange} />,
    );
    const input = getByDisplayValue(number);

    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange', () => {
    const number = '1234';
    const handleChange = vi.fn();
    const { getByDisplayValue } = render(
      <PhoneInput label="Phone Number" value={number} onChange={handleChange} />,
    );
    const input = getByDisplayValue(number);

    fireEvent.change(input, { target: { value: '123a' } });
    expect(handleChange).toHaveBeenCalledTimes(0);
  });

  it('error message', () => {
    const { getByText } = render(
      <PhoneInput label="Phone Number" value="" onChange={() => {}} error="Invalid number" />,
    );
    expect(getByText('Invalid number')).toBeTruthy();
  });

  it('error class', () => {
    const { getByDisplayValue } = render(
      <PhoneInput label="Phone Number" value="" onChange={() => {}} error="Invalid number" />,
    );
    const input = getByDisplayValue('');
    expect(input).toHaveClass('error');
  });
});
