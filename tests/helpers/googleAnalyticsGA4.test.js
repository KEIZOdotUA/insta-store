import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { trackViewItemEvent, trackBeginCheckoutEvent } from '@helpers/googleAnalyticsGA4';
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
});
