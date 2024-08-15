import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Logo from '@components/Logo/Logo';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

vi.mock('@contexts/Whitelabel/useWhitelabelContext');

describe('Logo', () => {
  const mockReload = vi.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('default', () => {
    const whitelabelMock = {
      shop: {
        logo: 'logo-src.png',
        name: 'Test Shop',
      },
    };

    useWhitelabelContext.mockReturnValue(whitelabelMock);

    const { getByText, getByAltText } = render(<Logo />);

    const logoImage = getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'logo-src.png');
    expect(logoImage).toHaveAttribute('height', '40px');

    const shopName = getByText('Test Shop');
    expect(shopName).toBeInTheDocument();
  });

  it('onClick', () => {
    const whitelabelMock = {
      shop: {
        logo: 'logo-src.png',
        name: 'Test Shop',
      },
    };

    useWhitelabelContext.mockReturnValue(whitelabelMock);

    const { getByRole } = render(<Logo />);

    const logoDiv = getByRole('button');

    fireEvent.click(logoDiv);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });

  it('onKeyDown', () => {
    const whitelabelMock = {
      shop: {
        logo: 'logo-src.png',
        name: 'Test Shop',
      },
    };

    useWhitelabelContext.mockReturnValue(whitelabelMock);

    const { getByRole } = render(<Logo />);

    const logoDiv = getByRole('button');

    fireEvent.keyDown(logoDiv, { key: 'Enter', code: 'Enter' });

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
