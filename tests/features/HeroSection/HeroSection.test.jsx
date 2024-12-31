import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import HeroSection from '@features/HeroSection/HeroSection';
import useAppContext from '@context/useAppContext';

vi.mock('@context/useAppContext');

describe('HeroSection', () => {
  it('renders the hero image', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          heroSection: {
            imgSrc: 'https://mockstorage.com/hero.jpg',
          },
          weAre: 'Test We Are',
        },
      },
    });

    const { getByAltText } = render(<HeroSection />);
    const imgElement = getByAltText('Test We Are');

    expect(imgElement).toBeInTheDocument();
  });

  it('does not renders the hero image', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          heroSection: {
            imgSrc: '',
          },
        },
        weAre: 'Test We Are',
      },
    });

    const { queryByAltText } = render(<HeroSection />);
    const imgElement = queryByAltText('Test We Are');

    expect(imgElement).not.toBeInTheDocument();
  });
});
