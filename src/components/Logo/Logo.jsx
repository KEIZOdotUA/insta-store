import './Logo.css';
import { Link } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';

function Logo() {
  const { whitelabel } = useAppContext();

  return (
    <div id="logo">
      <Link to="/" onClick={() => window.scrollTo(0, 0)}>{whitelabel.shop.name}</Link>
    </div>
  );
}

export default Logo;
