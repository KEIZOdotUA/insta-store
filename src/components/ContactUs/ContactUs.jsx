import './ContactUs.css';
import PropTypes from 'prop-types';
import useAppContext from '@contexts/App/useAppContext';
import InstagramSvg from '@assets/instagram.svg';
import MailSvg from '@assets/mail.svg';
import FacebookSvg from '@assets/facebook.svg';
import PhoneSvg from '@assets/phone.svg';

function ContactUs({ title, separated }) {
  const { whitelabel } = useAppContext();

  return (
    <div className={`contact-us ${separated ? 'separated' : ''}`}>
      <strong>{title}</strong>
      {whitelabel.shop.contacts.instagram.link.length > 0
        && whitelabel.shop.contacts.instagram.name.length > 0
        && (
          <p>
            <a href={whitelabel.shop.contacts.instagram.link}>
              <InstagramSvg />
              {`@${whitelabel.shop.contacts.instagram.name}`}
            </a>
          </p>
        )}
      {whitelabel.shop.contacts.mail.length > 0
        && (
        <p>
          <a href={`mailto:${whitelabel.shop.contacts.mail}`}>
            <MailSvg />
            {whitelabel.shop.contacts.mail}
          </a>
        </p>
        )}
      {whitelabel.shop.contacts.facebook.link.length > 0
        && whitelabel.shop.contacts.facebook.name.length > 0
        && (
          <p>
            <a href={whitelabel.shop.contacts.facebook.link}>
              <FacebookSvg />
              {`${whitelabel.shop.contacts.facebook.name}`}
            </a>
          </p>
        )}
      {whitelabel.shop.contacts.phone.length > 0
        && (
        <p>
          <a href={`tel:${whitelabel.shop.contacts.phone}`}>
            <PhoneSvg />
            {whitelabel.shop.contacts.phone}
          </a>
        </p>
        )}
    </div>
  );
}

ContactUs.defaultProps = {
  separated: false,
};

ContactUs.propTypes = {
  title: PropTypes.string.isRequired,
  separated: PropTypes.bool,
};

export default ContactUs;
