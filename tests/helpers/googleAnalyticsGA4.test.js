import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import {
  trackViewItemEvent,
  trackBeginCheckoutEvent,
  trackViewCartEvent,
  trackPurchaseEvent,
  trackViewItemListEvent,
  trackAddToCartEvent,
  trackRemoveFromCartEvent,
  trackAddToWishListEvent,
  trackSearchEvent,
  trackShareEvent,
} from '@helpers/googleAnalyticsGA4';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@helpers/dispatchTrackingEvent');

describe('Tracking Events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('trackViewItemEvent', () => {
    it('dispatches the correct event for a single item', () => {
      const item = {
        id: '123',
        name: 'Test Item',
        price: 100,
      };

      trackViewItemEvent(item);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_item',
        ecommerce: {
          currency: 'UAH',
          value: item.price,
          items: [
            {
              item_id: item.id,
              item_name: item.name,
              index: 0,
              price: item.price,
              quantity: 1,
            },
          ],
        },
      });
    });
  });

  describe('trackBeginCheckoutEvent', () => {
    it('dispatches the correct event for multiple items', () => {
      const items = [
        {
          id: '123',
          name: 'Item 1',
          price: 50,
          quantity: 2,
        },
        {
          id: '456',
          name: 'Item 2',
          price: 75,
          quantity: 1,
        },
      ];
      const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      trackBeginCheckoutEvent(totalValue, items);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'UAH',
          value: totalValue,
          items: items.map((item, index) => ({
            item_id: item.id,
            item_name: item.name,
            index,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });
    });

    it('handles an empty items array', () => {
      const items = [];
      const totalValue = 0;

      trackBeginCheckoutEvent(totalValue, items);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'UAH',
          value: totalValue,
          items: [],
        },
      });
    });
  });

  describe('trackViewCartEvent', () => {
    it('dispatches the correct event for viewing cart', () => {
      const items = [
        {
          id: '123',
          name: 'Item 1',
          price: 50,
          quantity: 2,
        },
        {
          id: '456',
          name: 'Item 2',
          price: 75,
          quantity: 1,
        },
      ];
      const totalValue = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      trackViewCartEvent(totalValue, items);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_cart',
        ecommerce: {
          currency: 'UAH',
          value: totalValue,
          items: items.map((item, index) => ({
            item_id: item.id,
            item_name: item.name,
            index,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });
    });

    it('handles an empty cart', () => {
      const items = [];
      const totalValue = 0;

      trackViewCartEvent(totalValue, items);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_cart',
        ecommerce: {
          currency: 'UAH',
          value: totalValue,
          items: [],
        },
      });
    });
  });

  describe('trackPurchaseEvent', () => {
    it('dispatches the correct event for a purchase', () => {
      const transactionId = 'txn123';
      const cartItems = [
        {
          id: '123',
          name: 'Item 1',
          price: 50,
          quantity: 2,
        },
        {
          id: '456',
          name: 'Item 2',
          price: 75,
          quantity: 1,
        },
      ];
      const totalValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      trackPurchaseEvent(transactionId, totalValue, cartItems);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'purchase',
        ecommerce: {
          transaction_id: transactionId,
          value: totalValue,
          currency: 'UAH',
          items: cartItems.map((item, index) => ({
            item_id: item.id,
            item_name: item.name,
            index,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });
    });

    it('handles an empty cart for a purchase', () => {
      const transactionId = 'txn123';
      const cartItems = [];
      const totalValue = 0;

      trackPurchaseEvent(transactionId, totalValue, cartItems);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'purchase',
        ecommerce: {
          transaction_id: transactionId,
          value: totalValue,
          currency: 'UAH',
          items: [],
        },
      });
    });
  });

  describe('trackViewItemListEvent', () => {
    it('dispatches the correct event for a product list', () => {
      const listName = 'Featured Products';
      const items = [
        {
          id: '123',
          name: 'Item 1',
          price: 50,
        },
        {
          id: '456',
          name: 'Item 2',
          price: 75,
        },
      ];

      trackViewItemListEvent(listName, items);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_item_list',
        ecommerce: {
          currency: 'UAH',
          item_list_id: listName,
          item_list_name: listName,
          items: items.map((product, index) => ({
            item_id: product.id,
            item_name: product.name,
            index,
            price: product.price,
          })),
        },
      });
    });

    it('handles an empty product list', () => {
      const listName = 'Empty List';
      const items = [];

      trackViewItemListEvent(listName, items);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'view_item_list',
        ecommerce: {
          currency: 'UAH',
          item_list_id: listName,
          item_list_name: listName,
          items: [],
        },
      });
    });
  });

  describe('trackAddToCartEvent', () => {
    it('dispatches the correct event for adding an item to the cart', () => {
      const item = {
        id: '789',
        name: 'New Item',
        price: 120,
      };

      trackAddToCartEvent(item);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'UAH',
          value: item.price,
          items: [
            {
              item_id: item.id,
              item_name: item.name,
              index: 0,
              price: item.price,
              quantity: 1,
            },
          ],
        },
      });
    });
  });

  describe('trackRemoveFromCartEvent', () => {
    it('dispatches the correct event for removing an item from the cart', () => {
      const item = {
        id: '789',
        name: 'Removed Item',
        price: 120,
      };

      trackRemoveFromCartEvent(item);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'remove_from_cart',
        ecommerce: {
          currency: 'UAH',
          value: item.price,
          items: [
            {
              item_id: item.id,
              item_name: item.name,
              index: 0,
              price: item.price,
              quantity: 1,
            },
          ],
        },
      });
    });
  });

  describe('trackAddToWishListEvent', () => {
    it('dispatches the correct event for adding an item to the wishlist', () => {
      const item = {
        id: '101',
        name: 'Wishlist Item',
        price: 200,
      };

      trackAddToWishListEvent(item);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'add_to_wishlist',
        ecommerce: {
          currency: 'UAH',
          value: item.price,
          items: [
            {
              item_id: item.id,
              item_name: item.name,
              index: 0,
              price: item.price,
              quantity: 1,
            },
          ],
        },
      });
    });
  });

  describe('trackSearchEvent', () => {
    it('dispatches the correct event for a search', () => {
      const searchTerm = 'Test Search';

      trackSearchEvent(searchTerm);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'search',
        ecommerce: {
          search_term: searchTerm,
        },
      });
    });
  });

  describe('trackShareEvent', () => {
    it('dispatches the correct event for sharing an item', () => {
      const itemId = '123';

      trackShareEvent(itemId);

      expect(dispatchTrackingEvent).toHaveBeenCalledWith({
        event: 'share',
        ecommerce: {
          item_id: itemId,
        },
      });
    });
  });
});
