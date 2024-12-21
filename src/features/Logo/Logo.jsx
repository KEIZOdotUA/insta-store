import './Logo.css';
import { Link } from 'react-router-dom';
import useAppContext from '@context/useAppContext';

function Logo() {
  const { whitelabel } = useAppContext();

  return (
    <div className="logo">
      <Link to="/" onClick={() => window.scrollTo(0, 0)}>
        {whitelabel.shop.logo.length
          ? <img src={whitelabel.shop.logo} alt="logo" />
          : whitelabel.shop.name}
      </Link>
    </div>
  );
}

export default Logo;
