import './ContactUs.css';
import PropTypes from 'prop-types';
import useAppContext from '@context/useAppContext';
import InstagramSvg from '@assets/instagram.svg';
import MailSvg from '@assets/mail.svg';
import FacebookSvg from '@assets/facebook.svg';
import PhoneSvg from '@assets/phone.svg';

function ContactUs({ title }) {
  const { whitelabel } = useAppContext();

  return (
    <div className="contact-us">
      <strong>{title}</strong>
      <ul>
        {whitelabel.shop.contacts.instagram.link.length > 0
          && whitelabel.shop.contacts.instagram.name.length > 0 && (
            <li>
              <a href={whitelabel.shop.contacts.instagram.link}>
                <InstagramSvg />
                {`@${whitelabel.shop.contacts.instagram.name}`}
              </a>
            </li>
        )}
        {whitelabel.shop.contacts.mail.length > 0 && (
          <li>
            <a href={`mailto:${whitelabel.shop.contacts.mail}`}>
              <MailSvg />
              {whitelabel.shop.contacts.mail}
            </a>
          </li>
        )}
        {whitelabel.shop.contacts.facebook.link.length > 0
          && whitelabel.shop.contacts.facebook.name.length > 0 && (
            <li>
              <a href={whitelabel.shop.contacts.facebook.link}>
                <FacebookSvg />
                {`${whitelabel.shop.contacts.facebook.name}`}
              </a>
            </li>
        )}
        {whitelabel.shop.contacts.phone.length > 0 && (
          <li>
            <a href={`tel:${whitelabel.shop.contacts.phone}`}>
              <PhoneSvg />
              {whitelabel.shop.contacts.phone}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

ContactUs.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ContactUs;
