import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CartItem from '@features/Purchase/Cart/Item/CartItem';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import QuantityInput from '@components/shared/QuantityInput/QuantityInput';
import ProductImage from '@features/Product/Image/ProductImage';
import useProductNavigation from '@helpers/useProductNavigation';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@components/shared/QuantityInput/QuantityInput', () => ({
  __esModule: true,
  default: vi.fn(() => <div>QuantityInput</div>),
}));
vi.mock('@features/Product/Image/ProductImage', () => ({
  __esModule: true,
  default: vi.fn(() => <div>ProductImage</div>),
}));
vi.mock('@helpers/useProductNavigation', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: vi.fn(({ children, onClick }) => (
    <div role="button" onClick={onClick} onKeyDown={onClick} tabIndex={0}>
      {children}
    </div>
  )),
}));
vi.mock('react-router-dom', () => ({
  __esModule: true,
  Link: vi.fn(({ to, children, onClick }) => (
    <span onClick={onClick} onKeyDown={onClick} role="link" tabIndex={0} data-to={to}>
      {children}
    </span>
  )),
}));

describe('CartItem', () => {
  const mockHidePurchase = vi.fn();
  const mockRemoveCartItem = vi.fn();
  const mockIncrementCartItemQuantity = vi.fn();
  const mockDecrementCartItemQuantity = vi.fn();
  const mockGetProductLink = vi.fn();

  beforeEach(() => {
    usePurchaseContext.mockReturnValue({
      hidePurchase: mockHidePurchase,
      removeCartItem: mockRemoveCartItem,
      incrementCartItemQuantity: mockIncrementCartItemQuantity,
      decrementCartItemQuantity: mockDecrementCartItemQuantity,
    });
    useProductNavigation.mockReturnValue({ getProductLink: mockGetProductLink });
    mockGetProductLink.mockReturnValue('/test-category/1');
  });

  const item = {
    id: 1,
    name: 'Test Product',
    price: 100,
    quantity: 2,
    category: 1,
    selectedSize: 42,
  };

  it('renders the item with size and correct details', () => {
    const { getByText } = render(<CartItem item={item} />);

    expect(getByText('Test Product, 42 розмір')).toBeTruthy();
    expect(getByText('100 грн')).toBeTruthy();
    expect(QuantityInput).toHaveBeenCalledWith(
      expect.objectContaining({ quantity: item.quantity }),
      expect.anything(),
    );
    expect(ProductImage).toHaveBeenCalledWith(
      expect.objectContaining({ id: item.id, name: item.name }),
      expect.anything(),
    );
  });

  it('renders the item without size and correct details', () => {
    const noSizeItem = { ...item, selectedSize: 0 };
    const { getByText } = render(<CartItem item={noSizeItem} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('100 грн')).toBeTruthy();
    expect(QuantityInput).toHaveBeenCalledWith(
      expect.objectContaining({ quantity: item.quantity }),
      expect.anything(),
    );
    expect(ProductImage).toHaveBeenCalledWith(
      expect.objectContaining({ id: item.id, name: item.name }),
      expect.anything(),
    );
  });

  it('navigates to product link on image and title click, and calls hidePurchase', () => {
    const { getByRole, getByText } = render(<CartItem item={item} />);

    const imageLink = getByRole('link', { name: 'ProductImage' });
    fireEvent.click(imageLink);
    expect(mockHidePurchase).toHaveBeenCalled();

    const titleLink = getByText('Test Product, 42 розмір').closest('[role="link"]');
    fireEvent.click(titleLink);
    expect(mockHidePurchase).toHaveBeenCalledTimes(2);
  });

  it('calls removeCartItem with selectedSize on delete button click', () => {
    const { getByText } = render(<CartItem item={item} />);
    const deleteButton = getByText('видалити');

    fireEvent.click(deleteButton);
    expect(mockRemoveCartItem).toHaveBeenCalledWith(item.id, item.selectedSize);
  });

  it('calls increment and decrement functions from QuantityInput with selectedSize', () => {
    render(<CartItem item={item} />);

    expect(QuantityInput).toHaveBeenCalledWith(
      expect.objectContaining({
        quantity: item.quantity,
        onIncrement: expect.any(Function),
        onDecrement: expect.any(Function),
      }),
      expect.anything(),
    );

    const { onIncrement, onDecrement } = QuantityInput.mock.calls[0][0];
    onIncrement();
    expect(mockIncrementCartItemQuantity).toHaveBeenCalledWith(item.id, item.selectedSize);

    onDecrement();
    expect(mockDecrementCartItemQuantity).toHaveBeenCalledWith(item.id, item.selectedSize);
  });
});
