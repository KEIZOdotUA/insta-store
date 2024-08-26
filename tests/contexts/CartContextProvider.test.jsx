import React from 'react';
import {
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import CartContext from '@contexts/Cart/CartContext';
import CartContextProvider from '@contexts/Cart/CartContextProvider';

function TestComponent() {
  const {
    getCartId,
    getItems,
    addItem,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
    getTotal,
    clearCart,
  } = React.useContext(CartContext);

  return (
    <div>
      <button type="button" onClick={() => addItem({ id: 1, name: 'Item 1', price: 100 })}>
        Add Item 1
      </button>
      <button type="button" onClick={() => incrementItemQuantity(1)}>Increment Item 1</button>
      <button type="button" onClick={() => decrementItemQuantity(1)}>Decrement Item 1</button>
      <button type="button" onClick={() => removeItem(1)}>Remove Item 1</button>
      <button type="button" onClick={clearCart}>Clear Cart</button>
      <div data-testid="total">{`Total: ${getTotal()}`}</div>
      <div data-testid="items">{JSON.stringify(getItems())}</div>
      <div data-testid="cartId">{JSON.stringify(getCartId())}</div>
    </div>
  );
}

describe('CartContextProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds an item to the cart', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1'));
    expect(screen.getByTestId('items').textContent).toContain('"name":"Item 1"');
    expect(screen.getByTestId('total').textContent).toBe('Total: 100');
  });

  it('increments item quantity', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1'));
    fireEvent.click(screen.getByText('Increment Item 1'));

    expect(screen.getByTestId('items').textContent).toContain('"quantity":2');
    expect(screen.getByTestId('total').textContent).toBe('Total: 200');
  });

  it('decrements item quantity', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1'));
    fireEvent.click(screen.getByText('Increment Item 1'));
    fireEvent.click(screen.getByText('Decrement Item 1'));

    expect(screen.getByTestId('items').textContent).toContain('"quantity":1');
    expect(screen.getByTestId('total').textContent).toBe('Total: 100');
  });

  it('removes an item from the cart', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1'));
    fireEvent.click(screen.getByText('Remove Item 1'));

    expect(screen.getByTestId('items').textContent).toBe('[]');
    expect(screen.getByTestId('total').textContent).toBe('Total: 0');
  });

  it('clears the cart', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>,
    );

    fireEvent.click(screen.getByText('Add Item 1'));
    fireEvent.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('items').textContent).toBe('[]');
    expect(screen.getByTestId('total').textContent).toBe('Total: 0');
  });

  it('gets cart id', () => {
    render(
      <CartContextProvider>
        <TestComponent />
      </CartContextProvider>,
    );

    expect(screen.getByTestId('cartId').textContent).not.toBe('');
  });
});
