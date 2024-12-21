import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import PurchaseStep from '@features/Purchase/Panel/PurchaseStep/PurchaseStep';
import useCartStore from '@store/useCartStore';

vi.mock('@store/useCartStore');
vi.mock('@features/Purchase/Cart/Cart', () => ({
  __esModule: true,
  default: vi.fn(({ onOrder }) => (
    <div
      role="button"
      tabIndex="0"
      onClick={onOrder}
      onKeyDown={onOrder}
    >
      Mocked Cart
    </div>
  )),
}));
vi.mock('@features/Purchase/OrderDetails/OrderDetails', () => ({
  __esModule: true,
  default: vi.fn(({ onOrder }) => (
    <div
      role="button"
      tabIndex="0"
      onClick={onOrder}
      onKeyDown={onOrder}
    >
      Mocked OrderDetails
    </div>
  )),
}));
vi.mock('@features/Purchase/OrderConfirmed/OrderConfirmed', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked OrderConfirmed</div>),
}));

describe('PurchaseStep', () => {
  const mockGetCartId = 12345;
  const mockUpdateStep = vi.fn();

  beforeEach(() => {
    mockUpdateStep.mockClear();
    useCartStore.mockReturnValue({
      id: mockGetCartId,
    });
  });

  it('renders the Cart step with the correct name', () => {
    const { getByText } = render(<PurchaseStep step={0} updateStep={mockUpdateStep} />);

    expect(getByText('Кошик')).toBeInTheDocument();
    expect(getByText('Mocked Cart')).toBeInTheDocument();
  });

  it('renders the OrderDetails step with the correct name', () => {
    const { getByText } = render(<PurchaseStep step={1} updateStep={mockUpdateStep} />);

    expect(getByText('Замовлення')).toBeInTheDocument();
    expect(getByText('Mocked OrderDetails')).toBeInTheDocument();
  });

  it('renders the OrderConfirmed step with the correct name', () => {
    const { getByText } = render(<PurchaseStep step={2} updateStep={mockUpdateStep} />);

    expect(getByText(`Ми прийняли Ваше замовлення № ${mockGetCartId}`)).toBeInTheDocument();
    expect(getByText('Mocked OrderConfirmed')).toBeInTheDocument();
  });

  it('calls updateStep to move to OrderDetails when the Cart "onOrder" is triggered', () => {
    const { getByText } = render(<PurchaseStep step={0} updateStep={mockUpdateStep} />);

    fireEvent.click(getByText('Mocked Cart'));
    expect(mockUpdateStep).toHaveBeenCalledWith(1);
  });

  it('calls updateStep to move to OrderConfirmed when the OrderDetails "onOrder" is triggered', () => {
    const { getByText } = render(<PurchaseStep step={1} updateStep={mockUpdateStep} />);

    fireEvent.click(getByText('Mocked OrderDetails'));
    expect(mockUpdateStep).toHaveBeenCalledWith(2);
  });
});
