import './Bio.css';
import useAppContext from '@contexts/App/useAppContext';
import parse from 'html-react-parser';

function Bio() {
  const { whitelabel } = useAppContext();

  return (
    <div id="bio">
      <p>{parse(whitelabel.shop.bio)}</p>
    </div>
  );
}

export default Bio;
