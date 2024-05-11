import './Logo.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';

function Logo() {
  const whitelabel = useWhitelabelContext();

  const instagramProfileName = `@${whitelabel.instagramProfile.name}`;

  const handleClick = () => {
    window.open(whitelabel.instagramProfile.url, '_blank');
  };

  return (
    <div id="logo" role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
      <img height="40px" src={whitelabel.shop.logo} alt={instagramProfileName} />
      {instagramProfileName}
    </div>
  );
}

export default Logo;
