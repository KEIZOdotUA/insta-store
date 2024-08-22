import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from 'vitest';
import { render, waitFor } from '@testing-library/react';
import AppContextProvider from '@contexts/App/AppContextProvider';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: (callback) => callback(),
  };
});

describe('AppContextProvider', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  it('renders loading state initially', () => {
    mockFetch.mockReturnValue(
      new Promise(() => {
        // Never resolves
      }),
    );

    const { getByText } = render(
      <AppContextProvider>
        <div>Child Component</div>
      </AppContextProvider>,
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders children after successful data fetch', async () => {
    const mockData = { key: 'value' };
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const { getByText } = render(
      <AppContextProvider>
        <div>Child Component</div>
      </AppContextProvider>,
    );

    await waitFor(() => expect(getByText('Child Component')).toBeTruthy());
  });

  it('renders loading state if data fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Fetch error'));

    const { getByText } = render(
      <AppContextProvider>
        <div>Child Component</div>
      </AppContextProvider>,
    );

    await waitFor(() => expect(getByText('Loading...')).toBeTruthy());
  });
});
