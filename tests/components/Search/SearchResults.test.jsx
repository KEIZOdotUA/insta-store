import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from '@components/Search/Results/SearchResults';

vi.mock('@components/Search/Results/Item/SearchResultsItem', () => ({
  __esModule: true,
  default: ({ item }) => <li>{item.name}</li>,
}));

describe('SearchResults', () => {
  const mockItems = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  it('renders the correct number of SearchResultsItem components', () => {
    render(<SearchResults items={mockItems} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockItems.length);
  });

  it('renders each item with the correct name', () => {
    render(<SearchResults items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('renders an empty list when items prop is an empty array', () => {
    render(<SearchResults items={[]} />);

    const list = screen.getByRole('list');
    expect(list).toBeEmptyDOMElement();
  });
});
