import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import OrderConfirmed from '@features/Purchase/OrderConfirmed/OrderConfirmed';

vi.mock('@features/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

describe('OrderConfirmed', () => {
  it('default', () => {
    const { getByText } = render(<OrderConfirmed />);

    expect(getByText('Contact Us')).toBeTruthy();
  });
});
