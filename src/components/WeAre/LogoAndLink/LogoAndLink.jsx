import './LogoAndLink.css';
import useWhitelabelContext from '../../../context/useWhitelabelContext';

function LogoAndLink() {
  const whitelabel = useWhitelabelContext();

  const instagramProfileName = `@${whitelabel.instagramProfile.name}`;

  const handleClick = () => {
    window.open(whitelabel.instagramProfile.url, '_blank');
  };

  return (
    <div id="logo-and-link-container">
      <div id="logo-and-link">
        <div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
          <img id="logo" src={`${whitelabel.blobStorageUrl}logo.png`} alt={instagramProfileName} />
        </div>
        <a href={whitelabel.instagramProfile.url} target="_blank" rel="noreferrer">
          {instagramProfileName}
        </a>
      </div>
    </div>
  );
}

export default LogoAndLink;
