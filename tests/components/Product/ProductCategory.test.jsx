import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ProductCategory from '@components/Product/Category/ProductCategory';

describe('ProductCategory', () => {
  const mockOnClick = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('default', () => {
    const { getByText } = render(<ProductCategory name="Test" onClick={mockOnClick} />);
    const categoryElement = getByText('Test');

    expect(categoryElement).toBeInTheDocument();
    expect(categoryElement).toHaveClass('category-name');
  });

  it('onClick', () => {
    const { getByText } = render(<ProductCategory name="Test" onClick={mockOnClick} />);
    const categoryElement = getByText('Test');

    fireEvent.click(categoryElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const { getByText } = render(<ProductCategory name="Test" onClick={mockOnClick} />);
    const categoryElement = getByText('Test');

    fireEvent.keyDown(categoryElement, { key: 'Enter', code: 'Enter' });

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
