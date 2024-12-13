import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PurchasePanel from '@features/Purchase/Panel/PurchasePanel';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@components//Transition/Transition', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <div>{children}</div>),
}));
vi.mock('@assets/close.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <p>close</p>),
}));
vi.mock('@features/Purchase/Panel/PurchaseStep/PurchaseStep', () => ({
  __esModule: true,
  default: vi.fn(({ step, updateStep }) => (
    <div>
      <p>{`Mocked PurchaseStep: ${step}`}</p>
      <button onClick={() => updateStep(step + 1)} type="button">Next Step</button>
    </div>
  )),
}));

describe('PurchasePanel', () => {
  const mockHidePurchase = vi.fn();

  beforeEach(() => {
    mockHidePurchase.mockClear();

    // Mock the purchase context
    usePurchaseContext.mockReturnValue({
      visiblePurchase: true,
      hidePurchase: mockHidePurchase,
    });
  });

  it('renders PurchaseStep with initial step as 0', () => {
    const { getByText } = render(<PurchasePanel />);

    expect(getByText('Mocked PurchaseStep: 0')).toBeInTheDocument();
  });

  it('advances to the next step when "Next Step" button is clicked', () => {
    const { getByText } = render(<PurchasePanel />);

    fireEvent.click(getByText('Next Step'));
    expect(getByText('Mocked PurchaseStep: 1')).toBeInTheDocument();
  });

  it('resets to step 0 when the close button is clicked', async () => {
    const { getByText } = render(<PurchasePanel />);

    fireEvent.click(getByText('Next Step'));
    fireEvent.click(getByText('close'));

    await waitFor(() => {
      expect(mockHidePurchase).toHaveBeenCalledTimes(1);
      expect(getByText('Mocked PurchaseStep: 0')).toBeInTheDocument();
    });
  });

  it('resets to step 0 when "продовжити покупки" button is clicked', async () => {
    const { getByText } = render(<PurchasePanel />);

    fireEvent.click(getByText('Next Step'));
    fireEvent.click(getByText('продовжити покупки'));

    await waitFor(() => {
      expect(mockHidePurchase).toHaveBeenCalledTimes(1);
      expect(getByText('Mocked PurchaseStep: 0')).toBeInTheDocument();
    });
  });

  it('calls hidePurchase when the close button is clicked', async () => {
    const { getByText } = render(<PurchasePanel />);

    fireEvent.click(getByText('close'));

    await waitFor(() => {
      expect(mockHidePurchase).toHaveBeenCalledTimes(1);
    });
  });
});
