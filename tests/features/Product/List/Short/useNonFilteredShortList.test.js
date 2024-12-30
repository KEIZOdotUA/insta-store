import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useNonFilteredShortList from '@features/Product/List/Short/useNonFilteredShortList';
import useAppContext from '@context/useAppContext';
import {
  maxMobileWidthView,
  mobileShortListLength,
  desktopShortListLength,
} from '@helpers/constValues';

vi.mock('@context/useAppContext');

describe('useNonFilteredShortList', () => {
  const products = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Product ${i}` }));

  beforeEach(() => {
    useAppContext.mockReturnValue({ products });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct number of items for mobile view', () => {
    global.innerWidth = maxMobileWidthView - 1;
    const { result } = renderHook(() => useNonFilteredShortList());

    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.items.length).toBe(mobileShortListLength);
  });

  it('should return the correct number of items for desktop view', () => {
    global.innerWidth = maxMobileWidthView + 1;
    const { result } = renderHook(() => useNonFilteredShortList());

    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.items.length).toBe(desktopShortListLength);
  });

  it('should update items on window resize', () => {
    const { result } = renderHook(() => useNonFilteredShortList());

    act(() => {
      global.innerWidth = maxMobileWidthView + 1;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.items.length).toBe(desktopShortListLength);

    act(() => {
      global.innerWidth = maxMobileWidthView - 1;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.items.length).toBe(mobileShortListLength);
  });

  it('should handle no products', () => {
    useAppContext.mockReturnValue({ products: null });
    const { result } = renderHook(() => useNonFilteredShortList());

    expect(result.current.items.length).toBe(0);
  });
});
