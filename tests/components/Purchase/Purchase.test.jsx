import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Purchase from '@components/Purchase/Purchase';

vi.mock('@components/ConfirmationNotification/ConfirmationNotification');

describe('Purchase', () => {
  const mockPurchaseToggler = vi.fn();

  beforeEach(() => {
    mockPurchaseToggler.mockClear();
    vi.mock('@components/shared/Transition/Transition', () => ({
      __esModule: true,
      default: vi.fn(({ children }) => <div>{children}</div>),
    }));
    vi.mock('@components/Cart/Cart', () => ({
      __esModule: true,
      default: vi.fn(({ onOrder }) => <div role="button" tabIndex="0" onClick={onOrder} onKeyDown={onOrder}>Mocked Cart</div>),
    }));
    vi.mock('@components/OrderDetails/OrderDetails', () => ({
      __esModule: true,
      default: vi.fn(({ onOrder }) => <div role="button" tabIndex="0" onKeyDown={onOrder} onClick={onOrder}>Mocked OrderDetails</div>),
    }));
    vi.mock('@components/ConfirmationNotification/ConfirmationNotification', () => ({
      __esModule: true,
      default: vi.fn(() => <div>Mocked ConfirmationNotification</div>),
    }));
  });

  it('default', () => {
    const { getByText } = render(
      <Purchase visible purchaseToggler={mockPurchaseToggler} />,
    );

    expect(getByText('Mocked Cart')).toBeInTheDocument();
  });

  it('OrderDetails', () => {
    const { getByText } = render(
      <Purchase visible purchaseToggler={mockPurchaseToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    expect(getByText('Mocked OrderDetails')).toBeInTheDocument();
  });

  it('ConfirmationNotification ', () => {
    const { getByText } = render(
      <Purchase visible purchaseToggler={mockPurchaseToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));
    expect(getByText('Mocked ConfirmationNotification')).toBeInTheDocument();
  });

  it('resets', async () => {
    const { getByText, getByAltText } = render(
      <Purchase visible purchaseToggler={mockPurchaseToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));

    fireEvent.click(getByAltText('close'));

    await waitFor(() => {
      expect(mockPurchaseToggler).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      fireEvent.click(getByAltText('close'));
      expect(getByText('Mocked Cart')).toBeInTheDocument();
    });
  });

  it('purchaseToggler', async () => {
    const { getByAltText } = render(
      <Purchase visible purchaseToggler={mockPurchaseToggler} />,
    );

    fireEvent.click(getByAltText('close'));

    await waitFor(() => {
      expect(mockPurchaseToggler).toHaveBeenCalledTimes(1);
    });
  });

  it('продовжити покупки', async () => {
    const { getByText } = render(
      <Purchase visible purchaseToggler={mockPurchaseToggler} />,
    );

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));

    fireEvent.click(getByText('продовжити покупки'));

    await waitFor(() => {
      expect(mockPurchaseToggler).toHaveBeenCalledTimes(1);
      expect(getByText('Mocked Cart')).toBeInTheDocument();
    });
  });
});
