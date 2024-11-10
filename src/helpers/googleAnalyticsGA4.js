import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

export const trackViewItemEvent = (item) => {
  dispatchTrackingEvent({
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
};

export const trackBeginCheckoutEvent = (value, items) => {
  dispatchTrackingEvent({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'UAH',
      value,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        index,
        price: item.price,
        quantity: item.quantity,
      })),
    },
  });
};

export const trackViewCartEvent = (value, items) => {
  dispatchTrackingEvent({
    event: 'view_cart',
    ecommerce: {
      currency: 'UAH',
      value,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        index,
        price: item.price,
        quantity: item.quantity,
      })),
    },
  });
};
