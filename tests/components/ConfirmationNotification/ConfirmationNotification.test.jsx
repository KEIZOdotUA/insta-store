import {
  describe,
  it,
  expect,
} from 'vitest';
import { render } from '@testing-library/react';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';

describe('ConfirmationNotification', () => {
  it('default', () => {
    const { getByText } = render(<ConfirmationNotification />);

    expect(getByText('Дякуємо за замовлення!')).toBeTruthy();
  });
});
