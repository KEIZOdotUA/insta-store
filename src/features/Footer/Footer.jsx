import './Footer.css';
import { Link } from 'react-router-dom';
import Logo from '@features/Logo/Logo';
import ContactUs from '@features/ContactUs/ContactUs';

const footerLinks = [
  {
    title: 'Доставка та оплата',
    url: '/delivery-and-payment',
  },
  {
    title: 'Повернення та обмін',
    url: '/returns',
  },
  {
    title: 'Про нас',
    url: '/about',
  },
];

function Footer() {
  return (
    <footer>
      <div className="footer__logo">
        <Logo />
      </div>
      <div>
        <nav className="footer__nav">
          <ul>
            {footerLinks.map((link) => (
              <li key={link.title}>
                <Link to={link.url} onClick={() => window.scrollTo(0, 0)}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer__contact-us">
        <ContactUs title="Зв'язок з нами" />
      </div>
    </footer>
  );
}

export default Footer;
