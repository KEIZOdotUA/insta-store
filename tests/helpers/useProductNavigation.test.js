import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { renderHook } from '@testing-library/react';
import { useParams, useSearchParams } from 'react-router-dom';
import useProductNavigation from '@helpers/useProductNavigation';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('useProductNavigation', () => {
  let mockSearchParams;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    useParams.mockReturnValue({ categorySlug: 'accessories' });
    useSearchParams.mockReturnValue([mockSearchParams]);
  });

  it('returns link without search or size params if not present', () => {
    const { result } = renderHook(() => useProductNavigation());
    const getProductLink = result.current;

    const link = getProductLink('123');
    expect(link).toBe('/accessories/123');
  });

  it('returns link with search param if present', () => {
    mockSearchParams.set('q', 'gift');
    const { result } = renderHook(() => useProductNavigation());
    const getProductLink = result.current;

    const link = getProductLink('123');
    expect(link).toBe('/accessories/123?q=gift');
  });

  it('returns link with size param if provided', () => {
    const { result } = renderHook(() => useProductNavigation());
    const getProductLink = result.current;

    const link = getProductLink('123', 42);
    expect(link).toBe('/accessories/123?size=42');
  });

  it('returns link with both search and size params if present', () => {
    mockSearchParams.set('q', 'gift');
    const { result } = renderHook(() => useProductNavigation());
    const getProductLink = result.current;

    const link = getProductLink('123', 42);
    expect(link).toBe('/accessories/123?q=gift&size=42');
  });

  it('falls back to "products" if categorySlug is undefined', () => {
    useParams.mockReturnValue({ categorySlug: undefined });
    const { result } = renderHook(() => useProductNavigation());
    const getProductLink = result.current;

    const link = getProductLink('123');
    expect(link).toBe('/products/123');
  });

  it('falls back to "products" with search and size params if categorySlug is undefined', () => {
    useParams.mockReturnValue({ categorySlug: undefined });
    mockSearchParams.set('q', 'gift');
    const { result } = renderHook(() => useProductNavigation());
    const getProductLink = result.current;

    const link = getProductLink('123', 42);
    expect(link).toBe('/products/123?q=gift&size=42');
  });
});
