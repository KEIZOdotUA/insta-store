import './Bio.css';
import useAppContext from '@context/useAppContext';
import parse from 'html-react-parser';

function Bio() {
  const { whitelabel } = useAppContext();

  return (
    <div className="bio">
      <p>{parse(whitelabel.shop.bio)}</p>
    </div>
  );
}

export default Bio;
