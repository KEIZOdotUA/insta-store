import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartFunctions = useMemo(() => {
    const findCartItem = (itemId) => cartItems.find((cartItem) => cartItem.id === itemId);

    const getItems = () => cartItems;

    const addItem = (item) => {
      const isItemInCart = findCartItem(item.id);
      if (!isItemInCart) {
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

    return {
      findCartItem,
      getItems,
      addItem,
      incrementItemQuantity,
      decrementItemQuantity,
      removeItem,
      getTotal,
    };
  }, [cartItems]);

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
