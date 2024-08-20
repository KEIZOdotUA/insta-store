import './Logo.css';
import { Link } from 'react-router-dom';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

function Logo() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="logo">
      <Link to="/">{whitelabel.shop.name}</Link>
    </div>
  );
}

export default Logo;
