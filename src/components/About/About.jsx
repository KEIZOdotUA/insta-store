import './About.css';
import useAppContext from '@contexts/App/useAppContext';
import parse from 'html-react-parser';

function About() {
  const { whitelabel } = useAppContext();

  return (
    <div id="about">
      <h1>Про нас</h1>
      {parse(whitelabel.shop.about)}
    </div>
  );
}

export default About;
