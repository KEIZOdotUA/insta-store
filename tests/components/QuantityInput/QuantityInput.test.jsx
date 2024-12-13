import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import QuantityInput from '@components/QuantityInput/QuantityInput';

describe('QuantityInput', () => {
  it('default', () => {
    const { getByDisplayValue } = render(
      <QuantityInput quantity={5} onIncrement={() => {}} onDecrement={() => {}} />,
    );
    expect(getByDisplayValue('5')).toBeTruthy();
  });

  it('calls onIncrement', () => {
    const handleIncrement = vi.fn();
    const { getByRole } = render(
      <QuantityInput quantity={5} onIncrement={handleIncrement} onDecrement={() => {}} />,
    );
    const incrementButton = getByRole('button', { name: '＋' });

    fireEvent.click(incrementButton);
    expect(handleIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement', () => {
    const handleDecrement = vi.fn();
    const { getByRole } = render(
      <QuantityInput quantity={5} onIncrement={() => {}} onDecrement={handleDecrement} />,
    );
    const decrementButton = getByRole('button', { name: '—' });

    fireEvent.click(decrementButton);
    expect(handleDecrement).toHaveBeenCalledTimes(1);
  });
});
