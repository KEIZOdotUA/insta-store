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

export const beginCheckout = () => {
  dispatchTrackingEvent({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'UAH',
      // value: getCartTotal(),
      // items: (getCartItems()).map((item, index) => ({
      //   item_id: item.id,
      //   item_name: item.name,
      //   index,
      //   price: item.price,
      //   quantity: item.quantity,
      // })),
    },
  });
};
