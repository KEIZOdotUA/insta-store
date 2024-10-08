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
import useShoppingContext from '@contexts/Shopping/useShoppingContext';

vi.mock('@contexts/Shopping/useShoppingContext');

vi.mock('@components/Product/Image/ProductImage', () => ({
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
  const mockItem = { id: 1, name: 'Test Product' };
  const mockRemoveWishListItem = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useShoppingContext.mockReturnValue({ removeWishListItem: mockRemoveWishListItem });
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ categorySlug: 'test-category' });
    vi.clearAllMocks();
  });

  it('default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    expect(getByText('ProductImage')).toBeInTheDocument();
    expect(getByText(mockItem.name)).toBeInTheDocument();
  });

  it('image onClick', () => {
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(mockItem.name));
    expect(mockNavigate).toHaveBeenCalledWith(`/test-category/${mockItem.id}`);
  });

  it('delete onClick', () => {
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('видалити'));
    expect(mockRemoveWishListItem).toHaveBeenCalledWith(mockItem.id);
  });

  it('image onKeyDown', () => {
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.keyDown(getByText(mockItem.name), { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockNavigate).toHaveBeenCalledWith(`/test-category/${mockItem.id}`);
  });

  it('delete onKeyDown', () => {
    const { getByText } = render(
      <MemoryRouter>
        <WishListItem item={mockItem} />
      </MemoryRouter>,
    );

    fireEvent.keyDown(getByText('видалити'), { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockRemoveWishListItem).toHaveBeenCalledWith(mockItem.id);
  });
});
