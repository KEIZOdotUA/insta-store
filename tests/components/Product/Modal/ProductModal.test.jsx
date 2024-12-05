import {
  vi,
  describe,
  it,
  beforeEach,
  afterEach,
  expect,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ProductModal from '@components/Product/Modal/ProductModal';
import useAppContext from '@contexts/App/useAppContext';
import {
  MemoryRouter,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import Modal from '@components/shared/Modal/Modal';
import ProductImage from '@components/Product/Image/ProductImage';
import InfoHeader from '@components/Product/Modal/InfoHeader/InfoHeader';
import ActionButton from '@components/Product/Modal/ActionButton/ActionButton';
import SizePicker from '@components/shared/SizePicker/SizePicker';
import { trackViewItemEvent } from '@helpers/googleAnalyticsGA4';
import useProductNavigation from '@helpers/useProductNavigation';

vi.mock('@contexts/App/useAppContext');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});
vi.mock('@components/shared/Modal/Modal');
vi.mock('@components/Product/Image/ProductImage');
vi.mock('@components/Product/Modal/InfoHeader/InfoHeader');
vi.mock('@components/Product/Modal/ActionButton/ActionButton');
vi.mock('@components/shared/SizePicker/SizePicker');
vi.mock('@helpers/googleAnalyticsGA4');
vi.mock('@helpers/useProductNavigation');

describe('ProductModal', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    available: true,
    sizes: [0, 1, 2],
    sizeHint: 'Choose your size',
    description: 'Test description',
    feature: 'Sale',
  };

  const mockGetProductListLink = vi.fn().mockReturnValue('/products');
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      products: [mockProduct],
    });

    useParams.mockReturnValue({ productId: '1' });
    useSearchParams.mockReturnValue([new URLSearchParams()]);
    Modal.mockImplementation(({ children, onClose }) => (
      <div>
        <button onClick={onClose} type="button">Close</button>
        {children}
      </div>
    ));
    ProductImage.mockImplementation(() => <img alt="product" />);
    InfoHeader.mockImplementation(() => <div>Info Header</div>);
    ActionButton.mockImplementation(() => <div>Action Button</div>);
    SizePicker.mockImplementation(() => <div>Size Picker</div>);
    useProductNavigation.mockReturnValue({ getProductListLink: mockGetProductListLink });
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders product details correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(getByText('Info Header')).toBeInTheDocument();
    expect(getByText('Action Button')).toBeInTheDocument();
    expect(getByText('Size Picker')).toBeInTheDocument();
  });

  it('dispatches "view_item" event when product is displayed', () => {
    render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(trackViewItemEvent).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onClose and navigates to the product list', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });

  it('does not render if productId is not provided', () => {
    useParams.mockReturnValue({});

    const { queryByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(queryByText('Info Header')).not.toBeInTheDocument();
  });

  it('does not render if product is not found', () => {
    useParams.mockReturnValue({ productId: '999' });

    const { queryByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(queryByText('Info Header')).not.toBeInTheDocument();
  });

  it('does not set size if sizeParam is not in product sizes', () => {
    useSearchParams.mockReturnValue([new URLSearchParams({ size: '3' })]);

    const { queryByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(queryByText('Size Picker')).toBeInTheDocument();
    expect(SizePicker).toHaveBeenCalledWith(
      expect.objectContaining({ selectedSize: 0 }),
      {},
    );
  });

  it('sets size if sizeParam is valid', () => {
    useSearchParams.mockReturnValue([new URLSearchParams({ size: '1' })]);

    const { queryByText } = render(
      <MemoryRouter>
        <ProductModal />
      </MemoryRouter>,
    );

    expect(queryByText('Size Picker')).toBeInTheDocument();
    expect(SizePicker).toHaveBeenCalledWith(
      expect.objectContaining({ selectedSize: 1 }),
      {},
    );
  });
});
