import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import HomePage from '@pages/Home/HomePage';

vi.mock('@features/HeroSection/HeroSection', () => ({
  __esModule: true,
  default: () => <div>HeroSection</div>,
}));

vi.mock('@features/Bio/Bio', () => ({
  __esModule: true,
  default: () => <div>Bio</div>,
}));

vi.mock('@features/Product/List/ProductsList', () => ({
  __esModule: true,
  default: ({ short, filtered }) => (
    <div>
      {`ProductsList - short: ${short ? 'true' : 'false'}, filtered: ${filtered ? 'true' : 'false'}`}
    </div>
  ),
}));

describe('Home', () => {
  it('default', async () => {
    const { getByText } = render(<HomePage />);

    expect(getByText('HeroSection')).toBeInTheDocument();
    expect(getByText('ProductsList - short: true, filtered: true')).toBeInTheDocument();
    expect(getByText('Bio')).toBeInTheDocument();
    expect(getByText('ProductsList - short: true, filtered: false')).toBeInTheDocument();
  });
});
