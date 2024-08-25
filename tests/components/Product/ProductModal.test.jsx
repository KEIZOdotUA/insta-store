import {
  vi,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useParams, useNavigate } from 'react-router-dom';
import ProductModal from '@components/Product/Modal/ProductModal';
import useAppContext from '@contexts/App/useAppContext';
import useCartContext from '@contexts/Cart/useCartContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';
import Modal from '@components/shared/Modal/Modal';
import ProductImage from '@components/Product/Image/ProductImage';
import Button from '@components/shared/Button/Button';
import SizePicker from '@components/shared/SizePicker/SizePicker';

vi.mock('@contexts/App/useAppContext');
vi.mock('@contexts/Cart/useCartContext');
vi.mock('@helpers/dispatchTrackingEvent');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});
vi.mock('@components/shared/Modal/Modal');
vi.mock('@components/Product/Image/ProductImage');
vi.mock('@components/shared/Button/Button');
vi.mock('@components/shared/SizePicker/SizePicker');

describe('ProductModal', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    available: true,
    sizes: ['S', 'M', 'L'],
    sizeHint: 'Choose your size',
    description: 'Test description',
  };

  beforeEach(() => {
    useAppContext.mockReturnValue({
      products: [mockProduct],
    });

    useCartContext.mockReturnValue({
      findCartItem: vi.fn().mockReturnValue(null),
      addItem: vi.fn(),
    });

    useParams.mockReturnValue({ productId: '1' });
    useNavigate.mockReturnValue(vi.fn());

    Modal.mockImplementation(({ children }) => <div>{children}</div>);
    ProductImage.mockImplementation(() => <img alt="product" />);
    Button.mockImplementation(({ children, onClick }) => <button type="button" onClick={onClick}>{children}</button>);
    SizePicker.mockImplementation(() => <div>Size Picker</div>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(getByText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(`${mockProduct.price} грн`)).toBeInTheDocument();
    expect(getByText(mockProduct.description)).toBeInTheDocument();
    expect(getByText('Size Picker')).toBeInTheDocument();
  });

  it('немає в наявності', () => {
    useAppContext.mockReturnValue({
      products: [{ ...mockProduct, available: false }],
    });

    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(getByText('немає в наявності')).toBeInTheDocument();
  });

  it('додано в кошик', () => {
    useCartContext.mockReturnValue({
      findCartItem: vi.fn().mockReturnValue(mockProduct),
      addItem: vi.fn(),
    });

    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(getByText('додано в кошик')).toBeInTheDocument();
  });

  it('add the product to the cart', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    const addToCartButton = getByText('додати в кошик');
    fireEvent.click(addToCartButton);

    expect(useCartContext().addItem).toHaveBeenCalledWith({
      ...mockProduct,
      selectedSize: 0,
    });
    expect(dispatchTrackingEvent).toHaveBeenCalledWith({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'UAH',
        value: mockProduct.price,
        items: [
          {
            item_id: mockProduct.id,
            item_name: mockProduct.name,
            index: 0,
            price: mockProduct.price,
            quantity: 1,
          },
        ],
      },
    });
  });

  it('navigates back', () => {
    const navigate = useNavigate();
    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    const continueShoppingButton = getByText('продовжити покупки');
    fireEvent.click(continueShoppingButton);

    expect(navigate).toHaveBeenCalledWith('/products');
  });
});
