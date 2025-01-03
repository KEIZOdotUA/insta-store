import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import Search from '@features/Search/Search';
import filterProductsByQuery from '@helpers/filterProductsByQuery';
import { trackSearchEvent } from '@helpers/googleAnalyticsGA4';

vi.mock('@components//TextInput/TextInput', () => ({
  __esModule: true,
  default: ({ onChange, value }) => (
    <input data-testid="search-input" placeholder="пошук" value={value} onChange={onChange} />
  ),
}));

vi.mock('@components//Button/Button', () => ({
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

vi.mock('@features/Search/Overlay/SearchOverlay', () => ({
  __esModule: true,
  default: ({ children, visible }) => (
    <div data-testid="search-overlay" style={{ display: visible ? 'block' : 'none' }}>
      {children}
    </div>
  ),
}));

vi.mock('@features/Search/Results/SearchResults', () => ({
  __esModule: true,
  default: ({ items }) => (
    <ul data-testid="search-results">
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  ),
}));

vi.mock('@helpers/filterProductsByQuery', () => ({
  __esModule: true,
  default: vi.fn(() => []),
}));

vi.mock('@helpers/constValues', () => ({
  __esModule: true,
  animationDuration: 1,
}));
vi.mock('@helpers/googleAnalyticsGA4');

const mockSearchToggler = vi.fn();
const mockProducts = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
];
const mockTrackSearchEvent = vi.fn();

vi.mock('@context/useAppContext', () => ({
  __esModule: true,
  default: () => ({ products: mockProducts }),
}));

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    trackSearchEvent.mockImplementation(mockTrackSearchEvent);
  });

  it('renders input, close button, and overlays when visible', () => {
    render(<Search visible searchToggler={mockSearchToggler} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    expect(screen.getByTestId('search-overlay')).toHaveStyle('display: block');
  });

  it('clears search results when input is cleared', () => {
    render(<Search visible searchToggler={mockSearchToggler} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Product' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('search-results').children.length).toBe(0);
  });

  it('calls searchToggler and resets search on close button click', async () => {
    render(<Search visible searchToggler={mockSearchToggler} />);
    const closeButton = screen.getByTestId('close-button');

    fireEvent.click(closeButton);
    expect(mockSearchToggler).toHaveBeenCalledTimes(1);

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1);
      });
    });

    expect(screen.getByTestId('search-input').value).toBe('');
    expect(screen.queryByTestId('search-results').children.length).toBe(0);
  });

  it('updates search results based on input change', () => {
    filterProductsByQuery.mockReturnValue([mockProducts[0]]);

    render(<Search visible searchToggler={mockSearchToggler} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Product' } });

    expect(input.value).toBe('Product');
    expect(filterProductsByQuery).toHaveBeenCalledWith(mockProducts, 'Product');
    expect(screen.getByTestId('search-results').children.length).toBe(1);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    trackSearchEvent.mockImplementation(mockTrackSearchEvent);
  });
});
