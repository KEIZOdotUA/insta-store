import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishListStore = create(
  persist(
    (set, get) => ({
      items: [],

      findItem: (itemId) => {
        const { items } = get();

        return items.find((item) => (item.id === itemId));
      },

      addItem: (item) => {
        const { findItem } = get();

        const itemInWishList = findItem(item.id);
        if (!itemInWishList) {
          set((state) => ({
            items: [...state.items, item],
          }));
        }
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((wishListItem) => wishListItem.id !== itemId),
        }));
      },
    }),
    { name: 'wishlist-storage' },
  ),
);

export default useWishListStore;
