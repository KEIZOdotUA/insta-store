import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from '@components/Product/Card/ProductCard';
import ProductImage from '@components/Product/Image/ProductImage';

vi.mock('@components/Product/Image/ProductImage');

describe('ProductCard', () => {
  const mockOnClick = vi.fn();
  const product = {
    id: 1,
    name: 'Test Product',
    oldPrice: 150,
    price: 100,
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('default', () => {
    ProductImage.mockImplementation(() => <img alt={product.name} />);
    const { getByText, getByAltText } = render(
      <ProductCard product={product} onClick={mockOnClick} />,
    );

    const nameElement = getByText('Test Product');
    const priceElement = getByText(/100 грн/);
    const imgElement = getByAltText('Test Product');

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it('old price', () => {
    const { getByText } = render(<ProductCard product={product} onClick={mockOnClick} />);
    const oldPriceElement = getByText('150');

    expect(oldPriceElement.tagName).toBe('S');
    expect(oldPriceElement).toBeInTheDocument();
  });

  it('onClick', () => {
    const { getByText } = render(
      <ProductCard product={product} onClick={mockOnClick} />,
    );

    const cardElement = getByText('Test Product').closest('.product-card');
    fireEvent.click(cardElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const { getByText } = render(<ProductCard product={product} onClick={mockOnClick} />);
    const cardElement = getByText('Test Product').closest('.product-card');

    fireEvent.keyDown(cardElement, { key: 'Enter', code: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
