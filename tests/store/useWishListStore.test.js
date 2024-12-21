import {
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import useWishListStore from '@store/useWishListStore';

describe('useWishListStore', () => {
  beforeEach(() => {
    useWishListStore.setState({ items: [] });
    const { addItem } = useWishListStore.getState();
    addItem({ id: 1, name: 'Item 1' });
    addItem({ id: 2, name: 'Item 2' });
  });

  it('should add an item to the wishlist', () => {
    const { addItem } = useWishListStore.getState();
    addItem({ id: 3, name: 'Item 3' });

    const updatedItems = useWishListStore.getState().items;
    expect(updatedItems).toHaveLength(3);
    expect(updatedItems.find((item) => item.id === 3)).toBeDefined();
  });

  it('should not add a duplicate item to the wishlist', () => {
    const { addItem, items } = useWishListStore.getState();
    addItem({ id: 1, name: 'Item 1' });
    expect(items).toHaveLength(2);
  });

  it('should remove an item from the wishlist', () => {
    const { removeItem } = useWishListStore.getState();
    removeItem(1);
    const updatedItems = useWishListStore.getState().items;
    expect(updatedItems).toHaveLength(1);
    expect(updatedItems.find((item) => item.id === 1)).toBeUndefined();
  });

  it('should find an item in the wishlist', () => {
    const { findItem } = useWishListStore.getState();
    const item = findItem(1);
    expect(item).toBeDefined();
    expect(item.id).toBe(1);
  });

  it('should return undefined for a non-existent item', () => {
    const { findItem } = useWishListStore.getState();
    const item = findItem(999);
    expect(item).toBeUndefined();
  });
});
