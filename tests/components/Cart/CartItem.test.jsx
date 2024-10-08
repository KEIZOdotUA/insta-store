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

vi.mock('@contexts/Shopping/useShoppingContext');
vi.mock('@components/shared/QuantityInput/QuantityInput', () => ({
  __esModule: true,
  default: vi.fn(() => <div>QuantityInput</div>),
}));
vi.mock('@components/Product/Image/ProductImage', () => ({
  __esModule: true,
  default: vi.fn(() => <div>ProductImage</div>),
}));

describe('CartItem', () => {
  const mockRemoveCartItem = vi.fn();
  const mockIncrementCartItemQuantity = vi.fn();
  const mockDecrementCartItemQuantity = vi.fn();

  beforeEach(() => {
    useShoppingContext.mockReturnValue({
      removeCartItem: mockRemoveCartItem,
      incrementCartItemQuantity: mockIncrementCartItemQuantity,
      decrementCartItemQuantity: mockDecrementCartItemQuantity,
    });
  });

  const item = {
    id: 1,
    name: 'Test Product',
    price: 100,
    quantity: 2,
    category: 1,
    selectedSize: 42,
  };

  it('default', () => {
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

  it('remove Cart Item', () => {
    const { getByText } = render(<CartItem item={item} />);
    const deleteButton = getByText('видалити');

    fireEvent.click(deleteButton);

    expect(mockRemoveCartItem).toHaveBeenCalledWith(item.id);
  });

  it('remove Cart Item onKeyDown', () => {
    const { getByText } = render(<CartItem item={item} />);
    const deleteButton = getByText('видалити');

    fireEvent.keyDown(deleteButton, { key: 'Enter', code: 'Enter' });

    expect(mockRemoveCartItem).toHaveBeenCalledWith(item.id);
  });
});
