import { describe, it, expect } from 'vitest';
import filterProductsByQuery from '@helpers/filterProductsByQuery';

describe('filterProductsByQuery', () => {
  const products = [
    { id: 1, name: 'Product One', available: true },
    { id: 2, name: 'Another Product', available: false },
    { id: 3, name: 'product two', available: true },
    { id: 4, name: 'Unavailable Product', available: false },
    { id: 5, name: 'Third Product', available: true },
  ];

  it('returns only available products whose name matches the query (case insensitive)', () => {
    const result = filterProductsByQuery(products, 'product');
    expect(result).toEqual([
      { id: 1, name: 'Product One', available: true },
      { id: 3, name: 'product two', available: true },
      { id: 5, name: 'Third Product', available: true },
    ]);
  });

  it('returns only available products whose ID matches the query', () => {
    const result = filterProductsByQuery(products, '3');
    expect(result).toEqual([
      { id: 3, name: 'product two', available: true },
    ]);
  });

  it('returns an empty array if no products match the query by name or ID', () => {
    const result = filterProductsByQuery(products, 'nonexistent');
    expect(result).toEqual([]);
  });

  it('returns an empty array if no available products match the query', () => {
    const result = filterProductsByQuery(products, 'Unavailable');
    expect(result).toEqual([]);
  });

  it('returns all available products if the query is an empty string', () => {
    const result = filterProductsByQuery(products, '');
    expect(result).toEqual([
      { id: 1, name: 'Product One', available: true },
      { id: 3, name: 'product two', available: true },
      { id: 5, name: 'Third Product', available: true },
    ]);
  });
});
