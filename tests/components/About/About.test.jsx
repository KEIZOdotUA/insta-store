import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import About from '@components/About/About';
import useAppContext from '@contexts/App/useAppContext';

vi.mock('@contexts/App/useAppContext', () => ({
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
      whitelabel: {
        shop: {
          about: 'This is the about section',
        },
      },
    };

    useAppContext.mockReturnValue(mockWhitelabelData);

    const { getByText } = render(<About />);

    expect(getByText('ПРО НАС')).toBeInTheDocument();
    expect(getByText('This is the about section')).toBeInTheDocument();
  });
});
