import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useBanner from '@features/Banner/useBanner';
import useAppContext from '@context/useAppContext';

vi.mock('@context/useAppContext');

const mockWhitelabelData = {
  whitelabel: {
    bannerUrl: '/some-url',
  },
};

const mockBanner = { value: 'value' };

describe('useBanner', () => {
  useAppContext.mockReturnValue(mockWhitelabelData);

  it('should fetch and return banner data', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockBanner),
    }));

    const { result } = renderHook(() => useBanner());

    await waitFor(() => {
      expect(result.current).toEqual(mockBanner);
    });

    expect(global.fetch).toHaveBeenCalledWith(mockWhitelabelData.whitelabel.bannerUrl);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return null if fetch fails', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));

    const { result } = renderHook(() => useBanner());

    await waitFor(() => {
      expect(result.current).toEqual(null);
    });
  });
});
