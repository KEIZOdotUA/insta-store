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
  const mockWhitelabel = {
    shop: {
      name: 'Test Shop',
    },
  };

  beforeEach(() => {
    useAppContext.mockReturnValue({ whitelabel: mockWhitelabel });
    window.scrollTo = vi.fn();
  });

  it('default', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const linkElement = getByText('Test Shop');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/');
  });

  it('onClick', () => {
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
