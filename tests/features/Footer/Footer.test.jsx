import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '@features/Footer/Footer';

vi.mock('@features/Logo/Logo', () => ({
  __esModule: true,
  default: () => <div>Logo</div>,
}));

vi.mock('@features/ContactUs/ContactUs', () => ({
  __esModule: true,
  default: () => <div>Contact Us</div>,
}));

describe('Footer', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('renders the logo', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(getByText('Logo')).toBeInTheDocument();
  });

  it('renders the footer links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(getByText('Доставка та оплата')).toBeInTheDocument();
    expect(getByText('Повернення та обмін')).toBeInTheDocument();
    expect(getByText('Про нас')).toBeInTheDocument();
  });

  it('renders the contact us section', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(getByText('Contact Us')).toBeInTheDocument();
  });

  it('calls scrollTo on link click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Доставка та оплата'));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
