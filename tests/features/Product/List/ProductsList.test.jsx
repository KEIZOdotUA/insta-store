import { render } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import ProductsList from '@features/Product/List/ProductsList';
import useFilteredShortList from '@features/Product/List/Short/useFilteredShortList';
import useNonFilteredShortList from '@features/Product/List/Short/useNonFilteredShortList';

vi.mock('@features/Product/List/Short/useFilteredShortList');
vi.mock('@features/Product/List/Short/useNonFilteredShortList');

vi.mock('@features/Product/List/Full/FullList', () => ({
  __esModule: true,
  default: () => (
    <div>Full list</div>
  ),
}));

vi.mock('@features/Product/List/Short/ShortList', () => ({
  __esModule: true,
  default: ({ title }) => (
    <div>{title}</div>
  ),
}));

describe('ProductsList', () => {
  beforeEach(() => {
    useFilteredShortList.mockReturnValue({
      active: true,
      title: 'Filtered List',
      items: ['item1', 'item2'],
      linkToAllItems: '/filtered-products',
    });
    useNonFilteredShortList.mockReturnValue({
      items: ['item3', 'item4'],
    });
  });

  it('renders FullList when short is false', () => {
    const { getByText } = render(<ProductsList short={false} />);

    expect(getByText('Full list')).toBeInTheDocument();
  });

  it('renders filtered ShortList when short, filtered and activeFilteredList are true', () => {
    const { getByText } = render(<ProductsList short filtered />);

    expect(getByText('Filtered List')).toBeInTheDocument();
  });

  it('renders non-filtered ShortList short is true and filtered is false', () => {
    const { getByText } = render(<ProductsList short />);

    expect(getByText('Всі прикраси')).toBeInTheDocument();
  });

  it('renders non-filtered ShortList when short and filtered are true but activeFilteredList is false', () => {
    useFilteredShortList.mockReturnValue({
      active: false,
      title: 'Filtered List',
      items: ['item1', 'item2'],
      linkToAllItems: '/filtered-products',
    });

    const { getByText } = render(<ProductsList short />);

    expect(getByText('Всі прикраси')).toBeInTheDocument();
  });
});
