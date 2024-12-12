import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResults from '@features/Search/Results/SearchResults';

vi.mock('@features/Search/Results/Item/SearchResultsItem', () => ({
  __esModule: true,
  default: ({ item }) => <div data-testid="search-result-item">{item.name}</div>,
}));

describe('SearchResults', () => {
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  const mockOnClose = vi.fn();

  it('renders SearchResultsItem components for each item', () => {
    render(
      <MemoryRouter>
        <SearchResults items={mockItems} query="test" onClose={mockOnClose} />
      </MemoryRouter>,
    );

    const resultItems = screen.getAllByTestId('search-result-item');
    expect(resultItems.length).toBe(2);
    expect(resultItems[0]).toHaveTextContent('Item 1');
    expect(resultItems[1]).toHaveTextContent('Item 2');
  });

  it('displays not found message when there are no items and query is not empty', () => {
    render(
      <MemoryRouter>
        <SearchResults items={[]} query="test" onClose={mockOnClose} />
      </MemoryRouter>,
    );

    expect(screen.getByText('нічого не знайдено')).toBeInTheDocument();
  });

  it('displays a link to more search results when there are items', () => {
    render(
      <MemoryRouter>
        <SearchResults items={mockItems} query="test" onClose={mockOnClose} />
      </MemoryRouter>,
    );

    const link = screen.getByText('ВСІ РЕЗУЛЬТАТИ ПОШУКУ');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/search?q=test');
  });

  it('calls onClose when the search results link is clicked', () => {
    render(
      <MemoryRouter>
        <SearchResults items={mockItems} query="test" onClose={mockOnClose} />
      </MemoryRouter>,
    );

    const link = screen.getByText('ВСІ РЕЗУЛЬТАТИ ПОШУКУ');
    fireEvent.click(link);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
