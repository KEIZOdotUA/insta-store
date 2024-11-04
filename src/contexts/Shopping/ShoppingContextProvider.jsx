import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ShoppingContext from './ShoppingContext';

function ShoppingContextProvider({ children }) {
  const [cartId, setCartId] = useState(
    localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')).id
      : Date.now().toString().slice(-5),
  );

  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart')).items
      : [],
  );

  const [wishList, setWishList] = useState(
    localStorage.getItem('wishlist')
      ? JSON.parse(localStorage.getItem('wishlist'))
      : [],
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ id: cartId, items: cartItems }));
  }, [cartId, cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishList));
  }, [wishList]);

  const cartFunctions = useMemo(() => {
    const getCartId = () => cartId;

    const findCartItem = (itemId) => cartItems.find((cartItem) => cartItem.id === itemId);

    const getCartItems = () => cartItems;

    const addCartItem = (item) => {
      const isItemInCart = findCartItem(item.id);
      if (!isItemInCart) {
        setCartId(Date.now().toString().slice(-5));
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    };

    const incrementCartItemQuantity = (itemId) => {
      const isItemInCart = findCartItem(itemId);
      if (isItemInCart) {
        setCartItems(
          cartItems.map((cartItem) => (
            cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
        );
      }
    };

    const decrementCartItemQuantity = (itemId) => {
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

    const removeCartItem = (itemId) => {
      const isItemInCart = findCartItem(itemId);
      if (isItemInCart) {
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
      }
    };

    const getCartTotal = () => (
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const clearCart = () => setCartItems([]);

    return {
      getCartId,
      findCartItem,
      getCartItems,
      addCartItem,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      removeCartItem,
      getCartTotal,
      clearCart,
    };
  }, [cartId, cartItems]);

  const wishListFunctions = useMemo(() => {
    const getWishList = () => wishList;

    const findWishListItem = (itemId) => wishList.find((wishListItem) => (
      wishListItem.id === itemId
    ));

    const addWishListItem = (item) => {
      const isItemInWishList = findWishListItem(item.id);
      if (!isItemInWishList) {
        setWishList([...wishList, item]);
      }
    };

    const removeWishListItem = (itemId) => {
      setWishList(wishList.filter((wishListItem) => wishListItem.id !== itemId));
    };

    return {
      getWishList,
      findWishListItem,
      addWishListItem,
      removeWishListItem,
    };
  }, [wishList]);

  const shoppingFunctions = useMemo(
    () => ({ ...cartFunctions, ...wishListFunctions }),
    [cartFunctions, wishListFunctions],
  );

  return (
    <ShoppingContext.Provider value={shoppingFunctions}>
      {children}
    </ShoppingContext.Provider>
  );
}

ShoppingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShoppingContextProvider;
