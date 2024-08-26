import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import useCartContext from '@contexts/Cart/useCartContext';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';

vi.mock('@contexts/Cart/useCartContext');

vi.mock('@components/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

useCartContext.mockReturnValue({
  getCartId: vi.fn(() => 1),
});

describe('ConfirmationNotification', () => {
  it('default', () => {
    const { getByText } = render(<ConfirmationNotification />);

    expect(getByText('Ми прийняли Ваше замовлення №1')).toBeTruthy();
    expect(getByText('Contact Us')).toBeTruthy();
  });
});
