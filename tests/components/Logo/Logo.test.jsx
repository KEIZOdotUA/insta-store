import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '@components/Logo/Logo';
import useAppContext from '@contexts/App/useAppContext';

vi.mock('@contexts/App/useAppContext', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('Logo', () => {
  it('default', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          name: 'Test Shop',
        },
      },
    });

    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    expect(getByText('Test Shop')).toBeInTheDocument();
  });

  it('Link', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          name: 'Test Shop',
        },
      },
    });

    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const linkElement = getByText('Test Shop').closest('a');
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
