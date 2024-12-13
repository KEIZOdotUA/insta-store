import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import WishList from '@features/WishList/WishList';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import Modal from '@components/shared/Modal/Modal';
import WishListItem from '@features/WishList/Item/WishListItem';

vi.mock('@contexts/Purchase/usePurchaseContext');
vi.mock('@components/shared/Modal/Modal');
vi.mock('@features/WishList/Item/WishListItem');

describe('WishList', () => {
  const mockOnClose = vi.fn();
  const mockWishListItems = [
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
  ];

  beforeEach(() => {
    usePurchaseContext.mockReturnValue({
      getWishList: vi.fn().mockReturnValue(mockWishListItems),
    });

    Modal.mockImplementation(({ children }) => <div>{children}</div>);
    WishListItem.mockImplementation(({ item }) => <div>{item.name}</div>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('with items', () => {
    const { getByText } = render(<WishList visible onClose={mockOnClose} />);

    expect(getByText('Вподобане')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('without items', () => {
    usePurchaseContext.mockReturnValue({
      getWishList: vi.fn().mockReturnValue([]),
    });

    const { getByText } = render(<WishList visible onClose={mockOnClose} />);

    expect(getByText('Поки що тут порожньо')).toBeInTheDocument();
  });

  it('is not visible', () => {
    const { container } = render(<WishList visible={false} onClose={mockOnClose} />);

    expect(container).toBeEmptyDOMElement();
  });
});
