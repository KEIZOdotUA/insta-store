import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
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
});
