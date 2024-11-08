import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import ConfirmationNotification from '@components/ConfirmationNotification/ConfirmationNotification';

vi.mock('@components/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

describe('ConfirmationNotification', () => {
  it('default', () => {
    const { getByText } = render(<ConfirmationNotification />);

    expect(getByText('Contact Us')).toBeTruthy();
  });
});
