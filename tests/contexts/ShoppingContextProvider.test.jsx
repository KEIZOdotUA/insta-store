import React from 'react';
import {
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingContext from '@contexts/Shopping/ShoppingContext';
import ShoppingContextProvider from '@contexts/Shopping/ShoppingContextProvider';

function TestComponent() {
  const {
    getCartId,
    getCartItems,
    addCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
    getCartTotal,
    clearCart,
    getWishList,
    addWishListItem,
    removeWishListItem,
  } = React.useContext(ShoppingContext);

  return (
    <div>
      <button type="button" onClick={() => addCartItem({ id: 1, name: 'Item 1', price: 100 })}>
        Add Item 1 to Cart
      </button>
      <button type="button" onClick={() => incrementCartItemQuantity(1)}>
        Increment Cart Item 1
      </button>
      <button type="button" onClick={() => decrementCartItemQuantity(1)}>
        Decrement Cart Item 1
      </button>
      <button type="button" onClick={() => removeCartItem(1)}>
        Remove Cart Item 1
      </button>
      <button type="button" onClick={clearCart}>
        Clear Cart
      </button>
      <div data-testid="cart-total">{`Cart Total: ${getCartTotal()}`}</div>
      <div data-testid="cart-items">{JSON.stringify(getCartItems())}</div>
      <div data-testid="cart-id">{JSON.stringify(getCartId())}</div>

      <button type="button" onClick={() => addWishListItem({ id: 2, name: 'Wishlist Item 1' })}>
        Add Item 1 to Wishlist
      </button>
      <button type="button" onClick={() => removeWishListItem(2)}>
        Remove Wishlist Item 1
      </button>
      <div data-testid="wishlist-items">{JSON.stringify(getWishList())}</div>
    </div>
  );
}

describe('ShoppingContextProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds an item to the cart', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Cart'));
    expect(screen.getByTestId('cart-items').textContent).toContain('"name":"Item 1"');
    expect(screen.getByTestId('cart-total').textContent).toBe('Cart Total: 100');
  });

  it('increments cart item quantity', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Cart'));
    fireEvent.click(screen.getByText('Increment Cart Item 1'));

    expect(screen.getByTestId('cart-items').textContent).toContain('"quantity":2');
    expect(screen.getByTestId('cart-total').textContent).toBe('Cart Total: 200');
  });

  it('decrements cart item quantity', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Cart'));
    fireEvent.click(screen.getByText('Increment Cart Item 1'));
    fireEvent.click(screen.getByText('Decrement Cart Item 1'));

    expect(screen.getByTestId('cart-items').textContent).toContain('"quantity":1');
    expect(screen.getByTestId('cart-total').textContent).toBe('Cart Total: 100');
  });

  it('removes an item from the cart', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Cart'));
    fireEvent.click(screen.getByText('Remove Cart Item 1'));

    expect(screen.getByTestId('cart-items').textContent).toBe('[]');
    expect(screen.getByTestId('cart-total').textContent).toBe('Cart Total: 0');
  });

  it('clears the cart', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Cart'));
    fireEvent.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('cart-items').textContent).toBe('[]');
    expect(screen.getByTestId('cart-total').textContent).toBe('Cart Total: 0');
  });

  it('gets cart id', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    expect(screen.getByTestId('cart-id').textContent).not.toBe('');
  });

  it('adds an item to the wishlist', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Wishlist'));

    expect(screen.getByTestId('wishlist-items').textContent).toContain('"name":"Wishlist Item 1"');
  });

  it('removes an item from the wishlist', () => {
    render(
      <ShoppingContextProvider>
        <TestComponent />
      </ShoppingContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1 to Wishlist'));
    fireEvent.click(screen.getByText('Remove Wishlist Item 1'));

    expect(screen.getByTestId('wishlist-items').textContent).toBe('[]');
  });
});
