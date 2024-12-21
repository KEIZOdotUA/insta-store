import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import AppContext from '@context/AppContext';
import useAppContext from '@context/useAppContext';

describe('useAppContext', () => {
  it('should use AppContext and return its value', () => {
    const contextValue = {
      whitelabel: { name: 'Test Brand' },
      categories: [{ id: 1, name: 'Category 1' }],
      products: [{ id: 1, name: 'Product 1' }],
      packaging: { id: 1, name: 'Package 1' },
    };

    const wrapper = ({ children }) => (
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );

    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current).toEqual(contextValue);
  });

  it('should return undefined when AppContext is not provided', () => {
    const { result } = renderHook(() => useAppContext());

    expect(result.current).toBeUndefined();
  });
});
