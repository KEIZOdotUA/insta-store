import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import WishList from '@components/WishList/WishList';
import useShoppingContext from '@contexts/Shopping/useShoppingContext';
import Modal from '@components/shared/Modal/Modal';
import WishListItem from '@components/WishList/Item/WishListItem';

vi.mock('@contexts/Shopping/useShoppingContext');
vi.mock('@components/shared/Modal/Modal');
vi.mock('@components/WishList/Item/WishListItem');

describe('WishList', () => {
  const mockOnClose = vi.fn();
  const mockWishListItems = [
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
  ];

  beforeEach(() => {
    useShoppingContext.mockReturnValue({
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

    expect(getByText('Список бажань')).toBeInTheDocument();
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('without items', () => {
    useShoppingContext.mockReturnValue({
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
