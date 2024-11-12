import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Purchase from '@components/Purchase/Purchase';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

vi.mock('@components/ConfirmationNotification/ConfirmationNotification');
vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@components/Purchase/StepName/PurchaseStepName', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <h1>{children}</h1>),
}));

describe('Purchase', () => {
  const mockHidePurchase = vi.fn();
  const mockGetCartId = vi.fn().mockReturnValue('12345');

  beforeEach(() => {
    mockHidePurchase.mockClear();
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
      default: vi.fn(({ onOrder }) => <div role="button" tabIndex="0" onClick={onOrder} onKeyDown={onOrder}>Mocked OrderDetails</div>),
    }));
    vi.mock('@components/ConfirmationNotification/ConfirmationNotification', () => ({
      __esModule: true,
      default: vi.fn(() => <div>Mocked ConfirmationNotification</div>),
    }));
    vi.mock('@assets/close.svg', () => ({
      __esModule: true,
      default: vi.fn(() => <p>close</p>),
    }));

    // Mock the purchase context
    usePurchaseContext.mockReturnValue({
      visiblePurchase: true,
      hidePurchase: mockHidePurchase,
      getCartId: mockGetCartId,
    });
  });

  it('default state shows Cart and StepName as "Кошик"', () => {
    const { getByText } = render(<Purchase />);

    expect(getByText('Mocked Cart')).toBeInTheDocument();
    expect(getByText('Кошик')).toBeInTheDocument();
  });

  it('moves to OrderDetails step with StepName as "Замовлення"', () => {
    const { getByText } = render(<Purchase />);

    fireEvent.click(getByText('Mocked Cart'));
    expect(getByText('Mocked OrderDetails')).toBeInTheDocument();
    expect(getByText('Замовлення')).toBeInTheDocument();
  });

  it('moves to ConfirmationNotification step with StepName showing order number', () => {
    const { getByText } = render(<Purchase />);

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));
    expect(getByText('Mocked ConfirmationNotification')).toBeInTheDocument();
    expect(getByText(`Ми прийняли Ваше замовлення № ${mockGetCartId()}`)).toBeInTheDocument();
  });

  it('resets to Cart when close is clicked', async () => {
    const { getByText } = render(<Purchase />);

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));
    fireEvent.click(getByText('close'));

    await waitFor(() => {
      expect(mockHidePurchase).toHaveBeenCalledTimes(1);
      expect(getByText('Кошик')).toBeInTheDocument();
      expect(getByText('Mocked Cart')).toBeInTheDocument();
    });
  });

  it('calls hidePurchase on clicking close button', async () => {
    const { getByText } = render(<Purchase />);

    fireEvent.click(getByText('close'));

    await waitFor(() => {
      expect(mockHidePurchase).toHaveBeenCalledTimes(1);
    });
  });

  it('resets to Cart when "продовжити покупки" button is clicked', async () => {
    const { getByText } = render(<Purchase />);

    fireEvent.click(getByText('Mocked Cart'));
    fireEvent.click(getByText('Mocked OrderDetails'));
    fireEvent.click(getByText('продовжити покупки'));

    await waitFor(() => {
      expect(mockHidePurchase).toHaveBeenCalledTimes(1);
      expect(getByText('Кошик')).toBeInTheDocument();
      expect(getByText('Mocked Cart')).toBeInTheDocument();
    });
  });
});
