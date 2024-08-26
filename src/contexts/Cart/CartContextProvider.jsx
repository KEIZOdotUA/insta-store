import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

function CartContextProvider({ children }) {
  const [cartId, setCartId] = useState(
    localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')).id
      : Date.now(),
  );
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')).items
      : [],
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ id: cartId, items: cartItems }));
  }, [cartId, cartItems]);

  const cartFunctions = useMemo(() => {
    const getCartId = () => cartId;

    const findCartItem = (itemId) => cartItems.find((cartItem) => cartItem.id === itemId);

    const getItems = () => cartItems;

    const addItem = (item) => {
      const isItemInCart = findCartItem(item.id);
      if (!isItemInCart) {
        setCartId(Date.now());
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    };

    const incrementItemQuantity = (itemId) => {
      const isItemInCart = findCartItem(itemId);
      if (isItemInCart) {
        setCartItems(
          cartItems.map((cartItem) => (
            cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
        );
      }
    };

    const decrementItemQuantity = (itemId) => {
      const isItemInCart = findCartItem(itemId);
      if (isItemInCart) {
        setCartItems(
          cartItems.map((cartItem) => (
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1 }
              : cartItem)),
        );
      }
    };

    const removeItem = (itemId) => {
      const isItemInCart = findCartItem(itemId);
      if (isItemInCart) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
      }
    };

    const getTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const clearCart = () => setCartItems([]);

    return {
      getCartId,
      findCartItem,
      getItems,
      addItem,
      incrementItemQuantity,
      decrementItemQuantity,
      removeItem,
      getTotal,
      clearCart,
    };
  }, [cartId, cartItems]);

  return (
    <CartContext.Provider value={cartFunctions}>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
