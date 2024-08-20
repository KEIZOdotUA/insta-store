import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import { render } from '@testing-library/react';
import ContactUs from '@components/Menu/ContactUs/ContactUs';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

vi.mock('@contexts/Whitelabel/useWhitelabelContext');

describe('ContactUs', () => {
  it('instagram', () => {
    useWhitelabelContext.mockReturnValue({
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
    });

    const { getByAltText, getByText } = render(<ContactUs />);

    const instagramLink = getByText('@shopname');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink.closest('a')).toHaveAttribute('href', 'https://instagram.com/shopname');
    expect(getByAltText('instagram')).toBeInTheDocument();
  });

  it('mail', () => {
    useWhitelabelContext.mockReturnValue({
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
    });

    const { getByAltText, getByText } = render(<ContactUs />);

    const mailLink = getByText('contact@shop.com');
    expect(mailLink).toBeInTheDocument();
    expect(mailLink.closest('a')).toHaveAttribute('href', 'mailto:contact@shop.com');
    expect(getByAltText('mail')).toBeInTheDocument();
  });

  it('facebook', () => {
    useWhitelabelContext.mockReturnValue({
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
    });

    const { getByAltText, getByText } = render(<ContactUs />);

    const facebookLink = getByText('Shop Name');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink.closest('a')).toHaveAttribute('href', 'https://facebook.com/shopname');
    expect(getByAltText('facebook')).toBeInTheDocument();
  });

  it('phone', () => {
    useWhitelabelContext.mockReturnValue({
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
    });

    const { getByAltText, getByText } = render(<ContactUs />);

    const phoneLink = getByText('+123456789');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+123456789');
    expect(getByAltText('phone')).toBeInTheDocument();
  });

  it('no contact info', () => {
    useWhitelabelContext.mockReturnValue({
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
    });

    const { queryByAltText, queryByText } = render(<ContactUs />);

    expect(queryByText('@shopname')).toBeNull();
    expect(queryByText('contact@shop.com')).toBeNull();
    expect(queryByText('Shop Name')).toBeNull();
    expect(queryByText('+123456789')).toBeNull();

    expect(queryByAltText('instagram')).toBeNull();
    expect(queryByAltText('mail')).toBeNull();
    expect(queryByAltText('facebook')).toBeNull();
    expect(queryByAltText('phone')).toBeNull();
  });
});
