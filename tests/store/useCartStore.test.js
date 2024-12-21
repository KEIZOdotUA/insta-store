import {
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useCartStore from '@store/useCartStore';

describe('useCartStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearItems();
    });
  });

  const mockItem = {
    id: '1',
    name: 'Item 1',
    price: 10,
    selectedSize: 'M',
  };

  const mockItem2 = {
    id: '2',
    name: 'Item 2',
    price: 20,
    selectedSize: 'L',
  };

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...mockItem, quantity: 1 });
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
      result.current.removeItem(mockItem.id, mockItem.selectedSize);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should increase the quantity of an item in the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
      result.current.increaseQuantity(mockItem.id, mockItem.selectedSize);
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.items[1].quantity).toBe(1);
  });

  it('should decrease the quantity of an item in the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
      result.current.increaseQuantity(mockItem.id, mockItem.selectedSize);
      result.current.increaseQuantity(mockItem2.id, mockItem2.selectedSize);
      result.current.decreaseQuantity(mockItem.id, mockItem.selectedSize);
    });

    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.items[1].quantity).toBe(2);
  });

  it('should not decrease the quantity below 1', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
      result.current.decreaseQuantity(mockItem.id, mockItem.selectedSize);
    });

    expect(result.current.items[0].quantity).toBe(1);
  });

  it('should clear all items from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
      result.current.clearItems();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate the total cost of items in the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
    });

    expect(result.current.getTotalCost()).toBe(30);
  });

  it('should find an item in the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItem(mockItem);
    });

    const foundItem = result.current.findItem(mockItem.id, mockItem.selectedSize);
    expect(foundItem).toEqual({ ...mockItem, quantity: 1 });
  });

  it('should not find an item that is not in the cart', () => {
    const { result } = renderHook(() => useCartStore());

    const foundItem = result.current.findItem(mockItem.id, mockItem.selectedSize);
    expect(foundItem).toBeUndefined();
  });
});
