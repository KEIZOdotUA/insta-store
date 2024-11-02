import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TextInput from '@components/shared/TextInput/TextInput';

describe('TextInput', () => {
  it('label', () => {
    const { getByText } = render(
      <TextInput id="label" label="Name" value="" onChange={() => {}} />,
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('value', () => {
    const { getByDisplayValue } = render(
      <TextInput id="value" label="Name" value="value" onChange={() => {}} />,
    );
    expect(getByDisplayValue('value')).toBeTruthy();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    const { getByDisplayValue } = render(
      <TextInput id="onChange" label="Name" value="onChange" onChange={handleChange} />,
    );
    const input = getByDisplayValue('onChange');
    fireEvent.change(input, { target: { value: 'onChange+' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('error message', () => {
    const { getByText } = render(
      <TextInput id="error-message" label="Name" value="" onChange={() => {}} error="Name is required" />,
    );
    expect(getByText('Name is required')).toBeTruthy();
  });

  it('error class', () => {
    const { container } = render(
      <TextInput id="error-class" label="Name" value="" onChange={() => {}} error="Name is required" />,
    );
    const input = container.querySelector('input');
    expect(input).toHaveClass('error');
  });

  it('required', () => {
    const { getByText } = render(
      <TextInput id="required" label="Name" value="" onChange={() => {}} required />,
    );
    expect(getByText('Name*')).toBeTruthy();
  });
});
