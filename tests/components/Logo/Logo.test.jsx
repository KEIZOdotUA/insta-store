import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '@components/Logo/Logo';
import useAppContext from '@contexts/App/useAppContext';

vi.mock('@contexts/App/useAppContext');

describe('Logo', () => {
  const mockWhitelabelWithLogo = {
    shop: {
      name: 'Test Shop',
      logo: 'https://example.com/logo.png',
    },
  };

  const mockWhitelabelWithoutLogo = {
    shop: {
      name: 'Test Shop',
      logo: '',
    },
  };

  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders with logo image when logo URL is present', () => {
    useAppContext.mockReturnValue({ whitelabel: mockWhitelabelWithLogo });
    const { getByAltText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const logoImage = getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'https://example.com/logo.png');
  });

  it('renders with shop name when logo URL is absent', () => {
    useAppContext.mockReturnValue({ whitelabel: mockWhitelabelWithoutLogo });
    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const linkElement = getByText('Test Shop');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/');
  });

  it('calls scrollTo on link click', () => {
    useAppContext.mockReturnValue({ whitelabel: mockWhitelabelWithoutLogo });
    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const linkElement = getByText('Test Shop');
    fireEvent.click(linkElement);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
