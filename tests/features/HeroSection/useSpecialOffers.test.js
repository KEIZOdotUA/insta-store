import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useSpecialOffers from '@features/HeroSection/useSpecialOffers';
import useAppContext from '@context/useAppContext';

vi.mock('@context/useAppContext');

const mockWhitelabelData = {
  whitelabel: {
    specialOffersUrl: '/some-url',
  },
};

const mockSpecialOffers = [{ id: 1, value: 'value' }];

describe('useSpecialOffers', () => {
  useAppContext.mockReturnValue(mockWhitelabelData);

  it('should fetch and return special offers', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockSpecialOffers),
    }));

    const { result } = renderHook(() => useSpecialOffers());

    await waitFor(() => {
      expect(result.current).toEqual(mockSpecialOffers);
    });

    expect(global.fetch).toHaveBeenCalledWith(mockWhitelabelData.whitelabel.specialOffersUrl);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if fetch fails', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));

    const { result } = renderHook(() => useSpecialOffers());

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });
});
