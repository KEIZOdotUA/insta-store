import {
  vi,
  describe,
  it,
  beforeEach,
  expect,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ActionButton from '@features/Product/Modal/ActionButton/ActionButton';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import { trackAddToCartEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@helpers/googleAnalyticsGA4');

describe('ActionButton', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    available: true,
  };

  let mockAddCartItem;
  let mockShowPurchase;
  let mockFindCartItem;

  beforeEach(() => {
    mockAddCartItem = vi.fn();
    mockShowPurchase = vi.fn();
    mockFindCartItem = vi.fn();

    usePurchaseContext.mockReturnValue({
      findCartItem: mockFindCartItem,
      addCartItem: mockAddCartItem,
      showPurchase: mockShowPurchase,
    });
  });

  it('renders "додати в кошик" button when product is available and not in cart', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(<ActionButton product={mockProduct} selectedSize={0} />);
    expect(getByText('додати в кошик')).toBeInTheDocument();
  });

  it('calls addCartItem and trackAddToCartEvent when "додати в кошик" is clicked', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(<ActionButton product={mockProduct} selectedSize={0} />);
    fireEvent.click(getByText('додати в кошик'));
    expect(mockAddCartItem).toHaveBeenCalledWith({ ...mockProduct, selectedSize: 0 });
    expect(trackAddToCartEvent).toHaveBeenCalledWith({ ...mockProduct, selectedSize: 0 });
    expect(mockShowPurchase).toHaveBeenCalled();
  });

  it('renders "немає в наявності" button when product is unavailable', () => {
    const unavailableProduct = { ...mockProduct, available: false };
    const { getByText } = render(<ActionButton product={unavailableProduct} selectedSize={0} />);
    const button = getByText('немає в наявності');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it('renders "додано в кошик" button when product is in cart', () => {
    mockFindCartItem.mockReturnValue({ id: mockProduct.id, selectedSize: 0 });
    const { getByText } = render(<ActionButton product={mockProduct} selectedSize={0} />);
    expect(getByText('додано в кошик')).toBeInTheDocument();
  });

  it('calls addCartItem and trackAddToCartEvent when "додано в кошик" is clicked', () => {
    mockFindCartItem.mockReturnValue({ id: mockProduct.id, selectedSize: 0 });
    const { getByText } = render(<ActionButton product={mockProduct} selectedSize={0} />);
    fireEvent.click(getByText('додано в кошик'));
    expect(mockAddCartItem).toHaveBeenCalledWith({ ...mockProduct, selectedSize: 0 });
    expect(trackAddToCartEvent).toHaveBeenCalledWith({ ...mockProduct, selectedSize: 0 });
    expect(mockShowPurchase).toHaveBeenCalled();
  });
});
