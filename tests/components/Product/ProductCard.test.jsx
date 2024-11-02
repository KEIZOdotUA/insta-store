import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '@components/Product/Card/ProductCard';
import ProductImage from '@components/Product/Image/ProductImage';

vi.mock('@components/Product/Image/ProductImage');

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    oldPrice: 150,
    price: 100,
  };
  const link = '/product/1';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders product details correctly', () => {
    ProductImage.mockImplementation(() => <img alt={product.name} />);
    const { getByText, getByAltText } = render(
      <Router>
        <ProductCard product={product} link={link} />
      </Router>,
    );

    const nameElement = getByText('Test Product');
    const priceElement = getByText(/100 грн/);
    const imgElement = getByAltText('Test Product');

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it('displays old price with strikethrough when applicable', () => {
    const { getByText } = render(
      <Router>
        <ProductCard product={product} link={link} />
      </Router>,
    );

    const oldPriceElement = getByText('150');
    expect(oldPriceElement.tagName).toBe('S');
    expect(oldPriceElement).toBeInTheDocument();
  });

  it('navigates to the correct link on click', () => {
    const { getByRole } = render(
      <Router>
        <ProductCard product={product} link={link} />
      </Router>,
    );

    const linkElement = getByRole('link');
    expect(linkElement).toHaveAttribute('href', link);
  });
});
