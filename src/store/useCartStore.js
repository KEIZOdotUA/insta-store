import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      id: Date.now().toString().slice(-5),
      items: [],

      findItem: (itemId, selectedSize) => {
        const { items } = get();

        return items.find((cartItem) => (
          cartItem.id === itemId && cartItem.selectedSize === selectedSize
        ));
      },

      addItem: (item) => {
        const { findItem } = get();

        const itemInCart = findItem(item.id, item.selectedSize);
        if (!itemInCart) {
          set((state) => ({
            id: Date.now().toString().slice(-5),
            items: [...state.items, { ...item, quantity: 1 }],
          }));
        }
      },

      removeItem: (itemId, selectedSize) => {
        const { findItem } = get();

        const itemInCart = findItem(itemId, selectedSize);
        if (itemInCart) {
          set((state) => ({
            items: state.items.filter(
              (cartItem) => !(cartItem.id === itemId && cartItem.selectedSize === selectedSize),
            ),
          }));
        }
      },

      clearItems: () => set({ items: [] }),

      increaseQuantity: (itemId, selectedSize) => {
        const { findItem } = get();

        const itemInCart = findItem(itemId, selectedSize);
        if (itemInCart) {
          set((state) => ({
            items: state.items.map((cartItem) => (
              cartItem.id === itemId && cartItem.selectedSize === selectedSize
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem)),
          }));
        }
      },

      decreaseQuantity: (itemId, selectedSize) => {
        const { findItem } = get();

        const itemInCart = findItem(itemId, selectedSize);
        if (itemInCart) {
          set((state) => ({
            items: state.items.map((cartItem) => (
              cartItem.id === itemId && cartItem.selectedSize === selectedSize
                ? { ...cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1 }
                : cartItem)),
          }));
        }
      },

      getTotalCost: () => {
        const { items } = get();

        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    { name: 'cart-storage' },
  ),
);

export default useCartStore;
