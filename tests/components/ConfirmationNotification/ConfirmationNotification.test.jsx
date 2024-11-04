import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';

vi.mock('@contexts/Shopping/useShoppingContext');

vi.mock('@components/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

useShoppingContext.mockReturnValue({
  getCartId: vi.fn(() => 1),
});

describe('ConfirmationNotification', () => {
  it('default', () => {
    const { getByText } = render(<ConfirmationNotification />);

    expect(getByText('Ми прийняли Ваше замовлення № 1')).toBeTruthy();
    expect(getByText('Contact Us')).toBeTruthy();
  });
});
