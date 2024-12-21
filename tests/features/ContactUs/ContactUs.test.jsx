import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import ContactUs from '@features/ContactUs/ContactUs';
import useAppContext from '@context/useAppContext';

vi.mock('@context/useAppContext');

vi.mock('@assets/instagram.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>instagram</span>),
}));

vi.mock('@assets/mail.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>mail</span>),
}));

vi.mock('@assets/facebook.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>facebook</span>),
}));

vi.mock('@assets/phone.svg', () => ({
  __esModule: true,
  default: vi.fn(() => <span>phone</span>),
}));

describe('ContactUs', () => {
  it('instagram', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          contacts: {
            instagram: {
              link: 'https://instagram.com/shopname',
              name: 'shopname',
            },
            mail: '',
            facebook: {
              link: '',
              name: '',
            },
            phone: '',
          },
        },
      },
    });

    const { getByText } = render(<ContactUs title="title" />);

    const instagramLink = getByText('@shopname');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink.closest('a')).toHaveAttribute('href', 'https://instagram.com/shopname');
    expect(getByText('instagram')).toBeInTheDocument();
  });

  it('mail', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          contacts: {
            instagram: {
              link: '',
              name: '',
            },
            mail: 'contact@shop.com',
            facebook: {
              link: '',
              name: '',
            },
            phone: '',
          },
        },
      },
    });

    const { getByText } = render(<ContactUs title="title" />);

    const mailLink = getByText('contact@shop.com');
    expect(mailLink).toBeInTheDocument();
    expect(mailLink.closest('a')).toHaveAttribute('href', 'mailto:contact@shop.com');
    expect(getByText('mail')).toBeInTheDocument();
  });

  it('facebook', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          contacts: {
            instagram: {
              link: '',
              name: '',
            },
            mail: '',
            facebook: {
              link: 'https://facebook.com/shopname',
              name: 'Shop Name',
            },
            phone: '',
          },
        },
      },
    });

    const { getByText } = render(<ContactUs title="title" />);

    const facebookLink = getByText('Shop Name');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink.closest('a')).toHaveAttribute('href', 'https://facebook.com/shopname');
    expect(getByText('facebook')).toBeInTheDocument();
  });

  it('phone', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          contacts: {
            instagram: {
              link: '',
              name: '',
            },
            mail: '',
            facebook: {
              link: '',
              name: '',
            },
            phone: '+123456789',
          },
        },
      },
    });

    const { getByText } = render(<ContactUs title="title" />);

    const phoneLink = getByText('+123456789');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+123456789');
    expect(getByText('phone')).toBeInTheDocument();
  });

  it('no contact info', () => {
    useAppContext.mockReturnValue({
      whitelabel: {
        shop: {
          contacts: {
            instagram: {
              link: '',
              name: '',
            },
            mail: '',
            facebook: {
              link: '',
              name: '',
            },
            phone: '',
          },
        },
      },
    });

    const { queryByText } = render(<ContactUs title="title" />);

    expect(queryByText('@shopname')).toBeNull();
    expect(queryByText('contact@shop.com')).toBeNull();
    expect(queryByText('Shop Name')).toBeNull();
    expect(queryByText('+123456789')).toBeNull();

    expect(queryByText('instagram')).toBeNull();
    expect(queryByText('mail')).toBeNull();
    expect(queryByText('facebook')).toBeNull();
    expect(queryByText('phone')).toBeNull();
  });
});
