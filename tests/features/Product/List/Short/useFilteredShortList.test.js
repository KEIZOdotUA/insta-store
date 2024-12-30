import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useFilteredShortList from '@features/Product/List/Short/useFilteredShortList';
import useAppContext from '@context/useAppContext';

vi.mock('@context/useAppContext');

describe('useFilteredShortList', () => {
  const mockContext = {
    whitelabel: {
      shop: {
        shortList: {
          type: 'category',
          listId: '1',
          active: true,
          title: 'Short List',
        },
      },
    },
    products: [
      {
        id: 1,
        available: true,
        category: '1',
        feature: '1',
      },
      {
        id: 2,
        available: false,
        category: '1',
        feature: '2',
      },
      {
        id: 3,
        available: true,
        category: '2',
        feature: '1',
      },
    ],
    categories: [
      { id: '1', slug: 'category-1' },
      { id: '2', slug: 'category-2' },
    ],
    features: [
      { id: '1', slug: 'feature-1' },
      { id: '2', slug: 'feature-2' },
    ],
  };

  beforeEach(() => {
    useAppContext.mockReturnValue(mockContext);
    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useFilteredShortList());

    expect(result.current.active).toBe(true);
    expect(result.current.title).toBe('Short List');
    expect(result.current.items).toEqual([{
      id: 1,
      available: true,
      category: '1',
      feature: '1',
    }]);
    expect(result.current.linkToAllItems).toBe('/category-1');
  });

  it('should update items and linkToAllItems on resize', () => {
    const { result } = renderHook(() => useFilteredShortList());

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.items).toEqual([{
      id: 1,
      available: true,
      category: '1',
      feature: '1',
    }]);
    expect(result.current.linkToAllItems).toBe('/category-1');
  });

  it('should filter products by feature when type is feature', () => {
    mockContext.whitelabel.shop.shortList.type = 'feature';
    const { result } = renderHook(() => useFilteredShortList());

    expect(result.current.items).toEqual([
      {
        id: 1,
        available: true,
        category: '1',
        feature: '1',
      },
      {
        id: 3,
        available: true,
        category: '2',
        feature: '1',
      },
    ]);
    expect(result.current.linkToAllItems).toBe('/feature-1');
  });

  it('should return early if products is undefined', () => {
    useAppContext.mockReturnValue({
      ...mockContext,
      products: undefined,
    });

    const { result } = renderHook(() => useFilteredShortList());

    expect(result.current.items).toEqual([]);
    expect(result.current.linkToAllItems).toBe('/');
  });
});
