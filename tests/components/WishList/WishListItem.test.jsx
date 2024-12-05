import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';
import WishListItem from '@components/WishList/Item/WishListItem';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';

vi.mock('@contexts/Purchase/usePurchaseContext');

vi.mock('@features/Product/Image/ProductImage', () => ({
  __esModule: true,
  default: vi.fn(() => <div>ProductImage</div>),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('WishListItem', () => {
  const mockItem = { id: 1, name: 'Test Product', price: 500 };
  const mockRemoveWishListItem = vi.fn();
  const mockNavigate = vi.fn();
  const mockFindCartItem = vi.fn();

  beforeEach(() => {
    usePurchaseContext.mockReturnValue({
      removeWishListItem: mockRemoveWishListItem,
      findCartItem: mockFindCartItem,
    });
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ categorySlug: 'test-category' });
    vi.clearAllMocks();
  });

  it('default', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    expect(getByText('ProductImage')).toBeInTheDocument();
    expect(getByText(mockItem.name)).toBeInTheDocument();
    expect(getByText(`${mockItem.price} грн`)).toBeInTheDocument();
    expect(getByText('додати в кошик')).toBeInTheDocument();
  });

  it('item in the cart', () => {
    mockFindCartItem.mockReturnValue(mockItem);
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    expect(getByText('додано в кошик')).toBeInTheDocument();
  });

  it('on image click', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(mockItem.name));
    expect(mockNavigate).toHaveBeenCalledWith(`/test-category/${mockItem.id}`);
  });

  it('on delete', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('видалити'));
    expect(mockRemoveWishListItem).toHaveBeenCalledWith(mockItem.id);
  });

  it('on image key press', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.keyDown(getByText(mockItem.name), { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockNavigate).toHaveBeenCalledWith(`/test-category/${mockItem.id}`);
  });

  it('on delete key press', () => {
    mockFindCartItem.mockReturnValue(null);
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.keyDown(getByText('видалити'), { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockRemoveWishListItem).toHaveBeenCalledWith(mockItem.id);
  });
});
