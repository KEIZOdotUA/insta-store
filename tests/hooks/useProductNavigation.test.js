import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { renderHook } from '@testing-library/react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import useProductNavigation from '@hooks/useProductNavigation';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
    useLocation: vi.fn(),
  };
});

describe('useProductNavigation', () => {
  let mockSearchParams;
  let mockLocation;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    mockLocation = { pathname: '/home' };
    useParams.mockReturnValue({ categorySlug: 'accessories' });
    useSearchParams.mockReturnValue([mockSearchParams]);
    useLocation.mockReturnValue(mockLocation);
  });

  describe('getProductLink', () => {
    it('returns link without search or size params if not present', () => {
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123');
      expect(link).toBe('/home/123');
    });

    it('returns link with search param if present', () => {
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123');
      expect(link).toBe('/home/123?q=gift');
    });

    it('returns link with size param if provided', () => {
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123', 42);
      expect(link).toBe('/home/123?size=42');
    });

    it('returns link with both search and size params if present', () => {
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123', 42);
      expect(link).toBe('/home/123?q=gift&size=42');
    });

    it('falls back to "products" if categorySlug is undefined', () => {
      useParams.mockReturnValue({ categorySlug: undefined });
      useLocation.mockReturnValue({ pathname: '/products' });
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123');
      expect(link).toBe('/products/123');
    });

    it('falls back to "products" with search and size params if categorySlug is undefined', () => {
      useParams.mockReturnValue({ categorySlug: undefined });
      useLocation.mockReturnValue({ pathname: '/products' });
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123', 42);
      expect(link).toBe('/products/123?q=gift&size=42');
    });

    it('returns link with categorySlug if present', () => {
      useParams.mockReturnValue({ categorySlug: 'accessories' });
      useLocation.mockReturnValue({ pathname: '/other' });
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123');
      expect(link).toBe('/accessories/123');
    });

    it('returns link with categorySlug and search param if present', () => {
      useParams.mockReturnValue({ categorySlug: 'accessories' });
      useLocation.mockReturnValue({ pathname: '/other' });
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123');
      expect(link).toBe('/accessories/123?q=gift');
    });

    it('returns link with categorySlug and size param if present', () => {
      useParams.mockReturnValue({ categorySlug: 'accessories' });
      useLocation.mockReturnValue({ pathname: '/other' });
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123', 42);
      expect(link).toBe('/accessories/123?size=42');
    });

    it('returns link with categorySlug, search and size params if present', () => {
      useParams.mockReturnValue({ categorySlug: 'accessories' });
      useLocation.mockReturnValue({ pathname: '/other' });
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123', 42);
      expect(link).toBe('/accessories/123?q=gift&size=42');
    });

    it('falls back to "home" if categorySlug is undefined and pathname does not start with home or products', () => {
      useParams.mockReturnValue({ categorySlug: undefined });
      useLocation.mockReturnValue({ pathname: '/other' });
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123');
      expect(link).toBe('/home/123');
    });

    it('falls back to "home" with search and size params if categorySlug is undefined and pathname does not start with home or products', () => {
      useParams.mockReturnValue({ categorySlug: undefined });
      useLocation.mockReturnValue({ pathname: '/other' });
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductLink } = result.current;

      const link = getProductLink('123', 42);
      expect(link).toBe('/home/123?q=gift&size=42');
    });
  });

  describe('getProductListLink', () => {
    it('returns link without search param if not present', () => {
      const { result } = renderHook(() => useProductNavigation());
      const { getProductListLink } = result.current;

      const link = getProductListLink();
      expect(link).toBe('/home');
    });

    it('returns link with search param if present', () => {
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductListLink } = result.current;

      const link = getProductListLink();
      expect(link).toBe('/home?q=gift');
    });

    it('falls back to "products" if categorySlug is undefined', () => {
      useParams.mockReturnValue({ categorySlug: undefined });
      useLocation.mockReturnValue({ pathname: '/products' });
      const { result } = renderHook(() => useProductNavigation());
      const { getProductListLink } = result.current;

      const link = getProductListLink();
      expect(link).toBe('/products');
    });

    it('falls back to "products" with search param if categorySlug is undefined', () => {
      useParams.mockReturnValue({ categorySlug: undefined });
      useLocation.mockReturnValue({ pathname: '/products' });
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductListLink } = result.current;

      const link = getProductListLink();
      expect(link).toBe('/products?q=gift');
    });

    it('returns link with categorySlug if present', () => {
      useParams.mockReturnValue({ categorySlug: 'accessories' });
      useLocation.mockReturnValue({ pathname: '/other' });
      const { result } = renderHook(() => useProductNavigation());
      const { getProductListLink } = result.current;

      const link = getProductListLink();
      expect(link).toBe('/accessories');
    });

    it('returns link with categorySlug and search param if present', () => {
      useParams.mockReturnValue({ categorySlug: 'accessories' });
      useLocation.mockReturnValue({ pathname: '/other' });
      mockSearchParams.set('q', 'gift');
      const { result } = renderHook(() => useProductNavigation());
      const { getProductListLink } = result.current;

      const link = getProductListLink();
      expect(link).toBe('/accessories?q=gift');
    });
  });
});
