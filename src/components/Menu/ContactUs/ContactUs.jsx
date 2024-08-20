import './ContactUs.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

function ContactUs() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="contact-us">
      <strong>Зв&apos;язок з нами</strong>
      {whitelabel.shop.contacts.instagram.link.length > 0
        && whitelabel.shop.contacts.instagram.name.length > 0
        && (
          <p>
            <a href={whitelabel.shop.contacts.instagram.link}>
              <img src="./instagram.svg" alt="instagram" />
              {`@${whitelabel.shop.contacts.instagram.name}`}
            </a>
          </p>
        )}
      {whitelabel.shop.contacts.mail.length > 0
        && (
        <p>
          <a href={`mailto:${whitelabel.shop.contacts.mail}`}>
            <img src="./mail.svg" alt="mail" />
            {whitelabel.shop.contacts.mail}
          </a>
        </p>
        )}
      {whitelabel.shop.contacts.facebook.link.length > 0
        && whitelabel.shop.contacts.facebook.name.length > 0
        && (
          <p>
            <a href={whitelabel.shop.contacts.facebook.link}>
              <img src="./facebook.svg" alt="facebook" />
              {`${whitelabel.shop.contacts.facebook.name}`}
            </a>
          </p>
        )}
      {whitelabel.shop.contacts.phone.length > 0
        && (
        <p>
          <a href={`tel:${whitelabel.shop.contacts.phone}`}>
            <img src="./phone.svg" alt="phone" />
            {whitelabel.shop.contacts.phone}
          </a>
        </p>
        )}
    </div>
  );
}

export default ContactUs;
