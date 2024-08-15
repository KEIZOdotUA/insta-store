import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from 'vitest';
import { render, waitFor } from '@testing-library/react';
import WhitelabelContextProvider from '@contexts/Whitelabel/WhitelabelContextProvider';

// Partial mock for React, ensuring other exports are available
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useEffect: (callback) => callback(),
  };
});

describe('WhitelabelContextProvider', () => {
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
      <WhitelabelContextProvider>
        <div>Child Component</div>
      </WhitelabelContextProvider>,
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders children after successful data fetch', async () => {
    const mockData = { key: 'value' };
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    const { getByText } = render(
      <WhitelabelContextProvider>
        <div>Child Component</div>
      </WhitelabelContextProvider>,
    );

    await waitFor(() => expect(getByText('Child Component')).toBeTruthy());
  });

  it('renders loading state if data fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Fetch error'));

    const { getByText } = render(
      <WhitelabelContextProvider>
        <div>Child Component</div>
      </WhitelabelContextProvider>,
    );

    await waitFor(() => expect(getByText('Loading...')).toBeTruthy());
  });
});
