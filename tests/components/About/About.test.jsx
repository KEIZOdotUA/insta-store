import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import About from '@components/About/About';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

vi.mock('@contexts/Whitelabel/useWhitelabelContext', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('html-react-parser', () => ({
  __esModule: true,
  default: vi.fn((html) => html),
}));

describe('About', () => {
  it('default', () => {
    const mockWhitelabelData = {
      shop: {
        about: 'This is the about section',
      },
    };

    useWhitelabelContext.mockReturnValue(mockWhitelabelData);

    const { getByText } = render(<About />);

    expect(getByText('Про нас')).toBeInTheDocument();
    expect(getByText('This is the about section')).toBeInTheDocument();
  });
});
