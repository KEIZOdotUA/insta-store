import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from '@components/Search/Search';
import filterProductsByQuery from '@helpers/filterProductsByQuery';

vi.mock('@components/shared/TextInput/TextInput', () => ({
  __esModule: true,
  default: ({ onChange, value }) => (
    <input
      data-testid="search-input"
      placeholder="пошук"
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock('@components/shared/Button/Button', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button
      data-testid="close-button"
      onClick={onClick}
      onKeyDown={onClick}
      type="button"
      tabIndex={0}
    >
      Close
    </button>
  ),
}));

vi.mock('@helpers/useHiddenOverflow', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('@helpers/filterProductsByQuery', () => ({
  __esModule: true,
  default: vi.fn(() => []),
}));

vi.mock('@components/Search/Results/SearchResults', () => ({
  __esModule: true,
  default: ({ items }) => (
    <ul data-testid="search-results">
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  ),
}));

const mockSearchToggler = vi.fn();
const mockProducts = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
];

vi.mock('@contexts/App/useAppContext', () => ({
  __esModule: true,
  default: () => ({ products: mockProducts }),
}));

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input, close button, and overlays when visible', () => {
    render(
      <MemoryRouter>
        <Search visible searchToggler={mockSearchToggler} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });

  it('calls searchToggler and resets search on close button click', () => {
    render(
      <MemoryRouter>
        <Search visible searchToggler={mockSearchToggler} />
      </MemoryRouter>,
    );

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockSearchToggler).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(screen.getByTestId('search-input')).toHaveValue('');
      expect(screen.queryByTestId('search-results').children.length).toBe(0);
    }, 250);
  });

  it('updates search results based on input change', () => {
    filterProductsByQuery.mockReturnValue([mockProducts[0]]);

    render(
      <MemoryRouter>
        <Search visible searchToggler={mockSearchToggler} />
      </MemoryRouter>,
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Product' } });

    expect(input).toHaveValue('Product');
    expect(filterProductsByQuery).toHaveBeenCalledWith(mockProducts, 'Product');
    expect(screen.getByTestId('search-results').children.length).toBe(1);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});
