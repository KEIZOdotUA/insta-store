import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TextArea from '@components/TextArea/TextArea';

describe('TextArea', () => {
  it('label', () => {
    const { getByText } = render(
      <TextArea id="label" label="Description" value="" onChange={() => {}} placeholder="Enter text here" />,
    );
    expect(getByText('Description')).toBeTruthy();
  });

  it('value', () => {
    const { getByDisplayValue } = render(
      <TextArea id="value" label="Description" value="Sample text" onChange={() => {}} placeholder="Enter text here" />,
    );
    expect(getByDisplayValue('Sample text')).toBeTruthy();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <TextArea id="calls_onChange" label="Description" value="" onChange={handleChange} placeholder="Enter text here" />,
    );
    const textarea = getByPlaceholderText('Enter text here');
    fireEvent.change(textarea, { target: { value: 'New text' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('placeholder', () => {
    const { getByPlaceholderText } = render(
      <TextArea id="placeholder" label="Description" value="" onChange={() => {}} placeholder="Enter text here" />,
    );
    expect(getByPlaceholderText('Enter text here')).toBeTruthy();
  });
});
