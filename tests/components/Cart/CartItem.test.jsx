import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import CartItem from '@components/Cart/Item/CartItem';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import QuantityInput from '@components/shared/QuantityInput/QuantityInput';
import ProductImage from '@components/Product/Image/ProductImage';
import useProductNavigation from '@helpers/useProductNavigation';

vi.mock('@contexts/Shopping/useShoppingContext');
vi.mock('@components/shared/QuantityInput/QuantityInput', () => ({
  __esModule: true,
  default: vi.fn(() => <div>QuantityInput</div>),
}));
vi.mock('@components/Product/Image/ProductImage', () => ({
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
  Link: vi.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe('CartItem', () => {
  const mockRemoveCartItem = vi.fn();
  const mockIncrementCartItemQuantity = vi.fn();
  const mockDecrementCartItemQuantity = vi.fn();
  const mockGetProductLink = vi.fn();

  beforeEach(() => {
    useShoppingContext.mockReturnValue({
      removeCartItem: mockRemoveCartItem,
      incrementCartItemQuantity: mockIncrementCartItemQuantity,
      decrementCartItemQuantity: mockDecrementCartItemQuantity,
    });
    useProductNavigation.mockReturnValue(mockGetProductLink);
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

  it('navigates to product link on image and title click', () => {
    const { getByText } = render(<CartItem item={item} />);

    const imageLink = getByText('ProductImage').closest('a');
    expect(imageLink.getAttribute('href')).toBe('/test-category/1');

    const titleLink = getByText('Test Product, 42 розмір');
    expect(titleLink.closest('a').getAttribute('href')).toBe('/test-category/1');
  });

  it('calls removeCartItem on delete button click', () => {
    const { getByText } = render(<CartItem item={item} />);
    const deleteButton = getByText('видалити');

    fireEvent.click(deleteButton);
    expect(mockRemoveCartItem).toHaveBeenCalledWith(item.id);
  });

  it('calls increment and decrement functions from QuantityInput', () => {
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
    expect(mockIncrementCartItemQuantity).toHaveBeenCalledWith(item.id);

    onDecrement();
    expect(mockDecrementCartItemQuantity).toHaveBeenCalledWith(item.id);
  });
});
