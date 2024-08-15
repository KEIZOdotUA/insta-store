import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ProductModal from '@components/Product/Modal/ProductModal';
import useCartContext from '@contexts/Cart/useCartContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

vi.mock('@components/Product/Image/ProductImage', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Image</div>),
}));
vi.mock('@contexts/Cart/useCartContext');
vi.mock('@helpers/dispatchTrackingEvent', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('ProductModal', () => {
  const mockOnClose = vi.fn();
  const mockAddItem = vi.fn();
  const mockFindCartItem = vi.fn(() => null);

  const product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    category: 1,
    sizes: [38, 40, 42],
    sizeHint: 'Please select a size',
  };

  beforeEach(() => {
    useCartContext.mockReturnValue({
      findCartItem: mockFindCartItem,
      addItem: mockAddItem,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('default', () => {
    const { getByText } = render(<ProductModal product={product} onClose={mockOnClose} />);

    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(`${product.price} грн`)).toBeInTheDocument();
    expect(getByText(product.description)).toBeInTheDocument();
  });

  it('adds product to cart', () => {
    const { getByText } = render(<ProductModal product={product} onClose={mockOnClose} />);

    const addButton = getByText(/додати в кошик/i);
    fireEvent.click(addButton);

    expect(mockAddItem).toHaveBeenCalledWith({ ...product, selectedSize: 38 });
    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'UAH',
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            index: 0,
            price: product.price,
            quantity: 1,
          },
        ],
      },
    });
  });

  it('item already in cart', () => {
    useCartContext.mockReturnValue({
      findCartItem: vi.fn(() => product),
      addItem: mockAddItem,
    });
    const { getByText } = render(<ProductModal product={product} onClose={mockOnClose} />);

    const addButton = getByText(/додано в кошик/i);
    expect(addButton).toHaveClass('disabled-button');

    fireEvent.click(addButton);
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('"продовжити покупки" button', () => {
    const { getByText } = render(<ProductModal product={product} onClose={mockOnClose} />);

    const closeButton = getByText(/продовжити покупки/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
