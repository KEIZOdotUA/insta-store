import './ContactUs.css';
import useAppContext from '@contexts/App/useAppContext';
import InstagramSvg from '@assets/instagram.svg';
import MailSvg from '@assets/mail.svg';
import FacebookSvg from '@assets/facebook.svg';
import PhoneSvg from '@assets/phone.svg';

function ContactUs() {
  const { whitelabel } = useAppContext();

  return (
    <div id="contact-us">
      <strong>Зв&apos;язок з нами</strong>
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

export default ContactUs;
