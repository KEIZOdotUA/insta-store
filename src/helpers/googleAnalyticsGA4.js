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

export const trackPurchaseEvent = (transactionId, value, cartItems) => {
  dispatchTrackingEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value,
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
};

export const trackViewItemListEvent = (listName, items) => {
  dispatchTrackingEvent({
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
};

export const trackAddToCartEvent = (item) => {
  dispatchTrackingEvent({
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
};
