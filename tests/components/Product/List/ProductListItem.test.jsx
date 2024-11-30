import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductCard from '@components/Product/List/Item/ProductListItem';
import ProductImage from '@components/Product/Image/ProductImage';

vi.mock('@components/Product/Image/ProductImage');

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    oldPrice: 150,
    price: 100,
    feature: 'Featured Item',
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
    const priceElement = getByText('100 грн');
    const imgElement = getByAltText('Test Product');

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it('renders the feature text when provided', () => {
    const { getByText } = render(
      <Router>
        <ProductCard product={product} link={link} />
      </Router>,
    );

    const featureElement = getByText('Featured Item');
    expect(featureElement).toBeInTheDocument();
    expect(featureElement).toHaveClass('product-card__featured');
  });

  it('applies the discounted class to the price when applicable', () => {
    const { getByText } = render(
      <Router>
        <ProductCard product={product} link={link} />
      </Router>,
    );

    const discountedPriceElement = getByText('100 грн');
    expect(discountedPriceElement).toHaveClass('product-card__price discounted');
  });

  it('displays the old price with strikethrough when discounted', () => {
    const { getByText } = render(
      <Router>
        <ProductCard product={product} link={link} />
      </Router>,
    );

    const oldPriceElement = getByText('150 грн');
    expect(oldPriceElement.tagName).toBe('S');
    expect(oldPriceElement).toBeInTheDocument();
  });

  it('does not display old price if no discount is applied', () => {
    const nonDiscountedProduct = { ...product, oldPrice: 100 };
    const { queryByText } = render(
      <Router>
        <ProductCard product={nonDiscountedProduct} link={link} />
      </Router>,
    );

    const oldPriceElement = queryByText('100 грн', { selector: 's' });
    expect(oldPriceElement).not.toBeInTheDocument();
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
