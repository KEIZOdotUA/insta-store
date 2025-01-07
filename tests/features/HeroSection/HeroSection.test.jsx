import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import HeroSection from '@features/HeroSection/HeroSection';
import useSpecialOffers from '@features/HeroSection/useSpecialOffers';

vi.mock('@features/HeroSection/useSpecialOffers');
vi.mock('@components/ImageSlider/ImageSlider', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Image Slider</div>),
}));

describe('HeroSection', () => {
  useSpecialOffers.mockReturnValue([]);

  it('renders image slider', () => {
    const { getByText } = render(<HeroSection />);

    expect(getByText('Image Slider')).toBeInTheDocument();
  });
});
