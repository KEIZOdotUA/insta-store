import './Logo.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

function Logo() {
  const whitelabel = useWhitelabelContext();

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div id="logo" role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
      <img height="40px" src={whitelabel.shop.logo} alt="logo" />
      {whitelabel.shop.name}
    </div>
  );
}

export default Logo;
