import './Bio.css';
import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';
import parse from 'html-react-parser';

function Bio() {
  const whitelabel = useWhitelabelContext();

  return (
    <div id="bio">
      <p>{parse(whitelabel.shop.bio)}</p>
    </div>
  );
}

export default Bio;
