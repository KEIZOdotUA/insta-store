import { render } from '@testing-library/react';
import {
  vi,
  describe,
  it,
  expect,
} from 'vitest';
import AboutPage from '@pages/About/AboutPage';
import useAppContext from '@contexts/App/useAppContext';

vi.mock('@contexts/App/useAppContext', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('@components//Heading/Heading', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <h1>{children}</h1>),
}));

describe('About', () => {
  it('renders the heading and parsed about content', () => {
    const mockWhitelabelData = {
      whitelabel: {
        shop: {
          about: '<p>Інформація ро нас</p>',
        },
      },
    };

    useAppContext.mockReturnValue(mockWhitelabelData);

    const { getByText, container } = render(<AboutPage />);

    expect(getByText('ПРО НАС')).toBeInTheDocument();
    expect(container.querySelector('p').textContent).toBe('Інформація ро нас');
  });
});
