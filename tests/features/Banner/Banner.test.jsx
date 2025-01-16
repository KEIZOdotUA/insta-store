import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Banner from '@features/Banner/Banner';
import useBanner from '@features/Banner/useBanner';

vi.mock('@features/Banner/useBanner');

describe('Banner', () => {
  it('should not render when banner data is null', () => {
    useBanner.mockReturnValue(null);

    const { queryByRole } = render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>,
    );

    const bannerElement = queryByRole('link');
    expect(bannerElement).toBeNull();
  });

  it('should render when banner data is provided', () => {
    const mockBannerData = {
      link: '/test-link',
      backgroundColor: 'blue',
      color: 'white',
      text: 'Test Banner',
    };

    useBanner.mockReturnValue(mockBannerData);

    const { getByText, queryByRole } = render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>,
    );

    const bannerContent = getByText('Test Banner');
    expect(bannerContent).toBeInTheDocument();
    expect(queryByRole('link')).toHaveAttribute('href', '/test-link');
  });
});
